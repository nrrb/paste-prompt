// app/components/Header.js
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <Link legacyBehavior href="/">
        <a className="navLink">New</a>
      </Link>
      <a
        href="https://www.linkedin.com/in/nicholasrrbennett/"
        target="_blank"
        rel="noopener noreferrer"
        className="navLink"
      >
        hire me
      </a>
      <Link legacyBehavior href="/all">
        <a className="navLink">All</a>
      </Link>
      <style jsx>{`
        .header {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 1rem;
          background-color: #f5f5f5;
          border-bottom: 1px solid #ddd;
        }
        .navLink {
          text-decoration: none;
          color: #333;
          font-weight: bold;
          text-align: center;
        }
      `}</style>
    </header>
  );
}
