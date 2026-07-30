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
  MessageSquare, 
  X
} from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();
  const [activeCardIndex, setActiveCardIndex] = useState(2);
  const [showChat, setShowChat] = useState(true);

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

  // Auto-rotate active card every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative font-sans overflow-x-hidden">
      
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
      <div className="relative z-10 flex flex-col min-h-screen justify-between pb-12">
        
        {/* Leaders Showcase - Static Grid */}
        <section className="py-2 md:py-4 relative w-full flex items-center justify-center px-4">
          
          {/* Cards Grid */}
          <div className="relative z-10 w-full max-w-[73%] mx-auto perspective-[1800px]">
            <div className="grid grid-cols-4 gap-2 md:gap-4 w-full" style={{ transformStyle: 'preserve-3d' }}>
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
                  className={`cursor-pointer w-full h-[280px] sm:h-[300px] md:h-[340px] lg:h-[380px] rounded-[24px] md:rounded-[32px] overflow-hidden relative bg-[#FBF8F2] transition-all duration-500
                    ${isActive 
                      ? 'border-4 md:border-5 border-[#F4B400] shadow-[0_0_30px_rgba(244,180,0,0.6),0_0_60px_rgba(244,180,0,0.4),0_0_90px_rgba(244,180,0,0.2)] z-20' 
                      : 'border-3 md:border-4 border-white/50 shadow-[0_18px_40px_rgba(0,0,0,0.18)] hover:border-[#F4B400]/70 z-10'
                    }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Premium Multi-Layer Glow for Active Card */}
                  {isActive && (
                    <>
                      {/* Outer glow layer 1 */}
                      <motion.div
                        className="absolute inset-0 rounded-[24px] md:rounded-[32px] -z-10"
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
                        className="absolute inset-0 rounded-[24px] md:rounded-[32px] -z-10"
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
                        className="absolute inset-0 rounded-[24px] md:rounded-[32px] -z-10"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent, #F4B400, transparent, #FFD54F, transparent)',
                          opacity: 0.3
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      {/* Spotlight effect */}
                      <motion.div
                        className="absolute inset-0 rounded-[24px] md:rounded-[32px] -z-10"
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
                    className="absolute inset-0 rounded-[24px] md:rounded-[32px] bg-gradient-to-br from-[#E8E0D0] to-[#D8D0C0] -z-10"
                    style={{ 
                      transform: 'translateZ(-10px)',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
                    }} 
                  />
                  
                  {/* 3D Depth/Thickness Effect - Bottom Face */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-6 md:h-8 rounded-b-[24px] md:rounded-b-[32px] bg-gradient-to-b from-[#D8D0C0] to-[#C8C0B0] -z-20"
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
                  <div className="px-2 pt-1.5 pb-2 text-center flex flex-col items-center justify-center">
                    <h3 className="text-sm md:text-base lg:text-lg font-black text-[#B22222] tracking-tight leading-tight">
                      {leader.name}
                    </h3>
                    
                    {/* Decorative Divider */}
                    <div className="w-8 md:w-10 h-[2px] bg-gradient-to-r from-[#F4B400] to-[#FFD54F] rounded-full my-1 md:my-1.5" />

                    <p className="text-[10px] md:text-xs lg:text-sm font-semibold text-[#555555] leading-snug">
                      {leader.designation}
                    </p>
                  </div>
                </motion.div>
              );
            })}
            </div>
          </div>
        </section>

        {/* Stat Widgets & Bottom Action Area */}
        <section className="w-full max-w-6xl mx-auto px-4 md:px-6 mt-1 md:mt-2">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 max-w-2xl">
            
            {/* Stat Glass Box 1 */}
            <div className="bg-white/10 backdrop-blur-md border border-[#F4B400]/30 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center shadow-lg hover:border-[#F4B400]/50 transition-all">
              <div className="flex items-center gap-1.5 md:gap-2 text-[#FFD54F] mb-1">
                <Users className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-[10px] md:text-xs font-semibold tracking-wide text-gray-200">ప్రజా సేవ</span>
              </div>
              <span className="text-xl md:text-2xl font-black text-[#F4B400] tracking-wider">24/7</span>
            </div>

            {/* Stat Glass Box 2 */}
            <div className="bg-white/10 backdrop-blur-md border border-[#F4B400]/30 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center shadow-lg hover:border-[#F4B400]/50 transition-all">
              <div className="flex items-center gap-1.5 md:gap-2 text-[#FFD54F] mb-1">
                <Heart className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-[10px] md:text-xs font-semibold tracking-wide text-gray-200">కట్టుబాటు</span>
              </div>
              <span className="text-xl md:text-2xl font-black text-[#F4B400] tracking-wider">100%</span>
            </div>

            {/* Stat Glass Box 3 */}
            <div className="bg-white/10 backdrop-blur-md border border-[#F4B400]/30 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center shadow-lg hover:border-[#F4B400]/50 transition-all">
              <div className="flex items-center gap-1.5 md:gap-2 text-[#FFD54F] mb-1">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-[10px] md:text-xs font-semibold tracking-wide text-gray-200">మన లక్ష్యం</span>
              </div>
              <span className="text-lg md:text-xl font-bold text-[#F4B400] tracking-wider">ప్రగతి</span>
            </div>

            </div>
          </div>

          {/* Swipe Scroll Indicator */}
          <div className="flex flex-col items-center justify-center mt-6 md:mt-8 gap-1">
            <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-[#F4B400] to-[#FFD54F] text-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <span className="text-[10px] md:text-xs font-medium text-gray-200 tracking-wider">స్వైప్ చేసి చూడండి</span>
            <span className="text-[9px] md:text-[10px] text-gray-300">లేటెస్ట్ న్యూస్ / కార్యక్రమాల సమాచారం</span>
          </div>
        </section>

      </div>

      {/* Floating Customer Help / Chat Assistant Bubble */}
      {showChat && (
        <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
          {/* Chat Tooltip Bubble */}
          <div className="bg-white text-gray-900 rounded-2xl p-3 px-4 shadow-2xl relative border border-gray-200 text-xs font-medium max-w-[200px]">
            <button 
              onClick={() => setShowChat(false)}
              className="absolute -top-2 -left-2 bg-gray-200 hover:bg-gray-300 rounded-full p-0.5 text-gray-600"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="font-bold text-gray-800">మీకు ఎలా సహాయం చేయగలం?</p>
            <p className="text-[11px] text-gray-500 mt-0.5">మాకు మెసేజ్ చేయండి!</p>
          </div>

          {/* Floating Action Button */}
          <button className="w-14 h-14 bg-gradient-to-r from-[#F4B400] to-[#FFD54F] rounded-full flex items-center justify-center shadow-2xl border-2 border-white hover:scale-105 transition-transform relative">
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-600 border-2 border-white rounded-full" />
            <MessageSquare className="w-7 h-7 text-black fill-black" />
          </button>
        </div>
      )}

    </div>
  );
};

export default Home;