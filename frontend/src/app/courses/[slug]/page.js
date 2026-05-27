'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HiOutlineStar, HiOutlineClock, HiOutlineCurrencyRupee, HiOutlineAcademicCap,
  HiOutlineCheckCircle, HiOutlineDesktopComputer, HiOutlineBriefcase,
  HiOutlineChevronDown, HiOutlineChevronUp
} from 'react-icons/hi';
import { coursesAPI, enquiriesAPI } from '@/lib/api';

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

export default function CourseDetailPage() {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedModule, setExpandedModule] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false);

  // Form Fields
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!params?.slug) return;
      setLoading(true);
      try {
        const response = await coursesAPI.detail(params.slug);
        setCourse(response.data);
      } catch (error) {
        console.error('Failed to fetch course details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetail();
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
          <p className="type-body-sm" style={{ color: 'var(--color-body)' }}>Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="text-center border p-12" style={{ borderColor: 'var(--color-hairline)' }}>
          <h2 className="type-display-md mb-2" style={{ color: 'var(--color-ink)' }}>Course Not Found</h2>
          <p className="type-body-sm mb-6" style={{ color: 'var(--color-body)' }}>The requested course could not be loaded.</p>
          <Link href="/courses" className="btn-primary">Browse Courses</Link>
        </div>
      </div>
    );
  }

  const discount = course.discounted_fees
    ? Math.round(((course.fees - course.discounted_fees) / course.fees) * 100)
    : 0;

  return (
    <div style={{ backgroundColor: 'var(--color-canvas)' }}>
      {/* ─── Course Header Band (Udemy-style dark top band) ─── */}
      <div style={{ backgroundColor: 'var(--color-ink)', padding: 'var(--space-3xl) 0' }}>
        <div className="container-wide">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 type-body-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-on-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
            >Home</Link>
            <span>/</span>
            <Link href="/courses" style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-on-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
            >Courses</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-on-primary)' }}>{course.category?.name || 'Course'}</span>
          </nav>

          <div className="max-w-[700px]">
            <h1 className="type-display-md mb-3" style={{ color: 'var(--color-on-primary)' }}>
              {course.title}
            </h1>
            <p className="type-body-serif-md mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {course.short_description}
            </p>

            {/* Rating + Metadata */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {course.is_trending && (
                <span
                  className="badge"
                  style={{
                    backgroundColor: '#eceb98',
                    color: 'var(--color-ink)',
                    fontSize: '11px',
                  }}
                >
                  Bestseller
                </span>
              )}
              <span className="type-body-sm-strong" style={{ color: '#f3ca8c' }}>
                {course.avg_rating || '4.5'}
              </span>
              <Stars rating={course.avg_rating || 4.5} />
              <span className="type-body-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                ({course.total_reviews || 0} reviews)
              </span>
              <span className="type-body-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {(course.total_enrollments || 0).toLocaleString()} students
              </span>
            </div>

            <p className="type-body-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              By{' '}
              <Link
                href={`/institutes/${course.institute?.slug || ''}`}
                style={{ color: 'rgba(255,255,255,0.7)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-on-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              >
                {course.institute?.name}
              </Link>
              {course.institute?.city && ` · ${course.institute.city}`}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="container-wide" style={{ padding: 'var(--space-3xl) var(--space-xl)' }}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ─── Left Column ─── */}
          <div className="flex-1 max-w-[700px]">

            {/* What you'll learn */}
            {course.learning_outcomes?.length > 0 && (
              <div className="border p-6 mb-8" style={{ borderColor: 'var(--color-hairline)' }}>
                <h2 className="type-display-xs mb-4" style={{ color: 'var(--color-ink)' }}>
                  What you will learn
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.learning_outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <HiOutlineCheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--color-ink)' }} />
                      <span className="type-body-sm" style={{ color: 'var(--color-ink)' }}>
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Description */}
            <div className="mb-8">
              <h2 className="type-display-xs mb-4" style={{ color: 'var(--color-ink)' }}>
                Description
              </h2>
              <div className="type-body-serif-md" style={{ color: 'var(--color-ink-soft)' }}>
                {course.description}
              </div>
            </div>

            {/* Syllabus Modules */}
            {course.syllabus_modules?.length > 0 && (
              <div className="mb-8">
                <h2 className="type-display-xs mb-4" style={{ color: 'var(--color-ink)' }}>
                  Course Content
                </h2>
                <p className="type-body-sm mb-4" style={{ color: 'var(--color-body)' }}>
                  {course.syllabus_modules.length} modules · {course.total_hours || '—'} total hours
                </p>

                <div className="border" style={{ borderColor: 'var(--color-hairline)' }}>
                  {course.syllabus_modules
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((mod, i) => (
                      <div
                        key={mod.id}
                        className="border-b last:border-b-0"
                        style={{ borderColor: 'var(--color-hairline)' }}
                      >
                        {/* Module header */}
                        <button
                          onClick={() => setExpandedModule(expandedModule === i ? -1 : i)}
                          className="w-full flex items-center justify-between p-4 text-left transition-colors"
                          style={{
                            backgroundColor: expandedModule === i ? 'var(--color-canvas-soft)' : 'var(--color-canvas)',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-canvas-soft)'; }}
                          onMouseLeave={(e) => {
                            if (expandedModule !== i) e.currentTarget.style.backgroundColor = 'var(--color-canvas)';
                          }}
                        >
                          <div className="flex items-center gap-3">
                            {expandedModule === i
                              ? <HiOutlineChevronUp className="w-4 h-4 shrink-0" />
                              : <HiOutlineChevronDown className="w-4 h-4 shrink-0" />
                            }
                            <span className="type-body-sm-strong" style={{ color: 'var(--color-ink)' }}>
                              {mod.title}
                            </span>
                          </div>
                          <span className="type-caption shrink-0" style={{ color: 'var(--color-body)' }}>
                            {mod.duration_hours}h
                          </span>
                        </button>

                        {/* Module content */}
                        {expandedModule === i && (
                          <div className="px-4 pb-4 pt-2" style={{ paddingLeft: '44px' }}>
                            <p className="type-body-sm mb-3" style={{ color: 'var(--color-body)' }}>
                              {mod.description}
                            </p>
                            {mod.topics?.length > 0 && (
                              <ul className="space-y-1">
                                {mod.topics.map((topic, j) => (
                                  <li key={j} className="flex items-center gap-2 type-body-sm" style={{ color: 'var(--color-ink-soft)' }}>
                                    <span style={{ color: 'var(--color-body)' }}>·</span>
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Tools Covered */}
            {course.tools_covered?.length > 0 && (
              <div className="mb-8">
                <h2 className="type-display-xs mb-4" style={{ color: 'var(--color-ink)' }}>
                  Tools & Technologies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {course.tools_covered.map((tool) => (
                    <span
                      key={tool}
                      className="type-body-sm px-3 py-2 border"
                      style={{
                        borderColor: 'var(--color-hairline)',
                        color: 'var(--color-ink)',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prerequisites */}
            {course.prerequisites?.length > 0 && (
              <div className="mb-8">
                <h2 className="type-display-xs mb-4" style={{ color: 'var(--color-ink)' }}>
                  Prerequisites
                </h2>
                <ul className="space-y-2">
                  {course.prerequisites.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 type-body-sm" style={{ color: 'var(--color-ink-soft)' }}>
                      <span style={{ color: 'var(--color-body)', marginTop: '2px' }}>·</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ─── Right Sidebar (Sticky Price Card — Udemy-style) ─── */}
          <div className="lg:w-[340px] shrink-0">
            <div
              className="border sticky top-[88px]"
              style={{ borderColor: 'var(--color-hairline)' }}
            >
              {/* Price */}
              <div className="p-6 border-b" style={{ borderColor: 'var(--color-hairline)' }}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="type-display-md" style={{ color: 'var(--color-ink)' }}>
                    ₹{(course.discounted_fees || course.fees || 0).toLocaleString('en-IN')}
                  </span>
                  {discount > 0 && (
                    <>
                      <span className="type-body-sm line-through" style={{ color: 'var(--color-body)' }}>
                        ₹{course.fees?.toLocaleString('en-IN')}
                      </span>
                      <span className="type-body-sm" style={{ color: 'var(--color-ink)' }}>
                        {discount}% off
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 space-y-3">
                <button
                  onClick={() => setShowEnquiry(true)}
                  className="btn-primary w-full"
                  style={{ padding: '14px 20px' }}
                  id="enquire-now-btn"
                >
                  Enquire Now
                </button>
                <Link
                  href="/courses"
                  className="btn-outline w-full text-center block"
                  style={{ padding: '14px 20px' }}
                >
                  Browse More
                </Link>
              </div>

              {/* Course Info */}
              <div className="px-6 pb-6">
                <p className="type-body-sm-strong mb-3" style={{ color: 'var(--color-ink)' }}>
                  This course includes:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 type-body-sm" style={{ color: 'var(--color-ink-soft)' }}>
                    <HiOutlineClock className="w-4 h-4 shrink-0" style={{ color: 'var(--color-body)' }} />
                    {course.total_hours || '—'} hours of content
                  </li>
                  <li className="flex items-center gap-3 type-body-sm" style={{ color: 'var(--color-ink-soft)' }}>
                    <HiOutlineDesktopComputer className="w-4 h-4 shrink-0" style={{ color: 'var(--color-body)' }} />
                    {course.mode} · {course.duration_weeks} weeks
                  </li>
                  <li className="flex items-center gap-3 type-body-sm" style={{ color: 'var(--color-ink-soft)' }}>
                    <HiOutlineAcademicCap className="w-4 h-4 shrink-0" style={{ color: 'var(--color-body)' }} />
                    {course.difficulty} level
                  </li>
                  {course.certification && (
                    <li className="flex items-center gap-3 type-body-sm" style={{ color: 'var(--color-ink-soft)' }}>
                      <HiOutlineCheckCircle className="w-4 h-4 shrink-0" style={{ color: 'var(--color-body)' }} />
                      Certificate of completion
                    </li>
                  )}
                  {course.placement_support && (
                    <li className="flex items-center gap-3 type-body-sm" style={{ color: 'var(--color-ink-soft)' }}>
                      <HiOutlineBriefcase className="w-4 h-4 shrink-0" style={{ color: 'var(--color-body)' }} />
                      Placement support ({course.placement_rate || '—'}%)
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Enquiry Modal (DESIGN.md: ex-modal-card, rounded-none) ─── */}
      {showEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => { setShowEnquiry(false); setEnquirySuccess(false); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md border"
            style={{
              backgroundColor: 'var(--color-canvas)',
              borderColor: 'var(--color-ink)',
              borderRadius: 'var(--rounded-none)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {enquirySuccess ? (
              <div className="p-8 text-center">
                <HiOutlineCheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-ink)' }} />
                <h3 className="type-display-xs mb-2" style={{ color: 'var(--color-ink)' }}>
                  Enquiry Submitted
                </h3>
                <p className="type-body-sm mb-6" style={{ color: 'var(--color-body)' }}>
                  A counsellor from {course.institute?.name || 'the institute'} will contact you shortly.
                </p>
                <button
                  onClick={() => { setEnquirySuccess(false); setShowEnquiry(false); }}
                  className="btn-primary w-full"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="p-6 border-b" style={{ borderColor: 'var(--color-hairline)' }}>
                  <h2 className="type-display-xs" style={{ color: 'var(--color-ink)' }}>
                    Enquire About This Course
                  </h2>
                  <p className="type-body-sm mt-1" style={{ color: 'var(--color-body)' }}>
                    {course.title}
                  </p>
                </div>

                <form className="p-6 space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmittingEnquiry(true);
                  try {
                    await enquiriesAPI.submit({
                      name: enquiryName,
                      email: enquiryEmail,
                      phone: enquiryPhone,
                      message: enquiryMessage,
                      course: course.id,
                      institute: course.institute?.id,
                      source: 'website'
                    });
                    setEnquirySuccess(true);
                    setEnquiryName(''); setEnquiryEmail(''); setEnquiryPhone(''); setEnquiryMessage('');
                  } catch {
                    alert('Failed to submit. Please try again.');
                  } finally {
                    setSubmittingEnquiry(false);
                  }
                }}>
                  <div>
                    <label className="type-body-sm-strong block mb-1" style={{ color: 'var(--color-ink)' }}>Full Name</label>
                    <input className="input" placeholder="Your name" value={enquiryName} onChange={(e) => setEnquiryName(e.target.value)} required />
                  </div>
                  <div>
                    <label className="type-body-sm-strong block mb-1" style={{ color: 'var(--color-ink)' }}>Email</label>
                    <input className="input" type="email" placeholder="you@example.com" value={enquiryEmail} onChange={(e) => setEnquiryEmail(e.target.value)} required />
                  </div>
                  <div>
                    <label className="type-body-sm-strong block mb-1" style={{ color: 'var(--color-ink)' }}>Phone</label>
                    <input className="input" type="tel" placeholder="+91 98765 43210" value={enquiryPhone} onChange={(e) => setEnquiryPhone(e.target.value)} required />
                  </div>
                  <div>
                    <label className="type-body-sm-strong block mb-1" style={{ color: 'var(--color-ink)' }}>Message (Optional)</label>
                    <textarea className="input" style={{ minHeight: '80px' }} placeholder="Any questions..." value={enquiryMessage} onChange={(e) => setEnquiryMessage(e.target.value)} />
                  </div>
                  <button
                    type="submit"
                    disabled={submittingEnquiry}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                    style={{ padding: '14px 20px' }}
                  >
                    {submittingEnquiry ? (
                      <>
                        <div className="w-4 h-4 border-2 animate-spin" style={{
                          borderColor: 'rgba(255,255,255,0.3)',
                          borderTopColor: 'var(--color-on-primary)',
                          borderRadius: 'var(--rounded-full)',
                        }} />
                        Submitting...
                      </>
                    ) : 'Submit Enquiry'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
