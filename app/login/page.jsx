'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

  import { useRouter } from 'next/navigation';
 import { useTypewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

export default function LoginPage() {


const router = useRouter();
      const [text] = useTypewriter({

    words:  ['HR Dashboard', 'Employee Manager', 'Performance Tracker',  'Smart Dashboard'],
    loop: true,
    delaySpeed:  2000,
  });

  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await  signIn('credentials', {
      ...credentials,
       redirect: true,
      callbackUrl: '/',
     });

  };

  return (
    
        <div className="min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] flex items-center justify-center relative text-white overflow-hidden">



      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" />


      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl p-10 w-full max-w-md shadow-xl shadow-cyan-500/30"
      >
        <h1 className="text-4xl font-extrabold text-cyan-300 text-center mb-4 drop-shadow-md">Welcome</h1>
        <p className="text-lg text-center text-white/80 mb-6">
          To <span className="text-cyan-400 font-semibold">{text}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-400 transition">
            <FaUser className="text-white/70" />
            <input
              type="text"
               
                 placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="bg-transparent focus:outline-none w-full placeholder-white/70 text-white"
              required

            />
          </div>

          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-400 transition">
            <FaLock className="text-white/70" />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="bg-transparent focus:outline-none w-full placeholder-white/70 text-white"
              required
            />


          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 flex items-center justify-center gap-3 text-white transition duration-300 hover:shadow-[0_0_20px_#0ff]"
          >
            <FaSignInAlt />
            Login
          </button>
        </form>


      </motion.div>
    </div>

  );
}
