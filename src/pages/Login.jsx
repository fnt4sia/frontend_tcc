import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import isAuthenticated from '../service/Auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) navigate('/event');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('https://bpwindonesia-be-938071808488.europe-west1.run.app/api/users/login', {
        username,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('username', username);
      localStorage.setItem('user_id', user.id);

      navigate('/event');
    } catch (err) {
      setError('Login gagal. Periksa kembali username dan password Anda.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 md:px-12 lg:px-20 xl:px-32 bg-[#FEF5F5]">
      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-xl shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-[#84281B] mb-6 text-center">Masuk ke Akun Anda</h1>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Selamat datang kembali! Silakan masuk untuk melanjutkan.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84281B]"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84281B]"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div className="pt-4">
            <button type="submit" className="w-full bg-[#84281B] text-white font-semibold py-3 rounded-lg hover:bg-[#a03a2a] transition-colors">
              Masuk
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Belum punya akun?{' '}
          <Link to="/register" className="text-[#84281B] font-medium hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;