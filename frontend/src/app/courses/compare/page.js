'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineStar, HiOutlinePlus, HiOutlineTrash, HiOutlineSearch,
  HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineChevronLeft
} from 'react-icons/hi';
import { coursesAPI } from '@/lib/api';

/* ─── Rating Star helper ─── */
function Stars({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i < Math.floor(rating) ? '#b4690e' : '#e0e0e0'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  );
}

export default function CourseComparePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [courseIds, setCourseIds] = useState([]);
  const [comparedCourses, setComparedCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dynamic search/add variables
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef(null);

  // Initialize selected IDs from the query params
  useEffect(() => {
    const idsParam = searchParams.get('ids');
    if (idsParam) {
      const ids = idsParam.split(',').filter(Boolean);
      setCourseIds(ids);
    } else {
      setCourseIds([]);
      setComparedCourses([]);
    }
  }, [searchParams]);

  // Fetch comparison data when courseIds change
  useEffect(() => {
    const fetchComparison = async () => {
      if (courseIds.length === 0) {
        setComparedCourses([]);
        return;
      }
      setLoading(true);
      try {
        const response = await coursesAPI.compare(courseIds);
        setComparedCourses(response.data?.courses || []);
      } catch (error) {
        console.error('Failed to load course comparison:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComparison();
  }, [courseIds]);

  // Handle outside click for search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update URL queries when selection changes
  const updateUrl = (ids) => {
    if (ids.length > 0) {
      router.push(`/courses/compare?ids=${ids.join(',')}`);
    } else {
      router.push('/courses/compare');
    }
  };

  // Add course to compare
  const handleAddCourse = (course) => {
    if (courseIds.includes(course.id)) return;
    if (courseIds.length >= 4) {
      alert('You can compare a maximum of 4 courses.');
      return;
    }
    const newIds = [...courseIds, course.id];
    setCourseIds(newIds);
    updateUrl(newIds);
    setSearchOpen(false);
    setSearchQuery('');
  };

  // Remove course from compare
  const handleRemoveCourse = (id) => {
    const newIds = courseIds.filter((cid) => cid !== id);
    setCourseIds(newIds);
    updateUrl(newIds);
  };

  // Dynamic Course Search for autocomplete
  useEffect(() => {
    const searchCourses = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
      setSearching(true);
      try {
        const response = await coursesAPI.list({ search: searchQuery, page_size: 5 });
        setSearchResults(response.data?.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setSearching(false);
      }
    };

    const timer = setTimeout(searchCourses, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div style={{ backgroundColor: 'var(--color-canvas)' }}>
      {/* ─── Header ─── */}
      <div
        style={{
          backgroundColor: 'var(--color-canvas-soft)',
          borderBottom: '1px solid var(--color-hairline)',
          padding: 'var(--space-3xl) 0',
        }}
      >
        <div className="container-wide">
          <Link href="/courses" className="inline-flex items-center gap-1 type-body-sm mb-4 hover:underline">
            <HiOutlineChevronLeft className="w-4 h-4" /> Back to Courses
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="type-display-lg mb-2" style={{ color: 'var(--color-ink)' }}>
                Compare Courses
              </h1>
              <p className="type-body-serif-md" style={{ color: 'var(--color-body)' }}>
                Compare key parameters, features, reviews, and placement rates side-by-side.
              </p>
            </div>

            {/* Quick add search dropdown */}
            {courseIds.length < 4 && (
              <div className="relative shrink-0 w-full md:w-[320px]" ref={searchRef}>
                <div
                  className="flex items-center border bg-white"
                  style={{ borderColor: 'var(--color-ink)', height: '44px', padding: '0 12px' }}
                >
                  <HiOutlineSearch className="w-5 h-5 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search course to add..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSearchOpen(true);
                    }}
                    onFocus={() => setSearchOpen(true)}
                    className="flex-1 bg-transparent border-none outline-none px-3 type-body-sm"
                  />
                </div>

                <AnimatePresence>
                  {searchOpen && (searchQuery.trim() || searchResults.length > 0) && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute right-0 top-full mt-1 w-full bg-white border z-50 shadow-sm"
                      style={{ borderColor: 'var(--color-hairline)' }}
                    >
                      {searching ? (
                        <p className="p-3 type-caption text-gray-500 text-center">Searching...</p>
                      ) : searchResults.length === 0 ? (
                        <p className="p-3 type-caption text-gray-500 text-center">No matching courses found</p>
                      ) : (
                        searchResults.map((course) => {
                          const isAlreadyAdded = courseIds.includes(course.id);
                          return (
                            <button
                              key={course.id}
                              onClick={() => !isAlreadyAdded && handleAddCourse(course)}
                              className={`w-full text-left p-3 border-b last:border-b-0 transition-colors flex justify-between items-center ${
                                isAlreadyAdded ? 'cursor-not-allowed opacity-50 bg-gray-50' : 'hover:bg-gray-50'
                              }`}
                            >
                              <div>
                                <span className="type-body-sm-strong block truncate text-black">{course.title}</span>
                                <span className="type-caption text-gray-500">{course.institute_name}</span>
                              </div>
                              {!isAlreadyAdded && (
                                <HiOutlinePlus className="w-4 h-4 text-black" />
                              )}
                            </button>
                          );
                        })
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="container-wide" style={{ padding: 'var(--space-3xl) var(--space-xl)' }}>
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-2 mx-auto mb-4 animate-spin" style={{ borderColor: 'var(--color-hairline)', borderTopColor: 'var(--color-ink)', borderRadius: '9999px' }} />
            <p className="type-body-sm text-gray-500">Loading comparison details...</p>
          </div>
        ) : comparedCourses.length === 0 ? (
          <div className="text-center py-20 border" style={{ borderColor: 'var(--color-hairline)' }}>
            <HiOutlineSearch className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h2 className="type-display-sm mb-2" style={{ color: 'var(--color-ink)' }}>No courses selected</h2>
            <p className="type-body-sm text-gray-500 mb-6 max-w-md mx-auto">
              Please select at least 2 courses to compare. You can use the search bar above to select courses dynamically.
            </p>
            <Link href="/courses" className="btn-primary">Browse All Courses</Link>
          </div>
        ) : (
          /* COMPARISON TABLE MATRIX */
          <div className="overflow-x-auto border-t" style={{ borderColor: 'var(--color-hairline)' }}>
            <table className="w-full border-collapse table-fixed min-w-[700px]">
              
              {/* Table Column headers (Cards + Remove button) */}
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--color-hairline)' }}>
                  <th className="w-[200px] text-left p-4 type-caption text-gray-400 font-bold bg-gray-50 uppercase tracking-wider">
                    Parameters
                  </th>
                  {comparedCourses.map((course) => (
                    <th
                      key={course.id}
                      className="p-4 text-left font-normal relative border-l align-top"
                      style={{ borderColor: 'var(--color-hairline)' }}
                    >
                      <button
                        onClick={() => handleRemoveCourse(course.id)}
                        className="absolute top-2 right-2 p-1 hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
                        title="Remove from comparison"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                      <div className="pr-6">
                        <Link href={`/courses/${course.slug}`} className="type-body-md-strong block hover:underline text-black mb-1 leading-snug">
                          {course.title}
                        </Link>
                        <p className="type-caption text-gray-500 mb-2">{course.institute_name}</p>
                        <span className="badge" style={{ backgroundColor: 'var(--color-canvas-soft)', border: '1px solid var(--color-hairline)' }}>
                          {course.category_name || 'Data Science'}
                        </span>
                      </div>
                    </th>
                  ))}
                  {/* Empty spot to make it clear we can add more up to 4 */}
                  {comparedCourses.length < 4 && (
                    <th className="p-4 text-center border-l bg-gray-50/50 align-middle" style={{ borderColor: 'var(--color-hairline)' }}>
                      <p className="type-caption text-gray-400 mb-2">Slot {comparedCourses.length + 1} of 4 Available</p>
                      <p className="type-body-sm text-gray-400">Use search box to add</p>
                    </th>
                  )}
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y" style={{ borderColor: 'var(--color-hairline)' }}>
                {/* 1. Rating */}
                <tr>
                  <td className="p-4 type-body-sm-strong bg-gray-50" style={{ color: 'var(--color-ink)' }}>Rating & Reviews</td>
                  {comparedCourses.map((course) => (
                    <td key={course.id} className="p-4 border-l" style={{ borderColor: 'var(--color-hairline)' }}>
                      <div className="flex items-center gap-1.5">
                        <span className="type-body-sm-strong" style={{ color: '#b4690e' }}>
                          {course.avg_rating || '4.5'}
                        </span>
                        <Stars rating={course.avg_rating || 4.5} />
                        <span className="type-caption text-gray-400">
                          ({course.total_reviews || 0} reviews)
                        </span>
                      </div>
                    </td>
                  ))}
                  {comparedCourses.length < 4 && <td className="border-l bg-gray-50/20" style={{ borderColor: 'var(--color-hairline)' }}></td>}
                </tr>

                {/* 2. Fees */}
                <tr>
                  <td className="p-4 type-body-sm-strong bg-gray-50" style={{ color: 'var(--color-ink)' }}>Course Fees</td>
                  {comparedCourses.map((course) => (
                    <td key={course.id} className="p-4 border-l" style={{ borderColor: 'var(--color-hairline)' }}>
                      <span className="type-body-md-strong" style={{ color: 'var(--color-ink)' }}>
                        ₹{(course.effective_fees || course.fees || 0).toLocaleString('en-IN')}
                      </span>
                      {course.fees && course.effective_fees && course.effective_fees < course.fees && (
                        <span className="type-caption line-through text-gray-400 block mt-0.5">
                          ₹{course.fees.toLocaleString('en-IN')}
                        </span>
                      )}
                    </td>
                  ))}
                  {comparedCourses.length < 4 && <td className="border-l bg-gray-50/20" style={{ borderColor: 'var(--color-hairline)' }}></td>}
                </tr>

                {/* 3. Duration */}
                <tr>
                  <td className="p-4 type-body-sm-strong bg-gray-50" style={{ color: 'var(--color-ink)' }}>Duration</td>
                  {comparedCourses.map((course) => (
                    <td key={course.id} className="p-4 border-l type-body-sm text-gray-700" style={{ borderColor: 'var(--color-hairline)' }}>
                      {course.duration_weeks} weeks
                      {course.total_hours && (
                        <span className="block type-caption text-gray-400 mt-0.5">
                          ({course.total_hours} total class hours)
                        </span>
                      )}
                    </td>
                  ))}
                  {comparedCourses.length < 4 && <td className="border-l bg-gray-50/20" style={{ borderColor: 'var(--color-hairline)' }}></td>}
                </tr>

                {/* 4. Level & Mode */}
                <tr>
                  <td className="p-4 type-body-sm-strong bg-gray-50" style={{ color: 'var(--color-ink)' }}>Difficulty & Mode</td>
                  {comparedCourses.map((course) => (
                    <td key={course.id} className="p-4 border-l type-body-sm text-gray-700" style={{ borderColor: 'var(--color-hairline)' }}>
                      <span className="capitalize font-semibold block">{course.difficulty}</span>
                      <span className="capitalize text-gray-500 block mt-0.5">{course.mode}</span>
                    </td>
                  ))}
                  {comparedCourses.length < 4 && <td className="border-l bg-gray-50/20" style={{ borderColor: 'var(--color-hairline)' }}></td>}
                </tr>

                {/* 5. Tools Covered */}
                <tr>
                  <td className="p-4 type-body-sm-strong bg-gray-50" style={{ color: 'var(--color-ink)' }}>Tools Covered</td>
                  {comparedCourses.map((course) => (
                    <td key={course.id} className="p-4 border-l" style={{ borderColor: 'var(--color-hairline)' }}>
                      {course.tools_covered && course.tools_covered.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto">
                          {course.tools_covered.map((tool) => (
                            <span
                              key={tool}
                              className="type-caption px-1.5 py-0.5 border"
                              style={{ borderColor: 'var(--color-hairline)' }}
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="type-caption text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                  {comparedCourses.length < 4 && <td className="border-l bg-gray-50/20" style={{ borderColor: 'var(--color-hairline)' }}></td>}
                </tr>

                {/* 6. Placement Support */}
                <tr>
                  <td className="p-4 type-body-sm-strong bg-gray-50" style={{ color: 'var(--color-ink)' }}>Placement Assistance</td>
                  {comparedCourses.map((course) => (
                    <td key={course.id} className="p-4 border-l type-body-sm" style={{ borderColor: 'var(--color-hairline)' }}>
                      {course.placement_support ? (
                        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <HiOutlineCheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                          Yes
                          {course.placement_rate && (
                            <span className="type-caption text-gray-500 font-normal">({course.placement_rate}% rate)</span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-700 font-medium">
                          <HiOutlineXCircle className="w-4 h-4 shrink-0 text-red-500" />
                          No
                        </div>
                      )}
                    </td>
                  ))}
                  {comparedCourses.length < 4 && <td className="border-l bg-gray-50/20" style={{ borderColor: 'var(--color-hairline)' }}></td>}
                </tr>

                {/* 7. Certification */}
                <tr>
                  <td className="p-4 type-body-sm-strong bg-gray-50" style={{ color: 'var(--color-ink)' }}>Completion Certificate</td>
                  {comparedCourses.map((course) => (
                    <td key={course.id} className="p-4 border-l type-body-sm" style={{ borderColor: 'var(--color-hairline)' }}>
                      {course.certification ? (
                        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <HiOutlineCheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                          Yes
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-700 font-medium">
                          <HiOutlineXCircle className="w-4 h-4 shrink-0 text-red-500" />
                          No
                        </div>
                      )}
                    </td>
                  ))}
                  {comparedCourses.length < 4 && <td className="border-l bg-gray-50/20" style={{ borderColor: 'var(--color-hairline)' }}></td>}
                </tr>

                {/* 8. Highlights */}
                <tr>
                  <td className="p-4 type-body-sm-strong bg-gray-50" style={{ color: 'var(--color-ink)' }}>Syllabus Depth</td>
                  {comparedCourses.map((course) => (
                    <td key={course.id} className="p-4 border-l type-body-sm text-gray-700" style={{ borderColor: 'var(--color-hairline)' }}>
                      {course.syllabus_count ? (
                        <span>{course.syllabus_count} distinct modules</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                  {comparedCourses.length < 4 && <td className="border-l bg-gray-50/20" style={{ borderColor: 'var(--color-hairline)' }}></td>}
                </tr>

                {/* Actions row */}
                <tr>
                  <td className="p-4 type-body-sm-strong bg-gray-50"></td>
                  {comparedCourses.map((course) => (
                    <td key={course.id} className="p-4 border-l" style={{ borderColor: 'var(--color-hairline)' }}>
                      <Link href={`/courses/${course.slug}`} className="btn-primary w-full text-center text-xs block py-2" style={{ padding: '8px 12px', fontSize: '13px' }}>
                        View Full Details
                      </Link>
                    </td>
                  ))}
                  {comparedCourses.length < 4 && <td className="border-l bg-gray-50/20" style={{ borderColor: 'var(--color-hairline)' }}></td>}
                </tr>
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}
