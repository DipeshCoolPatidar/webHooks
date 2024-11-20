import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    

    // Replace with your actual Bearer token
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDIxMzQ0M2I4NjBiNTRlZWRlMjhjY2VlMGZmZWVkYWRiZWMzNmRjN2E5OThlZWIyZDExYTlkNDZmZWE0NTFlNzVlN2ZlYjZmZDYxNzg1OGEiLCJpYXQiOjE3MzE0ODc5MTAuODU4MjQ0LCJuYmYiOjE3MzE0ODc5MTAuODU4MjUxLCJleHAiOjE3NjMwMjM5MTAuODQ5OTM1LCJzdWIiOiI2OSIsInNjb3BlcyI6W119.g78aoi0_Kr-7MDl0Bu6eNVmUh2MJsOPwCn5NrEwvSuINeUH9rKCjIPDk7GP-du6ivym-WfjCg2RJmCu_YuIPzkRcRZJTvHe9da6zIeE8DZKqFzxZ1HCHe4P68NlWmRkiVfe8Rwvaxz8sgl4QK9VfAnS9cH8qNjth0r87lH7DtR9b1QvY_QpcgllR0HyMDjBaH7KUJzL10oTiOhMpYIJzUj_qqKhNs9P13FUMLsCgu193tU89Ir2ti3QPm4AA-GJX9SP5yAHRdhCw_5SnaX9BxWP2NDLejts_klQDFb1LZ8tWFKfh8wIllUrPeexQGj0ewPeBLyn64PK4DfSnpGXVxQnWypctvbH4ouWVHMt2vY0V6j5QWIjIe_KCR3229CwEfnC3ULRZVClYRHszfs_B5Jl4nmhO-5lgZ9LRbiMERk5pn7i8Y9DOjToirtCJJPef4l11fdGBk_fru1LKCs1i2h16wehQW1GbwZWSo3SKLkq9elmw6lyJLyrAX3mJgVjs4jv9YpAfk0eShKUIqE3i8TlIvLwZIOrradpSBDbqBD9YUzMadPqwfMU_2afYCbMtS24jNqdWZf6A102LOAbL4N8zINQfoNmsQScje2_NzCtybTveuhZDmHe6FVDVBgGtMjsXbAxMKvbItxrlwYdHVKDRkwD0ERWbiWoK3p7qQU0';


   
    // Fetch logs from the API on component mount
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.post(
                    'http://service1.nuke.co.in/api/webhook-logs',
                    { action: 'read', username: 'rahul1011' }, // Payload
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log(response.data.data);
                
                setWebhooks(response.data.data); // Save the logs in state
            } catch (error) {
                console.error('Error fetching logs:', error.message);
            }
        };

        fetchLogs();
    }, [token]); // Dependency on the token


    
    // Handle adding a new webhook
    const handleAddWebhook = () => {
        setIsAddModalOpen(true);
    };

    const handleSaveWebhook = async () => {
        // Add the necessary fields as per the API requirement
        const statusValue = newWebhook.status === 'Enabled' ? 1 : 0;
        const payload = {
            action: 'create',  // Action, as specified by the API
            username: 'rahul1011',  // Assuming username is static or fetched from a login context
            url: newWebhook.url,  // URL from the form
            status: statusValue,
            value: 1,  // Assuming 'value' is the status (Enabled/Disabled)
            sender_id: "42161254",  // Static sender_id or fetched dynamically
        };
    
        
    
        try {
            const response = await axios.post(
                'http://service1.nuke.co.in/api/webhook',
                payload,  // Send the modified payload
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Ensure valid token
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            console.log('Webhook added:', response.data.data);
    
            setWebhooks((prevWebhooks) => [
                ...prevWebhooks,
                {
                    webhook_url: response.data.data.url, // Use the correct property
                    date: response.data.data.created_date,
                    time: response.data.data.updated_date,
                    status: response.data.data.status,
                },
            ]);
    
            // Reset modal and form data
            setIsAddModalOpen(false);
            setNewWebhook({ url: '', status: 'Enabled' });
        } catch (error) {
            console.error('Error saving webhook:', error.response?.data || error.message);
        }
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

            {/* Display fetched logs */}
            

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
                                <td className="px-4 py-2 border-b">{webhook.webhook_url}</td>
                                <td className="px-4 py-2 border-b text-green-600">{webhook.status}</td>
                                <td className="px-4 py-2 border-b">{webhook.date}</td>
                                <td className="px-4 py-2 border-b">{webhook.time}</td>
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
