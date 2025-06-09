import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../service/CustomAxios";
import isAuthenticated from "../service/Auth";

const DetailBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    const fetchBlog = async () => {
      try {
        const res = await api.get(
          `https://bpwindonesia-be-938071808488.europe-west1.run.app/api/blogs/${id}`
        );
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to load blog detail:", err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="text-center py-20 text-gray-500">
        Memuat detail blog...
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 xl:px-32 py-12 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        <img
          src={blog.coverImageUrl || blog.coverImage}
          alt={blog.title}
          className="rounded-xl w-full object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold text-[#84281B]">{blog.title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Dipublikasikan oleh Admin
          </p>
        </div>

        <div className="text-gray-700 leading-relaxed space-y-4">
          {blog.content?.split("\n").map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
