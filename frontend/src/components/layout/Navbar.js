'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { HiOutlineMenu, HiOutlineX, HiOutlineSearch, HiOutlineUser } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { href: '/courses', label: 'Courses' },
    { href: '/institutes', label: 'Institutes' },
    { href: '/compare', label: 'Compare' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <span className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
              DataSci<span className="text-cyan-400">Pro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/courses"
              className="p-2 text-[var(--text-secondary)] hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <HiOutlineSearch className="w-5 h-5" />
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {user?.first_name?.[0]}{user?.last_name?.[0]}
                    </span>
                  </div>
                  <span className="text-sm text-white">{user?.first_name}</span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 glass rounded-xl border border-[var(--border)] overflow-hidden shadow-2xl"
                    >
                      <div className="px-4 py-3 border-b border-[var(--border)]">
                        <p className="text-sm font-medium text-white">{user?.first_name} {user?.last_name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link href="/profile" className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-white/5 hover:text-white">
                          Profile
                        </Link>
                        {isAdmin && (
                          <Link href="/admin" className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-white/5 hover:text-white">
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="btn-secondary text-sm !py-2 !px-4">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary text-sm !py-2 !px-4">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-white"
          >
            {mobileOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass border-t border-[var(--border)] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-[var(--text-secondary)] hover:text-white hover:bg-white/5 rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-[var(--border)] flex gap-2">
                {isAuthenticated ? (
                  <button onClick={logout} className="btn-secondary w-full text-sm">Sign Out</button>
                ) : (
                  <>
                    <Link href="/login" className="btn-secondary w-full text-sm text-center">Sign In</Link>
                    <Link href="/register" className="btn-primary w-full text-sm text-center">Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
