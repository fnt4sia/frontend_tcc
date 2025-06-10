import landingPage from '../../assets/Home.png';
import arrowButton from '../../assets/ArrowButton.png';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col gap-12 px-6 md:px-12 lg:px-20 xl:px-32 py-12">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="space-y-6 w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-800 leading-tight">
            Membangun Masa Depan Melalui Kepemimpinan Perempuan
          </h1>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed">
            BPW Indonesia mendorong pertumbuhan, kolaborasi, dan mengasah potensi perempuan dalam mengangkat isu kepemimpinan.
          </p>
          <button className="bg-red-800 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-red-900 transition-colors flex items-center justify-center gap-2 mx-auto lg:mx-0">
            Selengkapnya
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-800 text-base">→</span>
            </div>
          </button>
        </div>
        <div className="w-full lg:w-1/2">
          <img src={landingPage} alt="Landing Page" className="w-full h-auto object-cover rounded-lg" />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="flex flex-col lg:flex-row items-start justify-between gap-12">
        <div className="w-full lg:w-1/2 space-y-4">
          <button className="border border-red-800 text-red-800 px-4 py-1 rounded-full text-sm sm:text-base font-medium hover:bg-red-50 transition-colors">
            Program & Initiatives
          </button>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-800 leading-snug">
            Mendorong perubahan nyata melalui aksi kolaboratif
          </h2>
        </div>
        <div className="w-full lg:w-1/2">
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-light leading-relaxed">
            BPW Indonesia dan BPW International menjalankan berbagai program strategis untuk memperkuat peran perempuan di tingkat lokal hingga global.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section>
        <div className="grid grid-cols-1 gap-6">
          {[
            {
              title: 'Keterlibatan dengan Perserikatan Bangsa-Bangsa (PBB)',
              text: 'Selama lebih dari 65 tahun, BPW memiliki status konsultatif dengan ECOSOC dan secara aktif berpartisipasi dalam mempengaruhi kebijakan melalui perwakilan tetap di kantor pusat dan badan-badan PBB.',
              bg: 'bg-[#FEF5F5]'
            },
            {
              title: 'Koneksi Industri Global',
              text: '',
              bg: 'bg-gray-100'
            },
            {
              title: 'Inisiatif Asia-Pasifik',
              text: '',
              bg: 'bg-gray-100'
            },
            {
              title: 'Proyek Komunitas',
              text: '',
              bg: 'bg-gray-100'
            },
          ].map((item, idx) => (
            <div key={idx} className={`${item.bg} p-6 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition-shadow gap-4`}>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-semibold text-red-900">{item.title}</h3>
                {item.text && <p className="text-gray-600 text-sm sm:text-base lg:text-lg">{item.text}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
