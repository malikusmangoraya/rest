import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProviders from './lib/AppProviders';
import MotionCanvas from './components/common/MotionCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './lib/theme';

const Home = lazy(() => import('./pages/Home'));

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="skeleton-shimmer h-8 w-8 rounded-full" />
    </div>
  );
}

const basename =
  typeof window !== 'undefined' && window.location.pathname.split('/')[1]
    ? '/' + window.location.pathname.split('/')[1]
    : '/';

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter basename={basename}>
        <MotionCanvas className="fixed inset-0 -z-10" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <div className="cls-reserve">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/*" element={<Home />} />
              </Routes>
            </Suspense>
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </AppProviders>
  );
}
