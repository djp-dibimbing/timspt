import Button from "../components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function Navbar() {
    const [username, setUsername] = useState(null); // Store username
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/');
                return;
            }

            try {
                const res = await fetch('http://localhost:3001/wp/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!res.ok) throw new Error('Failed to fetch profile');

                const data = await res.json();
                setUsername(data.data.username); // Set username
            } catch (error) {
                console.error(error);
                router.push('/'); // Redirect to login if error
            }
        };

        fetchProfile();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Dashboard</div>
            <div className="flex items-center gap-4">
                {username && <span className="text-sm">Welcome, <b>{username}</b></span>}
                <Button variant="ghost" className="flex items-center gap-2" onClick={handleLogout}>
                    <LogOut size={18} /> Logout
                </Button>
            </div>
        </nav >
    );
}