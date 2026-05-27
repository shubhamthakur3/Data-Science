'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiOutlineAcademicCap, HiOutlineLightningBolt, HiOutlineChartBar,
  HiOutlineSearch, HiOutlineStar, HiOutlineUserGroup, HiOutlineBriefcase,
  HiOutlineCheckCircle, HiOutlineArrowRight, HiOutlineClock,
  HiOutlineCurrencyRupee
} from 'react-icons/hi';
import { coursesAPI } from '@/lib/api';

/* ─── Static Data ─── */
const categories = [
  { name: 'Data Science', slug: 'data-science', icon: '📊' },
  { name: 'Machine Learning', slug: 'machine-learning', icon: '🤖' },
  { name: 'Deep Learning', slug: 'deep-learning', icon: '🧠' },
  { name: 'Data Analytics', slug: 'data-analytics', icon: '📈' },
  { name: 'Python Programming', slug: 'python-programming', icon: '🐍' },
  { name: 'AI & NLP', slug: 'ai-nlp', icon: '💬' },
  { name: 'Data Engineering', slug: 'data-engineering', icon: '⚙️' },
  { name: 'Business Intelligence', slug: 'business-intelligence', icon: '📋' },
];

const stats = [
  { value: '150+', label: 'Courses' },
  { value: '50+', label: 'Institutes' },
  { value: '10,000+', label: 'Students Placed' },
  { value: '4.8', label: 'Avg. Rating' },
];

const features = [
  {
    icon: HiOutlineSearch,
    title: 'Smart Discovery',
    desc: 'Search and filter hundreds of courses by fees, duration, mode, and difficulty level.',
  },
  {
    icon: HiOutlineChartBar,
    title: 'Side-by-Side Compare',
    desc: 'Compare up to 4 courses across fees, syllabus, placements, and tools covered.',
  },
  {
    icon: HiOutlineStar,
    title: 'Real Reviews',
    desc: 'Read verified reviews from actual students who completed the course.',
  },
  {
    icon: HiOutlineBriefcase,
    title: 'Placement Insights',
    desc: 'View real placement data — companies, roles, and salary statistics.',
  },
  {
    icon: HiOutlineLightningBolt,
    title: 'Instant Enquiry',
    desc: 'Submit enquiries directly to institutes and get counsellor callbacks.',
  },
  {
    icon: HiOutlineAcademicCap,
    title: 'Career Guidance',
    desc: 'Get personalized course recommendations based on your goals.',
  },
];

const trustedBy = [
  'Google', 'Microsoft', 'Amazon', 'Flipkart', 'Infosys', 'TCS', 'Wipro'
];

/* ─── Simple fade-up for framer-motion ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' },
  }),
};

/* ─── Star component ─── */
function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < full || (i === full && half) ? '#b4690e' : '#e0e0e0'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  );
}

