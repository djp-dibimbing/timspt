import Sidebar from './sidebar';
import Navbar from './navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);

        if (!storedToken) {
            setTimeout(() => {
                router.push('/'); 
            }, 100); 
        }
    }, [router]); 

    
    if (!token) return null;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />

                <main className="flex-1 p-6">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}