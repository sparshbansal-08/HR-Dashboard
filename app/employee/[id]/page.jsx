'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { useSession } from 'next-auth/react';

import { motion, AnimatePresence } 
from 'framer-motion';
import StarRating from '@/components/StarRating';
import Badge from '@/components/Badge';
import { fetchUserById } from '@/lib/api';
import { mockBio, mockPerformanceHistory } from '@/lib/mockData';

export default function EmployeePage({ params }) {
    const { data: session, status } = useSession();
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {

    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
      return;
    }

    async function loadUser() {
      const data = await fetchUserById(id);

      if (data) {
        setUser({
          ...data,
          bio: mockBio,
          performanceHistory: mockPerformanceHistory(),
        });
      } else {
        router.push('/');
      }

    }
    loadUser();
  }, [id, router, session, status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-white/80 bg-gradient-to-br from-[#141e30] to-[#243b55]">
        Loading session...
      </div>
    );
  }

  if (!session) return null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-white/80 bg-gradient-to-br from-[#141e30] to-[#243b55]">
        Loading...
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', content: <Overview user={user} /> },
    { id: 'projects', label: 'Projects', content: <Projects /> },

    { id: 'feedback', label: 'Feedback', content: <Feedback /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] p-6 relative text-white overflow-hidden">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" />
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-xl shadow-cyan-500/30 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-cyan-300 drop-shadow-md mb-4">
            {user.firstName} {user.lastName}
          </h1>
          <div className="space-y-2 text-white/80">
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <p>Department: {user.department}</p>
            <p>Address: {user.address?.address || 'N/A'}</p>
            <p>Phone:  {user.phone || 'N/A'}</p>
            <p>Bio: {user.bio}</p>
            <div className="flex items-center gap-4">
              <StarRating rating={user.rating} />
              <Badge rating={user.rating} />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex gap-4 border-b border-white/20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`p-2 text-white/80 hover:text-cyan-400 transition ${
                    activeTab === tab.id ? 'border-b-2 border-cyan-400 text-cyan-400' : ''
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <AnimatePresence  mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                {tabs.find((tab) => tab.id === activeTab).content}
              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </div>
  );

}


function Overview({ user }) {
  return (
    <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-4">
      <h3 className="text-lg font-semibold text-cyan-300 drop-shadow-md mb-2">Performance History</h3>
      <ul className="space-y-2 text-white/80">
        
        {user.performanceHistory.map((entry, index) => (
          <li key={index}>
            {entry.date}: {entry.rating} stars - {entry.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Projects() {
  return (
    <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-4">
      <h3 className="text-lg font-semibold text-cyan-300 drop-shadow-md mb-2">Projects</h3>
      <p className="text-white/80">Mock project data: Project A, Project B</p>
    </div>
  );
}

function Feedback() {
  return (
    <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-4">
      <h3 className="text-lg font-semibold text-cyan-300 drop-shadow-md mb-2">Feedback</h3>
      <form className="space-y-4">
        <textarea
          className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-white placeholder-white/70"
          placeholder="Add feedback..."
        />
        <button
          className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white rounded-xl transition duration-300 hover:shadow-[0_0_10px_#0ff]"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}