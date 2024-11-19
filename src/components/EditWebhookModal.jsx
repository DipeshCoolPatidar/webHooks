import React from 'react';

const EditWebhookModal = ({ isOpen, onClose, onSave, selectedWebhook, setSelectedWebhook }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">Edit Webhook</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSave();
                    }}
                >
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        URL:
                        <input
                            type="url"
                            value={selectedWebhook?.url || ''}
                            onChange={(e) =>
                                setSelectedWebhook((prev) => ({
                                    ...prev,
                                    url: e.target.value,
                                }))
                            }
                            required
                            className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Status:
                        <select
                            value={selectedWebhook?.status || ''}
                            onChange={(e) =>
                                setSelectedWebhook((prev) => ({
                                    ...prev,
                                    status: e.target.value,
                                }))
                            }
                            className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Enabled">Enabled</option>
                            <option value="Disabled">Disabled</option>
                        </select>
                    </label>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2 hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditWebhookModal;
