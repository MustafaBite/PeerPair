# PeerPair - Modern Sohbet Uygulaması

PeerPair, Next.js, React ve Socket.IO ile geliştirilmiş modern, gerçek zamanlı bir sohbet uygulamasıdır. Aydınlık/karanlık tema desteği, gerçek zamanlı mesajlaşma ve grup sohbeti özellikleriyle öne çıkar.

## Özellikler

- 🎨 **Modern Kullanıcı Arayüzü**
  - Duyarlı tasarım
  - Aydınlık/Karanlık tema desteği
  - Akıcı animasyonlar ve geçişler
  - Güzel ve sezgisel arayüz

- 💬 **Gerçek Zamanlı Sohbet**
  - Birebir mesajlaşma
  - Grup sohbeti desteği
  - Anlık mesaj iletimi
  - Mesaj durum göstergeleri

- 🔒 **Güvenlik**
  - Güvenli kimlik doğrulama
  - Uçtan uca şifreleme
  - Korumalı rotalar
  - Güvenli WebSocket bağlantıları

- 🌐 **Çoklu Platform**
  - Web uygulaması
  - Mobil uyumlu tasarım
  - Progressive Web App (PWA) desteği

## Teknoloji Altyapısı

- **Ön Uç**
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - React Query
  - Socket.IO Client

- **Arka Uç**
  - Node.js
  - Socket.IO
  - Express
  - MongoDB (planlanan)

## Gereksinimler

- Node.js 18.0.0 veya üstü
- npm 9.0.0 veya üstü
- Git

## Kurulum

1. Depoyu klonlayın:
```bash
git clone https://github.com/yourusername/peerpair.git
cd peerpair
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Kök dizinde `.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## Proje Yapısı

```
peerpair/
├── src/
│   ├── app/              # Next.js uygulama dizini
│   ├── components/       # React bileşenleri
│   ├── config/          # Yapılandırma dosyaları
│   ├── context/         # React context sağlayıcıları
│   ├── models/          # Veri modelleri
│   ├── routes/          # API rotaları
│   └── types/           # TypeScript tip tanımlamaları
├── public/              # Statik dosyalar
└── ...yapılandırma dosyaları
```

## Tema Sistemi

Uygulama, aşağıdaki özelliklere sahip kapsamlı bir tema sistemi kullanır:

- Aydınlık/Karanlık tema desteği
- Tutarlı tema için CSS değişkenleri
- Akıcı tema geçişleri
- Erişilebilirlik düzenlemeleri
- Performans optimizasyonları

Tema yapılandırması `src/config/theme.config.ts` dosyasında yönetilir ve `@peerpair.mdc` dosyasında tanımlanan kurallara uyar.

## Geliştirme Kuralları

1. **Kod Stili**
   - Tip güvenliği için TypeScript kullanın
   - React en iyi uygulamalarını takip edin
   - Fonksiyonel bileşenler ve hook'lar kullanın
   - Uygun hata yönetimi uygulayın

2. **Tema Geliştirme**
   - Renkler için tema değişkenlerini kullanın
   - Uygun geçişler uygulayın
   - Erişilebilirliği sağlayın
   - `@peerpair.mdc` tema kurallarını takip edin

3. **Bileşen Geliştirme**
   - Bileşenleri yeniden kullanılabilir yapın
   - Uygun prop tiplerini uygulayın
   - Doğru durum yönetimi kullanın
   - Performans en iyi uygulamalarını takip edin

## Katkıda Bulunma

1. Depoyu fork'layın
2. Özellik dalınızı oluşturun (`git checkout -b özellik/harika-özellik`)
3. Değişikliklerinizi commit'leyin (`git commit -m 'Harika bir özellik eklendi'`)
4. Dalınıza push yapın (`git push origin özellik/harika-özellik`)
5. Bir Pull Request açın

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için LICENSE dosyasına bakın.

## Teşekkürler

- Harika framework için Next.js ekibine
- UI kütüphanesi için React ekibine
- Gerçek zamanlı özellikler için Socket.IO ekibine
- Tüm katkıda bulunanlara ve geliştiricilere 