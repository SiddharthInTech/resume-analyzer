const path = require('path'); // Required before using it for dotenv path
require('dotenv').config({ path: path.join(__dirname, '.env') }); // Load .env from this specific directory

const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');




console.log('=== Environment Variables Debug ===');
console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
console.log('PORT exists:', !!process.env.PORT);
console.log('=====================================');

const { GoogleGenerativeAI } = require("@google/generative-ai");

const { connectToMongo, collection } = require('../models/mongodb');
const analyzePDF = require('../gemini');

connectToMongo();

// Create files directory if it doesn't exist
const filesDir = path.join(__dirname, 'files'); 
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
}

app.use("/upload-file", express.static(path.join(__dirname, "files")));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello from AI backend");
});

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'files'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/upload-file', upload.single('file'), async (req, res, next) => {
    console.log("File upload request received:", req.file);
    
    if (!req.file) {
        return res.status(400).json({ status: "failed", message: "No file uploaded" });
    }
    
    const title = req.body.title;
    const filename = req.file.filename;

    try {
        const existingPdf = await collection.findOne();

        // Checking for the PDF
        if (existingPdf) {
            await collection.deleteOne({ _id: existingPdf._id });
            const filePath = path.join(__dirname, 'files', existingPdf.pdf);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await collection.create({ title: title, pdf: filename });
        res.status(200).send({ status: "success", message: "file uploaded successfully" });
    } catch (error) {
        console.error("Error in /upload-file route:", error);
        res.status(500).json({ status: "failed", message: "file upload failed", error: error.message });
    }
});

app.get('/get-pdf', async (req, res) => {
    try {
        collection.find({}).then((data) => {
            res.status(200).send({ status: "success", data: data });
        });
    } catch (error) {
        console.error("Error in /get-pdf route:", error);
        res.status(500).json({ status: "failed", message: "Internal server error", error: error.message });
    }
});

app.delete('/delete-pdf/:id/:filename', async (req, res) => {
    const id = req.params.id;
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'files', filename);

    try {
        const deletedPdf = await collection.findByIdAndDelete(id);

        if (!deletedPdf) {
            return res.status(404).json({ status: "failed", message: "PDF not found." });
        }

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.json({ status: "success", message: "PDF deleted successfully." });
    } catch (error) {
        console.error("Error deleting PDF:", error);
        res.status(500).json({ status: "failed", message: "Internal server error.", error: error.message });
    }
});

app.post('/analyze-pdf', async (req, res) => {
    console.log("Analyze PDF request received:", req.body);
    
    const { filename, userInput } = req.body;
    
    if (!filename) {
        return res.status(400).json({ status: "failed", message: "filename is required" });
    }
    
    // Set default userInput if not provided
    const query = userInput || "Please analyze this resume and suggest improvements";

    try {
        console.log(`Processing PDF analysis for file: ${filename} with query: ${query}`);
        
        // Updated to pass filename directly instead of URL
        const analysis = await analyzePDF(filename, query);
        
        if (!analysis) {
            return res.status(500).json({ status: "failed", message: "Failed to generate analysis" });
        }
        
        res.status(200).json({ status: "success", analysis });
    } catch (error) {
        console.error("Error in /analyze-pdf route:", error);
        res.status(500).json({ 
            status: "failed", 
            message: "Internal server error", 
            error: error.message 
        });
    }
});

app.get('/test-gemini', async (req, res) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "GEMINI_API_KEY not set" });
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent("What is the capital of France?");

        // Safely extract the response text from Gemini API result
        let responseText = "";
        if (result && result.response && result.response.candidates && result.response.candidates[0] && result.response.candidates[0].content && result.response.candidates[0].content.parts && result.response.candidates[0].content.parts[0] && result.response.candidates[0].content.parts[0].text) {
            responseText = result.response.candidates[0].content.parts[0].text;
        } else if (result && result.response && typeof result.response.text === 'function') {
            responseText = result.response.text();
        } else {
            responseText = JSON.stringify(result);
        }

        res.json({ success: true, response: responseText });
    } catch (error) {
        console.error("Error testing Gemini API:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen( process.env.PORT || 5001, () => {
    console.log("Server is running on port 5001");
});