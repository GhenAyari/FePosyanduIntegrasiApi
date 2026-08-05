import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import WelcomeBanner from '../components/beranda/WelcomeBanner';
import FeatureCards from '../components/beranda/FeatureCards';
import ArticleCard from '../components/beranda/ArticleCard';


export default function Beranda({ activePage = 'beranda', onNavigate, onDarurat }) {
  return (
    <div className="beranda-wrapper">
      <Header activePage={activePage} onNavigate={onNavigate} onDarurat={onDarurat} />

      <main className="beranda-container">
        {/* Top Hero Section */}
        <section className="hero-grid">
          <WelcomeBanner onNavigate={onNavigate} />
        </section>

        {/* Fitur Kami */}
        <section className="indicators-section">
          <FeatureCards onNavigate={onNavigate} onDarurat={onDarurat} />
        </section>

        {/* Artikel Kesehatan Terbaru */}
        <section className="content-grid">
          <ArticleCard />
        </section>
      </main>

      <Footer />

    </div>
  );
}
