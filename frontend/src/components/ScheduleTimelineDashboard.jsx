import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Quote,
  Video,
  Image as ImageIcon,
  Trash2,
  Edit,
  Eye,
  FileText,
  Upload,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ScheduleTimelineDashboard = ({
  schedules = [],
  isAdmin = false,
  onAddSchedule,
  onDeleteSchedule,
  onUpdateStatus,
  onAddContent,
  onAddMediaToSchedule
}) => {
  const { t } = useLanguage();

  // State filters
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedScheduleModal, setSelectedScheduleModal] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [addContentMode, setAddContentMode] = useState(false);
  const [contentText, setContentText] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [expandedMediaId, setExpandedMediaId] = useState(null);

  // Category definitions with colors
  const categories = [
    { key: 'All', label: 'All', color: 'bg-gray-100 text-gray-800' },
    { key: 'Public Meetings', label: 'Public Meetings', color: 'bg-amber-100 text-amber-800' },
    { key: 'Village Visits', label: 'Village Visits', color: 'bg-yellow-100 text-yellow-800' },
    { key: 'Personal', label: 'Personal', color: 'bg-indigo-100 text-indigo-800' },
    { key: 'Events', label: 'Events', color: 'bg-purple-100 text-purple-800' },
    { key: 'Completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { key: 'Upcoming', label: 'Upcoming', color: 'bg-blue-100 text-blue-800' },
    { key: 'Cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ];

  // Helper to get category dot color
  const getCategoryDotColor = (category, status) => {
    if (status === 'completed') return 'bg-emerald-500 border-emerald-200';
    if (status === 'ongoing') return 'bg-amber-500 border-amber-200 shadow-amber-200 animate-pulse';
    if (status === 'cancelled') return 'bg-red-500 border-red-200';
    
    switch (category?.toLowerCase()) {
      case 'public meetings':
      case 'public meeting': return 'bg-[#F5BE18] border-amber-200';
      case 'village visits': return 'bg-amber-600 border-amber-200';
      case 'education': return 'bg-emerald-500 border-emerald-200';
      case 'events': return 'bg-purple-500 border-purple-200';
      case 'government': return 'bg-blue-600 border-blue-200';
      default: return 'bg-amber-500 border-amber-200';
    }
  };

  // Helper to format date
  const formatDateString = (dateObj) => {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  // Date Navigation handlers
  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  // Filtered and Sorted schedules
  const filteredSchedules = useMemo(() => {
    let filtered = schedules.filter((item) => {
      // 1. Strict Date Filter
      if (!item.date) return false;
      const itemDate = new Date(item.date);
      if (
        itemDate.getFullYear() !== selectedDate.getFullYear() ||
        itemDate.getMonth() !== selectedDate.getMonth() ||
        itemDate.getDate() !== selectedDate.getDate()
      ) {
        return false;
      }

      // 2. Category filter
      if (activeCategory !== 'All') {
        if (['Completed', 'Upcoming', 'Cancelled'].includes(activeCategory)) {
          if (item.status?.toLowerCase() !== activeCategory.toLowerCase()) return false;
        } else {
          if (item.category?.toLowerCase() !== activeCategory.toLowerCase()) return false;
        }
      }

      // 3. Status filter
      if (statusFilter !== 'All') {
        if (item.status?.toLowerCase() !== statusFilter.toLowerCase()) return false;
      }

      // 4. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const titleMatch = item.title?.toLowerCase().includes(q);
        const descMatch = item.description?.toLowerCase().includes(q);
        const locMatch = item.location?.toLowerCase().includes(q);
        const vilMatch = item.village?.toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !locMatch && !vilMatch) return false;
      }

      return true;
    });

    // Sort chronologically (earliest to latest based on time)
    filtered.sort((a, b) => {
      const parseTime = (timeStr) => {
        if (!timeStr) return 0;
        const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return 0;
        let [_, h, m, period] = match;
        h = parseInt(h);
        m = parseInt(m);
        if (period.toUpperCase() === 'PM' && h !== 12) h += 12;
        if (period.toUpperCase() === 'AM' && h === 12) h = 0;
        return h * 60 + m;
      };
      return parseTime(a.time) - parseTime(b.time);
    });

    return filtered;
  }, [schedules, activeCategory, statusFilter, searchQuery, selectedDate]);

  // Nearest upcoming schedule for Sidebar
  const upcomingSchedule = useMemo(() => {
    const upcomingList = schedules.filter(s => s.status === 'upcoming' || s.status === 'ongoing');
    if (upcomingList.length === 0) return null;
    return upcomingList[0];
  }, [schedules]);

  // Download schedule as summary text
  const handleDownloadSchedule = () => {
    const textContent = filteredSchedules.map((s, idx) => `
${idx + 1}. ${s.title}
   Date: ${s.date ? new Date(s.date).toLocaleDateString() : 'N/A'} | Time: ${s.time || '09:00 AM'}
   Location: ${s.location || ''} ${s.village ? `(${s.village})` : ''}
   Status: ${s.status}
   Description: ${s.description || ''}
--------------------------------------------------`).join('\n');

    const blob = new Blob([`SCHEDULE SUMMARY\nGenerated on: ${new Date().toLocaleString()}\n\n` + textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Schedule_Export_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Mini Calendar Calculations
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const daysInMonth = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    return { firstDay, totalDays, year, month };
  }, [calendarMonth]);

  const scheduleDatesSet = useMemo(() => {
    const set = new Set();
    schedules.forEach(s => {
      if (s.date) {
        const d = new Date(s.date);
        set.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
      }
    });
    return set;
  }, [schedules]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Hero Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFFCE8] via-[#FFF7D9] to-[#FFE9A6] p-6 sm:p-8 md:p-10 border border-amber-200/70 shadow-sm"
      >
        {/* Background Decorative Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(#F5BE18_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-amber-300 text-xs font-bold text-amber-900 shadow-sm mb-1">
              <CalendarIcon className="w-3.5 h-3.5 text-[#F5BE18]" />
              <span>Official Schedule & Timeline</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] leading-tight">
              కార్యక్రమాలు & పర్యటనలు
            </h1>
            <p className="text-xs sm:text-sm text-gray-700 font-medium max-w-2xl leading-relaxed">
              దామచర్ల జనార్ధన రావు గారి నియోజకవర్గ పర్యటనలు, ప్రజా సమస్యల పరిష్కార కార్యక్రమాలు మరియు ముఖ్యమైన సమావేశాల వివరాలు.
            </p>

            {isAdmin && (
              <div className="pt-2">
                <button
                  onClick={onAddSchedule}
                  className="bg-[#F5BE18] hover:bg-[#E5AF00] text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Schedule</span>
                </button>
              </div>
            )}
          </div>

          {/* MLA Leader Profile Image */}
          <div className="flex-shrink-0 relative">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1.5 bg-gradient-to-tr from-[#F5BE18] via-amber-200 to-white shadow-xl">
              <img
                src="/images/d1.png"
                alt="Damacharla Janardhana Rao"
                className="w-full h-full object-cover rounded-full bg-white border-2 border-white"
                onError={(e) => {
                  e.target.src = '/bgimages/tdplogo.png';
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Date Navigation & Toolbar Controls */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200/80 space-y-4">
        
        {/* Top Controls Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Date Navigator */}
          <div className="flex items-center gap-2 bg-[#FAF9F5] p-1.5 rounded-xl border border-gray-200 w-full md:w-auto justify-between">
            <button
              onClick={handlePrevDay}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-700 transition-all cursor-pointer"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 px-3 font-bold text-xs sm:text-sm text-gray-800">
              <CalendarIcon className="w-4 h-4 text-[#F5BE18]" />
              <span>{formatDateString(selectedDate)}</span>
            </div>

            <button
              onClick={handleNextDay}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-700 transition-all cursor-pointer"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>

          {/* Export Schedule */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={handleDownloadSchedule}
              className="px-3.5 py-2 border border-gray-300 hover:border-[#F5BE18] hover:bg-amber-50 rounded-xl text-xs font-bold text-gray-700 hover:text-amber-900 transition-all inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4 text-[#F5BE18]" />
              <span className="hidden sm:inline">Download Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout (70% Timeline + 30% Right Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Section (70% - Timeline List) */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-black text-[#111111] flex items-center gap-2">
              <span>Timeline Schedule</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                {filteredSchedules.length} Items
              </span>
            </h2>
          </div>

          {/* Timeline Container */}
          {filteredSchedules.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-10 text-center border border-gray-200/80 shadow-sm flex flex-col items-center justify-center space-y-3 min-h-[300px]"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-[#F5BE18] mb-1">
                <CalendarIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">No Schedules Available</h3>
              <p className="text-xs text-gray-500 max-w-sm">
                There are no scheduled events matching your current filters or selected date.
              </p>
              {isAdmin && (
                <button
                  onClick={onAddSchedule}
                  className="bg-[#F5BE18] hover:bg-[#E5AF00] text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all inline-flex items-center gap-2 mt-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Schedule</span>
                </button>
              )}
            </motion.div>
          ) : (
            <div className="relative border-l-2 border-amber-300/80 pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-6 pt-2 pb-4">
              {filteredSchedules.map((item, index) => {
                const scheduleId = item._id || item.id;
                const dotBgClass = getCategoryDotColor(item.category, item.status);
                
                return (
                  <motion.div
                    key={scheduleId || index}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative group"
                  >
                    {/* Timeline Node Circle */}
                    <div className={`absolute -left-[31px] sm:-left-[39px] top-4 w-5 h-5 rounded-full border-4 border-white ${dotBgClass} shadow-md z-10`} />

                    {/* Timeline Card */}
                    <div
                      onClick={() => setSelectedScheduleModal(item)}
                      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden"
                    >
                      {/* Top Bar (Time, Category, Status) */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 border-b border-gray-100 pb-2.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                          <Clock className="w-3.5 h-3.5 text-[#F5BE18]" />
                          <span>{item.time || '09:00 AM - 11:30 AM'}</span>
                          {item.date && (
                            <span className="text-gray-400 font-normal">
                              ({new Date(item.date).toLocaleDateString()})
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {item.category && (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-gray-100 text-gray-700 border border-gray-200">
                              {item.category}
                            </span>
                          )}

                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                            item.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                            item.status === 'ongoing' ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse' :
                            item.status === 'upcoming' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                            'bg-red-100 text-red-800 border border-red-200'
                          }`}>
                            {item.status || 'upcoming'}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-base sm:text-lg font-extrabold text-[#111111] group-hover:text-[#E5A000] transition-colors leading-snug mb-1.5">
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-600 font-medium leading-relaxed mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Location & Details */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100/80 text-xs">
                        <div className="flex items-center gap-1.5 text-gray-600 font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-[#F5BE18] flex-shrink-0" />
                          <span>{item.location || 'కొండేపి'}</span>
                          {item.village && <span className="text-gray-400">({item.village})</span>}
                        </div>

                        {/* Right side: Media button + Admin actions */}
                        <div className="flex items-center gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
                          {/* Media Toggle Button — shows only if media exists */}
                          {(() => {
                            const mediaCount = (item.gallery?.length || 0) + (item.videos?.length || 0) + (item.primaryImage ? 1 : 0);
                            if (mediaCount === 0) return null;
                            return (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedMediaId(expandedMediaId === scheduleId ? null : scheduleId);
                                }}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer border ${
                                  expandedMediaId === scheduleId
                                    ? 'bg-[#F5BE18] text-white border-[#E5AF00] shadow-sm'
                                    : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-[#F5BE18] hover:text-white hover:border-[#E5AF00]'
                                }`}
                              >
                                <ImageIcon className="w-3.5 h-3.5" />
                                <span>Media ({mediaCount})</span>
                              </button>
                            );
                          })()}

                          {/* Admin Action Buttons */}
                          {isAdmin && (
                            <>
                              {item.status === 'upcoming' && onUpdateStatus && (
                                <button
                                  onClick={() => onUpdateStatus(scheduleId, 'ongoing')}
                                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-[11px] transition-all cursor-pointer"
                                >
                                  Mark Ongoing
                                </button>
                              )}
                              {item.status !== 'completed' && onUpdateStatus && (
                                <button
                                  onClick={() => onUpdateStatus(scheduleId, 'completed')}
                                  className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-[11px] transition-all cursor-pointer"
                                >
                                  Mark Completed
                                </button>
                              )}
                              {onDeleteSchedule && (
                                <button
                                  onClick={() => onDeleteSchedule(scheduleId)}
                                  className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                                  title="Delete Schedule"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Inline Media Viewer — expands when Media button is clicked */}
                      <AnimatePresence>
                        {expandedMediaId === scheduleId && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                              {/* Primary Image */}
                              {item.primaryImage && (
                                <div className="rounded-xl overflow-hidden border border-gray-200">
                                  <img
                                    src={`/uploads/${item.primaryImage}`}
                                    alt="Primary"
                                    className="w-full max-h-48 object-cover cursor-zoom-in"
                                    onClick={() => window.open(`/uploads/${item.primaryImage}`, '_blank')}
                                  />
                                </div>
                              )}

                              {/* Gallery Grid */}
                              {item.gallery && item.gallery.length > 0 && (
                                <div>
                                  <p className="text-[11px] font-black text-gray-500 mb-1.5 uppercase tracking-wider">Photos ({item.gallery.length})</p>
                                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                                    {item.gallery.map((filename, idx) => (
                                      <div
                                        key={`card-img-${idx}`}
                                        className="aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-pointer group relative"
                                        onClick={() => window.open(`/uploads/${filename}`, '_blank')}
                                      >
                                        <img
                                          src={`/uploads/${filename}`}
                                          alt={`Photo ${idx + 1}`}
                                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                                          <Eye className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Videos */}
                              {item.videos && item.videos.length > 0 && (
                                <div className="space-y-1.5">
                                  <p className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Videos ({item.videos.length})</p>
                                  {item.videos.map((filename, idx) => (
                                    <div key={`card-vid-${idx}`} className="rounded-xl overflow-hidden border border-gray-200 bg-black">
                                      <video
                                        src={`/uploads/${filename}`}
                                        controls
                                        className="w-full max-h-44 object-contain"
                                        preload="metadata"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Sidebar (30% - Desktop / Stacked below on Tablet & Mobile) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card 1: Nearest Upcoming Schedule */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200/80">
            <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2.5">
              <h3 className="text-sm font-black text-[#111111] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F5BE18]" />
                <span>Next Upcoming Schedule</span>
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {upcomingSchedule ? (
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-amber-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-purple-100 text-purple-800 uppercase">
                    {upcomingSchedule.status || 'Upcoming'}
                  </span>
                  <span className="text-[11px] font-bold text-gray-500">
                    {upcomingSchedule.date ? new Date(upcomingSchedule.date).toLocaleDateString() : ''}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 leading-snug">
                  {upcomingSchedule.title}
                </h4>

                <p className="text-[11px] text-gray-600 line-clamp-2">
                  {upcomingSchedule.description}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-gray-700 font-semibold pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F5BE18]" />
                  <span>{upcomingSchedule.location || 'కొండేపి'}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-gray-500 font-medium">
                No upcoming schedules scheduled right now.
              </div>
            )}
          </div>

          {/* Card 2: Interactive Monthly Mini Calendar */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-[#111111] flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#F5BE18]" />
                <span>Monthly Calendar</span>
              </h3>

              <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                <button
                  onClick={() => {
                    const prev = new Date(calendarMonth);
                    prev.setMonth(prev.getMonth() - 1);
                    setCalendarMonth(prev);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span>{calendarMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>

                <button
                  onClick={() => {
                    const next = new Date(calendarMonth);
                    next.setMonth(next.getMonth() + 1);
                    setCalendarMonth(next);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-gray-500 mb-2">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {Array.from({ length: daysInMonth.firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="py-1.5" />
              ))}

              {Array.from({ length: daysInMonth.totalDays }).map((_, i) => {
                const dayNum = i + 1;
                const cellDate = new Date(daysInMonth.year, daysInMonth.month, dayNum);
                const isToday = new Date().toDateString() === cellDate.toDateString();
                const isSelected = selectedDate.toDateString() === cellDate.toDateString();
                const hasSchedule = scheduleDatesSet.has(`${daysInMonth.year}-${daysInMonth.month}-${dayNum}`);

                return (
                  <button
                    key={`day-${dayNum}`}
                    onClick={() => setSelectedDate(cellDate)}
                    className={`py-1.5 rounded-lg font-bold transition-all relative cursor-pointer ${
                      isSelected
                        ? 'bg-[#F5BE18] text-white shadow-sm'
                        : isToday
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>{dayNum}</span>
                    {hasSchedule && (
                      <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-[#F5BE18]'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 3: Leader Quote Card */}
          <div className="bg-gradient-to-br from-[#FFF9E6] to-[#FFF0C2] rounded-2xl p-5 border border-amber-200/80 shadow-sm relative overflow-hidden">
            <Quote className="w-10 h-10 text-amber-300/40 absolute -right-2 -bottom-2" />
            <div className="relative z-10 space-y-2">
              <span className="text-[11px] font-black text-amber-900 uppercase tracking-wider">
                పౌర సందేశం (Message)
              </span>
              <p className="text-xs text-gray-800 font-semibold leading-relaxed italic">
                "ప్రజా సమస్యల పరిష్కారమే మా మొదటి ప్రాధాన్యత. ప్రతి నియోజకవర్గ పౌరుడికి న్యాయం అందించడం మా బాధ్యత."
              </p>
              <p className="text-[11px] font-extrabold text-[#E5A000] pt-1">
                — దామచర్ల జనార్ధన రావు (MLA)
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Schedule Detail Modal Popup */}
      {selectedScheduleModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedScheduleModal(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase mb-2 inline-block ${
                  selectedScheduleModal.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                  selectedScheduleModal.status === 'ongoing' ? 'bg-amber-100 text-amber-900' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {selectedScheduleModal.status || 'Upcoming'}
                </span>
                <h2 className="text-xl font-black text-[#111111]">{selectedScheduleModal.title}</h2>
              </div>
              <button
                onClick={() => setSelectedScheduleModal(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700">
              <p className="font-medium leading-relaxed">{selectedScheduleModal.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FAF9F5] p-4 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 font-semibold">
                  <Clock className="w-4 h-4 text-[#F5BE18]" />
                  <span>Time: {selectedScheduleModal.time || '09:00 AM'}</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <CalendarIcon className="w-4 h-4 text-[#F5BE18]" />
                  <span>Date: {selectedScheduleModal.date ? new Date(selectedScheduleModal.date).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 font-semibold sm:col-span-2">
                  <MapPin className="w-4 h-4 text-[#F5BE18]" />
                  <span>Location: {selectedScheduleModal.location} {selectedScheduleModal.village ? `(${selectedScheduleModal.village})` : ''}</span>
                </div>
              </div>

              {selectedScheduleModal.content && (
                <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200">
                  <h4 className="font-bold text-amber-900 mb-1">Details & Updates</h4>
                  <p className="text-xs text-gray-800 leading-relaxed">{selectedScheduleModal.content}</p>
                </div>
              )}

              {/* Media Gallery Section */}
              {((selectedScheduleModal.gallery && selectedScheduleModal.gallery.length > 0) ||
                (selectedScheduleModal.videos && selectedScheduleModal.videos.length > 0) ||
                (selectedScheduleModal.primaryImage)) && (
                <div className="space-y-3 pt-1">
                  <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#F5BE18]" />
                    <span>Photos & Videos</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      {(selectedScheduleModal.gallery?.length || 0) + (selectedScheduleModal.videos?.length || 0) + (selectedScheduleModal.primaryImage ? 1 : 0)} files
                    </span>
                  </h4>

                  {/* Primary Image */}
                  {selectedScheduleModal.primaryImage && (
                    <div className="rounded-2xl overflow-hidden border border-gray-200">
                      <img
                        src={`/uploads/${selectedScheduleModal.primaryImage}`}
                        alt="Primary"
                        className="w-full max-h-56 object-cover cursor-zoom-in hover:opacity-95 transition-opacity"
                        onClick={() => window.open(`/uploads/${selectedScheduleModal.primaryImage}`, '_blank')}
                      />
                    </div>
                  )}

                  {/* Gallery Images Grid */}
                  {selectedScheduleModal.gallery && selectedScheduleModal.gallery.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {selectedScheduleModal.gallery.map((filename, idx) => (
                        <div
                          key={`img-${idx}`}
                          className="aspect-square rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 hover:shadow-md transition-all group relative"
                          onClick={() => window.open(`/uploads/${filename}`, '_blank')}
                        >
                          <img
                            src={`/uploads/${filename}`}
                            alt={`Photo ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Videos */}
                  {selectedScheduleModal.videos && selectedScheduleModal.videos.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-600">Videos ({selectedScheduleModal.videos.length})</p>
                      {selectedScheduleModal.videos.map((filename, idx) => (
                        <div key={`vid-${idx}`} className="rounded-2xl overflow-hidden border border-gray-200 bg-black">
                          <video
                            src={`/uploads/${filename}`}
                            controls
                            className="w-full max-h-52 object-contain"
                            preload="metadata"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Admin: Add Media / Content Section */}
              {isAdmin && (
                <div className="pt-3 border-t border-gray-200">
                  {!addContentMode ? (
                    <button
                      onClick={() => setAddContentMode(true)}
                      className="w-full py-2.5 bg-gradient-to-r from-[#F5BE18] to-amber-500 hover:from-[#E5AF00] hover:to-amber-600 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Add Media / Content</span>
                    </button>
                  ) : (
                    <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-gray-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                          <Upload className="w-4 h-4 text-[#F5BE18]" />
                          Add Media / Content
                        </h4>
                        <button
                          onClick={() => {
                            setAddContentMode(false);
                            setContentText('');
                            setMediaFiles([]);
                          }}
                          className="p-1 hover:bg-gray-200 rounded-lg transition-all cursor-pointer"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>

                      {/* Content Text */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Content / Update Text</label>
                        <textarea
                          value={contentText}
                          onChange={(e) => setContentText(e.target.value)}
                          placeholder="Add event updates, details, notes..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-[#F5BE18] transition-colors h-20 resize-none"
                        />
                      </div>

                      {/* Media Upload */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Upload Photos & Videos</label>
                        <div className="border-2 border-dashed border-amber-300/60 rounded-xl p-4 text-center hover:border-[#F5BE18] transition-colors">
                          <input
                            type="file"
                            accept="image/*,video/*"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              const newMedia = files.map(file => ({
                                type: file.type.startsWith('video') ? 'video' : 'image',
                                url: URL.createObjectURL(file),
                                file
                              }));
                              setMediaFiles(prev => [...prev, ...newMedia]);
                            }}
                            className="hidden"
                            id="modal-media-upload"
                          />
                          <label htmlFor="modal-media-upload" className="cursor-pointer flex flex-col items-center gap-1">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                              <Plus className="w-5 h-5 text-[#F5BE18]" />
                            </div>
                            <span className="text-xs font-bold text-gray-700">Click to upload</span>
                            <span className="text-[10px] text-gray-500">Images & Videos</span>
                          </label>
                        </div>

                        {/* Media Preview */}
                        {mediaFiles.length > 0 && (
                          <div className="grid grid-cols-4 gap-2 mt-2">
                            {mediaFiles.map((media, index) => (
                              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                                {media.type === 'image' ? (
                                  <img src={media.url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                    <Video className="w-5 h-5 text-white" />
                                  </div>
                                )}
                                <button
                                  onClick={() => setMediaFiles(prev => prev.filter((_, i) => i !== index))}
                                  className="absolute top-0.5 right-0.5 bg-black/60 text-white p-0.5 rounded-full cursor-pointer"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        onClick={() => {
                          const scheduleId = selectedScheduleModal._id || selectedScheduleModal.id;
                          if (onAddMediaToSchedule) {
                            onAddMediaToSchedule(scheduleId, contentText, mediaFiles);
                          } else if (onAddContent) {
                            onAddContent(scheduleId, contentText, mediaFiles);
                          }
                          setAddContentMode(false);
                          setContentText('');
                          setMediaFiles([]);
                          setSelectedScheduleModal(null);
                        }}
                        disabled={!contentText.trim() && mediaFiles.length === 0}
                        className="w-full py-2 bg-[#F5BE18] hover:bg-[#E5AF00] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-extrabold rounded-xl text-xs transition-all cursor-pointer shadow-sm"
                      >
                        Save Content & Media
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTimelineDashboard;
