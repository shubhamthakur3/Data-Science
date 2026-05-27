'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiOutlineStar, HiOutlineAcademicCap, HiOutlineLocationMarker,
  HiOutlineGlobe, HiOutlineCheckCircle
} from 'react-icons/hi';

/* ─── Static institute data (will be replaced with API later) ─── */
const institutes = [
  {
    name: 'DataTech Academy', slug: 'datatech-academy', city: 'Bengaluru', state: 'Karnataka',
    description: 'Premier institute for Data Science and AI with industry-grade curriculum and strong placement network.',
    avg_rating: 4.9, total_reviews: 520, total_courses: 12, total_students: 3200,
    placement_rate: 92, website: 'https://datatech.example.com', is_verified: true,
  },
  {
    name: 'AI Institute India', slug: 'ai-institute-india', city: 'Mumbai', state: 'Maharashtra',
    description: 'Specialising in advanced ML and Deep Learning with research-backed pedagogy.',
    avg_rating: 4.8, total_reviews: 389, total_courses: 8, total_students: 2100,
    placement_rate: 88, website: 'https://aiinstitute.example.com', is_verified: true,
  },
  {
    name: 'Analytics Hub', slug: 'analytics-hub', city: 'Hyderabad', state: 'Telangana',
    description: 'End-to-end analytics training from Excel to advanced statistical modelling.',
    avg_rating: 4.7, total_reviews: 445, total_courses: 10, total_students: 2800,
    placement_rate: 85, website: 'https://analyticshub.example.com', is_verified: true,
  },
  {
    name: 'CloudML Academy', slug: 'cloudml-academy', city: 'Pune', state: 'Maharashtra',
    description: 'Cloud-native machine learning training on AWS, GCP, and Azure platforms.',
    avg_rating: 4.6, total_reviews: 278, total_courses: 6, total_students: 1500,
    placement_rate: 80, website: 'https://cloudml.example.com', is_verified: false,
  },
  {
    name: 'DeepVision Labs', slug: 'deepvision-labs', city: 'Chennai', state: 'Tamil Nadu',
    description: 'Computer vision and deep learning specialist with industry research projects.',
    avg_rating: 4.8, total_reviews: 198, total_courses: 5, total_students: 900,
    placement_rate: 90, website: 'https://deepvision.example.com', is_verified: true,
  },
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

export default function InstitutesPage() {
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
            Institutes
          </h1>
          <p className="type-body-serif-md" style={{ color: 'var(--color-body)' }}>
            Verified training academies offering top Data Science and AI programs across India.
          </p>
        </div>
      </div>

      {/* ─── Institute List ─── */}
      <div className="container-wide" style={{ padding: 'var(--space-3xl) var(--space-xl)' }}>
        <p className="type-body-sm mb-6" style={{ color: 'var(--color-body)' }}>
          {institutes.length} institutes
        </p>

        <div className="space-y-0">
          {institutes.map((inst, i) => (
            <motion.div
              key={inst.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.06 }}
            >
              <div
                className="flex flex-col md:flex-row gap-6 p-6 border-b transition-colors"
                style={{ borderColor: 'var(--color-hairline)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-canvas-soft)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {/* Logo placeholder */}
                <div
                  className="shrink-0 w-[80px] h-[80px] flex items-center justify-center border"
                  style={{ borderColor: 'var(--color-hairline)' }}
                >
                  <span className="type-display-xs" style={{ color: 'var(--color-hairline)' }}>
                    {inst.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="type-body-md-strong" style={{ color: 'var(--color-ink)' }}>
                      {inst.name}
                    </h3>
                    {inst.is_verified && (
                      <HiOutlineCheckCircle className="w-4 h-4" style={{ color: 'var(--color-ink)' }} />
                    )}
                  </div>

                  <div className="flex items-center gap-1 type-caption mb-2" style={{ color: 'var(--color-body)' }}>
                    <HiOutlineLocationMarker className="w-3 h-3" />
                    {inst.city}, {inst.state}
                  </div>

                  <p className="type-body-sm mb-3" style={{ color: 'var(--color-body)' }}>
                    {inst.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <span className="type-body-sm-strong" style={{ color: '#b4690e' }}>{inst.avg_rating}</span>
                    <Stars rating={inst.avg_rating} />
                    <span className="type-caption" style={{ color: 'var(--color-body)' }}>
                      ({inst.total_reviews} reviews)
                    </span>
                  </div>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-4 type-caption" style={{ color: 'var(--color-body)' }}>
                    <span>{inst.total_courses} courses</span>
                    <span>{inst.total_students.toLocaleString()} students</span>
                    <span>{inst.placement_rate}% placement rate</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="shrink-0 flex flex-col justify-center gap-2">
                  <Link
                    href={`/courses?institute=${inst.slug}`}
                    className="btn-primary text-center"
                    style={{ padding: '10px 20px', fontSize: '14px' }}
                  >
                    View Courses
                  </Link>
                  {inst.website && (
                    <a
                      href={inst.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-center flex items-center justify-center gap-1"
                      style={{ padding: '10px 20px', fontSize: '14px' }}
                    >
                      <HiOutlineGlobe className="w-3.5 h-3.5" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
