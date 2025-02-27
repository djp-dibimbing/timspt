import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Sidebar() {
    const router = useRouter(); // Get current route

    const menus = [
        { name: 'Home', path: '/dashboard' },
        { name: 'Lapor Pajak', path: '/dashboard/spt' },
        { name: 'Daftar SPT', path: '/dashboard/daftarspt' },
        { name: 'Profile', path: '/dashboard/profile' }
    ];

    return (
        <aside className="w-64 bg-indigo-900 shadow-lg p-5 min-h-screen">
            <div className="flex items-center justify-center mb-6">
                <Image src="/djp.png" alt="DJP Logo" width={90} height={90} />
            </div>
            <ul>
                {menus.map((menu) => (
                    <li key={menu.name} className={`p-3 rounded-lg transition 
                        ${router.pathname === menu.path ? 'bg-yellow-400 text-black' : 'hover:bg-blue-900 text-white'}`}
                    >
                        <Link href={menu.path} className="block">
                            {menu.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
