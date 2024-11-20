// src/Component/AddHooks.jsx
import React from 'react';

const AddHooks = ({ isOpen, onClose, onSave, newWebhook, setNewWebhook }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <h3 className="text-xl font-semibold mb-4">Add New Webhook</h3>
                <div className="mb-4">
                    <label className="block text-gray-700">Url:</label>
                    <input
                        type="text"
                        value={newWebhook.url}
                        onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                        placeholder="Enter URL"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Status:</label>
                    <select
                        value={newWebhook.status}
                        onChange={(e) => setNewWebhook({ ...newWebhook, status: e.target.value })}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                    >
                        <option value="1">Enabled</option>
                        <option value="0">Disabled</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2">
                        Close
                    </button>
                    <button onClick={onSave} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddHooks;
