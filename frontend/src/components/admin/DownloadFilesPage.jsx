import React, { useEffect, useState } from 'react';
import { fetchAllDocuments, downloadDocument } from '../../actions/admin/adminActions';

function DownloadFilesPage() {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const docs = await fetchAllDocuments();
                setDocuments(docs);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };

        fetchDocuments();
    }, []);

    const handleDownload = async (documentId) => {
        try {
            const response = await downloadDocument(documentId);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    };

    return (
        <div className="bg-gray-100 p-10 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">Download Files</h2>
            <div className="bg-white p-4 rounded-md shadow">
                <ul>
                    {documents.map(doc => (
                        <li key={doc.documentId} className="mb-4">
                            <span className="font-medium">{doc.name}</span> 
                            <p className="text-gray-600">{doc.description}</p>
                            <button 
                                className="bg-blue-500 text-white px-4 py-1 rounded ml-4 hover:bg-blue-600"
                                onClick={() => handleDownload(doc.documentId)}
                            >
                                Download
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DownloadFilesPage;
