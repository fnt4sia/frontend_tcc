import React, { useEffect, useState } from 'react';
import api from '../service/CustomAxios'; 
import isAuthenticated from '../service/Auth'; 
import { useNavigate } from 'react-router-dom';

const Event = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
  if (!isAuthenticated()) {
    navigate('/login');
    return;
  }

    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        const fakeDate = '20 Agustus 2025'; 
        const formatted = res.data.map((item) => ({
          id: item.id,
          title: item.title,
          subtitle: item.subTitle || '',
          image: item.coverImageUrl || item.coverImage,
          date: item.date || fakeDate,
        }));
        setEvents(formatted);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col gap-16 px-6 md:px-12 lg:px-20 xl:px-32 py-12">
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-[#84281B] mb-6">Acara Mendatang</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow bg-white cursor-pointer"
              onClick={() => window.location.href = `/detail-event/${event.id}`}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{event.date}</p>
                <h3 className="text-lg font-semibold text-red-900 mb-1">{event.title}</h3>
                <p className="text-gray-700 text-sm">{event.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Event;