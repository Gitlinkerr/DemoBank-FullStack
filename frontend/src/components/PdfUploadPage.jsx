import React, { useState } from 'react';
import {instance as axios} from '../config/axiosConfig';
import { useSelector } from 'react-redux';


const PdfUploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const currentUser = useSelector(state => state.user);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();

      formData.append('file', file);
      formData.append('file_name', file.name);
      formData.append('file_description', 'pdf');
      formData.append('uploader_id', currentUser.id.toString());
      
      await axios.post('http://localhost:8080/api/v1/Files/uploadFile', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          }
      });
      
      // File upload successful
      alert('File uploaded successfully!');
      setFile(null);
    } catch (error) {
      // Handle upload error
      setError('An error occurred while uploading the file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex h-screen">

      {/* Main Content */}
      <div className="flex flex-col flex-1 bg-gray-100 px-8 py-6">
        <h2 className="text-2xl font-semibold mb-4">Upload PDF</h2>
        <div className="flex items-center mb-4">
          <label htmlFor="pdf" className="mr-2 text-gray-700">
            Select PDF:
          </label>
          <input
            type="file"
            id="pdf"
            accept=".pdf"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default PdfUploadPage;
