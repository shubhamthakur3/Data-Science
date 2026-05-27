'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiOutlineSearch, HiOutlineFilter, HiOutlineStar,
  HiOutlineAcademicCap, HiOutlineX, HiOutlineChevronDown,
  HiOutlineArrowRight, HiOutlineClock
} from 'react-icons/hi';
import { coursesAPI } from '@/lib/api';

/* ─── Filter options ─── */
const difficulties = [
  { value: '', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const modes = [
  { value: '', label: 'All Modes' },
  { value: 'online', label: 'Online' },
  { value: 'offline', label: 'Offline' },
  { value: 'hybrid', label: 'Hybrid' },
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: '-avg_rating', label: 'Highest Rated' },
  { value: 'fees', label: 'Price: Low to High' },
  { value: '-fees', label: 'Price: High to Low' },
  { value: '-created_at', label: 'Newest' },
];

/* ─── Stars ─── */
function Stars({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < Math.floor(rating) ? '#b4690e' : '#e0e0e0'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  );
}

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [mode, setMode] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, difficulty, mode, sortBy]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (difficulty) params.difficulty = difficulty;
      if (mode) params.mode = mode;
      if (sortBy && sortBy !== 'popular') params.ordering = sortBy;
      const res = await coursesAPI.list(params);
      setCourses(res.data?.results || []);
      setTotalResults(res.data?.count || 0);
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const activeFilterCount = [difficulty, mode].filter(Boolean).length;

  return (
    <div style={{ backgroundColor: 'var(--color-canvas)' }}>
      {/* ─── Page Header ─── */}
      <div
        style={{
          backgroundColor: 'var(--color-canvas-soft)',
          borderBottom: '1px solid var(--color-hairline)',
          padding: 'var(--space-3xl) 0',
        }}
      >
        <div className="container-wide">
          <h1 className="type-display-lg mb-2" style={{ color: 'var(--color-ink)' }}>
            All Courses
          </h1>
          <p className="type-body-serif-md" style={{ color: 'var(--color-body)' }}>
            Browse our complete catalog of Data Science, AI & Machine Learning courses.
          </p>
        </div>
      </div>

      <div className="container-wide" style={{ padding: 'var(--space-3xl) var(--space-xl)' }}>
        {/* ─── Search + Sort Bar ─── */}
        <div
          className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8"
        >
          {/* Search */}
          <div className="flex-1 flex items-center border" style={{
            borderColor: 'var(--color-ink)',
            borderRadius: 'var(--rounded-none)',
            padding: '0 16px',
            height: '48px',
          }}>
            <HiOutlineSearch className="w-5 h-5 shrink-0" style={{ color: 'var(--color-body)' }} />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none px-3 type-body-md"
              style={{ color: 'var(--color-ink)' }}
              id="courses-search"
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ color: 'var(--color-body)' }}>
                <HiOutlineX className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="type-body-sm border bg-white px-3 py-2"
              style={{
                borderColor: 'var(--color-ink)',
                borderRadius: 'var(--rounded-none)',
                color: 'var(--color-ink)',
                height: '48px',
                minWidth: '180px',
              }}
              id="courses-sort"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-outline flex items-center gap-2"
              style={{ height: '48px', padding: '0 16px' }}
            >
              <HiOutlineFilter className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span
                  className="type-caption px-1.5 py-0.5"
                  style={{
                    backgroundColor: 'var(--color-ink)',
                    color: 'var(--color-on-primary)',
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* ─── Sidebar Filters (Udemy-style) ─── */}
          <aside
            className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-[240px] shrink-0`}
          >
            <div
              className="border p-0 sticky top-[88px]"
              style={{ borderColor: 'var(--color-hairline)' }}
            >
              {/* Difficulty filter */}
              <div className="p-4 border-b" style={{ borderColor: 'var(--color-hairline)' }}>
                <p className="eyebrow mb-3" style={{ fontSize: '12px' }}>Level</p>
                <div className="space-y-2">
                  {difficulties.map((d) => (
                    <label key={d.value} className="flex items-center gap-2 cursor-pointer type-body-sm" style={{ color: 'var(--color-ink)' }}>
                      <input
                        type="radio"
                        name="difficulty"
                        checked={difficulty === d.value}
                        onChange={() => setDifficulty(d.value)}
                        className="accent-black"
                      />
                      {d.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Mode filter */}
              <div className="p-4 border-b" style={{ borderColor: 'var(--color-hairline)' }}>
                <p className="eyebrow mb-3" style={{ fontSize: '12px' }}>Mode</p>
                <div className="space-y-2">
                  {modes.map((m) => (
                    <label key={m.value} className="flex items-center gap-2 cursor-pointer type-body-sm" style={{ color: 'var(--color-ink)' }}>
                      <input
                        type="radio"
                        name="mode"
                        checked={mode === m.value}
                        onChange={() => setMode(m.value)}
                        className="accent-black"
                      />
                      {m.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear filters */}
              {activeFilterCount > 0 && (
                <div className="p-4">
                  <button
                    onClick={() => { setDifficulty(''); setMode(''); }}
                    className="type-body-sm-strong w-full text-center py-2 border transition-colors"
                    style={{
                      borderColor: 'var(--color-ink)',
                      color: 'var(--color-ink)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-ink)';
                      e.currentTarget.style.color = 'var(--color-on-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--color-ink)';
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* ─── Course Grid ─── */}
          <div className="flex-1">
            {/* Results count */}
            <p className="type-body-sm mb-4" style={{ color: 'var(--color-body)' }}>
              {loading ? 'Loading...' : `${totalResults} result${totalResults !== 1 ? 's' : ''}`}
            </p>

            {loading ? (
              <div className="space-y-0">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 border-b"
                    style={{ borderColor: 'var(--color-hairline)' }}
                  >
                    <div className="skeleton shrink-0" style={{ width: '260px', height: '145px' }} />
                    <div className="flex-1 space-y-3 py-2">
                      <div className="skeleton" style={{ height: '18px', width: '70%' }} />
                      <div className="skeleton" style={{ height: '14px', width: '100%' }} />
                      <div className="skeleton" style={{ height: '14px', width: '40%' }} />
                      <div className="skeleton" style={{ height: '16px', width: '20%' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-16 border" style={{ borderColor: 'var(--color-hairline)' }}>
                <HiOutlineAcademicCap className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-hairline)' }} />
                <h3 className="type-display-xs mb-2" style={{ color: 'var(--color-ink)' }}>
                  No courses found
                </h3>
                <p className="type-body-sm mb-4" style={{ color: 'var(--color-body)' }}>
                  Try adjusting your search or filters.
                </p>
                <button
                  onClick={() => { setSearch(''); setDifficulty(''); setMode(''); }}
                  className="btn-outline"
                  style={{ fontSize: '14px', padding: '8px 20px' }}
                >
                  Clear All
                </button>
              </div>
            ) : (
              /* Udemy-style — horizontal list rows */
              <div className="space-y-0">
                {courses.map((course, i) => (
                  <motion.div
                    key={course.id || i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={`/courses/${course.slug}`}
                      className="flex flex-col md:flex-row gap-4 p-4 border-b transition-colors group"
                      style={{ borderColor: 'var(--color-hairline)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-canvas-soft)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                      id={`course-row-${i}`}
                    >
                      {/* Thumbnail */}
                      <div
                        className="shrink-0 w-full md:w-[260px] h-[145px] flex items-center justify-center border"
                        style={{
                          borderColor: 'var(--color-hairline)',
                          backgroundColor: 'var(--color-canvas-soft)',
                        }}
                      >
                        <HiOutlineAcademicCap className="w-10 h-10" style={{ color: 'var(--color-hairline)' }} />
                      </div>

                      {/* Details */}
                      <div className="flex-1 py-1">
                        <h3 className="type-body-md-strong mb-1" style={{ color: 'var(--color-ink)' }}>
                          {course.title}
                        </h3>
                        <p className="type-body-sm mb-1" style={{ color: 'var(--color-body)' }}>
                          {course.short_description}
                        </p>
                        <p className="type-caption mb-2" style={{ color: 'var(--color-body)' }}>
                          {course.institute_name}{course.institute_city ? ` · ${course.institute_city}` : ''}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <span className="type-body-sm-strong" style={{ color: '#b4690e' }}>
                            {course.avg_rating || '4.5'}
                          </span>
                          <Stars rating={course.avg_rating || 4.5} />
                          <span className="type-caption" style={{ color: 'var(--color-body)' }}>
                            ({course.total_reviews || 0})
                          </span>
                        </div>

                        {/* Meta tags */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="type-caption" style={{ color: 'var(--color-body)' }}>
                            {course.duration_weeks} weeks
                          </span>
                          <span style={{ color: 'var(--color-hairline)' }}>·</span>
                          <span className="type-caption" style={{ color: 'var(--color-body)' }}>
                            {course.difficulty}
                          </span>
                          <span style={{ color: 'var(--color-hairline)' }}>·</span>
                          <span className="type-caption" style={{ color: 'var(--color-body)' }}>
                            {course.mode}
                          </span>
                          {course.placement_support && (
                            <>
                              <span style={{ color: 'var(--color-hairline)' }}>·</span>
                              <span className="type-caption" style={{ color: 'var(--color-body)' }}>
                                Placement Support
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Price column */}
                      <div className="shrink-0 text-right md:py-1 md:w-[120px]">
                        <p className="type-body-md-strong" style={{ color: 'var(--color-ink)' }}>
                          ₹{(course.discounted_fees || course.fees || 0).toLocaleString('en-IN')}
                        </p>
                        {course.discounted_fees && course.fees && course.discounted_fees < course.fees && (
                          <p className="type-caption line-through" style={{ color: 'var(--color-body)' }}>
                            ₹{course.fees.toLocaleString('en-IN')}
                          </p>
                        )}
                        {course.is_trending && (
                          <span
                            className="badge mt-2 inline-block"
                            style={{
                              backgroundColor: 'var(--color-canvas-soft)',
                              color: 'var(--color-ink)',
                              border: '1px solid var(--color-hairline)',
                              fontSize: '11px',
                            }}
                          >
                            Bestseller
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
