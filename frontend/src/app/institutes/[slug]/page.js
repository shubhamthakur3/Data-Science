'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HiOutlineStar, HiOutlineLocationMarker, HiOutlineGlobe,
  HiOutlineCheckCircle, HiOutlineMail, HiOutlinePhone,
  HiOutlineCalendar, HiOutlineAcademicCap
} from 'react-icons/hi';
import { institutesAPI, coursesAPI } from '@/lib/api';

/* ─── Stars Helper ─── */
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

export default function InstituteDetailPage() {
  const params = useParams();
  const [institute, setInstitute] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const fetchInstituteData = async () => {
      if (!params?.slug) return;
      setLoading(true);
      try {
        const response = await institutesAPI.detail(params.slug);
        setInstitute(response.data);
        fetchCourses(params.slug);
      } catch (error) {
        console.error('Failed to fetch institute detail:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCourses = async (slug) => {
      setLoadingCourses(true);
      try {
        const response = await coursesAPI.list({ institute__slug: slug });
        setCourses(response.data?.results || []);
      } catch (error) {
        console.error('Failed to fetch institute courses:', error);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchInstituteData();
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="text-center">
          <div
            className="w-10 h-10 border-2 mx-auto mb-4 animate-spin"
            style={{
              borderColor: 'var(--color-hairline)',
              borderTopColor: 'var(--color-ink)',
              borderRadius: 'var(--rounded-full)',
            }}
          />
          <p className="type-body-sm" style={{ color: 'var(--color-body)' }}>Loading institute...</p>
        </div>
      </div>
    );
  }

  if (!institute) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="text-center border p-12" style={{ borderColor: 'var(--color-hairline)' }}>
          <h2 className="type-display-md mb-2" style={{ color: 'var(--color-ink)' }}>Institute Not Found</h2>
          <p className="type-body-sm mb-6" style={{ color: 'var(--color-body)' }}>The requested institute could not be loaded.</p>
          <Link href="/institutes" className="btn-primary">Browse Institutes</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--color-canvas)' }}>
      {/* ─── Header Section (Wired editorial style) ─── */}
      <div
        style={{
          backgroundColor: 'var(--color-canvas-soft)',
          borderBottom: '1px solid var(--color-hairline)',
          padding: 'var(--space-3xl) 0',
        }}
      >
        <div className="container-wide">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 type-body-sm mb-4" style={{ color: 'var(--color-body)' }}>
            <Link href="/" style={{ color: 'var(--color-ink)' }} className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/institutes" style={{ color: 'var(--color-ink)' }} className="hover:underline">Institutes</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-body)' }}>{institute.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Logo placeholder */}
            <div
              className="shrink-0 w-[100px] h-[100px] flex items-center justify-center border bg-white"
              style={{ borderColor: 'var(--color-hairline)' }}
            >
              <span className="type-display-sm" style={{ color: 'var(--color-ink)', fontWeight: 700 }}>
                {institute.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </span>
            </div>

            {/* Main info */}
            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <h1 className="type-display-md" style={{ color: 'var(--color-ink)' }}>
                  {institute.name}
                </h1>
                {institute.is_verified && (
                  <span className="flex items-center gap-1 type-caption bg-black text-white px-2 py-0.5" style={{ letterSpacing: '0.4px' }}>
                    <HiOutlineCheckCircle className="w-3.5 h-3.5" />
                    VERIFIED
                  </span>
                )}
              </div>

              {/* Location & Rating */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 type-body-sm mb-4" style={{ color: 'var(--color-ink)' }}>
                <span className="flex items-center gap-1">
                  <HiOutlineLocationMarker className="w-4 h-4 text-gray-500" />
                  {institute.city}, {institute.state}
                </span>
                {institute.avg_rating && (
                  <span className="flex items-center gap-1 border-l pl-4" style={{ borderColor: 'var(--color-hairline)' }}>
                    <span className="type-body-sm-strong" style={{ color: '#b4690e' }}>{institute.avg_rating}</span>
                    <Stars rating={institute.avg_rating} />
                    <span style={{ color: 'var(--color-body)' }}>({institute.total_reviews} reviews)</span>
                  </span>
                )}
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-4 type-caption" style={{ color: 'var(--color-body)' }}>
                <span>Established in <span className="text-black font-semibold">{institute.established_year || '—'}</span></span>
                <span>•</span>
                <span>Courses Offered: <span className="text-black font-semibold">{institute.total_courses || courses.length}</span></span>
                <span>•</span>
                <span>Placements Reported: <span className="text-black font-semibold">{institute.total_placements || '—'}</span></span>
              </div>
            </div>

            {/* Quick CTAs */}
            {institute.website && (
              <div className="shrink-0 w-full md:w-auto">
                <a
                  href={institute.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center flex items-center justify-center gap-2"
                >
                  <HiOutlineGlobe className="w-4 h-4" />
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Page Grid Content ─── */}
      <div className="container-wide" style={{ padding: 'var(--space-3xl) var(--space-xl)' }}>
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Left Columns */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About */}
            <div>
              <h2 className="type-display-xs mb-4 pb-2 border-b" style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-ink)' }}>
                About the Institute
              </h2>
              <div className="type-body-serif-md text-gray-800 space-y-4">
                {institute.description ? (
                  <p>{institute.description}</p>
                ) : (
                  <p>{institute.short_description || 'No detailed description available.'}</p>
                )}
              </div>
            </div>

            {/* Courses offered */}
            <div>
              <h2 className="type-display-xs mb-4 pb-2 border-b" style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-ink)' }}>
                Courses Offered
              </h2>
              {loadingCourses ? (
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="p-4 border border-gray-200">
                      <div className="skeleton h-5 w-1/2 mb-3" />
                      <div className="skeleton h-4 w-3/4 mb-2" />
                      <div className="skeleton h-4 w-1/4" />
                    </div>
                  ))}
                </div>
              ) : courses.length === 0 ? (
                <div className="text-center py-12 border" style={{ borderColor: 'var(--color-hairline)' }}>
                  <HiOutlineAcademicCap className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                  <p className="type-body-sm text-gray-500">No active courses cataloged for this institute yet.</p>
                </div>
              ) : (
                <div className="space-y-0 border-t" style={{ borderColor: 'var(--color-hairline)' }}>
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors"
                      style={{ borderColor: 'var(--color-hairline)' }}
                    >
                      <div>
                        <Link href={`/courses/${course.slug}`} className="type-body-md-strong block hover:underline" style={{ color: 'var(--color-ink)' }}>
                          {course.title}
                        </Link>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 type-caption text-gray-500 mt-1">
                          <span>{course.duration_weeks} weeks</span>
                          <span>•</span>
                          <span>{course.difficulty}</span>
                          <span>•</span>
                          <span>{course.mode}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right sm:text-right">
                          <p className="type-body-sm-strong" style={{ color: 'var(--color-ink)' }}>
                            ₹{(course.discounted_fees || course.fees || 0).toLocaleString('en-IN')}
                          </p>
                          {course.discounted_fees && course.fees && course.discounted_fees < course.fees && (
                            <p className="type-caption line-through text-gray-400">
                              ₹{course.fees.toLocaleString('en-IN')}
                            </p>
                          )}
                        </div>
                        <Link href={`/courses/${course.slug}`} className="btn-outline" style={{ padding: '6px 12px', fontSize: '13px' }}>
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar right columns */}
          <div>
            <div className="border p-6 space-y-6 sticky top-[92px]" style={{ borderColor: 'var(--color-hairline)' }}>
              <h3 className="eyebrow" style={{ fontSize: '13px', borderBottom: '1px solid var(--color-hairline)', paddingBottom: '8px' }}>
                Contact & Info
              </h3>
              
              <ul className="space-y-4">
                {institute.established_year && (
                  <li className="flex items-start gap-3">
                    <HiOutlineCalendar className="w-5 h-5 shrink-0 text-gray-500 mt-0.5" />
                    <div>
                      <p className="type-caption text-gray-400">Established</p>
                      <p className="type-body-sm-strong" style={{ color: 'var(--color-ink)' }}>{institute.established_year}</p>
                    </div>
                  </li>
                )}

                {institute.address && (
                  <li className="flex items-start gap-3">
                    <HiOutlineLocationMarker className="w-5 h-5 shrink-0 text-gray-500 mt-0.5" />
                    <div>
                      <p className="type-caption text-gray-400">Address</p>
                      <p className="type-body-sm text-gray-700">{institute.address}, {institute.city} - {institute.pincode}</p>
                    </div>
                  </li>
                )}

                {institute.email && (
                  <li className="flex items-start gap-3">
                    <HiOutlineMail className="w-5 h-5 shrink-0 text-gray-500 mt-0.5" />
                    <div>
                      <p className="type-caption text-gray-400">Email Address</p>
                      <a href={`mailto:${institute.email}`} className="type-body-sm hover:underline" style={{ color: 'var(--color-link)' }}>
                        {institute.email}
                      </a>
                    </div>
                  </li>
                )}

                {institute.phone && (
                  <li className="flex items-start gap-3">
                    <HiOutlinePhone className="w-5 h-5 shrink-0 text-gray-500 mt-0.5" />
                    <div>
                      <p className="type-caption text-gray-400">Contact Number</p>
                      <a href={`tel:${institute.phone}`} className="type-body-sm hover:underline" style={{ color: 'var(--color-link)' }}>
                        {institute.phone}
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
