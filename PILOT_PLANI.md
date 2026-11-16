# 🚀 HELUNEXA - Pilot Çalışma ve Uygulama Planı (Proof of Concept)

Bu belge, HELUNEXA dijital sağlık platformunun demo (vitrin) aşamasından çıkıp, gerçek bir sağlık kuruluşunda **Pilot Çalışma** olarak uygulanması için hazırlanan yol haritasıdır.

## 1. Hikayenin Başlangıcı: Neden Bu Proje Var?
**Problem:** Günümüzde hastanelerin ve özel kliniklerin web siteleri karmaşıktır. Hasta check-up yaptırmak istediğinde uzun üyelik ve form doldurma süreçleriyle karşılaşır. Bu durum, özel hastanelerin hasta kazanma (dönüşüm) oranlarını düşürmektedir.
**Çözüm:** HELUNEXA, hastanın üye olmadan, tek ekranda (8 modül) talebini bıraktığı; hekimin/danışmanın bu talebi anında görüp arayarak randevuya çevirdiği **"Sürtünmesiz" (Frictionless)** bir köprü sunar.

## 2. Pilot Çalışmanın Kapsamı ve Süresi
*   **Süre:** 4 Hafta (1 Ay)
*   **Katılımcılar:** 1 Anlaşmalı Özel Hastane/Klinik, 5 Hekim/Hasta Danışmanı ve 100 Gönüllü Test Hastası.
*   **Kapsam:** İlk aşamada sadece "Rutin Check-up" ve "Longevity (Sağlıklı Yaş Alma)" modülleri test edilecektir.
*   **Başarı Metrikleri:**
    *   Sisteme gelen günlük talep sayısı.
    *   Hekimin talebi görüp hastayı arama süresi (Hedef: İlk 15 dakika içinde).
    *   Taleplerin randevuya dönüşme oranı (Hedef: %40 üzeri).
    *   Hasta memnuniyeti (Formu doldurma kolaylığı anketi).

## 3. Pilot Çalışma Senaryosu (Kurgu)
> *"Hastanemizle anlaştığımız pilot süreçte, hastane girişine ve web sitesine HELUNEXA karekodu (QR) yerleştirildi. Check-up yaptırmak isteyen hasta, QR'ı okutup sadece 30 saniyede adını ve telefonunu bıraktı. Hastane danışmanı, aynı saniye içinde kendi panelinde talebi gördü. Telefon numarasına tıklayarak hastayı aradı ve randevusunu verdi. 4 haftanın sonunda gördük ki; normalde form doldurmayıp vazgeçen hastaların büyük bir kısmı bu kolaylık sayesinde check-up randevusu aldı. Hastane, çağrı merkezi yükünü azaltırken işlem hacmini artırdı."*

## 4. Gelecek Adımlar (Gerçek Kullanım İçin Gereksinimler)
Pilot çalışmaya başlamadan önce tamamlanması gereken teknik ve yasal zemin:

*   **Yasal (KVKK):** Hastane ile "Veri Sorumlusu/İşleyen" sözleşmesi, hasta onay (Açık Rıza) metinlerinin sisteme eklenmesi.
*   **SMS Doğrulama (OTP):** Sahte talepleri önlemek için hastanın telefonuna doğrulama kodu gönderilmesi.
*   **HBYS / e-Nabız Entegrasyonu:** Hekimin panelden tek tıkla randevu atabilmesi için hastane takvim sistemine bağlanılması.
*   **Bildirim Sistemleri:** Hasta randevu aldığında otomatik WhatsApp veya SMS bilgilendirmesi yapılması.
*   **Güvenlik:** Hekim paneline kurumsal e-posta ve şifre ile giriş (Auth) zorunluluğu getirilmesi.

---
© 2026 HELUNEXA. Pilot Çalışma Yol Haritası.