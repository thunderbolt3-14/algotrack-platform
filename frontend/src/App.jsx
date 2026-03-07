import { useState, useEffect } from 'react';
import axios from 'axios';
import ProblemForm from './components/ProblemForm';
import Blog from './components/Blog'; // <-- Import the new Blog component

function App() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tracker'); // <-- State to manage tabs

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('https://algotrack-backend-wf1l.onrender.com/api/problems');
        setProblems(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleProblemAdded = (newProblem) => setProblems([newProblem, ...problems]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;
    try {
      await axios.delete(`https://algotrack-backend-wf1l.onrender.com/api/problems/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await axios.put(`https://algotrack-backend-wf1l.onrender.com/api/problems/${id}`, { status: newStatus });
      setProblems(problems.map(problem => problem._id === id ? response.data : problem));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation / Header */}
        <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              AlgoTrack
            </h1>
            <p className="text-slate-500 text-lg">
              Developer Platform & Progress Tracker
            </p>
          </div>
          
          <nav className="flex space-x-4 mt-6 md:mt-0">
            <button 
              onClick={() => setActiveTab('tracker')}
              className={`px-4 py-2 font-bold rounded-lg transition-colors ${
                activeTab === 'tracker' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              Problem Tracker
            </button>
            <button 
              onClick={() => setActiveTab('blog')}
              className={`px-4 py-2 font-bold rounded-lg transition-colors ${
                activeTab === 'blog' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              Technical Blog
            </button>
          </nav>
        </header>

        {/* Tab Rendering Logic */}
        {activeTab === 'blog' ? (
          <Blog />
        ) : (
          <>
            <ProblemForm onProblemAdded={handleProblemAdded} />

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <p className="text-xl text-slate-600 animate-pulse">Loading database records...</p>
              </div>
            ) : problems.length === 0 ? (
              <p className="text-slate-600">No problems tracked yet. Add some via the API!</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {problems.map((problem) => (
                  <div key={problem._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 relative group">
                    
                    <button onClick={() => handleDelete(problem._id)} className="absolute top-4 right-4 text-slate-400 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100" title="Delete Problem">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>

                    <div className="flex justify-between items-start mb-4 pr-6">
                      <h2 className="text-xl font-bold text-slate-800 line-clamp-1" title={problem.title}>{problem.title}</h2>
                    </div>
                    
                    <div className="mb-4">
                       <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${problem.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' : problem.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>
                        {problem.difficulty}
                      </span>
                    </div>

                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="font-medium text-slate-500">Platform</span>
                        <span className="font-semibold text-slate-800">{problem.platform}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="font-medium text-slate-500">Problem ID</span>
                        <span className="font-semibold text-slate-800">{problem.problemId}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
                        <span className="font-medium text-slate-500">Status</span>
                        <select 
                          value={problem.status}
                          onChange={(e) => handleStatusUpdate(problem._id, e.target.value)}
                          className={`text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1 cursor-pointer focus:outline-none transition-colors duration-200 ${problem.status === 'Solved' ? 'bg-emerald-100 text-emerald-800' : problem.status === 'Attempted' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}
                        >
                          <option value="To Do" className="bg-white text-slate-800">To Do</option>
                          <option value="Attempted" className="bg-white text-amber-800">Attempted</option>
                          <option value="Solved" className="bg-white text-emerald-800">Solved</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;