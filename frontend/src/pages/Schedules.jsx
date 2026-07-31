import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import ScheduleTimelineDashboard from '../components/ScheduleTimelineDashboard';

const Schedules = ({ isAdmin = false }) => {
  const { t } = useLanguage();
  const [schedules, setSchedules] = useState([]);
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    village: '',
    mandal: '',
    status: 'upcoming',
    content: '',
    isPermanent: false
  });

  const fetchSchedules = async () => {
    try {
      const response = await fetch('/api/schedules');
      if (response.ok) {
        const data = await response.json();
        setSchedules(data || []);
      } else {
        setSchedules([]);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setSchedules([]);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Admin: Add Schedule handler
  const handleAddSchedule = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      // Backend uses multer, so must send FormData (not JSON)
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
        headers: {
          'Authorization': `Bearer ${token}`
          // Do NOT set Content-Type — browser sets it with boundary for FormData
        },
        body: formData
      });
      if (response.ok) {
        setShowAddSchedule(false);
        setNewSchedule({
          title: '', description: '', date: '', time: '', location: '',
          village: '', mandal: '', status: 'upcoming', content: '', isPermanent: false
        });
        fetchSchedules();
      } else {
        const err = await response.json().catch(() => ({}));
        console.error('Failed to add schedule:', err.message || response.status);
      }
    } catch (error) {
      console.error('Error adding schedule:', error);
    }
  };

  // Admin: Delete Schedule handler
  const handleDeleteSchedule = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`/api/schedules/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  // Admin: Update Status handler
  const handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`/api/schedules/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      fetchSchedules();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  // Admin: Add Media/Content to existing schedule
  const handleAddMediaToSchedule = async (id, content, mediaFiles) => {
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      if (content) formData.append('content', content);
      mediaFiles.forEach((media) => {
        if (media.file) {
          if (media.type === 'video') {
            formData.append('videos', media.file);
          } else {
            formData.append('gallery', media.file);
          }
        }
      });
      await fetch(`/api/schedules/${id}/content`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      fetchSchedules();
    } catch (error) {
      console.error('Error adding media to schedule:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-4">
      {/* Schedule Timeline Dashboard Layout */}
      <ScheduleTimelineDashboard
        schedules={schedules}
        isAdmin={isAdmin}
        onAddSchedule={() => setShowAddSchedule(true)}
        onDeleteSchedule={isAdmin ? handleDeleteSchedule : undefined}
        onUpdateStatus={isAdmin ? handleUpdateStatus : undefined}
        onAddMediaToSchedule={isAdmin ? handleAddMediaToSchedule : undefined}
      />

      {/* Add Schedule Modal (Admin Only) */}
      {isAdmin && showAddSchedule && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddSchedule(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black text-[#111111]">{t('addSchedule')}</h2>
              <button
                onClick={() => setShowAddSchedule(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSchedule} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('title')}</label>
                <input
                  type="text"
                  value={newSchedule.title}
                  onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#F5BE18] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('description')}</label>
                <textarea
                  value={newSchedule.description}
                  onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#F5BE18] transition-colors h-24"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('date')}</label>
                  <input
                    type="date"
                    value={newSchedule.date}
                    onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#F5BE18] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newSchedule.time}
                    onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#F5BE18] transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('location')}</label>
                  <input
                    type="text"
                    value={newSchedule.location}
                    onChange={(e) => setNewSchedule({...newSchedule, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#F5BE18] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('village')}</label>
                  <input
                    type="text"
                    value={newSchedule.village}
                    onChange={(e) => setNewSchedule({...newSchedule, village: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#F5BE18] transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('mandal')}</label>
                  <input
                    type="text"
                    value={newSchedule.mandal}
                    onChange={(e) => setNewSchedule({...newSchedule, mandal: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#F5BE18] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('status')}</label>
                  <select
                    value={newSchedule.status}
                    onChange={(e) => setNewSchedule({...newSchedule, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#F5BE18] transition-colors"
                  >
                    <option value="upcoming">{t('upcoming')}</option>
                    <option value="ongoing">{t('ongoing')}</option>
                    <option value="completed">{t('completed')}</option>
                    <option value="cancelled">{t('cancelled')}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={newSchedule.content}
                  onChange={(e) => setNewSchedule({...newSchedule, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#F5BE18] transition-colors h-20"
                  placeholder="Add detailed content..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newSchedule.isPermanent}
                  onChange={(e) => setNewSchedule({...newSchedule, isPermanent: e.target.checked})}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-gray-700">{t('permanent')}</span>
              </div>
              <div className="flex space-x-4 pt-2">
                <button type="submit" className="flex-1 bg-[#F5BE18] hover:bg-[#E5AF00] text-white font-bold py-2.5 rounded-xl transition-all cursor-pointer">
                  {t('save')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddSchedule(false)}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Schedules;
