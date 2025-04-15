import React, { useState, } from 'react';
import { FileUp, Upload, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LandingPage() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const handleUploadPdf = async (e) => {
    e.preventDefault();
  
    if (!selectedFile) {
      alert("File is not selected !!");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", selectedFile.name);
  
    try {
      const response = await axios.post("http://localhost:5001/upload-file", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
  
      if (response.data === "success") {
        setSelectedFile(null);
      }
  
      // Ensure the input element exists before resetting
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }
  
      navigate('/Ai');
    } catch (error) {
      console.error("Error in uploading pdf", error);
      alert("Error uploading PDF");
    }
  };
  

  return (
    <div style={{marginTop:"3rem",marginBottom:"1rem"}} className=" bg-gradient-to-br rounded-2xl from-indigo-200 via-purple-100 to-pink-100">
      <div style={{ paddingBlock: "4rem", paddingInline: "1rem" }} className="container px-4 py-16 bg-red-600 flex justify-center items-center ">
        <div style={{ minWidth: "42rem" }} className="max-w-2xl mx-auto ">
          <div style={{ padding: "2rem", borderRadius: "1.5rem" }} className=" rounded-xl shadow-xl p-8">
            <h1 style={{ marginBottom: "1.5rem" }} className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Upload Your Resume
            </h1>

            <div style={{ padding: "2rem", marginBottom: "1.5rem" }}
              className="border-2 border-dashed border-indigo-300 rounded-xl p-8 mb-6 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {!selectedFile ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <FileUp className="h-16 w-16 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-lg text-gray-600 mb-2">
                      Drag and drop your PDF here, or
                    </p>
                    <label style={{
                      paddingBlock: "1rem", paddingInline: "0.75rem"
                    }} className="inline-flex items-center px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg cursor-pointer transition-colors duration-200">
                      <Upload style={{ marginRight: "0.5rem" }} className="h-5 w-5 mr-2" />
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Supported format: PDF (max 10MB)
                  </p>
                </div>
              ) : (
                <div style={{ padding: "1rem" }} className="bg-indigo-50 rounded-lg p-4 flex items-center justify-between">
                  <div style={{ gap: "1rem" }} className="flex items-center space-x-4">
                    <FileUp className="h-8 w-8 text-indigo-500" />
                    <div>
                      <p className="text-gray-800 font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button style={{ padding: "0.5rem" }}
                    onClick={handleRemoveFile}
                    className="p-2 hover:bg-red-100 rounded-full transition-colors duration-200"
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              )}
            </div>

            {!selectedFile ? "" : (    

            <button style={{ paddingBlock: "1rem" }}
              onClick={handleUploadPdf}
              className="cursor-pointer w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              disabled={!selectedFile}
            >
              <Upload style={{ marginRight: "0.5rem" }} className="h-5 w-5" />
              <span>Upload PDF</span>
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;