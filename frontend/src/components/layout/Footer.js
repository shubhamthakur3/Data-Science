import Link from 'next/link';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { href: '/courses', label: 'Browse Courses' },
      { href: '/institutes', label: 'Institutes' },
      { href: '/compare', label: 'Compare Courses' },
      { href: '/placements', label: 'Placements' },
    ],
    'For Students': [
      { href: '/register', label: 'Create Account' },
      { href: '/login', label: 'Sign In' },
      { href: '/courses?difficulty=beginner', label: 'Beginner Courses' },
      { href: '/courses?mode=online', label: 'Online Courses' },
    ],
    Company: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DS</span>
              </div>
              <span className="text-lg font-bold text-white">
                DataSci<span className="text-cyan-400">Pro</span>
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-sm">
              Discover, compare, and enroll in the best Data Science, AI & Machine Learning
              courses from top institutes across India.
            </p>
            <div className="space-y-2 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <HiOutlineMail className="w-4 h-4" />
                <span>info@datascipro.com</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlinePhone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineLocationMarker className="w-4 h-4" />
                <span>Bengaluru, India</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] hover:text-indigo-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            &copy; {currentYear} DataSci Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
