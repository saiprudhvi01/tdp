import { MapPin, Phone, Clock, Share2, Mail, Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#FCFAF6] to-[#F9F6EE] relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[15%]"
        style={{ backgroundImage: "url('/bgimages/footerbg.png')" }}
      />
      
      {/* Background Artwork - Left Side */}
      <div className="absolute left-0 top-0 w-1/3 h-full opacity-[8%] pointer-events-none z-0">
        {/* Political rally crowd with flags */}
        <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-transparent to-transparent" />
        {/* Map outline */}
        <div className="absolute top-10 left-10 w-48 h-32 border-2 border-[#D8B040] rounded-lg opacity-30" />
      </div>

      {/* Background Artwork - Right Side */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-[8%] pointer-events-none z-0">
        {/* Buddha statue */}
        <div className="absolute top-20 right-20 w-24 h-48 bg-gradient-to-b from-[#D8B040] to-transparent rounded-t-full opacity-40" />
        {/* Temple architecture */}
        <div className="absolute bottom-20 right-10 w-32 h-40 bg-gradient-to-t from-[#D8B040] to-transparent opacity-30" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8 px-3 sm:px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Center Logo */}
        <div className="flex justify-center mb-2 sm:mb-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#F4C019] flex items-center justify-center shadow-md">
            {/* Bicycle Icon */}
            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="5.5" cy="17.5" r="3.5" />
              <circle cx="18.5" cy="17.5" r="3.5" />
              <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
            </svg>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-center text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] font-extrabold text-[#1F1F1F] leading-tight font-serif mb-1">
          దామచర్ల జనార్ధన రావు
        </h1>

        {/* Subtitle */}
        <p className="text-center text-[12px] sm:text-[14px] md:text-[16px] font-semibold text-[#B52222] mb-2">
          MLA - నియోజకవర్గం పేరు
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <div className="h-[1.5px] w-[40px] sm:w-[70px] md:w-[100px] bg-[#D8B040]" />
          {/* Diamond ornament */}
          <div className="relative w-[12px] h-[12px] md:w-[14px] md:h-[14px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D8B040] rotate-45" />
          </div>
          <div className="h-[1.5px] w-[40px] sm:w-[70px] md:w-[100px] bg-[#D8B040]" />
        </div>

        {/* Tagline */}
        <p className="text-center text-[11px] sm:text-[13px] md:text-[15px] font-medium text-[#505050] mb-4 md:mb-6">
          మీ ప్రజల, మీ సమస్య, మా బాధ్యత.
        </p>

        {/* Information Section - 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 sm:gap-y-6 md:gap-y-0 gap-x-2 sm:gap-x-4 md:gap-x-0 mb-4 md:mb-6">
          
          {/* Column 1 - MLA Office */}
          <div className="text-center border-b border-r md:border-b-0 border-[#E8E0D0] px-2 sm:px-3 md:px-4 lg:px-6 pb-3 md:pb-0">
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
          <div className="text-center border-b md:border-b-0 md:border-r border-[#E8E0D0] px-2 sm:px-3 md:px-4 lg:px-6 pb-3 md:pb-0">
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
          <div className="text-center border-r border-[#E8E0D0] px-2 sm:px-3 md:px-4 lg:px-6 pt-3 md:pt-0">
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
          <div className="text-center px-2 sm:px-3 md:px-4 lg:px-6 pt-3 md:pt-0">
            <div className="flex flex-col items-center gap-1 mb-1.5 md:mb-2">
              <div className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] md:w-[44px] md:h-[44px] rounded-full bg-[#F5BE18] flex items-center justify-center shadow-sm">
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
              </div>
              <h3 className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-bold text-[#222222]">సోషల్ మీడియా</h3>
            </div>
            <div className="flex items-center justify-center gap-2 mb-1.5">
              {/* Facebook */}
              <svg className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              {/* X (Twitter) */}
              <svg className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="#000000">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              {/* Instagram */}
              <svg className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                <defs>
                  <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F58529" />
                    <stop offset="50%" stopColor="#DD2A7B" />
                    <stop offset="100%" stopColor="#8134AF" />
                  </linearGradient>
                </defs>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              {/* YouTube */}
              <svg className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="#FF0000">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <p className="text-[10px] sm:text-[11px] md:text-[13px] font-medium text-[#505050]">@damacharlajanardhanarao</p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="h-[48px] sm:h-[54px] md:h-[60px] bg-gradient-to-r from-[#EFB51B] via-[#F5C52D] to-[#E7AF17] relative overflow-hidden">
        <div className="relative z-10 h-full flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto text-[10px] sm:text-xs md:text-sm font-medium text-[#222222]">
          <p className="text-center sm:text-left leading-snug">
            © 2025 దామచర్ల జనార్ధన రావు, MLA కార్యాలయం. అన్ని హక్కులు రిజర్వ్ చేయబడినవి.
          </p>
          <div className="flex items-center gap-1.5 mt-0.5 sm:mt-0">
            <Lock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Official Website | Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
