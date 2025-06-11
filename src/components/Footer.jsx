import React from 'react';
import iconLinkedin from '../../assets/IconLinkedin.png';
import iconFacebook from '../../assets/IconFacebook.png';
import iconInstagram from '../../assets/IconInstagram.png';
import logo from '../../assets/Logo.png';

const Footer = () => {
  return (
    <div className="bg-[#FAFAFA] border-t border-gray-200 py-6 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
           <img src={logo} alt="Logo" className="max-w-[180px] w-full"/>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10 w-full max-w-4xl">
          <div>
            <h4 className="font-semibold text-[#84281B] mb-2 text-center md:text-left">Organisasi</h4>
            <ul className="space-y-1 text-gray-700 text-sm text-center md:text-left">
              <li>Tentang Kami</li>
              <li>Sejarah</li>
              <li>Visi Misi</li>
              <li>Tujuan</li>
              <li>Struktur</li>
            </ul>
          </div>          <div>
            <h4 className="font-semibold text-[#84281B] mb-2 text-center md:text-left">Keanggotaan</h4>
            <ul className="space-y-1 text-gray-700 text-sm text-center md:text-left">
              <li>Ketua Umum</li>
              <li>Wakil</li>
              <li>Bendahara</li>
              <li>Sekretaris</li>
              <li>Bergabung</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#84281B] mb-2 text-center md:text-left">Berita</h4>
            <ul className="space-y-1 text-gray-700 text-sm text-center md:text-left">
              <li>Terbaru</li>
              <li>Laporan Acara</li>
              <li>Flyer</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#84281B] mb-2 text-center md:text-left">Hubungi Kami</h4>
            <p className="text-sm text-gray-700 mb-2 text-center md:text-left">bpwindonesia@gmail.com</p>
            <div className="flex gap-3 justify-center md:justify-start">
              <a href="#" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
                <img src={iconLinkedin} alt="LinkedIn" className="w-6 h-6"/>
              </a>
              <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                <img src={iconFacebook} alt="Facebook" className="w-6 h-6"/>
              </a>
              <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <img src={iconInstagram} alt="Instagram" className="w-6 h-6"/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-300 mt-12" />
      <div className="text-center text-xs text-gray-500">
        © 2025 Business and Professional Women Indonesia. All right reserved
      </div>
    </div>
  );
};

export default Footer;
