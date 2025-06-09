import { Link, useNavigate} from 'react-router-dom';
import React, { useEffect } from 'react';
import isAuthenticated from '../service/Auth';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) navigate('/event');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 md:px-12 lg:px-20 xl:px-32 bg-[#FEF5F5]">
      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-xl shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-[#84281B] mb-6 text-center">Daftar Akun Baru</h1>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Bergabunglah dengan jaringan perempuan profesional dan pemimpin masa depan di seluruh Indonesia.
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84281B]" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84281B]" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84281B]" />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-[#84281B] text-white font-semibold py-3 rounded-lg hover:bg-[#a03a2a] transition-colors">
              Daftar Sekarang
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-[#84281B] font-medium hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;