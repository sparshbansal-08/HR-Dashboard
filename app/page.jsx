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
    const nameParts = newUser.name.trim().split(' ');
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
