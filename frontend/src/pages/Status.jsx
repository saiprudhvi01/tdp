import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText,
  Trash2,
  Edit3,
  X,
  Play,
  Clock,
  Filter,
  Check,
  Upload,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Eye
} from 'lucide-react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const API_BASE = '/api/statuses';

const Status = ({ isAdmin, isUser }) => {
  const { t } = useLanguage();
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');

  // Story Viewer Modal State
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);

  // Admin Add/Edit Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingStatus, setEditingStatus] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'text' // 'image' | 'video' | 'text'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Initial Sample Statuses (6 Demo Cards)
  const defaultStatuses = [
    {
      _id: 'sample-1',
      title: 'ఒంగోలు నియోజకవర్గ అభివృద్ధి సభ',
      content: 'నేడు ఒంగోలు పట్టణంలో పలు అభివృద్ధి కార్యక్రమాలను ప్రారంభించడం జరిగింది. ప్రజల సంక్షేమమే మా ధ్యేయం.',
      type: 'image',
      mediaUrl: '/bgimages/news1.webp',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      _id: 'sample-2',
      title: 'ప్రజా సమస్యల పరిష్కార వేదిక',
      content: 'కార్యాలయంలో ప్రజల నుండి వినతులను స్వీకరించి, అధికారులతో సమీక్ష నిర్వహించాము.',
      type: 'image',
      mediaUrl: '/bgimages/news2.webp',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
    },
    {
      _id: 'sample-3',
      title: 'ముఖ్యమైన సందేశం',
      content: 'రైతు సోదరులకు శుభవార్త! సాగునీటి ప్రాజెక్టు పనులను వేగవంతం చేయాలని అధికారులను ఆదేశించాము.',
      type: 'text',
      mediaUrl: null,
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      _id: 'sample-4',
      title: 'యువతకు ఉపాధి అవకాశాలు',
      content: 'ఒంగోలు నియోజకవర్గ యువత నైపుణ్యాభివృద్ధి, కొత్త పారిశ్రామిక శిక్షణ కేంద్రం ప్రారంభోత్సవం.',
      type: 'image',
      mediaUrl: '/bgimages/news3.webp',
      createdAt: new Date(Date.now() - 3600000 * 36).toISOString()
    },
    {
      _id: 'sample-5',
      title: 'పట్టణ మౌలిక సదుపాయాల సమీక్ష',
      content: 'రహదారుల విస్తరణ, రక్షిత మంచి నీటి సరఫరా పనుల పురోగతిని క్షేత్రస్థాయిలో పరిశీలించాము.',
      type: 'image',
      mediaUrl: '/bgimages/news4.webp',
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
    },
    {
      _id: 'sample-6',
      title: 'మహిళా సాధికారత & సంక్షేమం',
      content: 'మహిళా స్వయం సహాయక సంఘాల సమావేశంలో పాల్గొని, ఆర్థిక సహాయ పంపిణీ సభలో ప్రసంగించడం జరిగింది.',
      type: 'text',
      mediaUrl: null,
      createdAt: new Date(Date.now() - 3600000 * 60).toISOString()
    }
  ];

  // Fetch Statuses from Backend
  const fetchStatuses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE, { timeout: 4000 });
      if (Array.isArray(res.data) && res.data.length > 0) {
        setStatuses(res.data);
      } else {
        setStatuses(defaultStatuses);
      }
    } catch (err) {
      console.log('Using default status data:', err.message);
      setStatuses(defaultStatuses);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  // Filtered Statuses (guarantee demo statuses if empty)
  const safeStatuses = (Array.isArray(statuses) && statuses.length > 0) ? statuses : defaultStatuses;
  const filteredStatuses = safeStatuses.filter(item => !!item);

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
      if (file.type.startsWith('video/')) {
        setFormData(prev => ({ ...prev, type: 'video' }));
      } else if (file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, type: 'image' }));
      }
    }
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingStatus(null);
    setFormData({ title: '', content: '', type: 'text' });
    setSelectedFile(null);
    setFilePreview(null);
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (status, e) => {
    e.stopPropagation();
    setEditingStatus(status);
    setFormData({
      title: status.title || '',
      content: status.content || '',
      type: status.type || 'text'
    });
    setSelectedFile(null);
    setFilePreview(status.mediaUrl || null);
    setShowModal(true);
  };

  // Handle Delete (Admin Only)
  const handleDeleteStatus = async (statusId, e) => {
    e.stopPropagation();
    if (!window.confirm('ఈ స్టేటస్‌ను ఖచ్చితంగా తొలగించాలనుకుంటున్నారా? (Are you sure you want to delete this status?)')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_BASE}/${statusId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatuses(prev => prev.filter(item => item._id !== statusId));
      alert('స్టేటస్ విజయవంతంగా తొలగించబడింది (Status deleted successfully)');
    } catch (err) {
      setStatuses(prev => prev.filter(item => item._id !== statusId));
    }
  };

  // Handle Form Submission (Admin Create / Edit)
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('adminToken');
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('type', formData.type);
      if (selectedFile) {
        data.append('media', selectedFile);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      };

      if (editingStatus && !editingStatus._id.startsWith('sample-')) {
        const res = await axios.put(`${API_BASE}/${editingStatus._id}`, data, config);
        setStatuses(prev => prev.map(s => s._id === editingStatus._id ? res.data : s));
      } else {
        const res = await axios.post(API_BASE, data, config);
        setStatuses(prev => [res.data, ...prev]);
      }

      setShowModal(false);
      alert(editingStatus ? 'స్టేటస్ నవీకరించబడింది (Status updated)' : 'క్రొత్త స్టేటస్ ప్రచురించబడింది (Status published)');
    } catch (err) {
      console.error('Submit error:', err);
      const mockNew = {
        _id: editingStatus ? editingStatus._id : Date.now().toString(),
        title: formData.title,
        content: formData.content,
        type: formData.type,
        mediaUrl: filePreview || (formData.type === 'image' ? '/bgimages/news1.webp' : null),
        createdAt: new Date().toISOString()
      };

      if (editingStatus) {
        setStatuses(prev => prev.map(s => s._id === editingStatus._id ? mockNew : s));
      } else {
        setStatuses(prev => [mockNew, ...prev]);
      }
      setShowModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-900 pb-12">
      
      {/* Header Banner - Compact Height Viewport Optimization */}
      <div 
        className="relative w-full overflow-hidden shadow-sm border-b border-amber-200/50 bg-no-repeat bg-top bg-cover sm:bg-[length:100%_100%] min-h-[85px] sm:min-h-[110px] md:min-h-[130px] flex items-center mb-3 sm:mb-4"
        style={{ backgroundImage: "url('/bgimages/status_bg_final.png')" }}
      >
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-2 sm:py-3 flex flex-row items-center justify-between gap-2 sm:gap-4 relative z-10">
          <div>
            {isAdmin && (
              <div className="mb-1">
                <span className="px-2 py-0.5 bg-black text-amber-400 rounded-full text-[10px] sm:text-xs font-bold inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  Admin Controls Enabled
                </span>
              </div>
            )}

            <h1 className="text-base sm:text-xl md:text-2xl font-extrabold text-[#3B1F0E] font-serif leading-tight tracking-tight">
              LIVE STATUS UPDATES
            </h1>

            <p className="text-[10px] sm:text-xs font-semibold text-[#5C3C1E] leading-snug mt-0.5">
              దామచర్ల జనార్ధన రావు గారి అధికారిక లేటెస్ట్ స్టేటస్ అప్‌డేట్స్
            </p>
          </div>

          {isAdmin && (
            <div className="flex-shrink-0">
              <button
                onClick={handleOpenAddModal}
                className="flex items-center gap-1 bg-[#3B1F0E] hover:bg-black text-amber-400 font-extrabold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-md transition-all hover:scale-105 cursor-pointer border border-amber-400/30 text-[11px] sm:text-xs z-10"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>కొత్త స్టేటస్ (Add Status)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Status Feed Carousel with Glassmorphism Arrows */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-12 text-center text-gray-500 font-semibold text-xs sm:text-sm">
            లేటెస్ట్ స్టేటస్‌లను లోడ్ చేస్తోంది... (Loading statuses...)
          </div>
        ) : filteredStatuses.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-200">
            <Clock className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-gray-800">ఏమి స్టేటస్‌లు లేవు (No Statuses Found)</h3>
            <p className="text-xs text-gray-500 mt-1">ఎంచుకున్న వర్గంలో ప్రస్తుతం అప్‌డేట్స్ లేవు.</p>
          </div>
        ) : (
          <div className="relative px-2 sm:px-12 status-swiper">
            {/* Glass Yellow Glassmorphism Previous Arrow */}
            <button className="status-swiper-prev absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFF8E7]/90 backdrop-blur-md hover:bg-[#F4B400] text-black border border-[#F4B400]/60 shadow-2xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer">
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>

            {/* Glass Yellow Glassmorphism Next Arrow */}
            <button className="status-swiper-next absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFF8E7]/90 backdrop-blur-md hover:bg-[#F4B400] text-black border border-[#F4B400]/60 shadow-2xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer">
              <ChevronRight className="w-6 h-6 text-black" />
            </button>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                prevEl: '.status-swiper-prev',
                nextEl: '.status-swiper-next',
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="py-3 pb-12"
            >
              {filteredStatuses.map((status, index) => {
                const formattedDate = new Date(status.createdAt).toLocaleDateString('te-IN', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <SwiperSlide key={status._id} className="h-full py-1">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                      onClick={() => setActiveStoryIndex(index)}
                      className="bg-[#FFF9E6]/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#F4B400]/40 flex flex-col group cursor-pointer relative h-[250px] sm:h-[270px] w-full hover:-translate-y-1 hover:bg-[#FFF3D1]/95"
                    >
                      {/* Status Header / Type Badge */}
                      <div className="p-2 flex items-center justify-between bg-[#FFF3D1]/80 backdrop-blur-sm z-10 border-b border-[#F4B400]/20 flex-shrink-0">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-[#F4B400] flex items-center justify-center font-extrabold text-black text-[9px] shadow-sm">
                            TDP
                          </div>
                          <div>
                            <h4 className="text-[10px] sm:text-[11px] font-extrabold text-gray-900 leading-none">దామచర్ల జనార్ధన రావు</h4>
                            <span className="text-[8px] sm:text-[9px] text-gray-600 font-medium">{formattedDate}</span>
                          </div>
                        </div>

                        {/* Admin Action Buttons (Pencil / Trash) */}
                        {isAdmin ? (
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={(e) => handleOpenEditModal(status, e)}
                              className="w-6 h-6 rounded-full bg-white/80 hover:bg-[#F4B400] hover:text-black text-gray-700 flex items-center justify-center transition-colors"
                              title="సవరించు (Edit)"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteStatus(status._id, e)}
                              className="w-6 h-6 rounded-full bg-red-100/80 hover:bg-red-200 text-red-700 flex items-center justify-center transition-colors"
                              title="తొలగించు (Delete)"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <span className="px-2 py-0.5 bg-[#F4B400]/20 text-amber-900 text-[8px] sm:text-[9px] font-extrabold rounded-full uppercase tracking-wider flex items-center gap-1 border border-[#F4B400]/30">
                            <Eye className="w-2.5 h-2.5" />
                            {status.type === 'video' ? 'వీడియో' : status.type === 'image' ? 'ఫోటో' : 'అప్‌డేట్'}
                          </span>
                        )}
                      </div>

                      {/* Status Media Container */}
                      {status.type === 'text' ? (
                        /* Text Status Card */
                        <div className="h-[110px] sm:h-[125px] flex-shrink-0 bg-gradient-to-br from-[#1F1F1F] via-[#2D2200] to-[#4A3B00] p-3 flex flex-col justify-center items-center text-center relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F4B400]/10 rounded-full blur-xl pointer-events-none" />
                          <p className="text-amber-300 text-[11px] sm:text-xs font-bold font-serif leading-relaxed line-clamp-3 relative z-10">
                            "{status.content || status.title}"
                          </p>
                        </div>
                      ) : status.type === 'video' ? (
                        /* Video Status Card */
                        <div className="relative h-[110px] sm:h-[125px] flex-shrink-0 bg-black overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          {status.mediaUrl ? (
                            <video
                              src={status.mediaUrl}
                              className="w-full h-full object-cover opacity-80"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-500">
                              <VideoIcon className="w-8 h-8" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-[#F4B400] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                              <Play className="w-3.5 h-3.5 text-black fill-black ml-0.5" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Image Status Card */
                        <div className="relative h-[110px] sm:h-[125px] flex-shrink-0 bg-gray-100 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                          {status.mediaUrl ? (
                            <img
                              src={status.mediaUrl}
                              alt={status.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                              <ImageIcon className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Status Title & Caption Body */}
                      <div className="p-2.5 flex-1 min-h-0 flex flex-col justify-between bg-[#FFF9E6]/80 backdrop-blur-sm">
                        <div className="overflow-hidden">
                          {status.title && (
                            <h3 className="font-extrabold text-gray-900 text-[11px] sm:text-xs mb-0.5 leading-snug line-clamp-1 flex-shrink-0">
                              {status.title}
                            </h3>
                          )}
                          {status.content && status.type !== 'text' && (
                            <p className="text-[10px] sm:text-[11px] text-gray-700 line-clamp-2 leading-tight">
                              {status.content}
                            </p>
                          )}
                        </div>

                        <div className="mt-1 pt-1 border-t border-[#F4B400]/20 flex items-center justify-between text-[9px] sm:text-[10px] font-extrabold text-amber-900 flex-shrink-0">
                          <span>క్లిక్ చేసి ఫుల్ చూడు (View Full Status)</span>
                          <ChevronRight className="w-3 h-3 text-amber-800" />
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>

      {/* FULL-SCREEN STORY VIEWER MODAL */}
      <AnimatePresence>
        {activeStoryIndex !== null && filteredStatuses[activeStoryIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-md"
            onClick={() => setActiveStoryIndex(null)}
          >
            <div
              className="relative w-full max-w-lg bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Progress / Close Bar */}
              <div className="p-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-30 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#F4B400] text-black font-extrabold flex items-center justify-center text-xs">
                    TDP
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">దామచర్ల జనార్ధన రావు</h4>
                    <span className="text-[10px] text-gray-300">
                      {new Date(filteredStatuses[activeStoryIndex].createdAt).toLocaleTimeString('te-IN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveStoryIndex(null)}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Story Content View Area */}
              <div className="relative min-h-[360px] sm:min-h-[440px] flex items-center justify-center bg-black overflow-hidden">
                {filteredStatuses[activeStoryIndex].type === 'image' && (
                  <img
                    src={filteredStatuses[activeStoryIndex].mediaUrl}
                    alt={filteredStatuses[activeStoryIndex].title}
                    className="w-full h-full object-contain max-h-[60vh]"
                  />
                )}

                {filteredStatuses[activeStoryIndex].type === 'video' && (
                  <video
                    src={filteredStatuses[activeStoryIndex].mediaUrl}
                    controls
                    autoPlay
                    className="w-full h-full max-h-[60vh]"
                  />
                )}

                {filteredStatuses[activeStoryIndex].type === 'text' && (
                  <div className="w-full h-full p-8 bg-gradient-to-br from-[#1A1A1A] via-[#332500] to-[#594400] flex flex-col items-center justify-center text-center">
                    <p className="text-amber-300 text-lg sm:text-xl font-bold font-serif leading-relaxed">
                      "{filteredStatuses[activeStoryIndex].content || filteredStatuses[activeStoryIndex].title}"
                    </p>
                  </div>
                )}
              </div>

              {/* Story Details Footer */}
              <div className="p-4 sm:p-5 bg-gray-900 border-t border-gray-800 text-white">
                {filteredStatuses[activeStoryIndex].title && (
                  <h3 className="text-base sm:text-lg font-bold text-amber-400 mb-1">
                    {filteredStatuses[activeStoryIndex].title}
                  </h3>
                )}
                {filteredStatuses[activeStoryIndex].content && filteredStatuses[activeStoryIndex].type !== 'text' && (
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {filteredStatuses[activeStoryIndex].content}
                  </p>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800">
                  <button
                    disabled={activeStoryIndex === 0}
                    onClick={() => setActiveStoryIndex(prev => prev - 1)}
                    className="flex items-center gap-1 text-xs font-bold text-gray-300 disabled:opacity-30 hover:text-amber-400"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>మునుపటి (Prev)</span>
                  </button>

                  <span className="text-xs text-gray-500 font-bold">
                    {activeStoryIndex + 1} / {filteredStatuses.length}
                  </span>

                  <button
                    disabled={activeStoryIndex === filteredStatuses.length - 1}
                    onClick={() => setActiveStoryIndex(prev => prev + 1)}
                    className="flex items-center gap-1 text-xs font-bold text-gray-300 disabled:opacity-30 hover:text-amber-400"
                  >
                    <span>తరువాత (Next)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN CREATE / EDIT MODAL */}
      <AnimatePresence>
        {isAdmin && showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-amber-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-[#F4B400] text-black px-6 py-4 flex items-center justify-between">
                <h3 className="font-extrabold text-lg font-serif">
                  {editingStatus ? 'స్టేటస్ సవరణ (Edit Status)' : 'కొత్త స్టేటస్ ప్రచురించు (Add New Status)'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmitForm} className="p-6 space-y-4">

                {/* Status Type Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    స్టేటస్ రకం (Content Type)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'image' }))}
                      className={`flex flex-col items-center gap-1 p-3 rounded-2xl border text-xs font-bold transition-all ${formData.type === 'image'
                          ? 'border-[#F4B400] bg-amber-50 text-amber-900'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      <ImageIcon className="w-5 h-5" />
                      <span>Photo Image</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'video' }))}
                      className={`flex flex-col items-center gap-1 p-3 rounded-2xl border text-xs font-bold transition-all ${formData.type === 'video'
                          ? 'border-[#F4B400] bg-amber-50 text-amber-900'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      <VideoIcon className="w-5 h-5" />
                      <span>Video</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'text' }))}
                      className={`flex flex-col items-center gap-1 p-3 rounded-2xl border text-xs font-bold transition-all ${formData.type === 'text'
                          ? 'border-[#F4B400] bg-amber-50 text-amber-900'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      <FileText className="w-5 h-5" />
                      <span>Text Only</span>
                    </button>
                  </div>
                </div>

                {/* Media File Upload Input (Image or Video) */}
                {formData.type !== 'text' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      {formData.type === 'video' ? 'వీడియో ఫైల్ (Upload Video)' : 'ఫోటో ఫైల్ (Upload Photo)'}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 hover:border-amber-400 rounded-2xl p-4 text-center cursor-pointer relative bg-gray-50 transition-colors">
                      <input
                        type="file"
                        accept={formData.type === 'video' ? 'video/*' : 'image/*'}
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {filePreview ? (
                        <div className="relative h-32 w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                          {formData.type === 'video' ? (
                            <video src={filePreview} className="w-full h-full object-cover" />
                          ) : (
                            <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                          )}
                          <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px] rounded-md font-bold">
                            Change File
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-2 text-gray-500">
                          <Upload className="w-8 h-8 text-amber-500 mb-1" />
                          <span className="text-xs font-bold text-gray-700">
                            {formData.type === 'video' ? 'మొబైల్ లేదా సిస్టమ్ నుండి వీడియో ఎంచుకోండి' : 'మొబైల్ లేదా సిస్టమ్ నుండి ఫోటో ఎంచుకోండి'}
                          </span>
                          <span className="text-[10px] text-gray-400 mt-1">MP4, WEBM, JPG, PNG format supported</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Status Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    శీర్షిక (Status Title)
                  </label>
                  <input
                    type="text"
                    required={formData.type !== 'text'}
                    placeholder="ఉదా: ఒంగోలు సభ విశేషాలు"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#F4B400] outline-none text-sm font-medium"
                  />
                </div>

                {/* Status Content / Description */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    వివరాలు / సందేశం (Status Details / Caption)
                  </label>
                  <textarea
                    rows={3}
                    required={formData.type === 'text'}
                    placeholder="స్టేటస్ గురించిన వివరాలు లేదా సందేశం ఇక్కడ రాయండి..."
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#F4B400] outline-none text-sm font-medium"
                  />
                </div>

                {/* Submit Action Buttons */}
                <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    రద్దు చేయి (Cancel)
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-[#F4B400] hover:bg-amber-400 text-black shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {submitting ? (
                      <span>ప్రచురిస్తోంది...</span>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{editingStatus ? 'నవీకరించు (Update)' : 'ప్రచురించు (Publish)'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Status;
