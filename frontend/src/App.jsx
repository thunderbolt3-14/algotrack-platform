import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion'; // Animation magic
import ProblemForm from './components/ProblemForm';
import Blog from './components/Blog';
import { Terminal, Code2, BookOpen, Trash2, ExternalLink, Plus } from 'lucide-react';

function App() {
  const [problems, setProblems] = useState([]);
  const [activeTab, setActiveTab] = useState('problems');
  const [showForm, setShowForm] = useState(false);
  
  // REPLACE WITH YOUR RENDER URL
  const API_URL = 'https://algotrack-backend-wf1l.onrender.com'; 

  useEffect(() => {
    axios.get(`${API_URL}/api/problems`)
      .then(response => setProblems(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleProblemAdded = (newProblem) => {
    setProblems([newProblem, ...problems]); // Add new problem to top
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this?")) {
        axios.delete(`${API_URL}/api/problems/${id}`)
        .then(() => setProblems(problems.filter(p => p._id !== id)))
        .catch(error => console.error(error));
    }
  };

  // Stats Calculation
  const easyCount = problems.filter(p => p.difficulty === 'Easy').length;
  const mediumCount = problems.filter(p => p.difficulty === 'Medium').length;
  const hardCount = problems.filter(p => p.difficulty === 'Hard').length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-purple-500/30">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Navbar - Glassmorphism */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg">
              <Terminal size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              AlgoTrack
            </h1>
          </div>
          
          <div className="flex gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            <button 
              onClick={() => setActiveTab('problems')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'problems' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'text-gray-400 hover:text-white'}`}
            >
              <Code2 size={16} /> Tracker
            </button>
            <button 
              onClick={() => setActiveTab('blog')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'blog' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'text-gray-400 hover:text-white'}`}
            >
              <BookOpen size={16} /> Blog
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto p-6 mt-20">
        {activeTab === 'problems' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            
            {/* Header & Stats */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">Dashboard</h2>
                <div className="flex gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> {easyCount} Easy</span>
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> {mediumCount} Medium</span>
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> {hardCount} Hard</span>
                </div>
              </div>
              
              <button 
                  onClick={() => setShowForm(!showForm)}
                  className="bg-white text-black px-6 py-2.5 rounded-full hover:bg-gray-200 transition-all font-semibold flex items-center gap-2 shadow-lg shadow-white/10"
                >
                  {showForm ? 'Close' : <><Plus size={18} /> Log Problem</>}
              </button>
            </div>

            {/* Form Animation */}
            <AnimatePresence>
              {showForm && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-8"
                >
                  <ProblemForm onProblemAdded={handleProblemAdded} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Problem Cards */}
            <div className="grid gap-3">
              {problems.map((problem, index) => (
                <motion.div 
                  key={problem._id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white/5 border border-white/10 p-4 rounded-xl hover:border-purple-500/50 hover:bg-white/[0.07] transition-all flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-1 h-12 rounded-full ${
                      problem.difficulty === 'Easy' ? 'bg-green-500' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 group-hover:text-purple-400 transition-colors">
                        <a href={problem.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          {problem.title} <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </h3>
                      <div className="flex gap-3 mt-1 text-xs text-gray-500 font-mono">
                        <span className="px-2 py-0.5 bg-white/5 rounded text-gray-300">{problem.category}</span>
                        <span>{problem.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                      onClick={() => handleDelete(problem._id)}
                      className="text-gray-600 hover:text-red-500 p-2 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                </motion.div>
              ))}
              
              {problems.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                  <p>No problems solved yet. Time to grind! 🚀</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'blog' && <Blog />}
      </main>
    </div>
  );
}

export default App;