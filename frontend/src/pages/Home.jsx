import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Youtube, ChevronLeft, ChevronRight, Users, Building2, Award } from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Leaders carousel data
  const leaders = [
    {
      id: 1,
      name: 'ఎన్. చంద్రబాబు నాయుడు',
      designation: 'మాజీ ముఖ్యమంత్రి',
      image: '/bgimages/Cbn Home page Image.png'
    },
    {
      id: 2,
      name: 'దామచర్ల జనార్దన రావు',
      designation: 'శాసనసభ్యులు',
      image: '/bgimages/Damacharla Janardhan.jpeg'
    },
    {
      id: 3,
      name: 'ఎన్.టి.ఆర్',
      designation: 'మాజీ ముఖ్యమంత్రి',
      image: '/bgimages/Sr ntr Home page photo.jpeg'
    },
    {
      id: 4,
      name: 'కల్వకుంట్ల ఆంజనేయులు',
      designation: 'మాజీ మంత్రి',
      image: '/bgimages/Aanjaneyalu.jpeg'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % leaders.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [leaders.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % leaders.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + leaders.length) % leaders.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with reduced brightness */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/bgimages/homenew.png')",
            filter: 'brightness(0.4)'
          }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 w-full">
          {/* Leaders Carousel */}
          <div className="relative mb-8">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative h-80 md:h-96 lg:h-[500px]">
                  <img
                    src={leaders[currentSlide].image}
                    alt={leaders[currentSlide].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-yellow-100/90 to-yellow-50/90 backdrop-blur-sm">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                      {leaders[currentSlide].name}
                    </h2>
                    <div className="inline-block bg-yellow-400 px-4 py-2 rounded-full mb-6">
                      <p className="text-lg md:text-xl font-semibold text-gray-900">
                        {leaders[currentSlide].designation}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/90 hover:bg-yellow-400 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-20"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-900" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/90 hover:bg-yellow-400 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-20"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-900" />
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-3">
              {leaders.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-yellow-400 w-10' : 'bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Slogan Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="bg-yellow-400/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border-4 border-yellow-300">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                -* ప్రజలే దేవుళ్ళు.. సేవే మా లక్ష్యం *-
              </h2>
              <p className="text-lg md:text-xl text-gray-800">
                ప్రజల కోసం ఎల్లప్పుడూ.. ఎప్పటికీ...
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat Box 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl border-4 border-yellow-300 hover:border-yellow-400 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-gray-900" />
                </div>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-2">50,000+</h3>
              <p className="text-lg text-gray-700 text-center font-medium">ప్రజల సేవ</p>
            </motion.div>

            {/* Stat Box 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border-4 border-yellow-300 hover:border-yellow-400 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-gray-900" />
                </div>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-2">100+</h3>
              <p className="text-lg text-gray-700 text-center font-medium">అభివృద్ధి కార్యక్రమాలు</p>
            </motion.div>

            {/* Stat Box 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-xl border-4 border-yellow-300 hover:border-yellow-400 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-gray-900" />
                </div>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-2">15+</h3>
              <p className="text-lg text-gray-700 text-center font-medium">సంవత్సరాల సేవ</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-yellow-200/90 via-yellow-300/85 to-yellow-200/90 backdrop-blur-lg border-t border-primary-yellow/30 py-8 mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo and Party Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">🚲</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">తెలుగుదేశం పార్టీ</h3>
                <p className="text-xs text-gray-600">Telugu Desam Party</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-700 hover:text-primary-yellow transition-colors font-medium">Contact</a>
              <a href="#" className="text-gray-700 hover:text-primary-yellow transition-colors font-medium">About</a>
              <a href="#" className="text-gray-700 hover:text-primary-yellow transition-colors font-medium">Privacy</a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a href="#" className="w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-yellow transition-all duration-300 shadow-md hover:shadow-lg">
                <Facebook className="w-4 h-4 text-gray-700" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-yellow transition-all duration-300 shadow-md hover:shadow-lg">
                <Twitter className="w-4 h-4 text-gray-700" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-yellow transition-all duration-300 shadow-md hover:shadow-lg">
                <Instagram className="w-4 h-4 text-gray-700" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-primary-yellow/20 text-center">
            <p className="text-xs text-gray-600">
              &copy; 2024 Damacharla Janardhana Rao. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
