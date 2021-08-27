import React from 'react';
import './index.css';

const Header = () => (
  <div>
    <div className="walker-container">
      <div className="walker archen" />
      <div className="walker sableye" />
      <div className="walker totodile" />
    </div>
    <div className="passive-aggressive-message">
      <div>
        <span>If you enjoy this site, check out </span>
        <a href="https://clover.weedl.es">Clovermon Showdown</a>
        <span>: a competitive Pokémon Showdown server featuring fakemons from the popular </span>
        <a href="https://poclo.net/">Pokémon Clover</a>
        <span> FireRed ROM hack!</span>
      </div>
    </div>
  </div>
);

export default Header;
