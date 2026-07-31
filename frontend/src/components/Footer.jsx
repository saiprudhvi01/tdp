import { MapPin, Phone, Clock, Share2, Mail, Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#FAF6ED] relative overflow-hidden text-gray-800 border-t border-[#E8E0D0]">
      {/* Background Image - Responsive compressed artwork background */}
      <div
        className="absolute inset-0 bg-cover sm:bg-[length:100%_100%] bg-center bg-no-repeat opacity-[80%] pointer-events-none"
        style={{ backgroundImage: "url('/bgimages/footerbgfin.png')" }}
      />

      {/* Main Footer Content Container */}
      <div className="relative z-10 pt-6 sm:pt-8 md:pt-10 pb-6 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">

        {/* Center Logo */}
        <div className="flex justify-center mb-2 sm:mb-3">
          <img
            src="/bgimages/tdplogo.png"
            alt="TDP Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain rounded-full shadow-md hover:scale-105 transition-transform"
          />
        </div>

        {/* Main Title */}
        <h1 className="text-center text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] font-extrabold text-[#1F1F1F] leading-tight font-serif mb-1">
          దామచర్ల జనార్ధన రావు
        </h1>

        {/* Subtitle */}
        <p className="text-center text-[12px] sm:text-[14px] md:text-[16px] font-bold text-[#B52222] mb-2">
          MLA - నియోజకవర్గం పేరు
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <div className="h-[1.5px] w-[40px] sm:w-[70px] md:w-[100px] bg-[#D8B040]" />
          <div className="relative w-[12px] h-[12px] md:w-[14px] md:h-[14px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D8B040] rotate-45" />
          </div>
          <div className="h-[1.5px] w-[40px] sm:w-[70px] md:w-[100px] bg-[#D8B040]" />
        </div>

        {/* Tagline */}
        <p className="text-center text-[11px] sm:text-[13px] md:text-[15px] font-medium text-[#505050] mb-6 md:mb-8">
          మీ ప్రజల, మీ సమస్య, మా బాధ్యత.
        </p>

        {/* Information Section - 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 sm:gap-y-8 md:gap-y-0 gap-x-2 sm:gap-x-4 md:gap-x-0 mb-6 md:mb-8">

          {/* Column 1 - MLA Office */}
          <div className="text-center border-b border-r md:border-b-0 border-[#E8E0D0] px-2 sm:px-3 md:px-4 lg:px-6 pb-4 md:pb-0">
            <div className="flex flex-col items-center gap-1 mb-1.5 md:mb-2">
              <div className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] md:w-[44px] md:h-[44px] rounded-full bg-[#F5BE18] flex items-center justify-center shadow-sm">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
              </div>
              <h3 className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-bold text-[#222222]">MLA కార్యాలయం</h3>
            </div>
            <div className="text-[10px] sm:text-[11px] md:text-[13px] text-[#444444] leading-relaxed">
              <p>దామచర్ల జనార్ధన రావు MLA కార్యాలయం,</p>
              <p>నియోజకవర్గం, ప్రకాశం జిల్లా - 523001,</p>
              <p>ఆంధ్రప్రదేశ్, భారత్.</p>
            </div>
          </div>

          {/* Column 2 - Official Contact */}
          <div className="text-center border-b md:border-b-0 md:border-r border-[#E8E0D0] px-2 sm:px-3 md:px-4 lg:px-6 pb-4 md:pb-0">
            <div className="flex flex-col items-center gap-1 mb-1.5 md:mb-2">
              <div className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] md:w-[44px] md:h-[44px] rounded-full bg-[#F5BE18] flex items-center justify-center shadow-sm">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
              </div>
              <h3 className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-bold text-[#222222]">అధికారిక సంప్రదింపు</h3>
            </div>
            <div className="text-[10px] sm:text-[11px] md:text-[13px] text-[#444444] leading-relaxed space-y-1">
              <div className="flex items-center justify-center gap-1.5">
                <Phone className="w-3 h-3 text-black" strokeWidth={1.5} />
                <span>+91 91234 56789</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Phone className="w-3 h-3 text-black" strokeWidth={1.5} />
                <span>+91 91234 56789</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Mail className="w-3 h-3 text-black" strokeWidth={1.5} />
                <span>office@janardhanarao.in</span>
              </div>
            </div>
          </div>

          {/* Column 3 - Office Hours */}
          <div className="text-center border-r border-[#E8E0D0] px-2 sm:px-3 md:px-4 lg:px-6 pt-2 md:pt-0">
            <div className="flex flex-col items-center gap-1 mb-1.5 md:mb-2">
              <div className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] md:w-[44px] md:h-[44px] rounded-full bg-[#F5BE18] flex items-center justify-center shadow-sm">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
              </div>
              <h3 className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-bold text-[#222222]">కార్యాలయ సమయం</h3>
            </div>
            <div className="text-[10px] sm:text-[11px] md:text-[13px] text-[#444444] leading-relaxed">
              <p>సోమ - శని: 10:00 AM - 06:00 PM</p>
              <p>ఆదివారం: సెలవు</p>
            </div>
          </div>

          {/* Column 4 - Social Media */}
          <div className="text-center px-2 sm:px-3 md:px-4 lg:px-6 pt-2 md:pt-0">
            <div className="flex flex-col items-center gap-1 mb-1.5 md:mb-2">
              <div className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] md:w-[44px] md:h-[44px] rounded-full bg-[#F5BE18] flex items-center justify-center shadow-sm">
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
              </div>
              <h3 className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-bold text-[#222222]">సోషల్ మీడియా</h3>
            </div>
            
            {/* Clickable Social Media Links: FB, X, Instagram (No YouTube, No WhatsApp) */}
            <div className="flex items-center justify-center gap-3 mb-2">
              {/* Facebook Link */}
              <a
                href="https://www.facebook.com/JanardhanaRaoDamacharla/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-115 transition-transform cursor-pointer"
                title="Facebook"
              >
                <svg className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* X (Twitter) Link */}
              <a
                href="https://x.com/JanaDamacharla?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-115 transition-transform cursor-pointer"
                title="X (Twitter)"
              >
                <svg className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="#000000">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram Link */}
              <a
                href="https://www.instagram.com/damacharlajanardhan/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-115 transition-transform cursor-pointer"
                title="Instagram"
              >
                <svg className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="url(#instagram-gradient-footer)">
                  <defs>
                    <linearGradient id="instagram-gradient-footer" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F58529" />
                      <stop offset="50%" stopColor="#DD2A7B" />
                      <stop offset="100%" stopColor="#8134AF" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
            <p className="text-[10px] sm:text-[11px] md:text-[13px] font-semibold text-[#505050]">@damacharlajanardhanarao</p>
          </div>
        </div>

        {/* Integrated Copyright Bar - No separate yellow strip */}
        <div className="pt-4 border-t border-[#E8E0D0] flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 gap-2">
          <p className="text-center sm:text-left leading-snug">
            © 2025 దామచర్ల జనార్ధన రావు, MLA కార్యాలయం. అన్ని హక్కులు రిజర్వ్ చేయబడినవి.
          </p>
          <div className="flex items-center gap-1.5 flex-shrink-0 text-gray-700 font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>Official Website | Secured</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
