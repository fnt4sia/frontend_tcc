import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import api from "../service/CustomAxios";
import isAuthenticated from "../service/Auth";

const DetailEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    const checkRSVP = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const res = await api.get("/rsvps");
        const alreadyRegistered = res.data.find(
          (rsvp) => String(rsvp.userId) === String(userId) && String(rsvp.eventId) === String(id)
        );
        setIsRegistered(alreadyRegistered);
      } catch (err) {
        console.error("Error checking RSVP:", err);
      }
    };

    const fetchEvent = async () => {
      try {
        const res = await api.get(`https://bpwindonesia-be-dot-h-02-451302.et.r.appspot.com/api/events/${id}`);
        setEvent(res.data);
        checkRSVP();
      } catch (err) {
        console.error("Failed to fetch event:", err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRSVP = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      await api.post("/rsvps", {
        userId: parseInt(userId),
        eventId: id,
        status: "going",
      });
      window.location.href = "/events";
    } catch (err) {
      console.error("RSVP error:", err);
    }
  };

  if (!event) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FEF5F5] px-4 md:px-12 xl:px-32 py-12">
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left Section: Image and Description */}
        <div className="md:col-span-2">
          <img src={event.coverImage} alt="Event Cover" className="w-full h-auto rounded-xl mb-6 object-cover" />

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#84281B] mb-2">Deskripsi</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{event.description}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug">{event.title}</h1>
            <p className="text-sm text-gray-500 -mt-1">{event.subTitle}</p>

            <div className="flex items-start gap-2 text-sm text-gray-700 mt-4">
              <FaCalendarAlt className="mt-1 text-[#84281B]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <FaClock className="mt-1 text-[#84281B]" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <FaMapMarkerAlt className="mt-1 text-[#84281B]" />
              <span>{event.location}</span>
            </div>

            <button
              className="mt-4 w-full bg-[#84281B] text-white py-2 rounded-full font-semibold hover:bg-[#a03a2a] transition-colors disabled:bg-gray-400"
              onClick={handleRSVP}
              disabled={isRegistered}
            >
              {isRegistered ? "Sudah Terdaftar" : "Daftar Sekarang"}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-base font-semibold mb-2">Hubungi Kami</h3>
            <p className="text-sm text-gray-800 mb-3">bpwindonesia@gmail.com</p>
            <div className="flex gap-4 text-[#84281B]">
              <FaInstagram />
              <FaFacebook />
              <FaLinkedin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailEvent;
