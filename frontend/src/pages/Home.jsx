import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Heart, 
  TrendingUp, 
  ChevronUp, 
  MessageCircle, 
  X 
} from 'lucide-react';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const { t } = useLanguage();
  const [activeCardIndex, setActiveCardIndex] = useState(2);
  const [showChat, setShowChat] = useState(true);
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [carouselPosition, setCarouselPosition] = useState(0);

  // Leaders carousel data
  const leaders = [
    {
      id: 1,
      name: 'శ్రీ N.T. రామారావు',
      designation: 'తెలుగుదేశం పార్టీ వ్యవస్థాపకులు',
      image: '/bgimages/Sr ntr Home page photo.jpeg'
    },
    {
      id: 2,
      name: 'శ్రీ నారా చంద్రబాబు నాయుడు',
      designation: 'తెలుగుదేశం పార్టీ జాతీయ అధ్యక్షులు',
      image: '/bgimages/Cbn Home page Image.png'
    },
    {
      id: 3,
      name: 'శ్రీ దామచర్ల ఆంజనేయులు',
      designation: 'మాజీ MLA & మహానేత',
      image: '/bgimages/Aanjaneyalu.png'
    },
    {
      id: 4,
      name: 'దామచర్ల జనార్దన రావు',
      designation: 'MLA-Ongole constituency',
      image: '/bgimages/Damacharla Janardhana Rao.jpg.jpeg'
    }
  ];

  // News carousel data
  const newsItems = [
    {
      id: 1,
      category: 'పార్టీ కార్యక్రమం',
      date: '2025 జులై 15',
      title: 'తెలుగుదేశం పార్టీ మహా సభ',
      description: 'విజయవాడలో జరిగే మహా సభకు అధికారులు సిద్ధం',
      location: 'విజయవాడ',
      image: '/bgimages/news1.webp'
    },
    {
      id: 2,
      category: 'ప్రజా సేవ',
      date: '2025 జులై 14',
      title: 'ప్రజా సేవా కార్యక్రమం',
      description: 'గ్రామీణ ప్రాంతాలలో అభివృద్ధి కార్యక్రమాలు',
      location: 'ప్రకాశం జిల్లా',
      image: '/bgimages/news2.webp'
    },
    {
      id: 3,
      category: 'యువజన సభ',
      date: '2025 జులై 13',
      title: 'యువజన శక్తి సమ్మేళనం',
      description: 'యువతను చైతన్యపరచే కార్యక్రమం',
      location: 'ఒంగోలు',
      image: '/bgimages/news3.webp'
    },
    {
      id: 4,
      category: 'మహిళా సాధికారత',
      date: '2025 జులై 12',
      title: 'మహిళా సాధికారత సదస్సు',
      description: 'మహిళల ఆర్థిక స్వావలంబనకు కార్యక్రమాలు',
      location: 'నెల్లూరు',
      image: '/bgimages/news4.webp'
    },
    {
      id: 5,
      category: 'విద్యాభ్యాస',
      date: '2025 జులై 11',
      title: 'విద్యాభ్యాస కార్యక్రమం',
      description: 'విద్యార్థుల సంక్రమానికి ప్రత్యేక కార్యక్రమాలు',
      location: 'గుంటూరు',
      image: '/bgimages/news1.webp'
    },
    {
      id: 6,
      category: 'ఆరోగ్య సభ',
      date: '2025 జులై 10',
      title: 'ఆరోగ్య సభ సమావేశం',
      description: 'రైతులకు అభివృద్ధి కార్యక్రమాలు',
      location: 'తిరుపతి',
      image: '/bgimages/news2.webp'
    },
    {
      id: 7,
      category: 'ఆరోగ్య సభ',
      date: '2025 జులై 9',
      title: 'సామాజిక సంక్ష్తి కార్యక్రమం',
      description: 'సమాజిక సంక్ష్తి పథకాలు నిర్మాణం',
      location: 'కాకినాడ',
      image: '/bgimages/news3.webp'
    },
    {
      id: 8,
      category: 'స్వచ్ఛల్య కార్యక్రమం',
      date: '2025 జులై 8',
      title: 'స్వచ్ఛల్య కార్యక్రమం',
      description: 'పర్యావరణ స్వచ్ఛల్య కార్యక్రమాలు',
      location: 'హైదరాబాద్',
      image: '/bgimages/news4.webp'
    }
  ];

  // Auto-rotate active card every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate news carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [newsItems.length]);

  return (
    <div className="min-h-screen bg-black text-white relative font-sans overflow-x-hidden w-full">
      
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/bgimages/bg image final.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4B400]/20 via-transparent to-[#FFD54F]/10" />
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between pb-6 md:pb-12">
        
        {/* Leaders Showcase - Static Grid */}
        <section className="py-2 md:py-4 relative w-full flex items-center justify-center px-2 sm:px-4">
          
          {/* Cards Grid */}
          <div className="relative z-10 w-full max-w-[95%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[73%] mx-auto perspective-[1800px]">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-3 md:gap-4 w-full" style={{ transformStyle: 'preserve-3d' }}>
            {leaders.map((leader, index) => {
              const isActive = index === activeCardIndex;
              return (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: 1, 
                    scale: isActive ? 1.05 : 1,
                    translateZ: isActive ? 40 : 0,
                    y: isActive ? -5 : 0,
                    rotateX: isActive ? 0 : -2
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  onClick={() => setActiveCardIndex(index)}
                  className={`cursor-pointer w-full h-[160px] sm:h-[220px] md:h-[340px] lg:h-[380px] rounded-[16px] sm:rounded-[20px] md:rounded-[32px] overflow-hidden relative bg-[#FBF8F2] transition-all duration-500
                    ${isActive 
                      ? 'border-3 sm:border-4 md:border-5 border-[#F4B400] shadow-[0_0_20px_rgba(244,180,0,0.6),0_0_40px_rgba(244,180,0,0.4)] sm:shadow-[0_0_30px_rgba(244,180,0,0.6),0_0_60px_rgba(244,180,0,0.4),0_0_90px_rgba(244,180,0,0.2)] z-20' 
                      : 'border-2 sm:border-3 md:border-4 border-white/50 shadow-[0_10px_25px_rgba(0,0,0,0.18)] sm:shadow-[0_18px_40px_rgba(0,0,0,0.18)] hover:border-[#F4B400]/70 z-10'
                    }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Premium Multi-Layer Glow for Active Card */}
                  {isActive && (
                    <>
                      {/* Outer glow layer 1 */}
                      <motion.div
                        className="absolute inset-0 rounded-[16px] sm:rounded-[20px] md:rounded-[32px] -z-10"
                        animate={{ 
                          boxShadow: [
                            '0 0 30px rgba(244, 180, 0, 0.3)',
                            '0 0 60px rgba(244, 180, 0, 0.5)',
                            '0 0 30px rgba(244, 180, 0, 0.3)'
                          ]
                        }}
                        transition={{ 
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          background: 'radial-gradient(circle at center, rgba(244,180,0,0.15) 0%, transparent 60%)'
                        }}
                      />
                      {/* Outer glow layer 2 - different color */}
                      <motion.div
                        className="absolute inset-0 rounded-[16px] sm:rounded-[20px] md:rounded-[32px] -z-10"
                        animate={{ 
                          boxShadow: [
                            '0 0 25px rgba(255, 213, 79, 0.25)',
                            '0 0 50px rgba(255, 213, 79, 0.4)',
                            '0 0 25px rgba(255, 213, 79, 0.25)'
                          ]
                        }}
                        transition={{ 
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                        style={{
                          background: 'radial-gradient(circle at center, rgba(255,213,79,0.1) 0%, transparent 50%)'
                        }}
                      />
                      {/* Animated border gradient */}
                      <motion.div
                        className="absolute inset-0 rounded-[16px] sm:rounded-[20px] md:rounded-[32px] -z-10"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent, #F4B400, transparent, #FFD54F, transparent)',
                          opacity: 0.3
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      {/* Spotlight effect */}
                      <motion.div
                        className="absolute inset-0 rounded-[16px] sm:rounded-[20px] md:rounded-[32px] -z-10"
                        animate={{
                          background: [
                            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                            'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)'
                          ]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </>
                  )}
                  {/* 3D Depth/Thickness Effect - Side Face */}
                  <div 
                    className="absolute inset-0 rounded-[16px] sm:rounded-[20px] md:rounded-[32px] bg-gradient-to-br from-[#E8E0D0] to-[#D8D0C0] -z-10"
                    style={{ 
                      transform: 'translateZ(-10px)',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
                    }} 
                  />
                  
                  {/* 3D Depth/Thickness Effect - Bottom Face */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-4 sm:h-6 md:h-8 rounded-b-[16px] sm:rounded-b-[20px] md:rounded-b-[32px] bg-gradient-to-b from-[#D8D0C0] to-[#C8C0B0] -z-20"
                    style={{ 
                      transform: 'translateZ(-10px) translateY(6px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
                    }} 
                  />
                  
                  {/* Image Container - photo fills width, cropped at top, no inner box/padding */}
                  <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#F8F5EE] to-[#F6F1E8]" style={{ height: '70%' }}>
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-contain"
                      style={{ objectPosition: 'center top' }}
                    />
                    {/* subtle fade at bottom of image into card body */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#FBF8F2] to-transparent" />
                  </div>

                  {/* Card Content Footer */}
                  <div className="px-1.5 sm:px-2 pt-1 sm:pt-1.5 pb-1 sm:pb-2 text-center flex flex-col items-center justify-center">
                    <h3 className="text-[11px] sm:text-sm md:text-base lg:text-lg font-black text-[#B22222] tracking-tight leading-tight line-clamp-2">
                      {leader.name}
                    </h3>
                    
                    {/* Decorative Divider */}
                    <div className="w-6 sm:w-8 md:w-10 h-[2px] bg-gradient-to-r from-[#F4B400] to-[#FFD54F] rounded-full my-0.5 sm:my-1 md:my-1.5" />

                    <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-semibold text-[#555555] leading-snug line-clamp-2">
                      {leader.designation}
                    </p>
                  </div>
                </motion.div>
              );
            })}
            </div>

            {/* Swipe Scroll Indicator */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col items-center justify-center mt-3 sm:mt-4 gap-1 cursor-pointer group"
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-r from-[#F4B400] to-[#FFD54F] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer"
                title="స్మూత్‌గా పైనకి స్క్రోల్ చేయండి"
              >
                <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <span className="text-[10px] sm:text-xs md:text-xs font-semibold text-gray-200 tracking-wider group-hover:text-amber-400 transition-colors">పైకి స్క్రోల్ చేయండి (Swipe Up)</span>
              <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-300">లేటెస్ట్ న్యూస్ / కార్యక్రమాల సమాచారం</span>
            </div>
          </div>
        </section>

        {/* News Carousel Section - Full Width */}
        <section className="w-full py-4 sm:py-8 md:py-12 mt-2 md:mt-6 bg-gradient-to-b from-[#FFF8E7] to-[#FFF9EB]">
          {/* Section Heading */}
          <div className="text-center mb-3 md:mb-6 px-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-3 md:mb-4">
              {/* Left decorative line */}
              <div className="h-[2px] w-8 sm:w-12 md:w-16 bg-[#D4A017]" />
              
              {/* Diamond ornament */}
              <div className="w-2 h-2 md:w-3 md:h-3 rotate-45 bg-[#D4A017]" />
              
              {/* Main heading */}
              <h2 className="text-[18px] sm:text-[22px] md:text-[30px] lg:text-[34px] font-bold text-[#4A2A1F] leading-[1.2] tracking-normal font-serif">
                మా కార్యక్రమాలు
              </h2>
              
              {/* Diamond ornament */}
              <div className="w-2 h-2 md:w-3 md:h-3 rotate-45 bg-[#D4A017]" />
              
              {/* Right decorative line */}
              <div className="h-[2px] w-8 sm:w-12 md:w-16 bg-[#D4A017]" />
            </div>
            
            {/* Subtitle */}
            <p className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#555555] leading-[1.5]">
              లేటెస్ట్ న్యూస్ / కార్యక్రమాల సమాచారం
            </p>
          </div>
          
          <div className="relative z-10 w-full px-4 sm:px-12 md:px-16 max-w-7xl mx-auto">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1.1}
              centeredSlides={false}
              breakpoints={{
                480: { slidesPerView: 1.4, spaceBetween: 20 },
                640: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 28 }
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                el: '.swiper-pagination',
                clickable: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="pb-12"
            >
              {newsItems.map((news) => (
                <SwiperSlide key={news.id}>
                  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden h-[340px] sm:h-[360px] flex flex-col border border-amber-100 hover:shadow-2xl transition-shadow">
                    {/* 1. Image Section (Fixed Height & Never Shrinks) */}
                    <div className="flex-shrink-0">
                      <div className="px-4 pt-3 pb-2 flex items-center justify-between bg-white">
                        <span className="inline-block px-3 py-1 bg-[#F4B400] text-black text-xs font-bold rounded-full shadow-sm">
                          {news.category}
                        </span>
                        <div className="text-xs font-medium text-gray-500">{news.date}</div>
                      </div>
                      <div className="relative w-full h-[130px] sm:h-[150px] overflow-hidden">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* 2. Content/Text Section (Flexible & Truncated with Ellipsis) */}
                    <div className="p-4 flex-1 min-h-0 flex flex-col overflow-hidden">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 leading-snug line-clamp-1 flex-shrink-0">
                        {news.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 overflow-hidden text-ellipsis">
                        {news.description}
                      </p>
                    </div>

                    {/* 3. Location Section (Fixed & Never Compressed) */}
                    <div className="flex-shrink-0 px-4 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#F4B400] rounded-full flex-shrink-0" />
                      <span className="text-xs font-semibold text-gray-600 truncate">{news.location}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons - repositioned cleanly inside padded boundaries */}
            <button className="swiper-button-prev hidden sm:flex absolute left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl items-center justify-center hover:bg-white hover:scale-105 transition-all text-gray-800 border border-amber-200">
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button className="swiper-button-next hidden sm:flex absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl items-center justify-center hover:bg-white hover:scale-105 transition-all text-gray-800 border border-amber-200">
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            {/* Pagination Container */}
            <div className="swiper-pagination flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6" />
          </div>
        </section>

      </div>

      {/* Floating Customer Help / Chat Assistant Bubble */}
      {showChat && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-end gap-2 sm:gap-3">
          {/* Chat Tooltip Bubble */}
          <div className="relative bg-white text-gray-900 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 px-3 sm:px-4 shadow-2xl border border-gray-200 text-[11px] sm:text-xs font-medium max-w-[160px] sm:max-w-[200px]">
            <button 
              onClick={() => setShowChat(false)}
              className="absolute -top-2 -left-2 bg-gray-200 hover:bg-gray-300 rounded-full p-0.5 text-gray-600"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="font-bold text-gray-800">మీ సమస్యకు మేమున్నాం</p>
            <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">ఇప్పుడే ఫిర్యాదు నమోదు చేయండి.</p>
            
            {/* Bubble Tail */}
            <div className="absolute -right-[13px] bottom-4">
              <svg
                width="20"
                height="30"
                viewBox="0 0 20 30"
                fill="white"
              >
                <path d="M0 0 L20 15 L0 30 Z" />
              </svg>
            </div>
          </div>

          {/* Floating Action Button */}
          <button className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-[#F4B400] to-[#FFD54F] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(244,180,0,0.5),0_0_50px_rgba(244,180,0,0.3)] border-2 sm:border-4 border-white hover:scale-105 transition-transform relative">
            <span className="absolute top-0 right-0 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-red-600 border-2 border-white rounded-full" />
            <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7 text-black fill-black" />
          </button>
        </div>
      )}

      <Footer />

    </div>
  );
};

export default Home;