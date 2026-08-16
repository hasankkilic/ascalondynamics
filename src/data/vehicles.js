// İnsansız Araçlar sayfasındaki filo kataloğu — kontrol panelinin veri kaynağı.
//
// `status`: geliştirme aşaması etiketi (ör. "Aktif Prototip", "Saha
// Doğrulaması", "Geliştirme Aşamasında", "Konsept Çalışması"). Bilinmeyen/
// doğrulanmamış bir durumu icat etmemek için bilinçli olarak `null`
// bırakılmıştır — gerçek durum netleşince buraya girilmesi yeterlidir.
// `status: null` iken arayüzde herhangi bir etiket gösterilmez.
export const vehicles = [
  {
    id: 'atmaca',
    codeName: 'ATMACA',
    model: 'VTOL',
    mission: 'Keşif, gözetleme ve görev tipine göre yapılandırılabilir saha desteği.',
    features: ['Modüler Faydalı Yük', 'VTOL Görev Profili', 'Ekosistem Entegrasyonu'],
    image: '/images/atmaca.png',
    status: null,
  },
  {
    id: 'argus',
    codeName: 'ARGUS',
    model: 'Çok Amaçlı Drone',
    mission: 'Yakın saha keşfi, canlı görüntü aktarımı ve görev destek operasyonları.',
    features: ['Gerçek Zamanlı Görüntüleme', 'Görev Modülü Uyumu', 'Canlı Telemetri'],
    image: '/images/argus.png',
    status: null,
  },
  {
    id: 'sahin',
    codeName: 'ŞAHİN',
    model: 'Sabit Kanat',
    mission: 'Geniş alan keşfi, tespit ve uzun süreli gözetleme görevleri.',
    features: ['Detaylı Görüntüleme', 'Uzun Uçuş Süresi', 'Göreve Göre Yapılandırma'],
    image: '/images/şahin.png',
    status: null,
  },
];
