import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Plus, 
  LogOut, 
  Home, 
  Send,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const UserDashboard = ({ setIsUser }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-complaints');
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [currentUserId] = useState('user1'); // Simulate logged-in user ID

  const [complaints, setComplaints] = useState([
    {
      id: 1,
      userId: 'user1',
      subject: 'రోడ్డు నిర్మాణం',
      description: 'మన గ్రామంలో ప్రధాన రోడ్డు చాలా చెడుగా ఉంది, దయచేసి పరిష్కరించండి',
      category: 'roads',
      village: 'కొండేపి',
      status: 'pending',
      createdAt: '2024-01-25',
      response: '',
      respondedAt: ''
    },
    {
      id: 2,
      userId: 'user1',
      subject: 'తాగునీటి సమస్య',
      description: 'మన ప్రాంతంలో తాగునీరు లేదు, దయచేసి ఏర్పాటు చేయండి',
      category: 'water',
      village: 'మార్కాపురం',
      status: 'resolved',
      createdAt: '2024-01-20',
      response: 'మీ ఫిర్యాదును స్వీకరించాము. నీటి సమస్య పరిష్కారం కోసం అధికారులతో సమాలోచిస్తున్నాము.',
      respondedAt: '2024-01-22'
    },
    {
      id: 3,
      userId: 'user2',
      subject: 'విద్యార్థుల సమస్య',
      description: 'పాఠశాలలో సరైన సౌకర్యాలు లేవు',
      category: 'education',
      village: 'ఒంగోలు',
      status: 'pending',
      createdAt: '2024-01-26',
      response: '',
      respondedAt: ''
    }
  ]);

  const [newComplaint, setNewComplaint] = useState({
    subject: '',
    description: '',
    category: 'other',
    village: ''
  });

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsUser(false);
    navigate('/');
  };

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    const complaint = {
      id: complaints.length + 1,
      userId: currentUserId,
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
      village: ''
    });
    setShowNewComplaint(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-gold">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">{t('welcome')}</h1>
              <p className="text-text-secondary text-sm">{t('dashboard')}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-yellow/10 hover:bg-primary-yellow/20 rounded-xl transition-all"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">{t('home')}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">{t('logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('my-complaints')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'my-complaints'
                ? 'bg-primary-yellow text-text-primary'
                : 'bg-white/50 text-text-secondary hover:bg-white'
            }`}
          >
            {t('myComplaints')}
          </button>
          <button
            onClick={() => setActiveTab('new-complaint')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'new-complaint'
                ? 'bg-primary-yellow text-text-primary'
                : 'bg-white/50 text-text-secondary hover:bg-white'
            }`}
          >
            {t('newComplaint')}
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'my-complaints' && (
            <motion.div
              key="my-complaints"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-text-primary">{t('myComplaints')}</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveTab('new-complaint');
                    setShowNewComplaint(true);
                  }}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>{t('newComplaint')}</span>
                </motion.button>
              </div>

              {/* Complaints List */}
              {complaints.filter(c => c.userId === currentUserId).length === 0 ? (
                <div className="glass-card p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-text-light mx-auto mb-4" />
                  <p className="text-text-secondary">{t('noData')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {complaints.filter(c => c.userId === currentUserId).map((complaint) => (
                    <motion.div
                      key={complaint.id}
                      whileHover={{ scale: 1.01 }}
                      className="glass-card p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-text-primary mb-2">
                            {complaint.subject}
                          </h3>
                          <p className="text-text-secondary mb-3">{complaint.description}</p>
                          <div className="flex flex-wrap gap-2 text-sm text-text-light">
                            <span className="flex items-center space-x-1">
                              <span>🏘️</span>
                              <span>{complaint.village}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <span>📅</span>
                              <span>{new Date(complaint.createdAt).toLocaleDateString('te-IN')}</span>
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(complaint.status)}`}>
                          {getStatusIcon(complaint.status)}
                          <span>{t(complaint.status)}</span>
                        </span>
                      </div>
                      {complaint.response && (
                        <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                          <p className="text-sm font-medium text-green-800 mb-1 flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Admin Response:</span>
                          </p>
                          <p className="text-sm text-green-700">{complaint.response}</p>
                          {complaint.respondedAt && (
                            <p className="text-xs text-green-600 mt-2">
                              Responded on: {new Date(complaint.respondedAt).toLocaleDateString('te-IN')}
                            </p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'new-complaint' && (
            <motion.div
              key="new-complaint"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="max-w-2xl mx-auto">
                <div className="glass-card p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-primary-yellow rounded-full flex items-center justify-center">
                      <Send className="w-6 h-6 text-text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary">{t('submitComplaint')}</h2>
                      <p className="text-text-secondary text-sm">{t('quote1')}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitComplaint} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {t('subject')}
                      </label>
                      <input
                        type="text"
                        value={newComplaint.subject}
                        onChange={(e) => setNewComplaint({...newComplaint, subject: e.target.value})}
                        className="glass-input w-full"
                        placeholder="Enter complaint subject"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {t('category')}
                      </label>
                      <select
                        value={newComplaint.category}
                        onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
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
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {t('description')}
                      </label>
                      <textarea
                        value={newComplaint.description}
                        onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                        className="glass-input w-full h-32"
                        placeholder="Describe your complaint in detail..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {t('village')}
                      </label>
                      <input
                        type="text"
                        value={newComplaint.village}
                        onChange={(e) => setNewComplaint({...newComplaint, village: e.target.value})}
                        className="glass-input w-full"
                        placeholder="Your village name"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn-primary flex-1 flex items-center justify-center space-x-2"
                      >
                        <Send className="w-5 h-5" />
                        <span>{t('submit')}</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setActiveTab('my-complaints')}
                        className="btn-secondary flex-1"
                      >
                        {t('cancel')}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserDashboard;
