# 🩺 HELUNEXA - Dijital Sağlık ve Check-up Platformu

HELUNEXA, hastaların rutin sağlık kontrollerini, check-up süreçlerini ve kronik hastalık takiplerini dijital ortamda yönetmelerini sağlayan modern bir sağlık teknolojisi (HealthTech) platformudur. 

Bu proje; hasta başvuru süreçlerini, akıllı tetkik seçimlerini (CDSS), anlaşmalı hastane yönlendirmelerini ve hekim değerlendirmelerini tek bir çatı altında toplar.

## 🚀 Özellikler

*   **Hasta Paneli:** Hastaların mevcut başvurularını, randevularını ve hekim notlarını görüntüleyebildiği kişisel dashboard.
*   **Akıllı Check-up (CDSS):** Hastanın yaş, cinsiyet ve şikayetlerine göre kişiselleştirilmiş tetkik öneri sistemi.
*   **Gelişmiş Başvuru Formu:** Hizmet seçimi, randevu takvimi ve tahlil durumu yönetimi.
*   **Ödeme ve Yönlendirme Simülasyonu:** Demo amaçlı kredi kartı ödeme ekranı ve anlaşmalı hastane seçim modülü.
*   **Rol Tabanlı Giriş (Auth):** Hasta, Hekim ve Admin rolleri için ayrı giriş ve yetkilendirme süreçleri.
*   **Kurumsal Giriş:** Şirket kodu ve sicil numarası ile kurumsal hasta başvuruları.

## 🛠️ Kullanılan Teknolojiler

*   **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
*   **Backend & Veritabanı:** [Supabase](https://supabase.com/) (PostgreSQL, Auth, Row Level Security)
*   **Versiyon Kontrol:** Git & GitHub
*   **Tasarım:** Modern, Responsive (Mobil uyumlu) arayüz

## 📂 Proje Yapısı

Proje, statik HTML dosyaları ve istemci taraflı (client-side) JavaScript kullanılarak geliştirilmiştir. Supabase entegrasyonu doğrudan frontend üzerinden yapılmaktadır.

*   `index.html` - Ana sayfa (Landing page)
*   `giris.html` - Rol tabanlı giriş ekranı (Hasta, Hekim, Admin)
*   `hasta-kayit.html` - Yeni hasta kayıt formu
*   `hasta-panel.html` - Hastaların başvurularını gördüğü panel
*   `basvuru.html` - Detaylı sağlık başvuru formu
*   `checkup-cdss.html` - Akıllı tetkik seçim ve değerlendirme ekranı
*   `admin.html` - Hekim ve Admin yönetim paneli
*   `kvkk.html` - KVKK Aydınlatma Metni

## 💻 Kurulum ve Çalıştırma

Proje herhangi bir sunucu (backend) gerektirmez, tamamen tarayıcı üzerinde çalışır. Ancak Supabase bağlantılarının doğru çalışması için:

1.  Projeyi bilgisayarınıza klonlayın:
    ```bash
    git clone https://github.com/KULLANICI_ADINIZ/helunexa1.git

2. Klasörü VS Code veya herhangi bir editörde açın.

3. Projeyi yerel tarayıcınızda test etmek için index.html dosyasına çift tıklayarak açabilirsiniz.

4. (Not: Supabase Auth işlemlerinin bazı tarayıcılarda düzgün çalışması için projeyi bir yerel sunucuda (Live Server vb.) çalıştırmanız önerilir.)

🔐 Çevre Değişkenleri ve Güvenlik
Projede Supabase bağlantısı için gerekli olan SUPABASE_URL ve SUPABASE_ANON_KEY bilgileri JavaScript dosyaları içerisinde tanımlıdır.
Önemli: Supabase ANON_KEY herkese açık olacak şekilde tasarlanmıştır. Ancak veri güvenliği için Supabase üzerindeki RLS (Row Level Security) politikalarının düzgün yapılandırıldığından emin olunmalıdır. service_role anahtarı asla istemci tarafına (frontend) eklenmemelidir.

🤝 Katkıda Bulunma
Bu proje ortak bir çalışmadır. Geliştirme yaparken lütfen şu adımları izleyin:

1. Değişiklik yapmadan önce mutlaka git pull yaparak güncel kodları çekin.

2. Yeni bir özellik eklerken veya hata düzeltirken anlaşılır commit mesajları yazın (örn: fix: hasta giriş yönlendirmesi düzeltildi).

3. Değişiklikleri GitHub'a göndermeden önce yerelde test edin.


© 2026 HELUNEXA. Tüm hakları saklıdır. Bu sistem bir demo (prototip) ortamıdır, gerçek teşhis ve tedavi amacıyla kullanılamaz.
