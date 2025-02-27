import { useState } from 'react';
import DashboardLayout from "../components/dashboardLayout";
import axios from 'axios'; 

export default function Spt() {
  // Definisikan state dengan nama field yang sesuai dengan model backend
  const [formData, setFormData] = useState({
    npwp: '',
    nama: '',
    alamat: '',
    penghasilanBruto: '',
    penghasilanNeto: '',
    ptkp: '',
    pkp: '',
    pphTerutang: '',
    pphDibayar: '',
    kurangBayar: '',
    lebihBayar: '',
    pphFinal: '',
    penghasilanBebas: '',
    jumlahHarta: '',
    jumlahKewajiban: '',
    tanggalLapor: '',
    tandaTangan: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Ganti URL dengan endpoint API backend Anda
      const response = await axios.post('/api/spt', formData);
      
      setMessage({
        type: 'success',
        text: 'Data SPT berhasil disimpan!'
      });
      
      // Opsional: reset form atau redirect
      // setFormData({ npwp: '', nama: '', ... }); // Reset form
      // router.push('/dashboard/spt-list'); // Redirect (perlu import useRouter)
      
      console.log('Response dari server:', response.data);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Terjadi kesalahan saat menyimpan data'
      });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render fields dengan label yang lebih deskriptif
  const renderFields = (fieldsConfig) => (
    fieldsConfig.map((config, index) => (
      <div key={index} className="mb-4 flex items-center gap-4">
        <label className="w-1/4 text-gray-700">{config.label}</label>
        <input 
          type={config.type || "text"}
          name={config.name} 
          value={formData[config.name]} 
          onChange={handleChange} 
          className="w-3/4 p-2 border rounded" 
          required={config.required !== false}
          placeholder={config.placeholder || ''}
        />
      </div>
    ))
  );

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Form SPT Tahunan 1770 SS</h1>
      
      {message.text && (
        <div className={`p-4 my-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-300 mt-6 p-6">
        <form onSubmit={handleSubmit}>
          {/* Portlet 1 - Identitas */}
          <div className="bg-indigo-900 text-white p-4 rounded-t-lg mb-6">
            <h2 className="text-xl font-bold">Identitas Wajib Pajak</h2>
          </div>
          {renderFields([
            { name: 'npwp', label: 'NPWP', placeholder: '00.000.000.0-000.000' },
            { name: 'nama', label: 'Nama Lengkap' },
            { name: 'alamat', label: 'Alamat' }
          ])}

          {/* Portlet 2 - Pajak Penghasilan */}
          <div className="bg-indigo-900 text-white p-4 rounded-t-lg mb-6">
            <h2 className="text-xl font-bold">Pajak Penghasilan</h2>
          </div>
          {renderFields([
            { name: 'penghasilanBruto', label: 'Penghasilan Bruto', type: 'number' },
            { name: 'penghasilanNeto', label: 'Penghasilan Neto', type: 'number' },
            { name: 'ptkp', label: 'PTKP', type: 'number' },
            { name: 'pkp', label: 'PKP', type: 'number' },
            { name: 'pphTerutang', label: 'PPh Terutang', type: 'number' },
            { name: 'pphDibayar', label: 'PPh yang Sudah Dibayar', type: 'number' },
            { name: 'kurangBayar', label: 'PPh Kurang Bayar', type: 'number' },
            { name: 'lebihBayar', label: 'PPh Lebih Bayar', type: 'number' }
          ])}

          {/* Portlet 3 - PPh Final */}
          <div className="bg-indigo-900 text-white p-4 rounded-t-lg mb-6">
            <h2 className="text-xl font-bold">Penghasilan yang Dikenakan PPH Final dan yang Dikecualikan dari Objek Pajak</h2>
          </div>
          {renderFields([
            { name: 'pphFinal', label: 'PPh Final', type: 'number' },
            { name: 'penghasilanBebas', label: 'Penghasilan yang Dikecualikan', type: 'number' }
          ])}

          {/* Portlet 4 - Harta dan Kewajiban */}
          <div className="bg-indigo-900 text-white p-4 rounded-t-lg mb-6">
            <h2 className="text-xl font-bold">Daftar Harta dan Kewajiban</h2>
          </div>
          {renderFields([
            { name: 'jumlahHarta', label: 'Jumlah Harta', type: 'number' },
            { name: 'jumlahKewajiban', label: 'Jumlah Kewajiban', type: 'number' }
          ])}

          {/* Portlet 5 - Tanggal & Tanda Tangan */}
          <div className="bg-indigo-900 text-white p-4 rounded-t-lg mb-6">
            <h2 className="text-xl font-bold">Pernyataan</h2>
          </div>
          <div className="mb-4 flex items-center gap-4">
            <label className="w-1/4 text-gray-700">Tanggal</label>
            <input 
              type="date" 
              name="tanggalLapor" 
              value={formData.tanggalLapor} 
              onChange={handleChange} 
              className="w-3/4 p-2 border rounded" 
              required 
            />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <label className="w-1/4 text-gray-700">Tanda Tangan</label>
            <input 
              type="text" 
              name="tandaTangan" 
              value={formData.tandaTangan} 
              onChange={handleChange} 
              className="w-3/4 p-2 border rounded" 
              placeholder="Nama lengkap sebagai tanda tangan elektronik"
              required 
            />
          </div>

          <button 
            type="submit" 
            className={`${isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded w-full`}
            disabled={isLoading}
          >
            {isLoading ? 'Menyimpan...' : 'Submit SPT'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}