import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import "../src/components/styles/background.css"
import Loader from "./components/Pages/Loader"
import Loader2 from "./components/Pages/Loader2"
import axios from 'axios';


function App() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [aiResponse, setAiResponse] = useState('');
    const [input, setInput] = useState('');
    const [uploadedPdf, setUploadedPdf] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loader, setloader] = useState(false);

    useEffect(() => {
        getPdf();
    }, []);

    const contents = [
        "AI-Powered Resume Analysis...!!",
        "Analyzing Skills or certifications...!!!",
        "Specific areas that need improvement .!",
        "Providing  Overall formatting...!!!",
        "Improving Structure advice...!!",
        "Providing Constructive Feedback...!!",
      ];

      const [ContentIndex, setContentIndex] = useState(0)
      const [isRunning, setisRunning] = useState(false) 
      useEffect(() => {
        if ( isRunning && ContentIndex < contents.length - 1){
            const timer = setTimeout(()=> {setContentIndex(ContentIndex + 1)} , 3000);
            return () => clearTimeout(timer);
        }

      }, [ContentIndex,isRunning]);
      


    const AiResponse = async (userInput) => {
        setLoading(true);
        setError(null);
        setloader(true);
        setisRunning(true);

        try {
            if (!uploadedPdf) {
                setAiResponse("No PDF uploaded yet.");
                setLoading(false);
                return;
            }

            const filename = uploadedPdf.pdf;
            console.log("Sending analysis request for:", filename, "with input:", userInput);

            const response = await axios.post('http://localhost:5001/analyze-pdf', {
                filename: filename,
                userInput: userInput || "Please analyze this resume and suggest improvements"
            });

            console.log("Response from server:", response.data);

            if (response.data.status === "success") {
                setAiResponse(response.data.analysis);
            } else {
                setError(`Error: ${response.data.message}`);
                setAiResponse("");
            }
        } catch (error) {
            console.error("Error in AiResponse:", error);
            setError(error.response?.data?.message || error.message || "Error communicating with the server.");
            setAiResponse("");
        } finally {
            setLoading(false);
        }
    };

    const showPdf = (pdfFilename) => {
        const url = `http://localhost:5001/upload-file/${pdfFilename}`;
        setPdfUrl(url);
    };

    const deletePdf = async (pdfId, filename) => {
        try {
            alert("Are You Sure ...!!!");
            const response = await axios.delete(`http://localhost:5001/delete-pdf/${pdfId}/${filename}`);
            if (response.data.status === "success") {
                console.log("PDF deleted successfully.");
                setUploadedPdf(null);
                setPdfUrl(null);
                setAiResponse("");
                getPdf();
                navigate('/home');
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Network error.");
        }
    };

    const submitPdf = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5001/upload-file', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });

            if (response.data.status === "success") {
                setTitle('');
                setFile(null);
                // Reset the file input
                document.querySelector('input[type="file"]').value = '';
                getPdf();
            }
        } catch (error) {
            console.error("Error uploading PDF:", error);
            alert("Error uploading PDF.");
        } finally {
            setLoading(false);
        }
    };

    const getPdf = async () => {
        try {
            const result = await axios.get('http://localhost:5001/get-pdf');
            console.log(result.data.data[0].pdf);
            if (result.data.data && result.data.data.length > 0) {
                setUploadedPdf(result.data.data[0]);
                showPdf(result.data.data[0].pdf);
            } else {
                setUploadedPdf(null);
                setPdfUrl(null);
            }
        } catch (error) {
            console.error("Error fetching PDFs:", error);
        }
    };

    return (
        <div style={{
            marginInline: "1.5rem",
            padding: "2rem",
            backgroundImage: "url('https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }} className='bg-resume-analyzer App w-full h-screen flex '>
            <div className='w-1/2'>
                {uploadedPdf ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className='uploaded'>
                        <h4 className='font-semibold text-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent animate-text'>Uploaded PDF : {uploadedPdf.title}</h4>
                        <button
                            className="inline-flex items-center px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg cursor-pointer transition-colors duration-200"
                            style={{
                                paddingBlock: "1rem", paddingInline: "0.75rem", marginTop: "1rem"
                            }}
                            onClick={() => deletePdf(uploadedPdf._id, uploadedPdf.pdf)}
                            disabled={loading}
                        >
                            Delete PDF
                        </button>
                    </div>
                ) : (
                    <p>No PDF uploaded yet.</p>
                )}

                <div
                    className='flex justify-center items-center rounded-2xl'
                    style={{ width: "100%%", height: "75vh", padding: "10px", border: "1px solid black", marginTop: "10px",backgroundColor: "#585454" }}>
                    {pdfUrl && (
                        <div style={{ height: "100%", width: "100%", backgroundColor: "gray" }} className='rounded-2xl'>
                            <iframe className='rounded-xl' src={pdfUrl} width={"100%"} height={"100%"} title="PDF Viewer"></iframe>
                        </div>
                    )}
                </div>
            </div>

            {!aiResponse ? (
                <div style={{ margin: "1rem", paddingBlock: "1rem", paddingInline: "1rem" }} className='w-1/2 h-full text-white  '>
                    <h2 style={{ marginBlock: "1rem" }} className='text-3xl'>Get AI Analysis</h2>
                    <div className='flex flex-col justify-center items-center '>
                        <input
                            className="rounded-[10px] outline  outline-[#FEBF00] border-0 font-sans bg-[#4e4545] outline-offset-3 px-4 py-2 transition duration-200 focus:outline-offset-5 focus:bg-[#4e4545]"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter your query (e.g., What can I improve in my resume?)"
                            style={{ flexGrow: 1, padding: "1rem", marginBlock: "1rem", minWidth: "100%" }}
                            required
                        />
                        <button
                            onClick={() => AiResponse(input)}
                            className="btn"
                            disabled={loading || !uploadedPdf}
                            style={{ margin: "1rem", maxWidth: "12rem" }}
                        >
                            {loading ? 'Analyzing...' : 'Get AI Suggestion'}
                        </button>
                        {loader ? 
                            <div style={{ paddingInline: "1.5rem", marginBlock: "1rem",maxWidth:"30rem" }} className='bg-[#6fa479c1] rounded-[30%] '>
                                <Loader className="scale-100" />
                            </div>
                            : ""}
                            {loader ?  
                            <div style={{ padding: "1rem" }} className='flex gap-4 rounded-2xl text-2xl bg-[#4e4545] text-white font-bold'>
                                <Loader2 /> {contents[ContentIndex]}
                            </div>
                                      : "" }
                         


                    </div>


                    {error && (
                        <div style={{ color: "red", marginBottom: "10px" }}>
                            {error}
                        </div>
                    )}

                    {aiResponse && (
                        <div
                            className='bg-zinc-700 h-[75vh] overflow-y-auto'
                            style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "1rem", scrollbarWidth: "thin", scrollbarColor: "#888 #f1f1f1" }}>
                            <h3>AI Analysis:</h3>
                            <div style={{ whiteSpace: "pre-line" }}>{aiResponse}</div>
                        </div>
                    )}

                </div>) : (
                <div style={{ marginInline: "1rem", paddingBlock: "", paddingInline: "" }} className='w-1/2 h-full text-white  '>
                    <h2 className='text-3xl'>Get AI Analysis</h2>
                    <div style={{ marginBottom: "" }} className='flex justify-center items-center '>
                        <input
                            className="rounded-[10px] outline  outline-[#FEBF00] border-0 font-sans bg-[#4e4545] outline-offset-3 px-4 py-2 transition duration-200 focus:outline-offset-5 focus:bg-[#4e4545]"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter your query (e.g., What can I improve in my resume?)"
                            style={{ flexGrow: 1, padding: "1rem", marginBlock: "", minWidth: "70%" }}
                            required
                        />
                        <button
                            onClick={() => AiResponse(input)}
                            className="btn"
                            disabled={loading || !uploadedPdf}
                            style={{ margin: "1rem", maxWidth: "12rem" }}
                        >
                            {loading ? 'Analyzing...' : 'Get AI Suggestion'}
                        </button>
                    </div>

                    {error && (
                        <div style={{ color: "red", marginBottom: "10px" }}>
                            {error}
                        </div>
                    )}

                    {aiResponse && (
                        <div
                            className='bg-zinc-700 h-[75vh] overflow-y-auto'
                            style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "1rem", scrollbarWidth: "thin", scrollbarColor: "#888 #f1f1f1" }}>
                            <h3>AI Analysis:</h3>
                            <div style={{ whiteSpace: "pre-line" }}>{aiResponse}</div>
                        </div>
                    )}
                </div>)}
        </div>
    );
}

export default App;