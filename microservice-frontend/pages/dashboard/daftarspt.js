import { useEffect, useState } from 'react';
import DashboardLayout from '../components/dashboardLayout';
import axios from 'axios';

export default function SptTable() {
  const [sptData, setSptData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/spt');
        setSptData(response.data);
      } catch (error) {
        setMessage({ type: 'error', text: 'Gagal mengambil data SPT' });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Daftar SPT Tahunan 1770 SS</h1>
      
      {message.text && (
        <div className={`p-4 my-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-300 mt-6 p-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-indigo-900 text-white">
                <th className="border border-gray-300 p-2">No</th>
                <th className="border border-gray-300 p-2">NPWP</th>
                <th className="border border-gray-300 p-2">Nama</th>
                <th className="border border-gray-300 p-2">Tahun Pajak</th>
                <th className="border border-gray-300 p-2">Penghasilan Bruto</th>
                <th className="border border-gray-300 p-2">Penghasilan Netto</th>
                <th className="border border-gray-300 p-2">PPH Terutang</th>
                <th className="border border-gray-300 p-2">PPH Dibayar</th>
                <th className="border border-gray-300 p-2">Tanggal Lapor</th>
              </tr>
            </thead>
            <tbody>
              {sptData.map((spt, index) => (
                <tr key={spt.id} className="border border-gray-300 text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{spt.npwp}</td>
                  <td className="border border-gray-300 p-2">{spt.nama}</td>
                  <td className="border border-gray-300 p-2">{spt.tahunPajak}</td>
                  <td className="border border-gray-300 p-2">{spt.penghasilanBruto}</td>
                  <td className="border border-gray-300 p-2">{spt.penghasilanNeto}</td>
                  <td className="border border-gray-300 p-2">{spt.pphTerutang}</td>
                  <td className="border border-gray-300 p-2">{spt.pphDibayar}</td>
                  <td className="border border-gray-300 p-2">{new Date(spt.tanggalLapor).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
