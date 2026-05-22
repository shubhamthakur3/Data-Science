'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HiOutlineStar, HiOutlineClock, HiOutlineCurrencyRupee, HiOutlineAcademicCap,
  HiOutlineCheckCircle, HiOutlineDesktopComputer, HiOutlineBriefcase,
  HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineShare, HiOutlineHeart
} from 'react-icons/hi';
import { formatCurrency, getDifficultyColor, getModeColor } from '@/lib/utils';
import { coursesAPI, enquiriesAPI } from '@/lib/api';

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
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
          <p className="text-sm text-[var(--text-muted)] animate-pulse">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] text-white">
        <div className="text-center card p-8 glass max-w-sm">
          <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
          <p className="text-[var(--text-secondary)] mb-6">The requested course could not be loaded.</p>
          <Link href="/courses" className="btn-primary">Browse Courses</Link>
        </div>
      </div>
    );
  }

  const discount = course.discounted_fees
    ? Math.round(((course.fees - course.discounted_fees) / course.fees) * 100)
    : 0;

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Breadcrumb ─── */}
        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-white">Courses</Link>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">{course.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ─── Main Content ─── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`badge ${getDifficultyColor(course.difficulty)}`}>{course.difficulty}</span>
                <span className={`badge ${getModeColor(course.mode)}`}>{course.mode}</span>
                {course.is_trending && <span className="badge bg-amber-500/20 text-amber-300">🔥 Trending</span>}
                {course.certification && <span className="badge bg-purple-500/20 text-purple-300">📜 Certified</span>}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{course.title}</h1>
              <p className="text-[var(--text-secondary)] text-lg mb-4">{course.short_description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <HiOutlineStar className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-white">{course.avg_rating}</span>
                  <span className="text-[var(--text-muted)]">({course.total_reviews} reviews)</span>
                </div>
                <span className="text-[var(--text-muted)]">•</span>
                <span className="text-[var(--text-secondary)]">{course.total_enrollments.toLocaleString()} students enrolled</span>
                <span className="text-[var(--text-muted)]">•</span>
                <Link href={`/institutes/${course.institute.slug}`} className="text-indigo-400 hover:text-indigo-300">
                  {course.institute.name}
                </Link>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="card p-6">
              <h2 className="text-xl font-bold text-white mb-4">About This Course</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">{course.description}</p>
            </motion.div>

            {/* What You'll Learn */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="card p-6">
              <h2 className="text-xl font-bold text-white mb-4">What You&apos;ll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.learning_outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                    <span className="text-[var(--text-secondary)] text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Syllabus */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="card p-6">
              <h2 className="text-xl font-bold text-white mb-2">Course Syllabus</h2>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                {course.syllabus_modules.length} modules • {course.total_hours} hours total
              </p>

              <div className="space-y-3">
                {course.syllabus_modules.map((mod, i) => (
                  <div key={mod.id} className="border border-[var(--border)] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedModule(expandedModule === i ? -1 : i)}
                      className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm font-bold">
                          {mod.sort_order}
                        </span>
                        <div>
                          <h3 className="font-semibold text-white text-sm">{mod.title}</h3>
                          <p className="text-xs text-[var(--text-muted)]">{mod.duration_hours} hours</p>
                        </div>
                      </div>
                      {expandedModule === i
                        ? <HiOutlineChevronUp className="w-5 h-5 text-[var(--text-muted)]" />
                        : <HiOutlineChevronDown className="w-5 h-5 text-[var(--text-muted)]" />}
                    </button>

                    {expandedModule === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="px-4 pb-4 border-t border-[var(--border)]"
                      >
                        <p className="text-sm text-[var(--text-secondary)] mt-3 mb-3">{mod.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {mod.topics.map((topic) => (
                            <span key={topic} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-[var(--text-muted)]">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tools Covered */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="card p-6">
              <h2 className="text-xl font-bold text-white mb-4">Tools & Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {course.tools_covered.map((tool) => (
                  <span key={tool} className="px-4 py-2 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium hover:border-indigo-500/50 transition-colors">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── Sidebar ─── */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="card p-6 sticky top-24">
              {/* Price */}
              <div className="mb-6">
                {course.discounted_fees ? (
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-3xl font-bold gradient-text">{formatCurrency(course.discounted_fees)}</span>
                      <span className="text-lg text-[var(--text-muted)] line-through">{formatCurrency(course.fees)}</span>
                    </div>
                    <span className="badge bg-green-500/20 text-green-400">{discount}% OFF — Limited Time!</span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold gradient-text">{formatCurrency(course.fees)}</span>
                )}
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-[var(--text-muted)]">
                    <HiOutlineClock className="w-4 h-4" /> Duration
                  </div>
                  <span className="text-white font-medium">{course.duration_weeks} weeks</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-[var(--text-muted)]">
                    <HiOutlineDesktopComputer className="w-4 h-4" /> Mode
                  </div>
                  <span className="text-white font-medium capitalize">{course.mode}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-[var(--text-muted)]">
                    <HiOutlineAcademicCap className="w-4 h-4" /> Level
                  </div>
                  <span className="text-white font-medium capitalize">{course.difficulty}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-[var(--text-muted)]">
                    <HiOutlineClock className="w-4 h-4" /> Total Hours
                  </div>
                  <span className="text-white font-medium">{course.total_hours} hrs</span>
                </div>
                {course.placement_support && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <HiOutlineBriefcase className="w-4 h-4" /> Placement Rate
                    </div>
                    <span className="text-green-400 font-medium">{course.placement_rate}%</span>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowEnquiry(true)}
                  className="btn-primary w-full !py-3 text-base"
                >
                  Enquire Now
                </button>
                <Link href={`/compare?ids=${course.id}`}
                  className="btn-secondary w-full text-center block !py-3 text-base">
                  Add to Compare
                </Link>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-[var(--border)]">
                <button className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-white transition-colors">
                  <HiOutlineHeart className="w-4 h-4" /> Save
                </button>
                <button className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-white transition-colors">
                  <HiOutlineShare className="w-4 h-4" /> Share
                </button>
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="card p-6">
              <h3 className="font-bold text-white mb-4">Course Highlights</h3>
              <div className="space-y-3">
                {course.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <HiOutlineCheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-[var(--text-secondary)]">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Prerequisites */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="card p-6">
              <h3 className="font-bold text-white mb-4">Prerequisites</h3>
              <div className="space-y-2">
                {course.prerequisites.map((p, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    <span className="text-sm text-[var(--text-secondary)]">{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── Enquiry Modal ─── */}
      {showEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => {
            setShowEnquiry(false);
            setEnquirySuccess(false);
          }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-8 w-full max-w-md glass"
            onClick={(e) => e.stopPropagation()}
          >
            {enquirySuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <HiOutlineCheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Enquiry Submitted!</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Thank you for your interest! An academic counsellor from {course.institute?.name || 'the institute'} will contact you shortly.
                </p>
                <button
                  onClick={() => {
                    setEnquirySuccess(false);
                    setShowEnquiry(false);
                  }}
                  className="btn-secondary w-full"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-white mb-2">Enquire About This Course</h2>
                <p className="text-sm text-[var(--text-muted)] mb-6">{course.title}</p>

                <form className="space-y-4" onSubmit={async (e) => {
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
                    setEnquiryName('');
                    setEnquiryEmail('');
                    setEnquiryPhone('');
                    setEnquiryMessage('');
                  } catch (error) {
                    console.error('Failed to submit enquiry:', error);
                    alert('Failed to submit enquiry. Please try again.');
                  } finally {
                    setSubmittingEnquiry(false);
                  }
                }}>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-1">Full Name</label>
                    <input
                      className="input"
                      placeholder="Your name"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-1">Email</label>
                    <input
                      className="input"
                      type="email"
                      placeholder="you@example.com"
                      value={enquiryEmail}
                      onChange={(e) => setEnquiryEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-1">Phone</label>
                    <input
                      className="input"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-1">Message (Optional)</label>
                    <textarea
                      className="input min-h-[80px]"
                      placeholder="Any questions or preferences..."
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submittingEnquiry}
                    className="btn-primary w-full !py-3 flex items-center justify-center gap-2"
                  >
                    {submittingEnquiry ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Enquiry'
                    )}
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
