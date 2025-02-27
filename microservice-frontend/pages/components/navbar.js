import Button from "../components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        router.push('/'); 
    };

    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Dashboard</div>
            <Button variant="ghost" className="flex items-center gap-2" onClick={handleLogout}>
                <LogOut size={18} /> Logout
            </Button>
        </nav>
    );
}