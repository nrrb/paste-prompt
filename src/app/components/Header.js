// app/components/Header.js
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <Link legacyBehavior href="/">
        <a className="navLink">New</a>
      </Link>
      <Link legacyBehavior href="/all">
        <a className="navLink">All</a>
      </Link>
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #ffffff;
          border-bottom: 1px solid #ddd;
        }
        .navLink {
          text-decoration: none;
          color: #333;
          font-weight: bold;
        }
      `}</style>
    </header>
  );
}
