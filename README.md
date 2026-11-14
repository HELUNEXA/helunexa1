# 🩺 HELUNEXA - Dijital Sağlık Hizmeti Erişim ve Talep Yönetimi Platformu

**Sürüm:** 2.0 (Demo / Prototip)  
**Teknoloji:** HTML5, CSS3, Vanilla JavaScript, Supabase (Bulut Veritabanı)

## 📌 Proje Hakkında
HELUNEXA, kullanıcıların sağlık hizmetlerine erişimini kolaylaştırmak ve hastanelerin gelen talepleri profesyonelce yönetmesini sağlamak amacıyla geliştirilmiş dijital bir platform prototipidir. 

Projenin temel vizyonu; **"Hasta için sürtünmesiz (frictionless) bir deneyim, hastane için tam kontrol"** dengesini kurmaktır. Karmaşık üyelik süreçleri, uzun formlar ve belge yükleme adımları ortadan kaldırılarak, hasta ile sağlık kuruluşu arasında hızlı bir köprü kurulmuştur.

## ✨ Temel Özellikler

### 👤 Hasta Tarafı (Hızlı Başvuru)
*   **Üyelik Gerektirmez:** Kullanıcı sisteme girer girmez 8 farklı sağlık modülü ile karşılaşır.
*   **8 Sağlık Modülü:** Check-up, Kronik Hastalık Takibi, İlaç Raporu, Longevity, Kanser Taraması, Evde Bakım, Anne & Bebek Sağlığı, Kurumsal Sağlık.
*   **Akıllı Seçim:** Hasta seçtiği modüle göre (örneğin Check-up) ilgili tahlilleri ve tetkikleri işaretleyebilir.
*   **Tek Adımda Talep:** Sadece **Ad, Soyad ve Telefon Numarası** bırakarak talebini sisteme iletebilir.

### 🩺 Hekim / Kurum Paneli (Talep Yönetimi)
*   **Anlık Bildirim:** Hastanın formu göndermesiyle birlikte talep, anında hekim paneline düşer.
*   **Detaylı Görünüm:** Hekim; hastanın iletişim bilgilerini, seçtiği hizmeti ve merak ettiği tıbbi tetkikleri tek ekranda görür.
*   **Tıkla-Ara:** Hasta telefon numarasına tıklanarak doğrudan arama başlatılabilir.
*   **Durum Yönetimi:** Hekim süreci "Bekliyor" veya "Tamamlandı" olarak güncelleyebilir.

### ☁️ Arka Plan (Altyapı)
*   **Bulut Veritabanı:** Hasta talepleri, yüksek güvenlikli bulut tabanlı bir veritabanına (Supabase) anında ve kayıpsız olarak kaydedilir.
*   **Gerçek Zamanlı Senkronizasyon:** Hasta formu ile hekim paneli arasında kesintisiz veri akışı sağlanır.

## 🚀 Kurulum ve Çalıştırma
Projeyi çalıştırmak için herhangi bir sunucuya (backend) veya kuruluma ihtiyaç yoktur. 
1. Projeyi bilgisayarınıza indirin.
2. `index.html` dosyasını güncel bir web tarayıcısında (Chrome, Safari, Edge) açın.
3. Hasta başvurusunu test ettikten sonra, üst menüdeki **"Hekim Girişi"** butonuna tıklayarak yönetim panelini test edebilirsiniz.

## 📂 Dosya Yapısı
*   `index.html` : Uygulamanın başlangıç noktası (Hasta Vitrini).
*   `admin.html` : Hekim / Yönetici Paneli.
*   `app.js` : Hasta tarafındaki kullanıcı deneyimini ve form akışını yöneten motor.
*   `model.js` : Sistemin iş kuralları, doğrulamalar ve randevu mantığı.
*   `content.js` : Hizmet modülleri, tetkik katalogları ve kurum verileri.
*   `style.css` : Kurumsal kimliğe uygun (Zümrüt Yeşili) responsive tasarım.
*   `logo.png` : HELUNEXA marka logosu.

## ⚠️ Demo Sınırları ve Gelecek Vizyonu
*   Bu sürüm, projenin **konseptini kanıtlamak (Proof of Concept)** amacıyla hazırlanmış bir demo/prototip sürümüdür.
*   Gerçek sağlık verisiyle kullanıma hazır değildir. Tıbbi onay, reçete yazımı ve yasal süreçler bu sürümün kapsamı dışındadır.
*   Proje kabul gördüğü takdirde; **Pilot Proje** aşamasında gerçek hastane entegrasyonları (e-Nabız vb.), SMS doğrulama, e-imza ve detaylı hekim tıbbi notu (reçete/rapor) sistemleri eklenecektir.

---
© 2026 HELUNEXA. Tüm hakları saklıdır.