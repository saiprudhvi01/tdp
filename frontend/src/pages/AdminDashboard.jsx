import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import ScheduleTimelineDashboard from '../components/ScheduleTimelineDashboard';
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

  // Start with empty array — loaded from API below
  const [schedules, setSchedules] = useState([]);

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

  const fetchSchedules = async () => {
    try {
      const response = await fetch('/api/schedules');
      if (response.ok) {
        const data = await response.json();
        setSchedules(data);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchSchedules();
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

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newSchedule.title);
      formData.append('description', newSchedule.description);
      formData.append('date', newSchedule.date);
      formData.append('location', newSchedule.location);
      if (newSchedule.village) formData.append('village', newSchedule.village);
      if (newSchedule.mandal) formData.append('mandal', newSchedule.mandal);
      formData.append('status', newSchedule.status);
      if (newSchedule.content) formData.append('content', newSchedule.content);
      formData.append('isPermanent', String(newSchedule.isPermanent));

      const response = await fetch('/api/schedules', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        setNewSchedule({ title: '', description: '', date: '', location: '', village: '', mandal: '', status: 'upcoming', isPermanent: false, content: '' });
        setShowAddSchedule(false);
        fetchSchedules();
      }
    } catch (error) {
      console.error('Error adding schedule:', error);
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await fetch(`/api/schedules/${id}`, { method: 'DELETE' });
      fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/schedules/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchSchedules();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAddContent = (scheduleId) => {
    setSelectedSchedule(scheduleId);
    setShowAddContent(true);
  };

  const handleAddMediaToSchedule = async (id, content, mediaFiles) => {
    try {
      const formData = new FormData();
      if (content) formData.append('content', content);
      mediaFiles.forEach((media) => {
        if (media.file) {
          formData.append(media.type === 'video' ? 'videos' : 'gallery', media.file);
        }
      });
      await fetch(`/api/schedules/${id}/content`, {
        method: 'PATCH',
        body: formData
      });
      fetchSchedules();
    } catch (error) {
      console.error('Error adding media:', error);
    }
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

              {/* Professional Timeline Schedule Dashboard (Admin View with Add Schedule & CRUD Actions) */}
              <ScheduleTimelineDashboard
                schedules={schedules}
                isAdmin={true}
                onAddSchedule={() => setShowAddSchedule(true)}
                onDeleteSchedule={handleDeleteSchedule}
                onUpdateStatus={handleUpdateStatus}
                onAddContent={handleAddContent}
                onAddMediaToSchedule={handleAddMediaToSchedule}
              />
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
