// Load environment variables from .env file
require('dotenv').config();

// Node.js Backend
const { GoogleGenerativeAI } = require("@google/generative-ai");
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.GEMINI_API_KEY;

// Check if API key is present
if (!apiKey) {
  console.error("GEMINI_API_KEY environment variable is not set.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Updated to use the current model name
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro", // Updated to the latest model version
  safetySettings: [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

async function extractTextFromPDF(filePath) {
  try {
    console.log(`Reading PDF from: ${filePath}`);
    
    // Read file directly from disk instead of fetching via URL
    const dataBuffer = fs.readFileSync(filePath);
    
    console.log(`PDF read, size: ${dataBuffer.length} bytes`);
    
    console.log("Parsing PDF content...");
    const pdfData = await pdfParse(dataBuffer);
    console.log(`PDF parsed, extracted ${pdfData.text.length} characters`);
    
    return pdfData.text;
  } catch (error) {
    console.error("Error in extractTextFromPDF:", error);
    throw error;
  }
}

async function analyzePDF(filename, userInput = "Please analyze this resume and suggest improvements") {
  console.log(`Starting analysis for PDF: ${filename}`);
  try {
    // Construct the file path
    const filePath = path.join(__dirname, 'ai/files', filename);
    console.log(filePath)
    
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error(`PDF file not found at: ${filePath}`);
      return "PDF file not found. Please upload a valid PDF file.";
    }
    
    // Extract text from PDF
    const pdfText = await extractTextFromPDF(filePath);
    if (!pdfText || pdfText.trim().length === 0) {
      return "Failed to extract text from the PDF or the PDF was empty.";
    }

    console.log("Creating chat session with Gemini...");
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    // Limit text size to avoid token limit issues
    const maxLength = 15000;
    const truncatedText = pdfText.length > maxLength ? 
                         pdfText.substring(0, maxLength) + "... [text truncated due to length]" : 
                         pdfText;
    
    // Create a well-structured prompt for the AI
    const prompt = `
    Task: Analyze the following resume and provide constructive feedback.
    
    Resume text:
    ${truncatedText}
    
    User query: ${userInput}
    
    Please analyze this resume and provide:
    1. A summary of the resume's strengths
    2. Specific areas that need improvement
    3. Skills or certifications that could enhance this resume
    4. Overall formatting and structure advice
    `;

    console.log("Sending request to Gemini API...");
    const result = await chatSession.sendMessage(prompt);
    console.log("Received response from Gemini API");
    
    return result.response.text();
  } catch (error) {
    console.error("Error in analyzePDF:", error);
    // Provide more detailed error message
    if (error.message.includes("quota")) {
      return "API quota exceeded. Please try again later.";
    } else if (error.message.includes("network")) {
      return "Network error occurred. Please check your internet connection.";
    } else {
      return `Error analyzing PDF: ${error.message}`;
    }
  }
}

module.exports = analyzePDF;