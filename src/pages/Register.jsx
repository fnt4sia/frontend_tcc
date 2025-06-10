import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import isAuthenticated from "../service/Auth";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated()) navigate("/event");
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://bpwindonesia-be-938071808488.europe-west1.run.app/api/users/",
        formData,
        { withCredentials: true }
      );

      const { accessToken, refreshToken, user } = response.data;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("username", formData.username);
      localStorage.setItem("user_id", user.id);

      navigate("/event");
    } catch (err) {
      console.error("Register error:", err);
      setError("Pendaftaran gagal. Silakan periksa data Anda.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 md:px-12 lg:px-20 xl:px-32 bg-[#FEF5F5]">
      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-xl shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-[#84281B] mb-6 text-center">
          Daftar Akun Baru
        </h1>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Bergabunglah dengan jaringan perempuan profesional dan pemimpin masa
          depan di seluruh Indonesia.
        </p>
        {error && (
          <p className="text-sm text-red-600 text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84281B]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84281B]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84281B]"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#84281B] text-white font-semibold py-3 rounded-lg hover:bg-[#a03a2a] transition-colors"
            >
              Daftar Sekarang
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-[#84281B] font-medium hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
