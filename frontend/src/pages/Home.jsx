import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Completed programs data
  const completedPrograms = [
    {
      id: 1,
      title: 'గ్రామ సదుపాయాల అభివృద్ధి కార్యక్రమం',
      description: 'కొండేపి మండలంలో రోడ్లు, చిన్న కాలువలు మరియు వీధి దీపాల ఏర్పాటు',
      date: '2024-01-15',
      location: 'కొండేపి',
      image: '/images/p1.jpg'
    },
    {
      id: 2,
      title: 'ప్రజా సమస్యల పరిష్కార శిబిరం',
      description: 'ప్రజల సమస్యలను విని పరిష్కరించడానికి ప్రత్యేక శిబిరం నిర్వహణ',
      date: '2024-01-20',
      location: 'ప్రకాశం',
      image: '/images/p2.jpg'
    },
    {
      id: 3,
      title: 'విద్యార్థుల సహాయ నిధి పంపిణీ',
      description: 'ఆర్థికంగా వెనుకబడిన విద్యార్థులకు స్కాలర్‌షిప్‌లు మరియు సహాయ నిధి పంపిణీ',
      date: '2024-01-25',
      location: 'ఒంగోలు',
      image: '/images/p3.jpg'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % completedPrograms.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [completedPrograms.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % completedPrograms.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + completedPrograms.length) % completedPrograms.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Main Content - Leaders Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        {/* Background with crowd */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 to-yellow-50 opacity-50"></div>
        
        {/* Party Flags Background */}
        <div className="absolute left-0 top-0 h-full w-32 opacity-10">
          <div className="h-full flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 bg-primary-yellow rounded-full flex items-center justify-center">
              <span className="text-3xl">🚲</span>
            </div>
            <p className="text-xs text-center text-text-primary writing-mode-vertical">తెలుగుదేశం పార్టీ</p>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-32 opacity-10">
          <div className="h-full flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 bg-primary-yellow rounded-full flex items-center justify-center">
              <span className="text-3xl">🚲</span>
            </div>
            <p className="text-xs text-center text-text-primary writing-mode-vertical">తెలుగుదేశం పార్టీ</p>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Leaders Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <img
              src="/bgimages/leaderhome.jpg"
              alt="Leaders"
              className="w-full h-auto rounded-2xl shadow-2xl border-4 border-primary-yellow/30"
            />
          </motion.div>

          {/* Slogans */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-primary-yellow rounded-2xl p-6 md:p-8 shadow-2xl border-4 border-primary-yellow"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-black mb-4">
                -* ప్రజలే దేవుళ్ళు.. సేవే మా లక్ష్యం *-
              </h2>
              <p className="text-lg md:text-xl text-text-primary">
                ప్రజల కోసం ఎల్లప్పుడూ.. ఎప్పటికీ...
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Completed Programs Carousel */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {t('completedPrograms')}
            </h2>
            <p className="text-text-secondary text-lg">
              {t('ourPrograms')}
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass-card overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative h-64 md:h-96 lg:h-[500px]">
                  <img
                    src={completedPrograms[currentSlide].image}
                    alt={completedPrograms[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Content Side */}
                <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center space-x-2 text-primary-yellow mb-4">
                      <CalendarIcon className="w-5 h-5" />
                      <span className="font-medium">
                        {new Date(completedPrograms[currentSlide].date).toLocaleDateString('te-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                      {completedPrograms[currentSlide].title}
                    </h3>

                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {completedPrograms[currentSlide].description}
                    </p>

                    <div className="flex items-center space-x-2 text-text-light">
                      <MapPin className="w-5 h-5" />
                      <span>{completedPrograms[currentSlide].location}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-primary-yellow rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-text-primary" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-primary-yellow rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-text-primary" />
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {completedPrograms.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-primary-yellow w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
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
