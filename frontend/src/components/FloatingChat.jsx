import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingChat = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/user/login');
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-primary-yellow rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
      style={{
        boxShadow: 'rgba(244, 196, 0, 0.4) 0px 8px 24px'
      }}
    >
      <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-text-primary" />
    </motion.button>
  );
};

export default FloatingChat;
