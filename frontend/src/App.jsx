import { useState, useEffect } from 'react';
import axios from 'axios';
import ProblemForm from './components/ProblemForm';
import Blog from './components/Blog';

function App() {
  const [problems, setProblems] = useState([]);
  const [activeTab, setActiveTab] = useState('problems');
  const [showForm, setShowForm] = useState(false);
  
  // REPLACE THIS WITH YOUR RENDER URL
  const API_URL = 'https://algotrack-backend-wf1l.onrender.com'; 

  useEffect(() => {
    axios.get(`${API_URL}/api/problems`)
      .then(response => setProblems(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleProblemAdded = (newProblem) => {
    setProblems([...problems, newProblem]);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this?")) {
        axios.delete(`${API_URL}/api/problems/${id}`)
        .then(() => setProblems(problems.filter(p => p._id !== id)))
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            AlgoTrack
          </h1>
          <div className="flex gap-6">
            <button 
              onClick={() => setActiveTab('problems')}
              className={`text-sm font-medium transition-colors ${activeTab === 'problems' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              Problem Tracker
            </button>
            <button 
              onClick={() => setActiveTab('blog')}
              className={`text-sm font-medium transition-colors ${activeTab === 'blog' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              Technical Blog
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 mt-8">
        {activeTab === 'problems' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">Problem Dashboard</h2>
                <p className="text-slate-500 mt-1">Track your daily DSA progress</p>
              </div>
              <button 
                  onClick={() => setShowForm(!showForm)}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-all font-semibold flex items-center gap-2"
                >
                  {showForm ? 'Close Form' : '+ Log New Problem'}
              </button>
            </div>

            {showForm && (
              <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
                <ProblemForm onProblemAdded={handleProblemAdded} />
              </div>
            )}

            <div className="grid gap-4">
              {problems.map(problem => (
                <div key={problem._id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex justify-between items-center group">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      <a href={problem.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {problem.title}
                      </a>
                    </h3>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold border ${
                        problem.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {problem.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-mono border border-slate-200">
                        {problem.category}
                      </span>
                    </div>
                  </div>
                  <button 
                      onClick={() => handleDelete(problem._id)}
                      className="text-slate-300 hover:text-red-500 p-2 transition-colors"
                      title="Delete Problem"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'blog' && <Blog />}
      </main>
    </div>
  );
}

export default App;