import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin, Clock, Image, Video, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Schedules = () => {
  const { t } = useLanguage();
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Dummy schedules data
  const schedules = [
    {
      id: 1,
      title: 'గ్రామ సదుపాయాల అభివృద్ధి కార్యక్రమం',
      description: 'కొండేపి మండలంలో రోడ్లు, చిన్న కాలువలు మరియు వీధి దీపాల ఏర్పాటు',
      date: '2024-01-15',
      time: '10:00 AM',
      location: 'కొండేపి',
      village: 'కొండేపి',
      mandal: 'కొండేపి',
      status: 'completed',
      content: 'ఈ కార్యక్రమం ద్వారా మన గ్రామంలో 15 కిలోమీటర్ల రోడ్డు నిర్మాణం, 8 చిన్న కాలువల పునరుద్ధరణ మరియు 50 వీధి దీపాల ఏర్పాటు జరిగింది.',
      media: [
        { type: 'image', url: '/images/p1.jpg' },
        { type: 'image', url: '/images/p2.jpg' },
        { type: 'video', url: '/images/p3.jpg' }
      ]
    },
    {
      id: 2,
      title: 'ప్రజా సమస్యల పరిష్కార శిబిరం',
      description: 'ప్రజల సమస్యలను విని పరిష్కరించడానికి ప్రత్యేక శిబిరం నిర్వహణ',
      date: '2024-01-20',
      time: '09:00 AM',
      location: 'ప్రకాశం',
      village: 'ప్రకాశం',
      mandal: 'ప్రకాశం',
      status: 'completed',
      content: 'ఈ శిబిరంలో 200 మంది ప్రజల నుండి వివిధ సమస్యలు స్వీకరించబడ్డాయి.',
      media: [
        { type: 'image', url: '/images/p2.jpg' },
        { type: 'image', url: '/images/p3.jpg' }
      ]
    },
    {
      id: 3,
      title: 'విద్యార్థుల సహాయ నిధి పంపిణీ',
      description: 'ఆర్థికంగా వెనుకబడిన విద్యార్థులకు స్కాలర్‌షిప్‌లు మరియు సహాయ నిధి పంపిణీ',
      date: '2024-02-01',
      time: '11:00 AM',
      location: 'ఒంగోలు',
      village: 'ఒంగోలు',
      mandal: 'ఒంగోలు',
      status: 'upcoming',
      content: '',
      media: []
    }
  ];

  const [newSchedule, setNewSchedule] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    village: '',
    mandal: '',
    media: []
  });

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    console.log('Creating schedule:', newSchedule);
    setShowCreateModal(false);
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map(file => ({
      type: file.type.startsWith('video') ? 'video' : 'image',
      url: URL.createObjectURL(file),
      file
    }));
    setNewSchedule({ ...newSchedule, media: [...newSchedule.media, ...newMedia] });
  };

  const removeMedia = (index) => {
    setNewSchedule({
      ...newSchedule,
      media: newSchedule.media.filter((_, i) => i !== index)
    });
  };

  const nextMedia = () => {
    if (selectedSchedule && currentMediaIndex < selectedSchedule.media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

  const prevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  return (
    <div className="page-transition min-h-screen bg-gradient-gold">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{t('schedules')}</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>{t('addSchedule')}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Schedules Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule) => (
            <motion.div
              key={schedule.id}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedSchedule(schedule)}
              className="glass-card overflow-hidden cursor-pointer"
            >
              {/* Media Preview */}
              {schedule.media.length > 0 ? (
                <div className="relative h-48 bg-gray-200">
                  {schedule.media[0].type === 'image' ? (
                    <img
                      src={schedule.media[0].url}
                      alt={schedule.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <Video className="w-12 h-12 text-white" />
                    </div>
                  )}
                  {schedule.media.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                      +{schedule.media.length - 1}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-primary-yellow/20 to-primary-yellow/5 flex items-center justify-center">
                  <CalendarIcon className="w-12 h-12 text-primary-yellow" />
                </div>
              )}

              <div className="p-4">
                <h3 className="text-lg font-bold text-text-primary mb-2">{schedule.title}</h3>
                <p className="text-text-secondary text-sm mb-3 line-clamp-2">{schedule.description}</p>
                <div className="flex items-center space-x-2 text-text-light text-sm">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(schedule.date).toLocaleDateString('te-IN')}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{schedule.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-text-light text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{schedule.location}</span>
                </div>
                <div className="mt-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    schedule.status === 'completed' ? 'bg-green-100 text-green-800' :
                    schedule.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                    schedule.status === 'upcoming' ? 'bg-purple-100 text-purple-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {t(schedule.status)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Schedule Detail Modal */}
      {selectedSchedule && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSchedule(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Media Carousel */}
              {selectedSchedule.media.length > 0 && (
                <div className="relative h-64 md:h-96 bg-gray-900">
                  {selectedSchedule.media[currentMediaIndex].type === 'image' ? (
                    <img
                      src={selectedSchedule.media[currentMediaIndex].url}
                      alt={selectedSchedule.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <Video className="w-16 h-16 text-white" />
                    </div>
                  )}
                  {selectedSchedule.media.length > 1 && (
                    <>
                      <button
                        onClick={prevMedia}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextMedia}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentMediaIndex + 1} / {selectedSchedule.media.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              <button
                onClick={() => setSelectedSchedule(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-text-primary mb-4">{selectedSchedule.title}</h2>
              <p className="text-text-secondary mb-4">{selectedSchedule.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-primary-yellow" />
                  <span className="text-text-primary">{new Date(selectedSchedule.date).toLocaleDateString('te-IN')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary-yellow" />
                  <span className="text-text-primary">{selectedSchedule.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary-yellow" />
                  <span className="text-text-primary">{selectedSchedule.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-text-primary">{selectedSchedule.village}</span>
                  <span className="text-text-light">•</span>
                  <span className="text-text-primary">{selectedSchedule.mandal}</span>
                </div>
              </div>

              {selectedSchedule.content && (
                <div className="bg-primary-yellow/10 p-4 rounded-xl mb-4">
                  <h3 className="font-bold text-text-primary mb-2">Details</h3>
                  <p className="text-text-secondary">{selectedSchedule.content}</p>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedSchedule.status === 'completed' ? 'bg-green-100 text-green-800' :
                  selectedSchedule.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                  selectedSchedule.status === 'upcoming' ? 'bg-purple-100 text-purple-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {t(selectedSchedule.status)}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Create Schedule Modal */}
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">{t('addSchedule')}</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateSchedule} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">{t('title')}</label>
                  <input
                    type="text"
                    value={newSchedule.title}
                    onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
                    className="glass-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">{t('description')}</label>
                  <textarea
                    value={newSchedule.description}
                    onChange={(e) => setNewSchedule({ ...newSchedule, description: e.target.value })}
                    className="glass-input w-full h-24"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">{t('date')}</label>
                    <input
                      type="date"
                      value={newSchedule.date}
                      onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                      className="glass-input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Time</label>
                    <input
                      type="time"
                      value={newSchedule.time}
                      onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                      className="glass-input w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">{t('location')}</label>
                  <input
                    type="text"
                    value={newSchedule.location}
                    onChange={(e) => setNewSchedule({ ...newSchedule, location: e.target.value })}
                    className="glass-input w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">{t('village')}</label>
                    <input
                      type="text"
                      value={newSchedule.village}
                      onChange={(e) => setNewSchedule({ ...newSchedule, village: e.target.value })}
                      className="glass-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">{t('mandal')}</label>
                    <input
                      type="text"
                      value={newSchedule.mandal}
                      onChange={(e) => setNewSchedule({ ...newSchedule, mandal: e.target.value })}
                      className="glass-input w-full"
                    />
                  </div>
                </div>

                {/* Instagram-like Media Upload */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Upload Photos & Videos</label>
                  <div className="border-2 border-dashed border-primary-yellow/30 rounded-xl p-6 text-center hover:border-primary-yellow/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleMediaUpload}
                      className="hidden"
                      id="media-upload"
                    />
                    <label
                      htmlFor="media-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-primary-yellow/20 rounded-full flex items-center justify-center mb-3">
                        <Plus className="w-8 h-8 text-primary-yellow" />
                      </div>
                      <p className="text-text-primary font-medium">Click to upload</p>
                      <p className="text-text-light text-sm">Images and videos</p>
                    </label>
                  </div>

                  {/* Media Preview */}
                  {newSchedule.media.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {newSchedule.media.map((media, index) => (
                        <div key={index} className="relative aspect-square">
                          {media.type === 'image' ? (
                            <img
                              src={media.url}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                              <Video className="w-6 h-6 text-white" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeMedia(index)}
                            className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-4 pt-4">
                  <button type="submit" className="btn-primary flex-1">
                    {t('save')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn-secondary flex-1"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Schedules;
