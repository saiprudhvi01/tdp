import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MessageSquare, 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Home,
  Upload,
  X
} from 'lucide-react';

const AdminDashboard = ({ setIsAdmin }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('schedules');
  const [showAddSchedule, setShowAddSchedule] = useState(false);

  // Dummy data with all fields
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      title: 'గ్రామ సదుపాయాల అభివృద్ధి కార్యక్రమం',
      description: 'కొండేపి మండలంలో రోడ్లు, చిన్న కాలువలు మరియు వీధి దీపాల ఏర్పాటు',
      date: '2024-01-15',
      location: 'కొండేపి',
      village: 'కొండేపి',
      mandal: 'కొండేపి',
      status: 'completed',
      isPermanent: true,
      content: 'ఈ కార్యక్రమం ద్వారా మన గ్రామంలో 15 కిలోమీటర్ల రోడ్డు నిర్మాణం, 8 చిన్న కాలువల పునరుద్ధరణ మరియు 50 వీధి దీపాల ఏర్పాటు జరిగింది.',
      gallery: ['/images/p1.jpg', '/images/p2.jpg'],
      videos: []
    },
    {
      id: 2,
      title: 'ప్రజా సమస్యల పరిష్కార శిబిరం',
      description: 'ప్రజల సమస్యలను విని పరిష్కరించడానికి ప్రత్యేక శిబిరం నిర్వహణ',
      date: '2024-01-20',
      location: 'ప్రకాశం',
      village: 'ప్రకాశం',
      mandal: 'ప్రకాశం',
      status: 'completed',
      isPermanent: false,
      content: 'ఈ శిబిరంలో 200 మంది ప్రజల నుండి వివిధ సమస్యలు స్వీకరించబడ్డాయి. వాటిలో 150 సమస్యలకు పరిష్కారం అందించబడింది.',
      gallery: ['/images/p2.jpg', '/images/p3.jpg'],
      videos: []
    },
    {
      id: 3,
      title: 'విద్యార్థుల సహాయ నిధి పంపిణీ',
      description: 'ఆర్థికంగా వెనుకబడిన విద్యార్థులకు స్కాలర్‌షిప్‌లు మరియు సహాయ నిధి పంపిణీ',
      date: '2024-02-01',
      location: 'ఒంగోలు',
      village: 'ఒంగోలు',
      mandal: 'ఒంగోలు',
      status: 'upcoming',
      isPermanent: true,
      content: '',
      gallery: [],
      videos: []
    }
  ]);

  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('/api/complaints');
      if (response.ok) {
        const data = await response.json();
        setComplaints(data);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const [newSchedule, setNewSchedule] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    village: '',
    mandal: '',
    status: 'upcoming',
    isPermanent: false,
    content: ''
  });

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showAddContent, setShowAddContent] = useState(false);
  const [scheduleContent, setScheduleContent] = useState({
    content: '',
    gallery: [],
    videos: []
  });
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [complaintResponse, setComplaintResponse] = useState('');
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    subject: '',
    description: '',
    category: 'other',
    village: '',
    userName: 'Admin'
  });

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setIsAdmin(false);
    navigate('/');
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const schedule = {
      id: schedules.length + 1,
      ...newSchedule,
      gallery: [],
      videos: []
    };
    setSchedules([...schedules, schedule]);
    setNewSchedule({
      title: '',
      description: '',
      date: '',
      location: '',
      village: '',
      mandal: '',
      status: 'upcoming',
      isPermanent: false,
      content: ''
    });
    setShowAddSchedule(false);
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const handleUpdateStatus = (id, newStatus) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, status: newStatus } : s
    ));
  };

  const handleAddContent = (scheduleId) => {
    setSelectedSchedule(scheduleId);
    setShowAddContent(true);
  };

  const handleSaveContent = (e) => {
    e.preventDefault();
    setSchedules(schedules.map(s => 
      s.id === selectedSchedule ? { 
        ...s, 
        content: scheduleContent.content || s.content,
        gallery: [...(s.gallery || []), ...(scheduleContent.gallery || [])],
        videos: [...(s.videos || []), ...(scheduleContent.videos || [])]
      } : s
    ));
    setShowAddContent(false);
    setScheduleContent({ content: '', gallery: [], videos: [] });
    setSelectedSchedule(null);
  };

  const handleUpdateComplaintStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/complaints/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setComplaints(complaints.map(c => 
          (c._id === id || c.id === id) ? { ...c, status } : c
        ));
      }
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  const handleRespondToComplaint = (complaintId) => {
    const complaint = complaints.find(c => c._id === complaintId || c.id === complaintId);
    setSelectedComplaint(complaintId);
    setComplaintResponse(complaint?.response || '');
    setShowResponseModal(true);
  };

  const handleSaveResponse = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    const respondedAt = new Date().toISOString().split('T')[0];

    try {
      const apiRes = await fetch(`/api/complaints/${selectedComplaint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: complaintResponse,
          respondedAt,
          status: 'resolved'
        }),
      });

      if (apiRes.ok) {
        const updatedComplaint = await apiRes.json();
        setComplaints(complaints.map(c => 
          (c._id === selectedComplaint || c.id === selectedComplaint) ? updatedComplaint : c
        ));
      }
    } catch (error) {
      console.error('Error saving complaint response:', error);
    }

    setShowResponseModal(false);
    setComplaintResponse('');
    setSelectedComplaint(null);
  };

  const handleAddComplaint = (e) => {
    e.preventDefault();
    const complaint = {
      id: complaints.length + 1,
      userId: 'admin',
      ...newComplaint,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      response: '',
      respondedAt: ''
    };
    setComplaints([...complaints, complaint]);
    setNewComplaint({
      subject: '',
      description: '',
      category: 'other',
      village: '',
      userName: 'Admin'
    });
    setShowNewComplaint(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-purple-100 text-purple-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-gold">

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-card p-6 text-center"
          >
            <Calendar className="w-8 h-8 text-primary-yellow mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">{schedules.length}</p>
            <p className="text-text-secondary text-sm">{t('schedules')}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-card p-6 text-center"
          >
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">
              {schedules.filter(s => s.status === 'completed').length}
            </p>
            <p className="text-text-secondary text-sm">{t('completed')}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-card p-6 text-center"
          >
            <MessageSquare className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">{complaints.length}</p>
            <p className="text-text-secondary text-sm">{t('complaints')}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-card p-6 text-center"
          >
            <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">1,234</p>
            <p className="text-text-secondary text-sm">Users</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('schedules')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'schedules'
                ? 'bg-primary-yellow text-text-primary'
                : 'bg-white/50 text-text-secondary hover:bg-white'
            }`}
          >
            {t('manageSchedules')}
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'complaints'
                ? 'bg-primary-yellow text-text-primary'
                : 'bg-white/50 text-text-secondary hover:bg-white'
            }`}
          >
            {t('manageComplaints')}
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'schedules' && (
            <motion.div
              key="schedules"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-text-primary">{t('schedules')}</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddSchedule(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>{t('addSchedule')}</span>
                </motion.button>
              </div>

              {/* Add Schedule Form */}
              <AnimatePresence>
                {showAddSchedule && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="glass-card p-6 mb-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-text-primary">{t('addSchedule')}</h3>
                      <button
                        onClick={() => setShowAddSchedule(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form onSubmit={handleAddSchedule} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          {t('title')}
                        </label>
                        <input
                          type="text"
                          value={newSchedule.title}
                          onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
                          className="glass-input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          {t('description')}
                        </label>
                        <textarea
                          value={newSchedule.description}
                          onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})}
                          className="glass-input w-full h-24"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            {t('date')}
                          </label>
                          <input
                            type="date"
                            value={newSchedule.date}
                            onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                            className="glass-input w-full"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            {t('location')}
                          </label>
                          <input
                            type="text"
                            value={newSchedule.location}
                            onChange={(e) => setNewSchedule({...newSchedule, location: e.target.value})}
                            className="glass-input w-full"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            {t('village')}
                          </label>
                          <input
                            type="text"
                            value={newSchedule.village}
                            onChange={(e) => setNewSchedule({...newSchedule, village: e.target.value})}
                            className="glass-input w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            {t('mandal')}
                          </label>
                          <input
                            type="text"
                            value={newSchedule.mandal}
                            onChange={(e) => setNewSchedule({...newSchedule, mandal: e.target.value})}
                            className="glass-input w-full"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          {t('status')}
                        </label>
                        <select
                          value={newSchedule.status}
                          onChange={(e) => setNewSchedule({...newSchedule, status: e.target.value})}
                          className="glass-input w-full"
                        >
                          <option value="upcoming">{t('upcoming')}</option>
                          <option value="ongoing">{t('ongoing')}</option>
                          <option value="completed">{t('completed')}</option>
                          <option value="cancelled">{t('cancelled')}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Content (After Completion)
                        </label>
                        <textarea
                          value={newSchedule.content}
                          onChange={(e) => setNewSchedule({...newSchedule, content: e.target.value})}
                          className="glass-input w-full h-20"
                          placeholder="Add detailed content after schedule completion..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          {t('uploadImage')}
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          className="glass-input w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Upload Videos
                        </label>
                        <input
                          type="file"
                          accept="video/*"
                          multiple
                          className="glass-input w-full"
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={newSchedule.isPermanent}
                            onChange={(e) => setNewSchedule({...newSchedule, isPermanent: e.target.checked})}
                            className="w-5 h-5 rounded"
                          />
                          <span className="text-sm text-text-primary">{t('permanent')}</span>
                        </label>
                      </div>
                      <div className="flex space-x-4">
                        <button type="submit" className="btn-primary flex-1">
                          {t('save')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddSchedule(false)}
                          className="btn-secondary flex-1"
                        >
                          {t('cancel')}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Schedules List */}
              <div className="space-y-4">
                {schedules.map((schedule) => (
                  <motion.div
                    key={schedule._id || schedule.id}
                    whileHover={{ scale: 1.01 }}
                    className="glass-card p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-text-primary mb-2">
                          {schedule.title}
                        </h3>
                        <p className="text-text-secondary mb-3">{schedule.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm text-text-light">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(schedule.date).toLocaleDateString('te-IN')}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>📍</span>
                            <span>{schedule.location}</span>
                          </span>
                          {schedule.village && (
                            <span className="flex items-center space-x-1">
                              <span>🏘️</span>
                              <span>{schedule.village}</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                            {t(schedule.status)}
                          </span>
                          {schedule.isPermanent && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              {t('permanent')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="flex space-x-2">
                          <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                            <Edit className="w-5 h-5 text-blue-500" />
                          </button>
                          <button
                            onClick={() => handleDeleteSchedule(schedule.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </button>
                        </div>
                        {schedule.status === 'upcoming' && (
                          <button
                            onClick={() => handleUpdateStatus(schedule.id, 'ongoing')}
                            className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg text-xs transition-colors"
                          >
                            Mark as Ongoing
                          </button>
                        )}
                        {schedule.status === 'ongoing' && (
                          <button
                            onClick={() => handleUpdateStatus(schedule.id, 'completed')}
                            className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg text-xs transition-colors"
                          >
                            Mark as Completed
                          </button>
                        )}
                        <button
                          onClick={() => handleAddContent(schedule.id)}
                          className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg text-xs transition-colors"
                        >
                          Add Content
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'complaints' && (
            <motion.div
              key="complaints"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-text-primary">{t('complaints')}</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNewComplaint(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Complaint</span>
                </motion.button>
              </div>

              <div className="space-y-4">
                {complaints.map((complaint) => {
                  const complaintId = complaint._id || complaint.id;
                  return (
                    <motion.div
                      key={complaintId}
                      whileHover={{ scale: 1.01 }}
                      className="glass-card p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-text-primary">
                            {complaint.subject}
                          </h3>
                          <p className="text-text-secondary text-sm">
                            {complaint.userName} • {complaint.village}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                          {t(complaint.status)}
                        </span>
                      </div>
                      <p className="text-text-secondary mb-4">{complaint.description}</p>
                      {complaint.response && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm font-medium text-green-800 mb-1">Your Response:</p>
                          <p className="text-sm text-green-700">{complaint.response}</p>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-text-light">
                          {new Date(complaint.createdAt).toLocaleDateString('te-IN')}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {complaint.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateComplaintStatus(complaintId, 'in-progress')}
                                className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg text-sm transition-colors"
                              >
                                {t('inProgress')}
                              </button>
                              <button
                                onClick={() => handleUpdateComplaintStatus(complaintId, 'resolved')}
                                className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg text-sm transition-colors"
                              >
                                {t('resolved')}
                              </button>
                            </>
                          )}
                          {complaint.status === 'in-progress' && (
                            <button
                              onClick={() => handleUpdateComplaintStatus(complaintId, 'resolved')}
                              className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg text-sm transition-colors"
                            >
                              {t('resolved')}
                            </button>
                          )}
                          <button
                            onClick={() => handleRespondToComplaint(complaintId)}
                            className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg text-sm transition-colors cursor-pointer"
                          >
                            {complaint.response ? 'Update Response' : 'Respond'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Add Content Modal */}
              <AnimatePresence>
                {showAddContent && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowAddContent(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="glass-card p-6 w-full max-w-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-text-primary">Add Content to Schedule</h3>
                        <button
                          onClick={() => setShowAddContent(false)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <form onSubmit={handleSaveContent} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Content Description
                          </label>
                          <textarea
                            value={scheduleContent.content}
                            onChange={(e) => setScheduleContent({...scheduleContent, content: e.target.value})}
                            className="glass-input w-full h-32"
                            placeholder="Add detailed content about the completed schedule..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Upload Additional Images
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="glass-input w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Upload Videos
                          </label>
                          <input
                            type="file"
                            accept="video/*"
                            multiple
                            className="glass-input w-full"
                          />
                        </div>
                        <div className="flex space-x-4">
                          <button type="submit" className="btn-primary flex-1">
                            {t('save')}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAddContent(false)}
                            className="btn-secondary flex-1"
                          >
                            {t('cancel')}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Response Modal */}
              <AnimatePresence>
                {showResponseModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowResponseModal(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="glass-card p-6 w-full max-w-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-text-primary">Respond to Complaint</h3>
                        <button
                          onClick={() => setShowResponseModal(false)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <form onSubmit={handleSaveResponse} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Your Response
                          </label>
                          <textarea
                            value={complaintResponse}
                            onChange={(e) => setComplaintResponse(e.target.value)}
                            className="glass-input w-full h-32"
                            placeholder="Type your response here..."
                            required
                          />
                        </div>
                        <div className="flex space-x-4">
                          <button type="submit" className="btn-primary flex-1">
                            Send Response
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowResponseModal(false)}
                            className="btn-secondary flex-1"
                          >
                            {t('cancel')}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* New Complaint Modal */}
              <AnimatePresence>
                {showNewComplaint && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowNewComplaint(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="glass-card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-text-primary">Add New Complaint</h2>
                        <button
                          onClick={() => setShowNewComplaint(false)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      <form onSubmit={handleAddComplaint} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">{t('subject')}</label>
                          <input
                            type="text"
                            value={newComplaint.subject}
                            onChange={(e) => setNewComplaint({ ...newComplaint, subject: e.target.value })}
                            className="glass-input w-full"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">{t('description')}</label>
                          <textarea
                            value={newComplaint.description}
                            onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                            className="glass-input w-full h-24"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">{t('category')}</label>
                          <select
                            value={newComplaint.category}
                            onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value })}
                            className="glass-input w-full"
                          >
                            <option value="infrastructure">{t('infrastructure')}</option>
                            <option value="water">{t('water')}</option>
                            <option value="electricity">{t('electricity')}</option>
                            <option value="roads">{t('roads')}</option>
                            <option value="healthcare">{t('healthcare')}</option>
                            <option value="education">{t('education')}</option>
                            <option value="other">{t('other')}</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">{t('village')}</label>
                          <input
                            type="text"
                            value={newComplaint.village}
                            onChange={(e) => setNewComplaint({ ...newComplaint, village: e.target.value })}
                            className="glass-input w-full"
                            required
                          />
                        </div>

                        <div className="flex space-x-4 pt-4">
                          <button type="submit" className="btn-primary flex-1">
                            {t('submit')}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowNewComplaint(false)}
                            className="btn-secondary flex-1"
                          >
                            {t('cancel')}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
