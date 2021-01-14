import React from 'react';
import Logo from '../../layout/Logo';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Logo />
          <nav className="header__nav"></nav>
        </div>
      </div>
    </header>
  );
}
