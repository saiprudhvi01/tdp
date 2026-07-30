import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Clock, XCircle, MessageSquare, Filter, ChevronDown } from 'lucide-react';

const Status = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Dummy complaints data
  const complaints = [
    {
      id: 1,
      subject: 'రోడ్డు నిర్మాణం',
      description: 'మన గ్రామంలో ప్రధాన రోడ్డు చాలా చెడుగా ఉంది, దయచేసి పరిష్కరించండి',
      category: 'roads',
      village: 'కొండేపి',
      status: 'resolved',
      createdAt: '2024-01-25',
      response: 'మీ ఫిర్యాదును స్వీకరించాము. రోడ్డు నిర్మాణ పనులు ప్రారంభించబడ్డాయి. త్వరలో పూర్తి అవుతాయి.',
      respondedAt: '2024-01-28'
    },
    {
      id: 2,
      subject: 'తాగునీటి సమస్య',
      description: 'మన ప్రాంతంలో తాగునీరు లేదు, దయచేసి ఏర్పాటు చేయండి',
      category: 'water',
      village: 'మార్కాపురం',
      status: 'in-progress',
      createdAt: '2024-01-24',
      response: 'మీ ఫిర్యాదును పరిశీలిస్తున్నాము. త్వరలో పరిష్కారం అందిస్తాము.',
      respondedAt: '2024-01-26'
    },
    {
      id: 3,
      subject: 'విద్యుత్ సమస్య',
      description: 'చాలా రోజులుగా విద్యుత్ సమస్య ఉంది',
      category: 'electricity',
      village: 'ఒంగోలు',
      status: 'pending',
      createdAt: '2024-01-26',
      response: '',
      respondedAt: ''
    },
    {
      id: 4,
      subject: 'విద్యా సమస్య',
      description: 'పాఠశాలలో సరైన సౌకర్యాలు లేవు',
      category: 'education',
      village: 'కొండేపి',
      status: 'rejected',
      createdAt: '2024-01-20',
      response: 'ఈ సమస్యకు సంబంధించిన సమాచారం సరిగ్గా లేదు. మళ్ళీ ఫిర్యాదు చేయండి.',
      respondedAt: '2024-01-22'
    }
  ];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || complaint.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="w-5 h-5" />;
      case 'in-progress': return <Clock className="w-5 h-5" />;
      case 'rejected': return <XCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="page-transition min-h-screen bg-gradient-gold">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{t('status')}</h1>
          <p className="text-text-secondary mt-2">Track your complaint status</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input w-full pl-10"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filter</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
            </button>
            {showFilter && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 glass-card p-2 z-10 min-w-[150px]"
              >
                <button
                  onClick={() => { setFilterStatus('all'); setShowFilter(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filterStatus === 'all' ? 'bg-primary-yellow/20' : 'hover:bg-gray-100'}`}
                >
                  All
                </button>
                <button
                  onClick={() => { setFilterStatus('pending'); setShowFilter(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filterStatus === 'pending' ? 'bg-primary-yellow/20' : 'hover:bg-gray-100'}`}
                >
                  Pending
                </button>
                <button
                  onClick={() => { setFilterStatus('in-progress'); setShowFilter(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filterStatus === 'in-progress' ? 'bg-primary-yellow/20' : 'hover:bg-gray-100'}`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => { setFilterStatus('resolved'); setShowFilter(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filterStatus === 'resolved' ? 'bg-primary-yellow/20' : 'hover:bg-gray-100'}`}
                >
                  Resolved
                </button>
                <button
                  onClick={() => { setFilterStatus('rejected'); setShowFilter(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filterStatus === 'rejected' ? 'bg-primary-yellow/20' : 'hover:bg-gray-100'}`}
                >
                  Rejected
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Complaints List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {filteredComplaints.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <MessageSquare className="w-16 h-16 text-text-light mx-auto mb-4" />
            <p className="text-text-secondary text-lg">No complaints found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <motion.div
                key={complaint.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedComplaint(complaint)}
                className="glass-card p-6 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-text-primary mb-2">{complaint.subject}</h3>
                    <p className="text-text-secondary text-sm line-clamp-2">{complaint.description}</p>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(complaint.status)}`}>
                    {getStatusIcon(complaint.status)}
                    <span className="capitalize">{t(complaint.status)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-text-light">
                  <div className="flex items-center space-x-4">
                    <span>{complaint.village}</span>
                    <span>•</span>
                    <span>{new Date(complaint.createdAt).toLocaleDateString('te-IN')}</span>
                  </div>
                  {complaint.response && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <MessageSquare className="w-4 h-4" />
                      <span>Response received</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedComplaint(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-2">{selectedComplaint.subject}</h2>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedComplaint.status)}`}>
                    {getStatusIcon(selectedComplaint.status)}
                    <span className="capitalize">{t(selectedComplaint.status)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-text-primary mb-2">Description</h3>
                  <p className="text-text-secondary">{selectedComplaint.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-text-primary mb-2">Category</h3>
                    <p className="text-text-secondary capitalize">{selectedComplaint.category}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary mb-2">Village</h3>
                    <p className="text-text-secondary">{selectedComplaint.village}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary mb-2">Submitted On</h3>
                    <p className="text-text-secondary">{new Date(selectedComplaint.createdAt).toLocaleDateString('te-IN')}</p>
                  </div>
                  {selectedComplaint.respondedAt && (
                    <div>
                      <h3 className="font-medium text-text-primary mb-2">Responded On</h3>
                      <p className="text-text-secondary">{new Date(selectedComplaint.respondedAt).toLocaleDateString('te-IN')}</p>
                    </div>
                  )}
                </div>

                {selectedComplaint.response ? (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                    <h3 className="font-medium text-green-800 mb-2 flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5" />
                      <span>Admin Response</span>
                    </h3>
                    <p className="text-green-700">{selectedComplaint.response}</p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                    <h3 className="font-medium text-yellow-800 mb-2 flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Waiting for Response</span>
                    </h3>
                    <p className="text-yellow-700">Your complaint is being reviewed. You will receive a response soon.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Status;
