'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerColumns = {
    Platform: [
      { href: '/courses', label: 'Browse Courses' },
      { href: '/institutes', label: 'Institutes' },
      { href: '/courses?is_featured=true', label: 'Featured Courses' },
      { href: '/courses?is_trending=true', label: 'Trending Courses' },
    ],
    'For Students': [
      { href: '/register', label: 'Create Account' },
      { href: '/login', label: 'Sign In' },
      { href: '/courses?difficulty=beginner', label: 'Beginner Courses' },
      { href: '/courses?mode=online', label: 'Online Courses' },
    ],
    'For Institutes': [
      { href: '/contact', label: 'Partner With Us' },
      { href: '/admin', label: 'Institute Dashboard' },
      { href: '/about', label: 'About DataSci Pro' },
      { href: '/contact', label: 'Contact' },
    ],
    Legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/sitemap', label: 'Sitemap' },
    ],
  };

  return (
    /* DESIGN.md: footer — bg {colors.primary}, text {colors.on-primary},
       padding {spacing.4xl} {spacing.xl}, body-sm typography */
    <footer
      style={{
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-on-primary)',
        padding: 'var(--space-4xl) 0',
      }}
    >
      <div className="container-wide">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-block mb-4" id="footer-logo">
              <span
                className="type-display-sm"
                style={{ fontWeight: 400, fontSize: '24px', color: 'var(--color-on-primary)' }}
              >
                DataSci<span style={{ fontWeight: 700 }}>Pro</span>
              </span>
            </Link>
            <p
              className="type-body-sm mb-6"
              style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '280px' }}
            >
              Discover, compare, and enroll in the best Data Science, AI & Machine Learning
              courses from top institutes across India.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerColumns).map(([title, links]) => (
            <div key={title}>
              {/* DESIGN.md: footer column eyebrows use body-sm-strong */}
              <h3
                className="type-body-sm-strong mb-4"
                style={{ color: 'var(--color-on-primary)' }}
              >
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="type-body-sm transition-colors"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-on-primary)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar — hairline divider */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}
        >
          <p className="type-caption" style={{ color: 'rgba(255,255,255,0.4)' }}>
            &copy; {currentYear} DataSci Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="type-caption transition-colors"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-on-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="type-caption transition-colors"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-on-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >
              Terms
            </Link>
            <Link
              href="/sitemap"
              className="type-caption transition-colors"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-on-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
