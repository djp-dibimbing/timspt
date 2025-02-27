import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    gender: '',
    nik: '',
    npwp: ''
  })
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:3001/wp/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      setShowPopup(true);
      setTimeout(() => {
        router.push("/"); // Redirect to index page
      }, 2000);
    } else {
      console.error('Registration failed')
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="User registration page" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-indigo-900 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mt-8">
          <div className="flex items-center justify-center mb-6">
            <Image src="/Logo_djp.png" alt="DJP Logo" width={35} height={35} className="mr-3" />
            <h2 className="text-2xl font-semibold text-center text-yellow-400">Register</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange}
                  placeholder='Enter your first name'
                  className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder='Enter your last name'
                  className="w-full p-2 border rounded-lg" />
              </div>
            </div>
            {['Email', 'Username', 'Password', 'NIK', 'NPWP'].map((field, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700">{field}</label>
                <input
                  type={field === 'Password' ? 'password' : 'text'}
                  name={field.toLowerCase()}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                  placeholder={`Enter your ${field}`}
                  value={formData[field.toLowerCase()]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Register
            </button>
          </form>
          {/* Back to Login Button */}
          <div className="mt-4 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-blue-500 hover:underline"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-green-600">Registration Success!</h2>
            <p className="mt-2">You will be redirected shortly...</p>
          </div>
        </div>
      )}
    </>
  )
}
