// Test verileri - vize ve final kategorileri
const TEST_DATA = [
  {
    id: "genel-turizm",
    title: "Genel Turizm Testi",
    description: "Turizm ve bos zaman kavramlarina dair temel kavramlari olcen 100 soruluk test.",
    tag: "Genel",
    category: "vize",
    tests: [
      { name: "Teste Basla", url: "quiz.html?test=genel-turizm", primary: true }
    ],
    pdfUrl: "assets/pdf/vize/genel-turizm.pdf"
  },
  {
    id: "ziyafet",
    title: "Ziyafet",
    description: "Banket operasyonlarini iki farkli oturumla pekistir.",
    tag: "Ziyafet",
    category: "vize",
    tests: [
      { name: "Test 1 Basla", url: "quiz.html?test=ziyafet" },
      { name: "Test 2 Basla", url: "quiz.html?test=ziyafet2" }
    ],
    pdfUrl: "assets/pdf/vize/ziyafet.pdf"
  },
  {
    id: "turizm-cografyasi-2",
    title: "Turizm Cografyasi II",
    description: "Iki farkli soru setiyle cografi bilgini test et.",
    tag: "Turizm Cografyasi",
    category: "vize",
    tests: [
      { name: "Test 1 Basla", url: "quiz.html?test=turizm-cografyasi-2" },
      { name: "Test 2 Basla", url: "quiz.html?test=turizm-cografyasi-2-2" }
    ],
    pdfUrl: "assets/pdf/vize/turizm-cografyasi-2.pdf"
  },
  {
    id: "turizmde-etik",
    title: "Turizmde Etik",
    description: "Etik ilkeleri ardil uc testle derinlestir.",
    tag: "Turizmde Etik",
    category: "vize",
    tests: [
      { name: "Test 1 Basla", url: "quiz.html?test=turizmde-etik" },
      { name: "Test 2 Basla", url: "quiz.html?test=turizmde-etik-2" },
      { name: "Test 3 Basla", url: "quiz.html?test=turizmde-etik-3" }
    ],
    pdfUrl: "assets/pdf/vize/turizmde-etik.pdf"
  },
  {
    id: "bagimlilik-ve-bagimlilikla-mucadele",
    title: "Bagimlilik ve Mucadele",
    description: "Bagimlilik turlerini iki oturumluk setle calis.",
    tag: "Bagimlilik",
    category: "vize",
    tests: [
      { name: "Test 1 Basla", url: "quiz.html?test=bagimlilik-ve-bagimlilikla-mucadele" },
      { name: "Test 2 Basla", url: "quiz.html?test=bagimlilik-ve-bagimlilikla-mucadele-2" }
    ],
    pdfUrl: "assets/pdf/vize/bagimlilik-ve-bagimlilikla-mucadele.pdf"
  },
  {
    id: "kat-hizmetleri",
    title: "Kat Hizmetleri",
    description: "Oda ve kat operasyonlarini uc ayri testle calisin.",
    tag: "Kat Hizmetleri",
    category: "vize",
    tests: [
      { name: "Test 1 Basla", url: "quiz.html?test=kat-hizmetleri" },
      { name: "Test 2 Basla", url: "quiz.html?test=kat-hizmetleri-2" },
      { name: "Test 3 Basla", url: "quiz.html?test=kat-hizmetleri-3" }
    ],
    pdfUrl: "assets/pdf/vize/kat-hizmetleri.pdf"
  },
  {
    id: "camasirhane-kontrolu",
    title: "Camasirhane Kontrolu",
    description: "Çamaşırhane operasyonlarini uc farkli testle pekistir.",
    tag: "Camasirhane Kontrolu",
    category: "vize",
    tests: [
      { name: "Test 1 Basla", url: "quiz.html?test=camasirhane-kontrolu" },
      { name: "Test 2 Basla", url: "quiz.html?test=camasirhane-kontrolu-2" },
      { name: "Test 3 Basla", url: "quiz.html?test=camasirhane-kontrolu-3" }
    ],
    pdfUrl: "assets/pdf/vize/camasirhane-kontrolu.pdf"
  },
  {
    id: "on-buro-hizmetleri-vize",
    title: "On Buro Hizmetleri (Vize)",
    description: "Ön büro operasyonlarini iki testlik setle calisin.",
    tag: "On Buro",
    category: "vize",
    tests: [
      { name: "Test 1 Basla", url: "quiz.html?test=on-buro-hizmetleri-vize" },
      { name: "Test 2 Basla", url: "quiz.html?test=on-buro-hizmetleri-2-vize" }
    ],
    pdfUrl: "assets/pdf/vize/on-buro-hizmetleri.pdf"
  },
  {
    id: "on-buro-hizmetleri-final",
    title: "On Buro Hizmetleri (Final)",
    description: "Ön büro operasyonlarini üç testlik setle calisin.",
    tag: "On Buro",
    category: "final",
    tests: [
      { name: "Test 1 Basla", url: "quiz.html?test=on-buro-hizmetleri" },
      { name: "Test 2 Basla", url: "quiz.html?test=on-buro-hizmetleri-2" },
      { name: "Test 3 Basla", url: "quiz.html?test=on-buro-hizmetleri-3" }
    ],
    pdfUrl: "assets/pdf/final/on-buro-hizmetleri.pdf"
  },
  {
    id: "mesleki-yabanci-dil-1",
    title: "Mesleki Yabancı Dil - I",
    description: "Mesleki İngilizce bilgisini üç seviye testiyle pekiştir.",
    tag: "Mesleki Yabancı Dil I",
    category: "vize",
    tests: [
      { name: "Test 1 Basla", url: "quiz.html?test=mesleki-yabanci-dil-1" },
      { name: "Test 2 Basla", url: "quiz.html?test=mesleki-yabanci-dil-1-2" },
      { name: "Test 3 Basla", url: "quiz.html?test=mesleki-yabanci-dil-1-3" }
    ],
    pdfUrl: "assets/pdf/vize/mesleki-yabanci-dil-1.pdf"
  },
  {
    id: "yiyecek-ve-icecek-servisi-1",
    title: "Yiyecek ve Icecek Servisi I",
    description: "Servis prosedürlerini üç testlik paketle gözden geçir.",
    tag: "Yiyecek & Icecek",
    category: "vize",
    tests: [
      { name: "Test 1 Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-1" },
      { name: "Test 2 Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-1-2" },
      { name: "Test 3 Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-1-3" }
    ],
    pdfUrl: "assets/pdf/vize/yiyecek-ve-icecek-servisi-1.pdf"
  },
  {
    id: "turizm-ve-cevre",
    title: "Turizm ve Cevre",
    description: "Turizm-çevre ilişkisini üç farklı testle keşfet.",
    tag: "Turizm & Cevre",
    category: "vize",
    tests: [
      { name: "Test 1 Basla", url: "quiz.html?test=turizm-ve-cevre" },
      { name: "Test 2 Basla", url: "quiz.html?test=turizm-ve-cevre-2" },
      { name: "Test 3 Basla", url: "quiz.html?test=turizm-ve-cevre-3" }
    ],
    pdfUrl: "assets/pdf/vize/turizm-ve-cevre.pdf"
  },
  {
    id: "turizmde-rekreasyon",
    title: "Turizmde Rekreasyon",
    description: "Rekreasyon yönetimi konularını iki testle tekrar et.",
    tag: "Turizmde Rekreasyon",
    category: "vize",
    tests: [
      { name: "Test 1 Basla", url: "quiz.html?test=turizmde-rekreasyon" },
      { name: "Test 2 Basla", url: "quiz.html?test=turizmde-rekreasyon-2" }
    ],
    pdfUrl: "assets/pdf/vize/turizmde-rekreasyon.pdf"
  },
  {
    id: "turizm-ve-cevre-final",
    title: "Turizm ve Cevre (Final)",
    description: "Turizm-çevre ilişkisini üç farklı final testiyle keşfet.",
    tag: "Turizm & Cevre",
    category: "final",
    tests: [
      { name: "Test 1 Basla", url: "quiz.html?test=turizm-ve-cevre-final" },
      { name: "Test 2 Basla", url: "quiz.html?test=turizm-ve-cevre-2-final" },
      { name: "Test 3 Basla", url: "quiz.html?test=turizm-ve-cevre-3-final" }
    ],
    pdfUrl: "assets/pdf/final/turizm-ve-cevre.pdf"
  },
  {
    id: "ziyafet-final",
    title: "Ziyafet (Final)",
    description: "Banket operasyonlarını final testiyle pekiştir.",
    tag: "Ziyafet",
    category: "final",
    tests: [
      { name: "Teste Basla", url: "quiz.html?test=ziyafet-final", primary: true }
    ],
    pdfUrl: "assets/pdf/final/ziyafet.pdf"
  }
];

