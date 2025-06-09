import React, { useState, useEffect } from 'react';
import api from '../service/CustomAxios';
import axios from 'axios';
import isAuthenticated from '../service/Auth';

const API_BASE = 'https://bpwindonesia-be-v2-938071808488.europe-west1.run.app/api';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const [showModal, setShowModal] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    description: '',
    date: '',
    time: '',
    location: '',
    registrationStart: '',
    registrationEnd: '',
    content: '',
    coverImage: null,
  });

  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);

  const token = localStorage.getItem('access_token');

  const fetchData = async () => {
    try {
      const blogRes = await api.get(`${API_BASE}/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const eventRes = await api.get(`${API_BASE}/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogRes.data);
      setEvents(eventRes.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated() || localStorage.getItem('username') !== 'admin') {
      window.location.href = '/';
    }

    fetchData();
  }, []);

  const openModal = (item = null) => {
    if (item) {
      setFormData({ ...item, coverImage: null });
      setEditingItemId(item.id);
    } else {
      setFormData({
        title: '',
        subTitle: '',
        description: '',
        date: '',
        time: '',
        location: '',
        registrationStart: '',
        registrationEnd: '',
        content: '',
        coverImage: null,
      });
      setEditingItemId(null);
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'coverImage') {
      setFormData({ ...formData, coverImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isBlog = activeTab === 'blog';
    const form = new FormData();

    form.append('title', formData.title);
    if (isBlog) {
      form.append('content', formData.content);
      form.append('authorId', 2);
    } else {
      form.append('subTitle', formData.subTitle);
      form.append('description', formData.description);
      form.append('date', formData.date);
      form.append('time', formData.time);
      form.append('location', formData.location);
      form.append('registrationStart', formData.registrationStart);
      form.append('registrationEnd', formData.registrationEnd);
      form.append('creatorId', 2);
    }
    if (formData.coverImage) {
      form.append('coverImage', formData.coverImage);
    }

    try {
      if (editingItemId) {
        await api.put(`${API_BASE}/${isBlog ? 'blogs' : 'events'}/${editingItemId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await api.post(`${API_BASE}/${isBlog ? 'blogs' : 'events'}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      setShowModal(false);
      fetchData();
      setShowModal(false);
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      await api.delete(`${API_BASE}/${type === 'blog' ? 'blogs' : 'events'}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const list = activeTab === 'blog' ? blogs : events;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white shadow-md h-full p-6">
        <h2 className="text-lg font-bold text-[#84281B] mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => setActiveTab('blog')}
            className={`text-left font-medium px-4 py-2 rounded ${activeTab === 'blog' ? 'bg-[#FEF5F5] text-[#84281B]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            Blog
          </button>
          <button
            onClick={() => setActiveTab('event')}
            className={`text-left font-medium px-4 py-2 rounded ${activeTab === 'event' ? 'bg-[#FEF5F5] text-[#84281B]' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            Event
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#84281B]">
            {activeTab === 'blog' ? 'Manajemen Blog' : 'Manajemen Event'}
          </h1>
          <button
            onClick={() => openModal()}
            className="bg-[#84281B] text-white px-4 py-2 rounded hover:bg-[#a03a2a]"
          >
            + Tambah {activeTab === 'blog' ? 'Blog' : 'Event'}
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-sm font-medium text-gray-700">Gambar</th>
                <th className="py-2 text-sm font-medium text-gray-700">Judul</th>
                <th className="py-2 text-sm font-medium text-gray-700">Tanggal</th>
                {activeTab === 'event' && (
                  <>
                    <th className="py-2 text-sm font-medium text-gray-700">Waktu</th>
                    <th className="py-2 text-sm font-medium text-gray-700">Lokasi</th>
                  </>
                )}
                <th className="py-2 text-sm font-medium text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="py-2">
                    <img src={item.coverImageUrl || item.coverImage} alt="cover" className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-2">{item.title}</td>
                  <td className="py-2 text-gray-600">{item.date}</td>
                  {activeTab === 'event' && (
                    <>
                      <td className="py-2 text-gray-600">{item.time}</td>
                      <td className="py-2 text-gray-600">{item.location}</td>
                    </>
                  )}
                  <td className="py-2">
                    <button onClick={() => openModal(item)} className="text-blue-600 hover:underline mr-4">Edit</button>
                    <button onClick={() => handleDelete(item.id, activeTab)} className="text-red-600 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={activeTab === 'blog' ? 4 : 6} className="text-center py-6 text-sm text-gray-500">
                    Tidak ada data {activeTab === 'blog' ? 'blog' : 'event'}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
              <h2 className="text-lg font-bold mb-4">
                {editingItemId ? 'Edit' : 'Tambah'} {activeTab === 'blog' ? 'Blog' : 'Event'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Judul" className="w-full border rounded px-3 py-2" required />

                <input type="file" name="coverImage" accept="image/*" onChange={handleChange} className="w-full border rounded px-3 py-2"/>

                <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Tanggal" className="w-full border rounded px-3 py-2" />

                {activeTab === 'event' && (
                  <>
                    <input
                      name="subTitle"
                      value={formData.subTitle}
                      onChange={handleChange}
                      placeholder="Sub Judul"
                      className="w-full border rounded px-3 py-2"
                    />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Deskripsi lengkap"
                      className="w-full border rounded px-3 py-2"
                      rows={3}
                    />
                    <input
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      placeholder="Waktu"
                      className="w-full border rounded px-3 py-2"
                    />
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Lokasi"
                      className="w-full border rounded px-3 py-2"
                    />
                    <input
                      type="datetime-local"  // ✅ Changed to datetime
                      name="registrationStart"
                      value={formData.registrationStart}
                      onChange={handleChange}
                      placeholder="Registrasi Mulai"
                      className="w-full border rounded px-3 py-2"
                />
                    <input
                      type="datetime-local"  // ✅ Changed to datetime
                      name="registrationEnd"
                      value={formData.registrationEnd}
                      onChange={handleChange}
                      placeholder="Registrasi Selesai"
                      className="w-full border rounded px-3 py-2"
                />
                  </>
                )}

                {activeTab === 'blog' && (
                  <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Konten Blog" className="w-full border rounded px-3 py-2" rows="4" required />
                )}

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded border">Batal</button>
                  <button type="submit" className="px-4 py-2 rounded bg-[#84281B] text-white">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;