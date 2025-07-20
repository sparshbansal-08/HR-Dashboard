'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

  import { useSession } from 'next-auth/react';
import { motion, AnimatePresence  } from 'framer-motion';
import { FaSearch, FaFilter, FaPlusCircle, FaBookmark, FaChartBar } from 'react-icons/fa';
import Card from '@/components/Card';
import FilterDropdown from '@/components/FilterDropdown';


import { fetchUsers } from '@/lib/api';
  import { useSearch  } from '@/hooks/useSearch';
import Modal from '@/components/Modal';

export default function Home() {

  const [showFilters, setShowFilters] = useState(false);
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const { filteredData, setQuery, setFilters } = useSearch(users);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {

    console.log(' mounted');


  }, []);
const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; 

  
  
  const totalPages = Math.ceil((filteredData?.length || 0) / usersPerPage);

  useEffect(() => {
    if (status === 'loading' || !session) return;

    const loadUsers = async () => {
      const data = await fetchUsers();
      if (data) setUsers(data);
    };

    loadUsers();
  }, [session, status]);

  useEffect(() => {
    if (filteredData?.length > 0 && currentPage > totalPages) {
      setCurrentPage(1); 
    }
  }, [filteredData, totalPages, currentPage]);

  const handleNextPage = () => {
    console.log({ currentPage, totalPages, filteredDataLength: filteredData?.length });
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    console.log({ currentPage, totalPages, filteredDataLength: filteredData?.length });
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const paginatedUsers = (filteredData || []).slice(
      (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  const handleAddUser = (newUser) => {
    const nameParts =  newUser.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const newUserData = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email: newUser.email,
     
         department: newUser.department,
      rating: parseInt(newUser.rating) || 1,
      age: 25,
      address: { address: 'N/A' },
      phone: 'N/A',
      bio: 'No bio provided.',
    };

    setUsers((prev) => [...prev, newUserData]);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-white/80 bg-gradient-to-br from-[#141e30] to-[#243b55]">
        Loading session...
    </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#141e30] to-[#243b55] px-4 relative overflow-hidden text-white">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" />
        <motion.div
          
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 border border-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-xl shadow-cyan-500/30 max-w-md w-full text-center"
        >
          <h2 className="text-3xl font-bold text-cyan-300 mb-4 drop-shadow-md">Access Denied</h2>
          <p className="text-white/80 mb-6">
            You need to be logged in to access the HR Dashboard.
          </p>
          <Link
            href="/login"
            className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-xl transition duration-300 hover:shadow-[0_0_20px_#0ff]"
          >
            Log In
          </Link>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] p-6 relative text-white overflow-hidden">
     
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" />


  <motion.h1
        className="text-4xl lg:text-5xl font-extrabold text-center mb-10 text-cyan-300 drop-shadow-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        HR Dashboard
      </motion.h1>

     
      <div className="flex flex-col items-center gap-4 mb-6">
       
        <div className="relative w-full max-w-xl">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/70" />
          <input
            type="text"
            placeholder="Search by name, email, or department..."
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-white placeholder-white/70"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-cyan-400/20 transition"
          >
            <FaFilter /> Filter

          </button>

          <Link
            href="/bookmarks"
            className="flex items-center gap-2 bg-white/10 border border-white/20 text-cyan-300 px-4 py-2 rounded-xl hover:bg-cyan-400/20 transition"
          >
            <FaBookmark /> Bookmarks
      </Link>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white px-4 py-2 rounded-xl transition hover:shadow-[0_0_22px_#0ff]"
          >
            <FaPlusCircle /> Add User
          </button>

          <Link
            href="/analytics"
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white px-4 py-2 rounded-xl transition hover:shadow-[0_0_22px_#0ff]"
          >
            <FaChartBar /> View Analytics
          </Link>
        </div>


      <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4 w-full max-w-3xl"
            >
              <FilterDropdown onFilter={setFilters} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {filteredData?.length === 0 ? (
        <motion.p
          className="text-center text-white/80 text-lg mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No users found. Try adjusting your filters.
        </motion.p>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {paginatedUsers.map((user) => (
              <Card key={user.id} user={user} />
            ))}
          </motion.div>

      
          <div className="flex justify-center items-center gap-4 my-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl hover:bg-cyan-400/20 text-white disabled:opacity-50 transition"
            >
              Previous
                 </button>
            <span className="text-white/80">Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl hover:bg-cyan-400/20 text-white disabled:opacity-50 transition"
            >
              Next
            </button>

          </div>
        </>
      )}


      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddUser} />
    </div>
  );
}
