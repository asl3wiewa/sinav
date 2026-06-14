const TEST_DATA = {
  "1": {
    vize: [
      {
        id: "genel-turizm",
        title: "Genel Turizm Testi",
        description: "Turizm ve bos zaman kavramlarina dair temel kavramlari olcen 100 soruluk test.",
        tag: "Genel",
        tests: [
          { name: "Teste Basla", url: "quiz.html?test=genel-turizm", primary: true }
        ],
        pdfUrl: "assets/pdf/1-donem/vize/genel-turizm.pdf"
      },
      {
        id: "ziyafet",
        title: "Ziyafet",
        description: "Banket operasyonlarini iki farkli oturumla pekistir.",
        tag: "Ziyafet",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=ziyafet" },
          { name: "Test 2 Basla", url: "quiz.html?test=ziyafet2" }
        ],
        pdfUrl: "assets/pdf/1-donem/vize/ziyafet.pdf"
      },
      {
        id: "turizm-cografyasi-2",
        title: "Turizm Cografyasi II",
        description: "Iki farkli soru setiyle cografi bilgini test et.",
        tag: "Turizm Cografyasi",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=turizm-cografyasi-2" },
          { name: "Test 2 Basla", url: "quiz.html?test=turizm-cografyasi-2-2" }
        ],
        pdfUrl: "assets/pdf/1-donem/vize/turizm-cografyasi-2.pdf"
      },
      {
        id: "turizmde-etik",
        title: "Turizmde Etik",
        description: "Etik ilkeleri ardil uc testle derinlestir.",
        tag: "Turizmde Etik",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=turizmde-etik" },
          { name: "Test 2 Basla", url: "quiz.html?test=turizmde-etik-2" },
          { name: "Test 3 Basla", url: "quiz.html?test=turizmde-etik-3" }
        ],
        pdfUrl: "assets/pdf/1-donem/vize/turizmde-etik.pdf"
      },
      {
        id: "bagimlilik-ve-bagimlilikla-mucadele",
        title: "Bagimlilik ve Mucadele",
        description: "Bagimlilik turlerini iki oturumluk setle calis.",
        tag: "Bagimlilik",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=bagimlilik-ve-bagimlilikla-mucadele" },
          { name: "Test 2 Basla", url: "quiz.html?test=bagimlilik-ve-bagimlilikla-mucadele-2" }
        ],
        pdfUrl: "assets/pdf/1-donem/vize/bagimlilik-ve-bagimlilikla-mucadele.pdf"
      },
      {
        id: "kat-hizmetleri",
        title: "Kat Hizmetleri",
        description: "Oda ve kat operasyonlarini uc ayri testle calisin.",
        tag: "Kat Hizmetleri",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=kat-hizmetleri" },
          { name: "Test 2 Basla", url: "quiz.html?test=kat-hizmetleri-2" },
          { name: "Test 3 Basla", url: "quiz.html?test=kat-hizmetleri-3" }
        ],
        pdfUrl: "assets/pdf/1-donem/vize/kat-hizmetleri.pdf"
      },
      {
        id: "camasirhane-kontrolu",
        title: "Camasirhane Kontrolu",
        description: "Camasirhane operasyonlarini uc farkli testle pekistir.",
        tag: "Camasirhane Kontrolu",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=camasirhane-kontrolu" },
          { name: "Test 2 Basla", url: "quiz.html?test=camasirhane-kontrolu-2" },
          { name: "Test 3 Basla", url: "quiz.html?test=camasirhane-kontrolu-3" }
        ],
        pdfUrl: "assets/pdf/1-donem/vize/camasirhane-kontrolu.pdf"
      },
      {
        id: "on-buro-hizmetleri-vize",
        title: "On Buro Hizmetleri (Vize)",
        description: "On buro operasyonlarini iki testlik setle calisin.",
        tag: "On Buro",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=on-buro-hizmetleri-vize" },
          { name: "Test 2 Basla", url: "quiz.html?test=on-buro-hizmetleri-2-vize" }
        ],
        pdfUrl: "assets/pdf/1-donem/vize/on-buro-hizmetleri.pdf"
      },
      {
        id: "mesleki-yabanci-dil-1",
        title: "Mesleki Yabanci Dil - I",
        description: "Mesleki Ingilizce bilgisini uc seviye testiyle pekistir.",
        tag: "Mesleki Yabanci Dil I",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=mesleki-yabanci-dil-1" },
          { name: "Test 2 Basla", url: "quiz.html?test=mesleki-yabanci-dil-1-2" },
          { name: "Test 3 Basla", url: "quiz.html?test=mesleki-yabanci-dil-1-3" }
        ],
        pdfUrl: "assets/pdf/1-donem/vize/mesleki-yabanci-dil-1.pdf"
      },
      {
        id: "yiyecek-ve-icecek-servisi-1",
        title: "Yiyecek ve Icecek Servisi I",
        description: "Servis prosedurlerini uc testlik paketle gozden gecir.",
        tag: "Yiyecek & Icecek",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-1" },
          { name: "Test 2 Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-1-2" },
          { name: "Test 3 Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-1-3" }
        ],
        pdfUrl: "assets/pdf/1-donem/vize/yiyecek-ve-icecek-servisi-1.pdf"
      },
      {
        id: "turizm-ve-cevre",
        title: "Turizm ve Cevre",
        description: "Turizm-cevre iliskisini uc farkli testle kesfet.",
        tag: "Turizm & Cevre",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=turizm-ve-cevre" },
          { name: "Test 2 Basla", url: "quiz.html?test=turizm-ve-cevre-2" },
          { name: "Test 3 Basla", url: "quiz.html?test=turizm-ve-cevre-3" }
        ],
        pdfUrl: "assets/pdf/1-donem/vize/turizm-ve-cevre.pdf"
      },
      {
        id: "turizmde-rekreasyon",
        title: "Turizmde Rekreasyon",
        description: "Rekreasyon yonetimi konularini iki testle tekrar et.",
        tag: "Turizmde Rekreasyon",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=turizmde-rekreasyon" },
          { name: "Test 2 Basla", url: "quiz.html?test=turizmde-rekreasyon-2" }
        ],
        pdfUrl: "assets/pdf/1-donem/vize/turizmde-rekreasyon.pdf"
      }
    ],
    final: [
      {
        id: "on-buro-hizmetleri-final",
        title: "On Buro Hizmetleri (Final)",
        description: "On buro operasyonlarini uc testlik setle calisin.",
        tag: "On Buro",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=on-buro-hizmetleri" },
          { name: "Test 2 Basla", url: "quiz.html?test=on-buro-hizmetleri-2" },
          { name: "Test 3 Basla", url: "quiz.html?test=on-buro-hizmetleri-3" }
        ],
        pdfUrl: "assets/pdf/1-donem/final/on-buro-hizmetleri.pdf"
      },
      {
        id: "turizm-ve-cevre-final",
        title: "Turizm ve Cevre (Final)",
        description: "Turizm-cevre iliskisini uc farkli final testiyle kesfet.",
        tag: "Turizm & Cevre",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=turizm-ve-cevre-final" },
          { name: "Test 2 Basla", url: "quiz.html?test=turizm-ve-cevre-2-final" },
          { name: "Test 3 Basla", url: "quiz.html?test=turizm-ve-cevre-3-final" }
        ],
        pdfUrl: "assets/pdf/1-donem/final/turizm-ve-cevre.pdf"
      },
      {
        id: "ziyafet-final",
        title: "Ziyafet (Final)",
        description: "Banket operasyonlarini final testiyle pekistir.",
        tag: "Ziyafet",
        tests: [
          { name: "Teste Basla", url: "quiz.html?test=ziyafet-final", primary: true }
        ],
        pdfUrl: "assets/pdf/1-donem/final/ziyafet.pdf"
      },
      {
        id: "genel-turizm-final",
        title: "Genel Turizm (Final)",
        description: "Turizm ve bos zaman kavramlarina dair temel kavramlari iki final testiyle olc.",
        tag: "Genel",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=genel-turizm-final" },
          { name: "Test 2 Basla", url: "quiz.html?test=genel-turizm-2-final" }
        ],
        pdfUrl: "assets/pdf/1-donem/final/genel-turizm.pdf"
      },
      {
        id: "turizm-cografyasi-2-final",
        title: "Turizm Cografyasi II (Final)",
        description: "Iki farkli soru setiyle cografi bilgini final testleriyle test et.",
        tag: "Turizm Cografyasi",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=turizm-cografyasi-2-final" },
          { name: "Test 2 Basla", url: "quiz.html?test=turizm-cografyasi-2-2-final" }
        ],
        pdfUrl: "assets/pdf/1-donem/final/turizm-cografyasi-2.pdf"
      },
      {
        id: "mesleki-yabanci-dil-1-final",
        title: "Mesleki Yabanci Dil - I (Final)",
        description: "Mesleki Ingilizce bilgisini iki final testiyle pekistir.",
        tag: "Mesleki Yabanci Dil I",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=mesleki-yabanci-dil-1-final" },
          { name: "Test 2 Basla", url: "quiz.html?test=mesleki-yabanci-dil-1-2-final" }
        ],
        pdfUrl: "assets/pdf/1-donem/final/mesleki-yabanci-dil-1.pdf"
      },
      {
        id: "turizmde-etik-final",
        title: "Turizmde Etik (Final)",
        description: "Etik ilkeleri iki final testiyle derinlestir.",
        tag: "Turizmde Etik",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=turizmde-etik-final" },
          { name: "Test 2 Basla", url: "quiz.html?test=turizmde-etik-2-final" }
        ],
        pdfUrl: "assets/pdf/1-donem/final/turizmde-etik.pdf"
      },
      {
        id: "turizmde-rekreasyon-final",
        title: "Turizmde Rekreasyon (Final)",
        description: "Rekreasyon yonetimi konularini uc final testiyle tekrar et.",
        tag: "Turizmde Rekreasyon",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=turizmde-rekreasyon-final" },
          { name: "Test 2 Basla", url: "quiz.html?test=turizmde-rekreasyon-2-final" },
          { name: "Test 3 Basla", url: "quiz.html?test=turizmde-rekreasyon-3-final" }
        ],
        pdfUrl: "assets/pdf/1-donem/final/turizmde-rekreasyon.pdf"
      },
      {
        id: "yiyecek-ve-icecek-servisi-1-final",
        title: "Yiyecek ve Icecek Servisi I (Final)",
        description: "Servis prosedurlerini dort final testiyle gozden gecir.",
        tag: "Yiyecek & Icecek",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-1-final" },
          { name: "Test 2 Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-1-2-final" },
          { name: "Test 3 Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-1-3-final" },
          { name: "Test 4 Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-1-4-final" }
        ],
        pdfUrl: "assets/pdf/1-donem/final/yiyecek-ve-icecek-servisi-1.pdf"
      },
      {
        id: "camasirhane-kontrolu-final",
        title: "Camasirhane Kontrolu (Final)",
        description: "Camasirhane operasyonlarini final testiyle pekistir.",
        tag: "Camasirhane Kontrolu",
        tests: [
          { name: "Teste Basla", url: "quiz.html?test=camasirhane-kontrolu-final", primary: true }
        ],
        pdfUrl: "assets/pdf/1-donem/final/camasirhane-kontrolu.pdf"
      },
      {
        id: "kat-hizmetleri-final",
        title: "Kat Hizmetleri (Final)",
        description: "Oda ve kat operasyonlarini iki final testiyle calis.",
        tag: "Kat Hizmetleri",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=kat-hizmetleri-final" },
          { name: "Test 2 Basla", url: "quiz.html?test=kat-hizmetleri-2-final" }
        ],
        pdfUrl: "assets/pdf/1-donem/final/kat-hizmetleri.pdf"
      },
      {
        id: "bagimlilik-ve-bagimlilikla-mucadele-final",
        title: "Bagimlilik ve Mucadele (Final)",
        description: "Bagimlilik turlerini iki final testiyle calis.",
        tag: "Bagimlilik",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=bagimlilik-ve-bagimlilikla-mucadele-final" },
          { name: "Test 2 Basla", url: "quiz.html?test=bagimlilik-ve-bagimlilikla-mucadele-2-final" }
        ],
        pdfUrl: "assets/pdf/1-donem/final/bagimlilik-ve-bagimlilikla-mucadele.pdf"
      }
    ]
  },
  "2": {
    vize: [
      {
        id: "barda-servis",
        title: "Barda Servis",
        description: "Ikinci donem vize konularini iki ayri testle calis.",
        tag: "Barda Servis",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=barda-servis" },
          { name: "Test 2 Basla", url: "quiz.html?test=barda-servis-2" }
        ],
        pdfUrl: "assets/pdf/2-donem/vize/barda-servis.pdf"
      },
      {
        id: "turizm-ve-cevre-1",
        title: "Turizm ve Cevre I",
        description: "Ikinci donem vize konularini iki ayri testle calis.",
        tag: "Turizm & Cevre",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=turizm-ve-cevre-1-1" },
          { name: "Test 2 Basla", url: "quiz.html?test=turizm-ve-cevre-1-2" }
        ],
        pdfUrl: "assets/pdf/2-donem/vize/turizm-ve-cevre-1.pdf"
      },
      {
        id: "dijital-pazarlama-ve-sosyal-medya",
        title: "Dijital Pazarlama ve Sosyal Medya",
        description: "Ikinci donem vize konularini tek testle calis.",
        tag: "Dijital Pazarlama",
        tests: [
          { name: "Teste Basla", url: "quiz.html?test=dijital-pazarlama-ve-sosyal-medya", primary: true }
        ],
        pdfUrl: "assets/pdf/2-donem/vize/Dijital-Pazarlama-ve-Sosyal-Medya.pdf"
      },
      {
        id: "mesleki-yabanci-dil-2",
        title: "Mesleki Yabanci Dil II",
        description: "Ikinci donem vize konularini iki ayri testle calis.",
        tag: "Mesleki Yabanci Dil II",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=mesleki-yabanci-dil-2-1" },
          { name: "Test 2 Basla", url: "quiz.html?test=mesleki-yabanci-dil-2-2" }
        ],
        pdfUrl: "assets/pdf/2-donem/vize/mesleki-yabanci-dil-2.pdf"
      },
      {
        id: "konukla-iletisim",
        title: "Konukla Iletisim",
        description: "Ikinci donem vize konularini dort ayri testle calis.",
        tag: "Konuk Iliskileri",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=konukla-iletisim" },
          { name: "Test 2 Basla", url: "quiz.html?test=konukla-iletisim-2" },
          { name: "Test 3 Basla", url: "quiz.html?test=konukla-iletisim-3" },
          { name: "Test 4 Basla", url: "quiz.html?test=konukla-iletisim-4" }
        ],
        pdfUrl: "assets/pdf/2-donem/vize/Konukla-iletisim.pdf"
      },
      {
        id: "kat-hizmetleri-2",
        title: "Kat Hizmetleri II",
        description: "Ikinci donem vize konularini dort ayri testle calis.",
        tag: "Kat Hizmetleri",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=kat-hizmetleri-2-1" },
          { name: "Test 2 Basla", url: "quiz.html?test=kat-hizmetleri-2-2" },
          { name: "Test 3 Basla", url: "quiz.html?test=kat-hizmetleri-2-3" },
          { name: "Test 4 Basla", url: "quiz.html?test=kat-hizmetleri-2-4" },
          { name: "Test 5 Basla", url: "quiz.html?test=kat-hizmetleri-2-5" }
        ],
        pdfUrl: "assets/pdf/2-donem/vize/kat-hizmetleri-2.pdf"
      },
      {
        id: "yiyecek-ve-icecek-servisi-2",
        title: "Yiyecek ve Icecek Servisi II",
        description: "Ikinci donem vize konularini uc ayri testle calis.",
        tag: "Yiyecek & Icecek",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-2-1" },
          { name: "Test 2 Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-2-2" },
          { name: "Test 3 Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-2-3" }
        ],
        pdfUrl: "assets/pdf/2-donem/vize/yiyecek-ve-icecek-servisi-2.pdf"
      }
    ],
    final: [
      {
        id: "kat-hizmetleri-2-final",
        title: "Kat Hizmetleri II (Final)",
        description: "Ikinci donem final konularini dort ayri testle calis.",
        tag: "Kat Hizmetleri",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=kat-hizmetleri-2-1-final" },
          { name: "Test 2 Basla", url: "quiz.html?test=kat-hizmetleri-2-2-final" },
          { name: "Test 3 Basla", url: "quiz.html?test=kat-hizmetleri-2-3-final" },
          { name: "Test 4 Basla", url: "quiz.html?test=kat-hizmetleri-2-4-final" }
        ],
        pdfUrl: "assets/pdf/2-donem/final/kat-hizmetleri-2.pdf"
      },
      {
        id: "yiyecek-ve-icecek-servisi-2-final",
        title: "Yiyecek ve Icecek Servisi II (Final)",
        description: "Ikinci donem final konularini tek testle pekistir.",
        tag: "Yiyecek & Icecek",
        tests: [
          { name: "Teste Basla", url: "quiz.html?test=yiyecek-ve-icecek-servisi-2-1-final", primary: true }
        ],
        pdfUrl: "assets/pdf/2-donem/final/yiyecek-ve-icecek-servisi-2.pdf"
      },
      {
        id: "konukla-iletisim-final",
        title: "Konukla Iletisim (Final)",
        description: "Ikinci donem final konularini dort ayri testle calis.",
        tag: "Konuk Iliskileri",
        tests: [
          { name: "Test 1 Basla", url: "quiz.html?test=konukla-iletisim-final" },
          { name: "Test 2 Basla", url: "quiz.html?test=konukla-iletisim-2-final" },
          { name: "Test 3 Basla", url: "quiz.html?test=konukla-iletisim-3-final" },
          { name: "Test 4 Basla", url: "quiz.html?test=konukla-iletisim-4-final" }
        ],
        pdfUrl: "assets/pdf/2-donem/final/Konukla-iletisim.pdf"
      },
      {
        id: "mesleki-yabanci-dil-2-final",
        title: "Mesleki Yabanci Dil II (Final)",
        description: "Ikinci donem final konularini testle pekistir.",
        tag: "Mesleki Yabanci Dil II",
        tests: [
          { name: "Teste Basla", url: "quiz.html?test=mesleki-yabanci-dil-2-1-final", primary: true }
        ],
        pdfUrl: "assets/pdf/2-donem/final/mesleki-yabanci-dil-2.pdf"
      }
    ]
  }
};

