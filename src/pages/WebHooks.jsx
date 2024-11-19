import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddHooks from '../components/AddHooks';
import EditWebhookModal from '../components/EditWebhookModal';

const WebhooksPage = () => {
    const [webhooks, setWebhooks] = useState([
        {
            id: 1,
            url: 'https://www.youtube.com/watch?v=YVEAm0UusmM',
            status: 'Enabled',
            created: '2024-11-07',
            lastUpdated: '2024-11-07',
        }
    ]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newWebhook, setNewWebhook] = useState({ url: '', status: 'Enabled' });
    const [selectedWebhook, setSelectedWebhook] = useState(null);

    // Handle adding a new webhook
    const handleAddWebhook = () => {
        setIsAddModalOpen(true);
    };

    const handleSaveWebhook = () => {
        setWebhooks([
            ...webhooks,
            {
                ...newWebhook,
                id: Date.now(),
                created: new Date().toISOString().split('T')[0],
                lastUpdated: new Date().toISOString().split('T')[0],
            },
        ]);
        setIsAddModalOpen(false);
        setNewWebhook({ url: '', status: 'Enabled' });
    };

    // Handle editing an existing webhook
    const handleEdit = (id) => {
        const webhookToEdit = webhooks.find((webhook) => webhook.id === id);
        setSelectedWebhook(webhookToEdit);
        setIsEditModalOpen(true);
    };

    const handleUpdateWebhook = () => {
        setWebhooks((prevWebhooks) =>
            prevWebhooks.map((webhook) =>
                webhook.id === selectedWebhook.id
                    ? { ...selectedWebhook, lastUpdated: new Date().toISOString().split('T')[0] }
                    : webhook
            )
        );
        setIsEditModalOpen(false);
        setSelectedWebhook(null);
    };

    const handleDelete = (id) => {
        setWebhooks(webhooks.filter((webhook) => webhook.id !== id));
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedWebhook(null);
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Webhooks</h2>
                <div>
                    <button
                        onClick={handleAddWebhook}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mr-2"
                    >
                        + Add Webhook
                    </button>
                    <button
                        onClick={() => console.log('View logs')}
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                    >
                        Logs
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-left text-gray-600">Url</th>
                            <th className="px-4 py-2 border-b text-left text-gray-600">Status</th>
                            <th className="px-4 py-2 border-b text-left text-gray-600">Created</th>
                            <th className="px-4 py-2 border-b text-left text-gray-600">Last Updated</th>
                            <th className="px-4 py-2 border-b text-left text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {webhooks.map((webhook) => (
                            <tr key={webhook.id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b">{webhook.url}</td>
                                <td className="px-4 py-2 border-b text-green-600">{webhook.status}</td>
                                <td className="px-4 py-2 border-b">{webhook.created}</td>
                                <td className="px-4 py-2 border-b">{webhook.lastUpdated}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => handleEdit(webhook.id)}
                                        className="text-yellow-500 hover:text-yellow-600 mr-2"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(webhook.id)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Webhook Modal */}
            <AddHooks
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                onSave={handleSaveWebhook}
                newWebhook={newWebhook}
                setNewWebhook={setNewWebhook}
            />

            {/* Edit Webhook Modal */}
            <EditWebhookModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                onSave={handleUpdateWebhook}
                selectedWebhook={selectedWebhook}
                setSelectedWebhook={setSelectedWebhook}
            />
        </div>
    );
};

export default WebhooksPage;