let currentFilter = 'all';

// Test kartı oluştur
function createTestCard(test) {
  const article = document.createElement('article');
  article.className = 'test-card';
  article.dataset.category = test.category;

  const testButtons = test.tests.map(testItem => {
    const btnClass = testItem.primary ? 'btn primary' : 'btn secondary';
    return `<a class="${btnClass}" href="${testItem.url}">${testItem.name}</a>`;
  }).join('');

  article.innerHTML = `
    <div class="test-card__body">
      <p class="test-card__tag">${test.tag}</p>
      <h2>${test.title}</h2>
      <p>${test.description}</p>
    </div>
    <div class="test-card__actions">
      ${testButtons}
      <a class="btn outline" href="${test.pdfUrl}" target="_blank" rel="noopener">
        PDF gor
      </a>
    </div>
  `;

  return article;
}

// Testleri render et
function renderTests(filter = 'all') {
  const testsContainer = document.getElementById('tests');
  testsContainer.innerHTML = '';

  const filteredTests = filter === 'all' 
    ? TEST_DATA 
    : TEST_DATA.filter(test => test.category === filter);

  filteredTests.forEach(test => {
    const card = createTestCard(test);
    testsContainer.appendChild(card);
  });
}

// Filtre butonlarına event listener ekle
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Aktif butonu güncelle
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filtreyi uygula
      const filter = button.dataset.filter;
      currentFilter = filter;
      renderTests(filter);
    });
  });
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', () => {
  renderTests();
  setupFilterButtons();
});