export default function HomePage() {
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await coursesAPI.list({ is_trending: true, page_size: 4 });
        setTrendingCourses(res.data?.results || []);
      } catch {
        setTrendingCourses([]);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION — Udemy-style with editorial typography
          DESIGN.md: hero-band, display-hero, canvas bg
         ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--color-canvas-soft)',
          padding: 'var(--space-4xl) 0',
        }}
      >
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              <h1
                className="type-display-hero mb-6"
                style={{ color: 'var(--color-ink)' }}
              >
                Learning that gets you
              </h1>
              <p
                className="type-body-serif-lg mb-8"
                style={{ color: 'var(--color-body)', maxWidth: '520px' }}
              >
                Skills for your present and your future. Get started with us.
                Discover the best Data Science, AI & ML courses from top-rated institutes.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/courses" className="btn-primary" style={{ padding: '14px 28px' }} id="hero-explore-btn">
                  Explore Courses
                </Link>
                <Link href="/register" className="btn-outline" style={{ padding: '14px 28px' }} id="hero-signup-btn">
                  Sign Up Free
                </Link>
              </div>
            </motion.div>

            {/* Right — Stats grid (Udemy-style trust pattern) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="card p-6 text-center"
                    style={{ borderColor: 'var(--color-hairline)' }}
                  >
                    <p
                      className="type-display-md mb-1"
                      style={{ color: 'var(--color-ink)', fontWeight: 400 }}
                    >
                      {stat.value}
                    </p>
                    <p className="type-body-sm" style={{ color: 'var(--color-body)' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRUST BAR — Company logos (Udemy-style)
         ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--color-canvas-soft)',
          borderTop: '1px solid var(--color-hairline)',
          borderBottom: '1px solid var(--color-hairline)',
          padding: 'var(--space-2xl) 0',
        }}
      >
        <div className="container-wide text-center">
          <p className="type-body-sm mb-4" style={{ color: 'var(--color-body)' }}>
            Our students work at top companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {trustedBy.map((name) => (
              <span
                key={name}
                className="type-body-md-strong"
                style={{ color: 'var(--color-hairline)', fontSize: '20px' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CATEGORIES — Udemy-style topic grid
          DESIGN.md: story-card, display-xs, hairline borders
         ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: 'var(--space-4xl) 0' }}>
        <div className="container-wide">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="type-display-lg mb-2" style={{ color: 'var(--color-ink)' }}>
              Top Categories
            </h2>
            <p className="type-body-serif-md mb-8" style={{ color: 'var(--color-body)' }}>
              From fundamentals to cutting-edge specializations — find your path.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <Link
                  href={`/courses?category=${cat.slug}`}
                  className="block p-6 border transition-colors"
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
                  id={`cat-${cat.slug}`}
                >
                  <span className="text-2xl block mb-2">{cat.icon}</span>
                  <span className="type-body-md-strong block">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRENDING COURSES — Udemy-style card grid (live API)
          DESIGN.md: story-card, body-md-strong, hairline borders
         ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--color-canvas-soft)',
          padding: 'var(--space-4xl) 0',
        }}
      >
        <div className="container-wide">
          <div className="flex items-end justify-between mb-8">
            <div>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="type-display-lg mb-2"
                style={{ color: 'var(--color-ink)' }}
              >
                Trending Courses
              </motion.h2>
              <p className="type-body-serif-md" style={{ color: 'var(--color-body)' }}>
                Most popular courses chosen by students this month.
              </p>
            </div>
            <Link
              href="/courses"
              className="hidden md:inline-flex items-center gap-1 type-body-sm-strong transition-colors"
              style={{ color: 'var(--color-ink)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-body)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-ink)'; }}
            >
              View All <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingCourses ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="border p-0"
                  style={{ borderColor: 'var(--color-hairline)' }}
                >
                  <div className="skeleton" style={{ height: '160px', width: '100%' }} />
                  <div className="p-4 space-y-3">
                    <div className="skeleton" style={{ height: '16px', width: '80%' }} />
                    <div className="skeleton" style={{ height: '14px', width: '50%' }} />
                    <div className="skeleton" style={{ height: '14px', width: '30%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
              {trendingCourses.map((course, i) => (
                <motion.div
                  key={course.id || i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <Link
                    href={`/courses/${course.slug}`}
                    className="block border transition-colors group"
                    style={{ borderColor: 'var(--color-hairline)' }}
                    id={`trending-course-${i}`}
                  >
                    {/* Card image placeholder */}
                    <div
                      className="h-[160px] flex items-center justify-center"
                      style={{ backgroundColor: 'var(--color-canvas)', borderBottom: '1px solid var(--color-hairline)' }}
                    >
                      <HiOutlineAcademicCap className="w-12 h-12" style={{ color: 'var(--color-hairline)' }} />
                    </div>

                    {/* Card body */}
                    <div className="p-4">
                      <h3
                        className="type-body-md-strong mb-1 transition-colors"
                        style={{ color: 'var(--color-ink)' }}
                      >
                        {course.title}
                      </h3>
                      <p className="type-caption mb-2" style={{ color: 'var(--color-body)' }}>
                        {course.institute_name}
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

                      {/* Metadata row */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="type-caption" style={{ color: 'var(--color-body)' }}>
                          {course.duration_weeks} weeks
                        </span>
                        <span className="type-caption" style={{ color: 'var(--color-body)' }}>
                          {course.difficulty}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="type-body-md-strong" style={{ color: 'var(--color-ink)' }}>
                          ₹{(course.discounted_fees || course.fees || 0).toLocaleString('en-IN')}
                        </span>
                        {course.discounted_fees && course.fees && course.discounted_fees < course.fees && (
                          <span
                            className="type-caption line-through"
                            style={{ color: 'var(--color-body)' }}
                          >
                            ₹{course.fees.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* Badges */}
                      {(course.is_trending || course.placement_support) && (
                        <div className="flex gap-2 mt-3">
                          {course.is_trending && (
                            <span
                              className="badge"
                              style={{
                                backgroundColor: 'var(--color-canvas-soft)',
                                color: 'var(--color-ink)',
                                border: '1px solid var(--color-hairline)',
                              }}
                            >
                              Bestseller
                            </span>
                          )}
                          {course.placement_support && (
                            <span
                              className="badge"
                              style={{
                                backgroundColor: 'var(--color-canvas-soft)',
                                color: 'var(--color-ink)',
                                border: '1px solid var(--color-hairline)',
                              }}
                            >
                              Placement
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Mobile CTA */}
          <div className="mt-6 text-center md:hidden">
            <Link href="/courses" className="btn-outline inline-flex items-center gap-2">
              View All Courses <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURES — Why DataSci Pro? (Udemy-style value props)
          DESIGN.md: story-card, display-xs, body-sm
         ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: 'var(--space-4xl) 0' }}>
        <div className="container-wide">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="type-display-lg mb-2" style={{ color: 'var(--color-ink)' }}>
              Why DataSci Pro?
            </h2>
            <p className="type-body-serif-md" style={{ color: 'var(--color-body)' }}>
              Everything you need to find, compare, and choose the perfect Data Science course.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="p-8 border transition-colors"
                style={{ borderColor: 'var(--color-hairline)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-canvas-soft)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <feature.icon
                  className="w-8 h-8 mb-4"
                  style={{ color: 'var(--color-ink)' }}
                />
                <h3
                  className="type-display-xs mb-3"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {feature.title}
                </h3>
                <p className="type-body-sm" style={{ color: 'var(--color-body)' }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA SECTION — Udemy-style sign-up banner
          DESIGN.md: polarity-flipped (ink bg, on-primary text)
         ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--color-ink)',
          padding: 'var(--space-4xl) 0',
        }}
      >
        <div className="container-wide text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2
              className="type-display-lg mb-4"
              style={{ color: 'var(--color-on-primary)' }}
            >
              Start learning today
            </h2>
            <p
              className="type-body-serif-lg mb-8 mx-auto"
              style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px' }}
            >
              Join thousands of students who have found their dream career through our platform.
              Explore courses — completely free to browse.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="btn-outline"
                style={{
                  borderColor: 'var(--color-on-primary)',
                  color: 'var(--color-on-primary)',
                  backgroundColor: 'transparent',
                  padding: '14px 32px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-on-primary)';
                  e.currentTarget.style.color = 'var(--color-ink)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-on-primary)';
                }}
                id="cta-signup"
              >
                Get Started Free
              </Link>
              <Link
                href="/courses"
                className="type-body-sm-strong inline-flex items-center gap-1 transition-colors"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-on-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                id="cta-browse"
              >
                Browse Courses <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
