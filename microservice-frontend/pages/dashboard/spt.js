import { useState, useEffect } from 'react';
import DashboardLayout from '../components/dashboardLayout';

export default function Spt() {
  const [formData, setFormData] = useState({
    npwp: '',
    nama: '',
    tahunPajak: '',
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
    tanggalLapor: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const preparedData = {
    ...formData,
    npwp: formData.npwp,
    nama: formData.nama,
    tahunPajak: Number(formData.tahunPajak),
    penghasilanBruto: Number(formData.penghasilanBruto),
    penghasilanNeto: Number(formData.penghasilanNeto),
    ptkp: Number(formData.ptkp),
    pkp: Number(formData.pkp),
    pphTerutang: Number(formData.pphTerutang),
    pphDibayar: Number(formData.pphDibayar),
    kurangBayar: Number(formData.kurangBayar),
    lebihBayar: Number(formData.lebihBayar),
    pphFinal: Number(formData.pphFinal),
    penghasilanBebas: Number(formData.penghasilanBebas),
    jumlahHarta: Number(formData.jumlahHarta),
    jumlahKewajiban: Number(formData.jumlahKewajiban),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    console.log("Data yang dikirim:", formData);
    try {
        const response = await fetch('http://localhost:3002/spt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preparedData),
        });

        if (!response.ok) {
          const responseText = await response.text(); 
console.error("Server response:", responseText);
setMessage({ type: 'error', text: `Gagal menyimpan: ${responseText}` });
            throw new Error('Gagal menyimpan data' + response.statusText);
        }

        setMessage({ type: 'success', text: 'SPT berhasil disimpan!' });
        setFormData({
          npwp: '',
          nama: '',
          tahunPajak: '',
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
          tanggalLapor: ''
      });
    } catch (error) {
        setMessage({ type: 'error', text: error.message });
    }
};


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
          nama: ret.data.firstname + ' ' + ret.data.lastname || ' ',
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
         
          <div className="bg-indigo-900 text-white p-4 rounded-t-lg mb-6">
            <h2 className="text-xl font-bold">Identitas Wajib Pajak</h2>
          </div>
          {renderFields([
            { name: 'npwp', label: 'NPWP', placeholder: '00.000.000.0-000.000' },
            { name: 'nama', label: 'Nama Lengkap'},
            { name: 'tahunPajak', label: 'Tahun Pajak'},
          ])}

          
          <div className="bg-indigo-900 text-white p-4 rounded-t-lg mb-6">
            <h2 className="text-xl font-bold">Pajak Penghasilan</h2>
          </div>
          {renderFields([
            { name: 'penghasilanBruto', label: 'Penghasilan Bruto', type: 'number' },
            { name: 'penghasilanNeto', label: 'Penghasilan Netto', type: 'number' },
            { name: 'ptkp', label: 'PTKP', type: 'number' },
            { name: 'pkp', label: 'PKP', type: 'number' },
            { name: 'pphTerutang', label: 'PPh Terutang', type: 'number' },
            { name: 'pphDibayar', label: 'PPh yang Sudah Dibayar', type: 'number' },
            { name: 'kurangBayar', label: 'PPh Kurang Bayar', type: 'number' },
            { name: 'lebihBayar', label: 'PPh Lebih Bayar', type: 'number' }
          ])}

         
          <div className="bg-indigo-900 text-white p-4 rounded-t-lg mb-6">
            <h2 className="text-xl font-bold">Penghasilan yang Dikenakan PPH Final dan yang Dikecualikan dari Objek Pajak</h2>
          </div>
          {renderFields([
            { name: 'pphFinal', label: 'PPh Final', type: 'number' },
            { name: 'penghasilanBebas', label: 'Penghasilan yang Dikecualikan', type: 'number' }
          ])}

         
          <div className="bg-indigo-900 text-white p-4 rounded-t-lg mb-6">
            <h2 className="text-xl font-bold">Daftar Harta dan Kewajiban</h2>
          </div>
          {renderFields([
            { name: 'jumlahHarta', label: 'Jumlah Harta', type: 'number' },
            { name: 'jumlahKewajiban', label: 'Jumlah Kewajiban', type: 'number' }
          ])}

          
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