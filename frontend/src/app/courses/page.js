'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiOutlineSearch, HiOutlineFilter, HiOutlineStar,
  HiOutlineAcademicCap, HiOutlineX, HiOutlineChevronDown
} from 'react-icons/hi';
import { formatCurrency, getDifficultyColor, getModeColor } from '@/lib/utils';

import { coursesAPI } from '@/lib/api';

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

export default function CoursesPage() {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [mode, setMode] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (difficulty) params.difficulty = difficulty;
        if (mode) params.mode = mode;

        if (sortBy === 'price_low') params.ordering = 'fees';
        else if (sortBy === 'price_high') params.ordering = '-fees';
        else if (sortBy === 'rating') params.ordering = '-avg_rating';
        else if (sortBy === 'duration') params.ordering = 'duration_weeks';
        else params.ordering = '-total_enrollments'; // popular

        const response = await coursesAPI.list(params);
        setFilteredCourses(response.data.results || response.data || []);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    const handler = setTimeout(() => {
      fetchCourses();
    }, 300);

    return () => clearTimeout(handler);
  }, [search, difficulty, mode, sortBy]);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Explore <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-[var(--text-secondary)]">
            {filteredCourses.length} courses found — discover your perfect program.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-5 h-5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input !pl-12"
                placeholder="Search courses, institutes, or technologies..."
              />
              {search && (
                <button onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white">
                  <HiOutlineX className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-secondary flex items-center gap-2 ${showFilters ? 'border-indigo-500 text-indigo-400' : ''}`}
            >
              <HiOutlineFilter className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="card p-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="input !py-2.5"
                >
                  {difficulties.map(d => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="input !py-2.5"
                >
                  {modes.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input !py-2.5"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price_low">Price: Low → High</option>
                  <option value="price_high">Price: High → Low</option>
                  <option value="duration">Shortest Duration</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* Active filters */}
          {(difficulty || mode) && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-[var(--text-muted)]">Active:</span>
              {difficulty && (
                <button
                  onClick={() => setDifficulty('')}
                  className="badge bg-indigo-500/20 text-indigo-300 cursor-pointer hover:bg-indigo-500/30 flex items-center gap-1"
                >
                  {difficulty} <HiOutlineX className="w-3 h-3" />
                </button>
              )}
              {mode && (
                <button
                  onClick={() => setMode('')}
                  className="badge bg-cyan-500/20 text-cyan-300 cursor-pointer hover:bg-cyan-500/30 flex items-center gap-1"
                >
                  {mode} <HiOutlineX className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </motion.div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse overflow-hidden h-[380px] flex flex-col justify-between p-5 bg-white/5">
                <div className="h-40 rounded-xl bg-white/5 mb-4" />
                <div className="h-6 bg-white/10 rounded w-3/4 mb-2" />
                <div className="h-4 bg-white/5 rounded w-1/2 mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-white/5 rounded w-full" />
                  <div className="h-4 bg-white/5 rounded w-5/6" />
                </div>
                <div className="h-10 bg-white/10 rounded mt-4" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/courses/${course.slug}`} className="card block overflow-hidden group h-full">
                    {/* Header */}
                    <div className="h-40 bg-gradient-to-br from-indigo-600/20 to-cyan-600/10 relative flex items-center justify-center">
                      <HiOutlineAcademicCap className="w-10 h-10 text-indigo-400/50" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`badge ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </span>
                        <span className={`badge ${getModeColor(course.mode)}`}>
                          {course.mode}
                        </span>
                      </div>
                      {course.is_trending && (
                        <span className="absolute top-3 right-3 badge bg-amber-500/20 text-amber-300">
                          🔥 Trending
                        </span>
                      )}
                      {course.discounted_fees && (
                        <span className="absolute bottom-3 right-3 badge bg-green-500/20 text-green-300">
                          {Math.round(((course.fees - course.discounted_fees) / course.fees) * 100)}% OFF
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <h3 className="font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mb-3">
                        {course.institute_name} • {course.institute_city}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                        {course.short_description}
                      </p>

                      {/* Tools */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {course.tools_covered.slice(0, 4).map((tool) => (
                          <span key={tool} className="text-xs px-2 py-0.5 rounded bg-white/5 text-[var(--text-muted)]">
                            {tool}
                          </span>
                        ))}
                        {course.tools_covered.length > 4 && (
                          <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-[var(--text-muted)]">
                            +{course.tools_covered.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-1">
                          <HiOutlineStar className="w-4 h-4 text-amber-400" />
                          <span className="font-semibold text-white">{course.avg_rating}</span>
                          <span className="text-[var(--text-muted)]">({course.total_reviews})</span>
                        </div>
                        <span className="text-[var(--text-muted)]">{course.duration_weeks} weeks</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                        <div>
                          {course.discounted_fees ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold gradient-text">
                                {formatCurrency(course.discounted_fees)}
                              </span>
                              <span className="text-sm text-[var(--text-muted)] line-through">
                                {formatCurrency(course.fees)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold gradient-text">
                              {formatCurrency(course.fees)}
                            </span>
                          )}
                        </div>
                        {course.placement_support && (
                          <span className="text-xs text-green-400 flex items-center gap-1">
                            ✓ Placement
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-20">
                <HiOutlineSearch className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Try adjusting your filters or search query.
                </p>
                <button
                  onClick={() => { setSearch(''); setDifficulty(''); setMode(''); }}
                  className="btn-secondary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
