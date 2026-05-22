'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiOutlineStar, HiOutlineLocationMarker, HiOutlineAcademicCap,
  HiOutlineSearch, HiOutlineBriefcase, HiOutlineGlobe
} from 'react-icons/hi';

const demoInstitutes = [
  {
    id: '1', name: 'DataTech Academy', slug: 'datatech-academy',
    short_description: 'Premier Data Science training institute with 95% placement rate and industry-expert trainers.',
    city: 'Bengaluru', state: 'Karnataka',
    avg_rating: 4.9, total_reviews: 520, total_courses: 12, total_placements: 2800,
    is_featured: true, established_year: 2018,
    website: 'https://datatechacademy.com',
  },
  {
    id: '2', name: 'AI Institute India', slug: 'ai-institute-india',
    short_description: 'Advanced AI & Machine Learning research-focused training center with PhD-led curriculum.',
    city: 'Mumbai', state: 'Maharashtra',
    avg_rating: 4.8, total_reviews: 380, total_courses: 8, total_placements: 1500,
    is_featured: true, established_year: 2019,
    website: 'https://aiinstitute.in',
  },
  {
    id: '3', name: 'Analytics Hub', slug: 'analytics-hub',
    short_description: 'Practical analytics training with real-world business projects co-designed with Fortune 500 companies.',
    city: 'Hyderabad', state: 'Telangana',
    avg_rating: 4.7, total_reviews: 650, total_courses: 15, total_placements: 3500,
    is_featured: true, established_year: 2017,
    website: 'https://analyticshub.in',
  },
  {
    id: '4', name: 'Code Institute', slug: 'code-institute',
    short_description: 'Intensive coding bootcamp that transforms beginners into job-ready data professionals.',
    city: 'Delhi', state: 'Delhi',
    avg_rating: 4.6, total_reviews: 290, total_courses: 6, total_placements: 1200,
    is_featured: false, established_year: 2020,
    website: 'https://codeinstitute.co.in',
  },
  {
    id: '5', name: 'Neural Academy', slug: 'neural-academy',
    short_description: 'Deep Learning specialist with GPU-powered labs and research mentorship programs.',
    city: 'Pune', state: 'Maharashtra',
    avg_rating: 4.9, total_reviews: 180, total_courses: 5, total_placements: 800,
    is_featured: true, established_year: 2021,
    website: 'https://neuralacademy.com',
  },
];

export default function InstitutesPage() {
  const [search, setSearch] = useState('');

  const filtered = demoInstitutes.filter(
    (inst) =>
      !search ||
      inst.name.toLowerCase().includes(search.toLowerCase()) ||
      inst.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Top <span className="gradient-text">Institutes</span>
          </h1>
          <p className="text-[var(--text-secondary)]">
            {filtered.length} verified Data Science training institutes across India.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="relative max-w-xl">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-5 h-5" />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              className="input !pl-12" placeholder="Search institutes by name or city..."
            />
          </div>
        </motion.div>

        {/* Institute Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((inst, i) => (
            <motion.div key={inst.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/institutes/${inst.slug}`} className="card block p-6 group h-full">
                <div className="flex items-start gap-4">
                  {/* Logo Placeholder */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                    <HiOutlineAcademicCap className="w-8 h-8 text-indigo-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {inst.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mt-1">
                          <HiOutlineLocationMarker className="w-4 h-4" />
                          {inst.city}, {inst.state}
                          {inst.established_year && <span>• Est. {inst.established_year}</span>}
                        </div>
                      </div>
                      {inst.is_featured && (
                        <span className="badge bg-amber-500/20 text-amber-300 whitespace-nowrap">⭐ Featured</span>
                      )}
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] mt-3 line-clamp-2">
                      {inst.short_description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-[var(--border)]">
                      <div className="flex items-center gap-1">
                        <HiOutlineStar className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-semibold text-white">{inst.avg_rating}</span>
                        <span className="text-xs text-[var(--text-muted)]">({inst.total_reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                        <HiOutlineAcademicCap className="w-4 h-4" />
                        {inst.total_courses} courses
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                        <HiOutlineBriefcase className="w-4 h-4" />
                        {inst.total_placements.toLocaleString()} placed
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
