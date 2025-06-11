import React from "react";
import bigLogo from "../../assets/BigLogo.jpg";
import rapatBPW from "../../assets/RapatBPW.png";
import iconTarget from "../../assets/IconTarget.png";

const AboutUs = () => {
  return (
    <div className="flex flex-col gap-16 px-6 md:px-12 lg:px-20 xl:px-32 py-12">
      {/* Section 1: Logo left, text right */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12 px-6">
        <div className="w-full lg:w-1/3">
          <img
            src={bigLogo}
            alt="BPW Indonesia Logo"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-full lg:w-2/3 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#84281B] mb-4">
            Tentang BPW Indonesia
          </h2>
          <p className="text-gray-700 mb-2 text-base md:text-lg">
            Business Professional Women (BPW) Indonesia adalah klub afiliasi
            dari BPW International, jaringan global terkemuka bagi perempuan
            profesional dan pengusaha yang didirikan sejak tahun 1930.
          </p>
          <p className="text-gray-700 mb-2 text-base md:text-lg">
            Dengan kehadiran di lebih dari 100 negara, BPW International
            memberdayakan perempuan untuk mencapai potensi terbaiknya di bidang
            ekonomi, sosial, dan politik.
          </p>
          <p className="text-gray-700 text-base md:text-lg">
            Sebagai anggota BPW Indonesia, kamu akan bergabung dengan komunitas
            dinamis yang berdedikasi untuk memperjuangkan kesetaraan gender,
            mengembangkan kepemimpinan, dan membangun koneksi lintas industri.
          </p>
        </div>
      </section>

      <section className="flex flex-col-reverse lg:flex-row justify-between gap-12 px-6">
        <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-center">
          <img src={iconTarget} alt="Target Icon" className="w-12 h-12" />
          <h2 className="text-2xl md:text-3xl font-semibold text-[#6A1B1A]">
            Misi Kami
          </h2>
          <p className="text-base md:text-lg text-gray-800 leading-relaxed">
            BPW (Business and Professional Women) berkomitmen untuk
            mengembangkan potensi perempuan dalam bidang bisnis, profesi, dan
            kepemimpinan di semua tingkatan. Komitmen ini diwujudkan melalui
            pendekatan yang menyeluruh, mencakup advokasi kesetaraan gender,
            akses terhadap pendidikan berkualitas, pendampingan yang
            berkelanjutan, serta pembentukan jejaring yang inklusif.
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src={rapatBPW}
            alt="BPW Meeting"
            className=" rounded-lg object-cover"
          />
        </div>
      </section>

      <section className="px-6">
        <h3 className="text-3xl md:text-4xl font-bold text-[#84281B] mb-4">
          Sejarah BPW
        </h3>
        <div className="flex flex-col gap-4 text-base md:text-lg text-gray-700">
          <p>
            BPW International didirikan pada tahun 1930 oleh Dr. Lena Madesin
            Phillips di Jenewa, Swiss, yang mengumpulkan perempuan dari enam
            negara pendiri dan negara lainnya. Dr. Phillips menyatakan bahwa
            kesetaraan sejati harus didukung di atas fondasi ekonomi yang
            kuat—visi yang menginspirasi BPW hingga hari ini.
          </p>
          <p>
            Sejak awal berdirinya, BPW telah berkembang menjadi salah satu
            jaringan internasional paling berpengaruh bagi perempuan bisnis dan
            profesional, dengan anggota di lebih dari 100 negara di dunia.
            Komunitas kami mencakup para pemimpin, pengusaha, eksekutif, dan
            profesional dari berbagai industri, untuk mendorong kemajuan
            perempuan di seluruh dunia.
          </p>
          <p>
            Advokasi BPW sangat berakar pada kerja sama dengan Perserikatan
            Bangsa-Bangsa. Kami mendukung pembentukan Komisi Status Perempuan
            (CSW), menerima Sertifikat Utusan Perdamaian PBB pada tahun 1987,
            dan perwakilan kami, Esther Hymer, mendapat pengakuan dari Sekjen
            PBB Kofi Annan pada tahun 1997. Hingga kini, BPW terus berkolaborasi
            dengan badan-badan PBB dan mitra global untuk memastikan suara
            perempuan didengar, hak mereka dilindungi, dan kesempatan mereka
            diperluas — di seluruh dunia.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
