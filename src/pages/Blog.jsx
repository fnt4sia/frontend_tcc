import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/CustomAxios'; 
import isAuthenticated from '../service/Auth'; 

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchBlogs = async () => {
      try {
        const res = await api.get('/blogs');
        const fakeDate = '13 Maret 2025';
        const formatted = res.data.map((item) => ({
          id: item.id,
          title: item.title,
          excerpt: item.content?.slice(0, 100) + '...',
          image: item.coverImageUrl || item.coverImage,
          date: fakeDate,
        }));
        setPosts(formatted);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col gap-16 px-4 md:px-12 lg:px-20 xl:px-32 py-12">
      <header className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#84281B]">
          Wawasan, Inspirasi, dan Cerita dari Perempuan Hebat Indonesia
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base max-w-2xl mx-auto">
          Temukan berbagai artikel seputar kepemimpinan, pemberdayaan perempuan, hingga isu-isu terkini yang relevan bagi perempuan profesional Indonesia.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden cursor-pointer"
            onClick={() => navigate(`/detail-blog/${post.id}`)}
          >
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4 space-y-2">
              <p className="text-sm text-gray-500">{post.date}</p>
              <h3 className="text-lg font-semibold text-gray-900 leading-snug">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.excerpt}</p>
              <span className="inline-block mt-2 text-sm font-medium text-[#84281B]">Baca</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Blog;