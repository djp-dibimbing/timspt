import Sidebar from './sidebar';
import Navbar from './navbar';

export default function DashboardLayout({ children }) {
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