import React from 'react';
import articleNutrition from '../../assets/images/beranda/article-nutrition.jpeg';
import articleCare from '../../assets/images/beranda/article-care.jpeg';

export default function ArticleCard() {
  const articles = [
    {
      id: 1,
      title: 'Nutrisi Seimbang untuk Tumbuh Kembang Dini',
      snippet:
        'Temukan vitamin esensial yang dibutuhkan setiap anak selama 1.000 hari pertama kehidupan...',
      image: articleNutrition,
      tag: 'Nutrisi',
      tagType: 'dark',
      readTime: '3 mnt baca',
    },
    {
      id: 2,
      title: 'Panduan Perawatan Pasca Imunisasi',
      snippet:
        'Tips praktis bagi orang tua untuk menangani reaksi ringan setelah imunisasi rutin anak...',
      image: articleCare,
      tag: 'Perawatan',
      tagType: 'red',
      readTime: '4 mnt baca',
    },
    {
      id: 3,
      title: 'Tips Menambah Tinggi Badan Anak',
      snippet:
        'Tips praktis bagi orang tua untuk membantu anak tumbuh tinggi.',
      image: articleCare,
      tag: 'Kesehatan',
      tagType: 'green',
      readTime: '5 mnt baca',
    },
  ];

  return (
    <section className="articles-column">

      <div className="section-header">
        <h2 className="section-title">
          Artikel Kesehatan Terbaru
        </h2>

        <button className="see-all-link">
          Lihat Semua
        </button>
      </div>

      <div className="articles-row">

        {articles.map((article) => (
          <article
            className="article-card"
            key={article.id}
          >

            <div className="article-image-container">

              <img
                src={article.image}
                alt={article.title}
                className="article-img"
              />

              <span
                className={`article-tag ${article.tagType}`}
              >
                {article.tag}
              </span>

            </div>

            <div className="article-body">

              <h3 className="article-title">
                {article.title}
              </h3>

              <p className="article-snippet">
                {article.snippet}
              </p>

              <div className="article-footer">

                <span className="article-readtime">
                  🕒 {article.readTime}
                </span>

              </div>

            </div>

          </article>
        ))}

      </div>

    </section>
  );
}