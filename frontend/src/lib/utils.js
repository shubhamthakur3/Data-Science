/**
 * Utility functions for the platform.
 */

/**
 * Format currency in INR.
 */
export function formatCurrency(amount) {
  if (!amount && amount !== 0) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a date string.
 */
export function formatDate(dateString) {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Generate initials from a name.
 */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Truncate text to a given length.
 */
export function truncate(text, length = 100) {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
}

/**
 * Get difficulty badge color.
 */
export function getDifficultyColor(difficulty) {
  const colors = {
    beginner: 'bg-emerald-100 text-emerald-700',
    intermediate: 'bg-amber-100 text-amber-700',
    advanced: 'bg-red-100 text-red-700',
    all_levels: 'bg-blue-100 text-blue-700',
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-700';
}

/**
 * Get mode badge color.
 */
export function getModeColor(mode) {
  const colors = {
    online: 'bg-cyan-100 text-cyan-700',
    offline: 'bg-purple-100 text-purple-700',
    hybrid: 'bg-indigo-100 text-indigo-700',
  };
  return colors[mode] || 'bg-gray-100 text-gray-700';
}

/**
 * Get status badge color for enquiries.
 */
export function getStatusColor(status) {
  const colors = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    follow_up: 'bg-orange-100 text-orange-700',
    interested: 'bg-emerald-100 text-emerald-700',
    not_interested: 'bg-red-100 text-red-700',
    enrolled: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}

/**
 * Debounce function.
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Build query string from params object.
 */
export function buildQueryString(params) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value);
    }
  });
  return searchParams.toString();
}
