'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiOutlineAcademicCap, HiOutlineLightningBolt, HiOutlineChartBar,
  HiOutlineSearch, HiOutlineStar, HiOutlineUserGroup, HiOutlineBriefcase,
  HiOutlineCheckCircle, HiOutlineArrowRight
} from 'react-icons/hi';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

const stats = [
  { value: '150+', label: 'Courses', icon: HiOutlineAcademicCap },
  { value: '50+', label: 'Institutes', icon: HiOutlineUserGroup },
  { value: '10K+', label: 'Students Placed', icon: HiOutlineBriefcase },
  { value: '4.8', label: 'Average Rating', icon: HiOutlineStar },
];

const features = [
  {
    icon: HiOutlineSearch,
    title: 'Smart Discovery',
    description: 'Search and filter through hundreds of Data Science courses by fees, duration, mode, and difficulty.',
  },
  {
    icon: HiOutlineChartBar,
    title: 'Side-by-Side Compare',
    description: 'Compare up to 4 courses across fees, syllabus, placements, and tools covered.',
  },
  {
    icon: HiOutlineStar,
    title: 'Real Reviews',
    description: 'Read verified reviews from actual students to make informed decisions.',
  },
  {
    icon: HiOutlineBriefcase,
    title: 'Placement Insights',
    description: 'View real placement data — companies, roles, and salary statistics.',
  },
  {
    icon: HiOutlineLightningBolt,
    title: 'Instant Enquiry',
    description: 'Submit enquiries directly to institutes and get counsellor callbacks.',
  },
  {
    icon: HiOutlineAcademicCap,
    title: 'Career Guidance',
    description: 'Get personalized course recommendations based on your goals and background.',
  },
];

const categories = [
  { name: 'Data Science', count: 42, emoji: '📊' },
  { name: 'Machine Learning', count: 35, emoji: '🤖' },
  { name: 'Deep Learning', count: 28, emoji: '🧠' },
  { name: 'Data Analytics', count: 38, emoji: '📈' },
  { name: 'Python Programming', count: 45, emoji: '🐍' },
  { name: 'AI & NLP', count: 22, emoji: '💬' },
  { name: 'Data Engineering', count: 18, emoji: '⚙️' },
  { name: 'Business Intelligence', count: 15, emoji: '📋' },
];

const topCourses = [
  {
    title: 'Complete Data Science Bootcamp',
    institute: 'DataTech Academy',
    city: 'Bengaluru',
    fees: '₹45,000',
    duration: '16 Weeks',
    rating: 4.9,
    reviews: 234,
    mode: 'Online',
    difficulty: 'Beginner',
    placement: '92%',
    tools: ['Python', 'SQL', 'Tableau', 'ML'],
  },
  {
    title: 'Advanced ML & AI Masterclass',
    institute: 'AI Institute India',
    city: 'Mumbai',
    fees: '₹85,000',
    duration: '24 Weeks',
    rating: 4.8,
    reviews: 189,
    mode: 'Hybrid',
    difficulty: 'Advanced',
    placement: '88%',
    tools: ['TensorFlow', 'PyTorch', 'AWS', 'Docker'],
  },
  {
    title: 'Data Analytics Professional',
    institute: 'Analytics Hub',
    city: 'Hyderabad',
    fees: '₹35,000',
    duration: '12 Weeks',
    rating: 4.7,
    reviews: 312,
    mode: 'Online',
    difficulty: 'Intermediate',
    placement: '85%',
    tools: ['Excel', 'SQL', 'Power BI', 'Python'],
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background */}
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }}>
          <div className="bg-orb w-96 h-96 bg-indigo-600 top-20 left-10" />
          <div className="bg-orb w-80 h-80 bg-cyan-500 bottom-20 right-20" style={{ animationDelay: '5s' }} />
          <div className="bg-orb w-64 h-64 bg-purple-500 top-1/2 left-1/2" style={{ animationDelay: '10s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-indigo-300 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Trusted by 10,000+ students across India
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              custom={0}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Launch Your{' '}
              <span className="gradient-text">Data Science</span>{' '}
              Career Today
            </motion.h1>

            <motion.p
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10"
            >
              Discover, compare, and enroll in the best Data Science, AI & Machine Learning
              courses from top-rated institutes — all in one place.
            </motion.p>

            {/* Search bar */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              custom={2}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="flex gap-2 glass rounded-2xl p-2">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <HiOutlineSearch className="w-5 h-5 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    placeholder="Search courses, institutes, or topics..."
                    className="w-full bg-transparent border-none outline-none text-white placeholder-[var(--text-muted)]"
                  />
                </div>
                <Link href="/courses" className="btn-primary !rounded-xl !px-8 text-sm whitespace-nowrap">
                  Explore Courses
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              custom={3}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-5 h-5 text-indigo-400 mr-2" />
                    <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                  </div>
                  <span className="text-sm text-[var(--text-muted)]">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES SECTION ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Explore <span className="gradient-text">Course Categories</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              From fundamentals to cutting-edge specializations — find your path in Data Science.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <Link
                  href={`/courses?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="card block p-6 text-center group cursor-pointer"
                >
                  <span className="text-3xl mb-3 block">{cat.emoji}</span>
                  <h3 className="font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">{cat.count} Courses</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TOP COURSES SECTION ═══ */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Trending <span className="gradient-text">Courses</span>
              </h2>
              <p className="text-[var(--text-secondary)]">
                Most popular courses chosen by students this month.
              </p>
            </div>
            <Link href="/courses" className="hidden md:flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium text-sm">
              View All <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {topCourses.map((course, i) => (
              <motion.div
                key={course.title}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="card overflow-hidden group"
              >
                {/* Card Header / Image area */}
                <div className="h-44 bg-gradient-to-br from-indigo-600/20 to-cyan-600/20 relative flex items-center justify-center">
                  <div className="text-center">
                    <HiOutlineAcademicCap className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
                    <span className="text-sm text-[var(--text-muted)]">{course.institute}</span>
                  </div>
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="badge bg-indigo-500/20 text-indigo-300">{course.mode}</span>
                    <span className="badge bg-cyan-500/20 text-cyan-300">{course.difficulty}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="badge bg-green-500/20 text-green-300">
                      {course.placement} Placed
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    {course.institute} • {course.city}
                  </p>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tools.map((tool) => (
                      <span key={tool} className="text-xs px-2 py-1 rounded-md bg-white/5 text-[var(--text-secondary)]">
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Rating + Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <HiOutlineStar className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-semibold text-white">{course.rating}</span>
                      <span className="text-xs text-[var(--text-muted)]">({course.reviews})</span>
                    </div>
                    <span className="text-sm text-[var(--text-muted)]">{course.duration}</span>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                    <span className="text-xl font-bold gradient-text">{course.fees}</span>
                    <Link href="/courses" className="btn-primary !text-sm !py-2 !px-4">
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/courses" className="btn-secondary inline-flex items-center gap-2">
              View All Courses <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES SECTION ═══ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why <span className="gradient-text">DataSci Pro</span>?
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Everything you need to find, compare, and choose the perfect Data Science course.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="card p-8 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="card p-12 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500 rounded-full opacity-10 blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500 rounded-full opacity-10 blur-[80px]" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative">
                Ready to Start Your <span className="gradient-text">Data Journey</span>?
              </h2>
              <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto relative">
                Join thousands of students who've found their dream career through our platform.
                Start exploring courses today — completely free.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
                <Link href="/register" className="btn-primary text-lg !py-3 !px-10">
                  Get Started Free
                </Link>
                <Link href="/courses" className="btn-secondary text-lg !py-3 !px-10">
                  Browse Courses
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
