import React from 'react';
import Explorer from './explorer/Explorer';
import Settings from './settings/Settings';

export default function Menu() {
  return (
    <div className="menu">
      <Explorer />
      <Settings />
    </div>
  );
}
