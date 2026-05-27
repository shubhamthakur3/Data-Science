'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { HiOutlineMenu, HiOutlineX, HiOutlineSearch, HiOutlineShoppingCart } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';

const categories = [
  { name: 'Data Science', slug: 'data-science', desc: 'End-to-end data workflows' },
  { name: 'Machine Learning', slug: 'machine-learning', desc: 'Supervised & unsupervised models' },
  { name: 'Deep Learning', slug: 'deep-learning', desc: 'Neural networks & CV/NLP' },
  { name: 'Data Analytics', slug: 'data-analytics', desc: 'Insights from structured data' },
  { name: 'Python Programming', slug: 'python-programming', desc: 'Core language skills' },
  { name: 'AI & NLP', slug: 'ai-nlp', desc: 'Language models & AI agents' },
  { name: 'Data Engineering', slug: 'data-engineering', desc: 'Pipelines & infrastructure' },
  { name: 'Business Intelligence', slug: 'business-intelligence', desc: 'Dashboards & reporting' },
];

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const catRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <>
      {/* ─── Masthead Band (DESIGN.md: masthead-band) ─── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: 'var(--color-canvas)',
          borderColor: 'var(--color-hairline)',
        }}
      >
        <div className="container-wide">
          {/* ─── Main row ─── */}
          <div className="flex items-center h-[72px] gap-4">

            {/* Logo / Wordmark */}
            <Link href="/" className="shrink-0 flex items-center mr-4" id="nav-logo">
              <span
                className="type-display-sm"
                style={{ fontWeight: 400, fontSize: '28px', color: 'var(--color-ink)' }}
              >
                DataSci<span style={{ fontWeight: 700 }}>Pro</span>
              </span>
            </Link>

            {/* Categories Dropdown (Desktop) */}
            <div className="hidden lg:block relative" ref={catRef}>
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="type-body-sm-strong px-3 py-2 flex items-center gap-1"
                style={{ color: 'var(--color-ink)' }}
                id="nav-categories-btn"
              >
                Categories
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"
                  className={`transition-transform ${catOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </button>

              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-1 w-[320px] bg-white border z-50"
                    style={{ borderColor: 'var(--color-hairline)' }}
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/courses?category=${cat.slug}`}
                        onClick={() => setCatOpen(false)}
                        className="block px-4 py-3 border-b transition-colors"
                        style={{
                          borderColor: 'var(--color-hairline)',
                          color: 'var(--color-ink)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-canvas-soft)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <span className="type-body-sm-strong block">{cat.name}</span>
                        <span className="type-caption" style={{ color: 'var(--color-body)' }}>
                          {cat.desc}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Bar (Udemy-style, full width center) */}
            <div className="hidden md:flex flex-1 mx-4">
              <div
                className="flex items-center w-full border"
                style={{
                  borderColor: searchFocused ? 'var(--color-ink)' : 'var(--color-ink)',
                  borderRadius: 'var(--rounded-full)',
                  padding: '0 16px',
                  height: '44px',
                }}
              >
                <HiOutlineSearch className="w-5 h-5 shrink-0" style={{ color: 'var(--color-body)' }} />
                <input
                  type="text"
                  placeholder="Search for courses, topics, or institutes..."
                  className="flex-1 bg-transparent border-none outline-none px-3 text-[15px]"
                  style={{
                    color: 'var(--color-ink)',
                    fontFamily: 'Inter, Helvetica Neue, sans-serif',
                  }}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  id="nav-search-input"
                />
              </div>
            </div>

            {/* Right-side links */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/institutes"
                className="type-body-sm px-3 py-2 transition-colors"
                style={{ color: 'var(--color-ink)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-body)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-ink)'; }}
                id="nav-institutes"
              >
                Institutes
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  className="type-body-sm px-3 py-2 transition-colors"
                  style={{ color: 'var(--color-ink)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-body)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-ink)'; }}
                  id="nav-admin"
                >
                  Admin
                </Link>
              )}

              {isAuthenticated ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-9 h-9 flex items-center justify-center border transition-colors"
                    style={{
                      borderColor: 'var(--color-ink)',
                      borderRadius: 'var(--rounded-full)',
                      backgroundColor: profileOpen ? 'var(--color-ink)' : 'var(--color-canvas)',
                      color: profileOpen ? 'var(--color-on-primary)' : 'var(--color-ink)',
                    }}
                    id="nav-profile-btn"
                  >
                    <span className="type-body-sm-strong" style={{ fontSize: '13px' }}>
                      {user?.first_name?.[0]}{user?.last_name?.[0]}
                    </span>
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="absolute right-0 mt-2 w-56 bg-white border z-50"
                        style={{ borderColor: 'var(--color-hairline)' }}
                      >
                        <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--color-hairline)' }}>
                          <p className="type-body-sm-strong">{user?.first_name} {user?.last_name}</p>
                          <p className="type-caption" style={{ color: 'var(--color-body)' }}>{user?.email}</p>
                        </div>
                        <div>
                          <Link href="/profile" className="block px-4 py-3 type-body-sm border-b transition-colors"
                            style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-ink)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-canvas-soft)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                          >
                            Profile
                          </Link>
                          {isAdmin && (
                            <Link href="/admin" className="block px-4 py-3 type-body-sm border-b transition-colors"
                              style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-ink)' }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-canvas-soft)'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                              Admin Dashboard
                            </Link>
                          )}
                          <button
                            onClick={logout}
                            className="w-full text-left px-4 py-3 type-body-sm transition-colors"
                            style={{ color: 'var(--color-ink)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-canvas-soft)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                          >
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2 ml-2">
                  <Link href="/login" className="btn-outline" style={{ padding: '8px 16px', fontSize: '14px' }} id="nav-login">
                    Log in
                  </Link>
                  <Link href="/register" className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }} id="nav-signup">
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 ml-auto"
              style={{ color: 'var(--color-ink)' }}
              id="nav-mobile-toggle"
            >
              {mobileOpen
                ? <HiOutlineX className="w-6 h-6" />
                : <HiOutlineMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ─── Mobile Menu ─── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t overflow-hidden"
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderColor: 'var(--color-hairline)',
              }}
            >
              <div className="px-4 py-4">
                {/* Mobile search */}
                <div
                  className="flex items-center border mb-4"
                  style={{
                    borderColor: 'var(--color-ink)',
                    borderRadius: 'var(--rounded-full)',
                    padding: '0 16px',
                    height: '44px',
                  }}
                >
                  <HiOutlineSearch className="w-5 h-5 shrink-0" style={{ color: 'var(--color-body)' }} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="flex-1 bg-transparent border-none outline-none px-3 text-[15px]"
                    style={{ color: 'var(--color-ink)' }}
                  />
                </div>

                {/* Mobile links */}
                <div className="space-y-0">
                  <Link
                    href="/courses"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 type-body-md-strong border-b"
                    style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-ink)' }}
                  >
                    Courses
                  </Link>
                  <Link
                    href="/institutes"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 type-body-md-strong border-b"
                    style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-ink)' }}
                  >
                    Institutes
                  </Link>

                  {/* Categories in mobile */}
                  <div className="border-b" style={{ borderColor: 'var(--color-hairline)' }}>
                    <p className="px-3 pt-4 pb-2 eyebrow" style={{ fontSize: '12px' }}>Categories</p>
                    <div className="grid grid-cols-2 gap-0">
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/courses?category=${cat.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="px-3 py-2 type-body-sm"
                          style={{ color: 'var(--color-ink)' }}
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Auth buttons */}
                <div className="flex gap-2 pt-4">
                  {isAuthenticated ? (
                    <button onClick={logout} className="btn-outline w-full" style={{ fontSize: '14px' }}>
                      Sign Out
                    </button>
                  ) : (
                    <>
                      <Link href="/login" className="btn-outline w-full text-center" style={{ fontSize: '14px' }}>
                        Log in
                      </Link>
                      <Link href="/register" className="btn-primary w-full text-center" style={{ fontSize: '14px' }}>
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
