import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Heart,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  Grid,
  LayoutGrid,
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
  const [selectedNews, setSelectedNews] = useState(null);
  const topSectionRef = useRef(null);
  const newsSectionRef = useRef(null);

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

  const [completedSchedules, setCompletedSchedules] = useState([]);

  useEffect(() => {
    const fetchCompletedSchedules = async () => {
      try {
        const response = await fetch('/api/schedules');
        if (response.ok) {
          const data = await response.json();
          // Filter completed schedules and sort reverse chronologically
          const completed = data
            .filter(s => s.status === 'completed')
            .sort((a, b) => {
              const dateA = new Date(a.date || a.createdAt);
              const dateB = new Date(b.date || b.createdAt);
              return dateB - dateA;
            });
          setCompletedSchedules(completed);
        }
      } catch (error) {
        console.error('Error fetching schedules for home page:', error);
      }
    };
    fetchCompletedSchedules();
  }, []);

  // Auto-rotate active card every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate news carousel every 4 seconds
  useEffect(() => {
    if (completedSchedules.length === 0) return;
    const interval = setInterval(() => {
      setActiveNewsIndex((prev) => (prev + 1) % completedSchedules.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [completedSchedules.length]);

  const handleChatClick = () => {
    const isAdmin = !!localStorage.getItem('adminToken');
    const isUser = !!localStorage.getItem('userToken');

    if (isAdmin) {
      navigate('/admin/dashboard');
    } else if (isUser) {
      navigate('/user/dashboard');
    } else {
      navigate('/user/login');
    }
  };

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
      <div className="relative z-10 flex flex-col min-h-screen justify-between pb-0 mb-0">

        {/* Leaders Showcase - Static Grid */}
        <section ref={topSectionRef} style={{ scrollMarginTop: '90px' }} className="py-2 md:py-4 relative w-full flex items-center justify-center px-2 sm:px-4">

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

            {/* Swipe Scroll Indicator - Scrolls DOWN to News section */}
            <div
              onClick={() => newsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="flex flex-col items-center justify-center mt-3 sm:mt-4 gap-1 cursor-pointer group"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  newsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-r from-[#F4B400] to-[#FFD54F] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer"
                title="లేటెస్ట్ న్యూస్ వైపు స్క్రోల్ చేయండి"
              >
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
              </button>
              <span className="text-[10px] sm:text-xs md:text-xs font-semibold text-gray-200 tracking-wider group-hover:text-amber-400 transition-colors">కిందికి స్క్రోల్ చేయండి (Scroll Down)</span>
              <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-300">లేటెస్ట్ న్యూస్ / కార్యక్రమాల సమాచారం</span>
            </div>
          </div>
        </section>

        {/* News Carousel Section - Full Width Seamless Connection */}
        <section ref={newsSectionRef} className="w-full py-6 sm:py-8 md:py-10 mt-0 mb-0 bg-gradient-to-b from-[#FFF8E7] to-[#FFF9EB]">
          {/* Section Heading */}
          <div className="text-center mb-4 md:mb-6 px-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-2 md:mb-3">
              {/* Left decorative line */}
              <div className="h-[2px] w-8 sm:w-12 md:w-16 bg-[#D4A017]" />

              {/* Diamond ornament */}
              <div className="w-2 h-2 md:w-3 md:h-3 rotate-45 bg-[#D4A017]" />

              {/* Main heading */}
              <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[36px] font-bold text-[#4A2A1F] leading-[1.2] tracking-normal font-serif">
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

          <div 
            className={`relative z-10 w-full px-4 sm:px-12 md:px-16 mx-auto ${
              completedSchedules.length === 1 ? 'max-w-[480px]' :
              completedSchedules.length === 2 ? 'max-w-[880px]' :
              'max-w-7xl'
            }`}
          >
            {/* Swiper Carousel View */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={Math.min(1.1, completedSchedules.length || 1)}
              centeredSlides={false}
              breakpoints={{
                480: { slidesPerView: Math.min(1.4, completedSchedules.length || 1), spaceBetween: 20 },
                640: { slidesPerView: Math.min(2, completedSchedules.length || 1), spaceBetween: 24 },
                1024: { slidesPerView: Math.min(3, completedSchedules.length || 1), spaceBetween: 28 }
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
              {completedSchedules.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-medium">
                  ప్రస్తుతం పూర్తి అయిన కార్యక్రమాలు లేవు.
                </div>
              ) : (
                completedSchedules.map((schedule) => {
                  const hasMedia = schedule.primaryImage || (schedule.gallery && schedule.gallery.length > 0) || (schedule.videos && schedule.videos.length > 0);
                  const displayImage = schedule.primaryImage
                    ? `/uploads/${schedule.primaryImage}`
                    : (schedule.gallery && schedule.gallery.length > 0)
                      ? `/uploads/${schedule.gallery[0]}`
                      : '/bgimages/tdplogo.png';

                  return (
                    <SwiperSlide key={schedule._id || schedule.id} className="h-full py-1">
                      <div
                        onClick={() => setSelectedNews(schedule)}
                        className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden h-[340px] sm:h-[360px] flex flex-col border border-amber-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer w-full"
                      >
                        {/* 1. Image Section (Fixed Height & Never Shrinks) */}
                        <div className="flex-shrink-0 relative">
                          <div className="px-4 pt-3 pb-2 flex items-center justify-between bg-white border-b border-gray-100">
                            <span className="inline-block px-3 py-1 bg-[#F4B400] text-black text-[11px] sm:text-xs font-black rounded-full shadow-sm truncate max-w-[150px]">
                              {schedule.category || 'Event'}
                            </span>
                            <div className="text-[11px] font-semibold text-gray-500">
                              {schedule.date ? new Date(schedule.date).toLocaleDateString() : ''}
                            </div>
                          </div>
                          <div className={`relative w-full h-[140px] sm:h-[155px] flex-shrink-0 overflow-hidden bg-gray-50 ${!hasMedia ? 'p-4 flex items-center justify-center' : ''}`}>
                            <img
                              src={displayImage}
                              alt={schedule.title}
                              className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${hasMedia ? 'object-cover' : 'object-contain opacity-40'}`}
                            />
                            {schedule.videos && schedule.videos.length > 0 && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-gray-800 shadow-lg">
                                  ▶
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 2. Content/Text Section (Strict Clamped Limits & Shrinks gracefully) */}
                        <div className="p-3.5 sm:p-4 flex-1 min-h-0 flex flex-col justify-between overflow-hidden bg-white">
                          <div className="overflow-hidden">
                            <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 mb-1 leading-snug line-clamp-1 flex-shrink-0">
                              {schedule.title}
                            </h3>
                            <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed line-clamp-2 overflow-hidden text-ellipsis">
                              {schedule.content || schedule.description}
                            </p>
                          </div>

                          {/* 3. View Full Action Link & Location Footer */}
                          <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-extrabold text-amber-900 flex-shrink-0">
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-[#F4B400] rounded-full flex-shrink-0" />
                              <span className="text-gray-600 truncate max-w-[110px] sm:max-w-[140px]">{schedule.location || schedule.village || 'N/A'}</span>
                            </span>
                            <span className="flex items-center gap-1 text-[#B22222] hover:underline font-black">
                              పూర్తి సమాచారం (View Full) <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })
              )}
            </Swiper>

            {/* Custom Navigation Buttons */}
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

      {/* Full News Detail Modal Popup */}
      {selectedNews && (
        <div
          onClick={() => setSelectedNews(null)}
          className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full border border-amber-300 relative my-auto max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-3 right-3 z-20 w-9 h-9 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Media */}
            {selectedNews.primaryImage && (
              <div className="relative w-full h-[220px] sm:h-[300px] bg-black flex-shrink-0">
                <img
                  src={`/uploads/${selectedNews.primaryImage}`}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#F4B400] text-black font-black text-xs rounded-full shadow-md">
                    {selectedNews.category || 'Event'}
                  </span>
                  <span className="px-3 py-1 bg-black/70 text-white font-semibold text-xs rounded-full backdrop-blur-sm">
                    {selectedNews.date ? new Date(selectedNews.date).toLocaleDateString() : ''}
                  </span>
                </div>
              </div>
            )}

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-800 mb-2">
                  <span className="w-2.5 h-2.5 bg-[#F4B400] rounded-full" />
                  <span>{selectedNews.location || selectedNews.village || 'N/A'}</span>
                  {selectedNews.time && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span>{selectedNews.time}</span>
                    </>
                  )}
                </div>
                <h2 className="text-lg sm:text-2xl font-black text-gray-900 mb-3 leading-snug">
                  {selectedNews.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium whitespace-pre-line mb-4">
                  {selectedNews.description}
                </p>
                {selectedNews.content && selectedNews.content !== selectedNews.description && (
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line border-t border-gray-100 pt-3">
                    {selectedNews.content}
                  </p>
                )}
              </div>

              {/* Gallery */}
              {selectedNews.gallery && selectedNews.gallery.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Photos</h4>
                  <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
                    {selectedNews.gallery.map((img, idx) => (
                      <img
                        key={idx}
                        src={`/uploads/${img}`}
                        alt={`Gallery ${idx}`}
                        className="h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-xl snap-center flex-shrink-0 cursor-zoom-in"
                        onClick={() => window.open(`/uploads/${img}`, '_blank')}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Videos */}
              {selectedNews.videos && selectedNews.videos.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Videos</h4>
                  <div className="flex flex-col gap-3">
                    {selectedNews.videos.map((vid, idx) => (
                      <video
                        key={idx}
                        src={`/uploads/${vid}`}
                        controls
                        className="w-full max-h-64 object-contain bg-black rounded-xl"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <Footer />

    </div>
  );
};

export default Home;