// src/components/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import { AppFooter } from './Footer';

export function MainLayout() {
  return (
    <div className="relative min-h-screen bg-black font-pixel text-green-500 overflow-x-hidden">
      {/* 🔲 Scanline Overlay */}
      <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-10 z-10 pointer-events-none" />

      {/* 🔮 Content */}
      <div className="relative z-20 space-y-20">
        <Outlet />
        <AppFooter />
      </div>
    </div>
  );
}