let currentFilter = "final";
let currentSemester = "2";

function getTestsForSemester(semester, filter = "all") {
  const semesterData = TEST_DATA[semester];
  if (!semesterData) {
    return [];
  }

  if (filter === "all") {
    return [...semesterData.vize, ...semesterData.final];
  }

  return semesterData[filter] || [];
}

function createTestCard(test) {
  const article = document.createElement("article");
  article.className = "test-card";

  const testButtons = test.tests.map(testItem => {
    const btnClass = testItem.primary ? "btn primary" : "btn secondary";
    return `<a class="${btnClass}" href="${testItem.url}">${testItem.name}</a>`;
  }).join("");

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

function renderTests(filter = "all") {
  const testsContainer = document.querySelector(`[data-tests-container="${currentSemester}"]`);
  const emptyState = document.querySelector(`[data-empty-state="${currentSemester}"]`);
  if (!testsContainer) {
    return;
  }

  testsContainer.innerHTML = "";

  const tests = getTestsForSemester(currentSemester, filter);
  const hasTests = tests.length > 0;

  testsContainer.classList.toggle("hidden", !hasTests);
  if (emptyState) {
    emptyState.classList.toggle("hidden", hasTests);
  }

  tests.forEach(test => {
    testsContainer.appendChild(createTestCard(test));
  });
}

function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter || "all";
      filterButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === currentFilter);
      });
      renderTests(currentFilter);
    });
  });
}

function setActiveSemester(semester) {
  currentSemester = semester;

  const semesterTabs = document.querySelectorAll(".semester-tab");
  const semesterPanels = document.querySelectorAll(".semester-panel");

  semesterTabs.forEach(tab => {
    const isActive = tab.dataset.semester === semester;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  semesterPanels.forEach(panel => {
    const isActive = panel.dataset.semesterPanel === semester;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });

  if (semester === "1") {
    renderTests(currentFilter);
  }
}

function setupSemesterTabs() {
  const semesterTabs = document.querySelectorAll(".semester-tab");

  semesterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      setActiveSemester(tab.dataset.semester || "1");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTests(currentFilter);
  setupFilterButtons();
  setupSemesterTabs();
  setActiveSemester(currentSemester);
});
