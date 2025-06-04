let gruplar = JSON.parse(localStorage.getItem('gruplar')) || [];
let aramaMetni = "";

window.onload = function() {
  gruplariListele();
  temaYukle();
  
  // Arama kutusu
  document.getElementById('arama-kutusu').addEventListener('input', function(e) {
    aramaMetni = e.target.value.toLowerCase();
    gruplariListele();
  });
  
  // Tema değiştirme
  document.getElementById('tema-degistir').addEventListener('click', temaDegistir);
};

// Tema yükleme
function temaYukle() {
  const kayitliTema = localStorage.getItem('tema') || 'light';
  const body = document.body;
  const temaButon = document.getElementById('tema-degistir');
  
  body.setAttribute('data-theme', kayitliTema);
  temaButon.textContent = kayitliTema === 'light' ? '🌙 Karanlık Tema' : '☀️ Açık Tema';
}

// Tema değiştirme
function temaDegistir() {
  const body = document.body;
  const temaButon = document.getElementById('tema-degistir');
  const mevcutTema = body.getAttribute('data-theme');
  const yeniTema = mevcutTema === 'light' ? 'dark' : 'light';
  
  body.setAttribute('data-theme', yeniTema);
  temaButon.textContent = yeniTema === 'light' ? '🌙 Karanlık Tema' : '☀️ Açık Tema';
  
  localStorage.setItem('tema', yeniTema);
}

// Form submit
document.getElementById('grup-formu').addEventListener('submit', function(e) {
  e.preventDefault();

  const ad = document.getElementById('grup-adi').value;
  const aciklama = document.getElementById('grup-aciklama').value;
  const tur = document.querySelector('input[name="grup-turu"]:checked').value;

  const yeniGrup = {
    ad: ad,
    aciklama: aciklama,
    tur: tur,
    uyeSayisi: 1,
    uyeMi: true // Oluşturan kişi otomatik üye
  };

  gruplar.push(yeniGrup);
  localStorage.setItem('gruplar', JSON.stringify(gruplar));

  document.getElementById('grup-formu').reset();
  gruplariListele();
});

function gruplariListele() {
  const listeDiv = document.getElementById('grup-listesi');
  listeDiv.innerHTML = '';

  // Arama filtresi
  const filtreliGruplar = gruplar.filter(function(grup) {
    return grup.ad.toLowerCase().includes(aramaMetni);
  });

  if (filtreliGruplar.length === 0) {
    listeDiv.innerHTML = '<p style="text-align:center; color:var(--muted-color);">Aradığınız kritere uygun grup yok.</p>';
    return;
  }

  filtreliGruplar.forEach(function(grup) {
    const orijinalIndex = gruplar.indexOf(grup);

    if (!grup.uyeSayisi || isNaN(grup.uyeSayisi)) {
      grup.uyeSayisi = 0;
    }

    // Eğer grup.uyeMi yoksa, false olarak başlat
    if (typeof grup.uyeMi === "undefined") {
      grup.uyeMi = false;
    }

    const grupDiv = document.createElement('div');
    grupDiv.className = 'grup';
    grupDiv.innerHTML = `
      <div class="grup-ad" data-index="${orijinalIndex}">${grup.ad}</div>
      <div class="grup-tur">${grup.tur ? grup.tur : "Herkese Açık"}</div>
      <div class="grup-aciklama">${grup.aciklama}</div>
      <div class="grup-uyeler">👥 Üye Sayısı: ${grup.uyeSayisi}</div>
      <div style="margin-top:15px;">
        ${grup.uyeMi
          ? `<button class="ayril-btn" data-index="${orijinalIndex}">🚪 Ayrıl</button>`
          : `<button class="katil-btn" data-index="${orijinalIndex}">✨ Katıl</button>`
        }
        <button class="sil-btn" data-index="${orijinalIndex}">🗑️ Sil</button>
      </div>
    `;
    listeDiv.appendChild(grupDiv);
  });

  // Event listener'ları ekle
  ekleEventListeners();
}

function ekleEventListeners() {
  // Katıl butonları
  const katilButonlari = document.querySelectorAll('.katil-btn');
  katilButonlari.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      if (!gruplar[index].uyeSayisi || isNaN(gruplar[index].uyeSayisi)) {
        gruplar[index].uyeSayisi = 0;
      }
      gruplar[index].uyeSayisi += 1;
      gruplar[index].uyeMi = true; // Üye olundu
      localStorage.setItem('gruplar', JSON.stringify(gruplar));
      gruplariListele();
    });
  });

  // Ayrıl butonları
  const ayrilButonlari = document.querySelectorAll('.ayril-btn');
  ayrilButonlari.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      if (!gruplar[index].uyeSayisi || isNaN(gruplar[index].uyeSayisi)) {
        gruplar[index].uyeSayisi = 1;
      }
      if (gruplar[index].uyeSayisi > 0) {
        gruplar[index].uyeSayisi -= 1;
      }
      gruplar[index].uyeMi = false; // Üyelikten çıkıldı
      localStorage.setItem('gruplar', JSON.stringify(gruplar));
      gruplariListele();
    });
  });

  // Sil butonları
  const silButonlari = document.querySelectorAll('.sil-btn');
  silButonlari.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      gruplar.splice(index, 1);
      localStorage.setItem('gruplar', JSON.stringify(gruplar));
      gruplariListele();
    });
  });

  // Grup adlarına tıklama
  const grupAdlari = document.querySelectorAll('.grup-ad');
  grupAdlari.forEach(function(ad) {
    ad.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      grupDetayGoster(index);
    });
  });
}

// Modal fonksiyonları
function grupDetayGoster(index) {
  const modal = document.getElementById('grup-modal');
  const modalDetay = document.getElementById('modal-detay');
  const grup = gruplar[index];

  modalDetay.innerHTML = `
    <h2>${grup.ad}</h2>
    <p><strong>Tür:</strong> ${grup.tur ? grup.tur : "Herkese Açık"}</p>
    <p><strong>Açıklama:</strong> ${grup.aciklama}</p>
    <p><strong>Üye Sayısı:</strong> ${grup.uyeSayisi}</p>
  `;

  modal.style.display = 'block';
}

// Modal kapatma
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('grup-modal');
  const kapat = document.querySelector('.kapat');
  
  if (kapat) {
    kapat.onclick = function() {
      modal.style.display = 'none';
    };
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
});