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