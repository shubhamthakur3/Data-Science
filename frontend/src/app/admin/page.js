'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiOutlineUsers, HiOutlineAcademicCap, HiOutlineMail,
  HiOutlineBriefcase, HiOutlineTrendingUp, HiOutlineCurrencyRupee,
  HiOutlineChartBar, HiOutlineCog, HiOutlineClipboardList,
  HiOutlineUserGroup, HiOutlineCalendar
} from 'react-icons/hi';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

// Demo analytics data
const kpis = [
  { label: 'Total Enquiries', value: '2,847', change: '+12.5%', positive: true, icon: HiOutlineMail, color: 'from-indigo-500 to-indigo-600' },
  { label: 'Active Courses', value: '48', change: '+3', positive: true, icon: HiOutlineAcademicCap, color: 'from-cyan-500 to-cyan-600' },
  { label: 'Admissions', value: '1,234', change: '+8.2%', positive: true, icon: HiOutlineUsers, color: 'from-emerald-500 to-emerald-600' },
  { label: 'Placements', value: '856', change: '+15.3%', positive: true, icon: HiOutlineBriefcase, color: 'from-amber-500 to-amber-600' },
  { label: 'Revenue', value: '₹42.5L', change: '+22.1%', positive: true, icon: HiOutlineCurrencyRupee, color: 'from-purple-500 to-purple-600' },
  { label: 'Conversion Rate', value: '34.2%', change: '+2.1%', positive: true, icon: HiOutlineTrendingUp, color: 'from-rose-500 to-rose-600' },
];

const enquiryTrends = [
  { month: 'Jan', enquiries: 180, admissions: 52, placements: 38 },
  { month: 'Feb', enquiries: 220, admissions: 68, placements: 45 },
  { month: 'Mar', enquiries: 310, admissions: 95, placements: 62 },
  { month: 'Apr', enquiries: 280, admissions: 88, placements: 58 },
  { month: 'May', enquiries: 350, admissions: 110, placements: 72 },
  { month: 'Jun', enquiries: 420, admissions: 135, placements: 90 },
  { month: 'Jul', enquiries: 390, admissions: 125, placements: 85 },
  { month: 'Aug', enquiries: 480, admissions: 155, placements: 102 },
];

const sourceData = [
  { name: 'Google', value: 35, color: '#6366f1' },
  { name: 'Social Media', value: 25, color: '#06b6d4' },
  { name: 'Referral', value: 20, color: '#10b981' },
  { name: 'Direct', value: 12, color: '#f59e0b' },
  { name: 'Others', value: 8, color: '#8b5cf6' },
];

const popularCourses = [
  { name: 'Data Science Bootcamp', enquiries: 480, conversion: 38 },
  { name: 'ML Masterclass', enquiries: 320, conversion: 32 },
  { name: 'Data Analytics Pro', enquiries: 290, conversion: 42 },
  { name: 'Python for DS', enquiries: 250, conversion: 28 },
  { name: 'Deep Learning', enquiries: 180, conversion: 45 },
];

const recentEnquiries = [
  { name: 'Priya Sharma', course: 'Data Science Bootcamp', status: 'new', time: '5 min ago' },
  { name: 'Rahul Patel', course: 'ML Masterclass', status: 'contacted', time: '15 min ago' },
  { name: 'Ananya Reddy', course: 'Data Analytics Pro', status: 'interested', time: '1 hr ago' },
  { name: 'Vikram Singh', course: 'Deep Learning', status: 'follow_up', time: '2 hrs ago' },
  { name: 'Meera Joshi', course: 'Python for DS', status: 'enrolled', time: '3 hrs ago' },
];

const statusColors = {
  new: 'bg-blue-500/20 text-blue-400',
  contacted: 'bg-yellow-500/20 text-yellow-400',
  interested: 'bg-emerald-500/20 text-emerald-400',
  follow_up: 'bg-orange-500/20 text-orange-400',
  enrolled: 'bg-green-500/20 text-green-400',
};

const sidebarLinks = [
  { icon: HiOutlineChartBar, label: 'Overview', href: '/admin', active: true },
  { icon: HiOutlineAcademicCap, label: 'Courses', href: '/admin/courses' },
  { icon: HiOutlineUserGroup, label: 'Institutes', href: '/admin/institutes' },
  { icon: HiOutlineMail, label: 'Enquiries', href: '/admin/enquiries' },
  { icon: HiOutlineUsers, label: 'Admissions', href: '/admin/admissions' },
  { icon: HiOutlineBriefcase, label: 'Placements', href: '/admin/placements' },
  { icon: HiOutlineClipboardList, label: 'Reports', href: '/admin/reports' },
  { icon: HiOutlineCog, label: 'Settings', href: '/admin/settings' },
];

const customTooltip = {
  contentStyle: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    color: '#f8fafc',
    fontSize: '13px',
  },
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen pt-16 bg-[var(--bg-primary)]">
      <div className="flex">
        {/* ─── Sidebar ─── */}
        <aside className="hidden lg:block w-64 min-h-[calc(100vh-4rem)] border-r border-[var(--border)] bg-[var(--bg-secondary)] p-4">
          <div className="mb-6 px-3">
            <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Admin Panel</h2>
          </div>
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link key={link.label} href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  link.active
                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                    : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* ─── Main Content ─── */}
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Dashboard Overview</h1>
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <HiOutlineCalendar className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {kpis.map((kpi, i) => (
              <motion.div key={kpi.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card p-4"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-3`}>
                  <kpi.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{kpi.value}</p>
                <p className="text-xs text-[var(--text-muted)] mb-1">{kpi.label}</p>
                <span className={`text-xs font-medium ${kpi.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {kpi.change}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Enquiry Trends Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="card p-6 lg:col-span-2">
              <h3 className="font-bold text-white mb-6">Enquiry & Conversion Trends</h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={enquiryTrends}>
                  <defs>
                    <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip {...customTooltip} />
                  <Legend />
                  <Area type="monotone" dataKey="enquiries" stroke="#6366f1" fill="url(#colorEnquiries)" strokeWidth={2} />
                  <Area type="monotone" dataKey="admissions" stroke="#06b6d4" fill="url(#colorAdmissions)" strokeWidth={2} />
                  <Area type="monotone" dataKey="placements" stroke="#10b981" fill="none" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Source Distribution */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="card p-6">
              <h3 className="font-bold text-white mb-6">Lead Sources</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={sourceData} cx="50%" cy="50%"
                    innerRadius={50} outerRadius={80}
                    paddingAngle={4} dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip {...customTooltip} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {sourceData.map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-[var(--text-secondary)]">{s.name}</span>
                    </div>
                    <span className="text-white font-medium">{s.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Popular Courses */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="card p-6">
              <h3 className="font-bold text-white mb-6">Popular Courses</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={popularCourses} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" stroke="#64748b" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} width={120} />
                  <Tooltip {...customTooltip} />
                  <Bar dataKey="enquiries" fill="#6366f1" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Recent Enquiries */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-white">Recent Enquiries</h3>
                <Link href="/admin/enquiries" className="text-sm text-indigo-400 hover:text-indigo-300">View All →</Link>
              </div>
              <div className="space-y-4">
                {recentEnquiries.map((enq, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 flex items-center justify-center">
                        <span className="text-xs font-bold text-indigo-300">
                          {enq.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{enq.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{enq.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`badge text-xs ${statusColors[enq.status]}`}>
                        {enq.status.replace('_', ' ')}
                      </span>
                      <p className="text-xs text-[var(--text-muted)] mt-1">{enq.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
