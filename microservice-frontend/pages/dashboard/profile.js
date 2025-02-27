import DashboardLayout from "../components/dashboardLayout";
import { useState, useEffect } from 'react';

export default function EditProfile() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        nik: '',
        npwp: ''
    });

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:3001/wp/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                
                const ret = await response.json();
                console.log('Profile:', ret);
                setFormData({
                    firstName: ret.data.firstname || '',
                    lastName: ret.data.lastname || '',
                    email: ret.data.email || '',
                    username: ret.data.username || '',
                    password: '', 
                    nik: ret.data.nik || '',
                    npwp: ret.data.npwp || ''
                });

            } catch (error) {
                setMessage({ type: 'error', text: error.message });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            const response = await fetch('http://localhost:3001/wp/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <DashboardLayout>
        <div className="max-w-2xl mx-auto mt-10 p-6">
            <h2 className="text-2xl font-bold mb-5">Edit Profile</h2>

            {message && (
                <div className={`p-3 mb-4 rounded ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                            className="w-full p-2 border rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                            className="w-full p-2 border rounded-lg" required />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                        className="w-full p-2 border rounded-lg" readOnly disabled />
                </div>

                <div>
                    <label className="block text-gray-700">Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange}
                        className="w-full p-2 border rounded-lg" required />
                </div>

                <div>
                    <label className="block text-gray-700">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}
                        className="w-full p-2 border rounded-lg" placeholder="Change Password" />
                </div>

                <div>
                    <label className="block text-gray-700">NIK</label>
                    <input type="text" name="nik" value={formData.nik} onChange={handleChange}
                        className="w-full p-2 border rounded-lg" required />
                </div>

                <div>
                    <label className="block text-gray-700">NPWP</label>
                    <input type="text" name="npwp" value={formData.npwp} onChange={handleChange}
                        className="w-full p-2 border rounded-lg" required />
                </div>

                <button type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Save Changes
                </button>
            </form>
        </div>
        </DashboardLayout>
    );
}
