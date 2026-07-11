// İnsansız Araçlar sayfasındaki filo kataloğu — kontrol panelinin veri kaynağı.
export const vehicles = [
  {
    id: 'atmaca',
    codeName: 'ATMACA',
    model: 'VTOL',
    mission: 'Keşif, imha operasyonlarında anlık destek.',
    features: ['Yüksek Hız', 'Uzun Uçuş Süresi', 'Mühimmat Taşıma Kapasitesi'],
    image: '/images/air-vtol.jpg',
  },
  {
    id: 'argus',
    codeName: 'ARGUS',
    model: 'Silahlı Drone',
    mission: 'Anlık saldırı, kamikaze ve keşif operasyonları.',
    features: ['Mühimmat Taşıma', 'Gerçek Zamanlı Görüntüleme'],
    image: '/images/argus.png',
  },
  {
    id: 'sahin',
    codeName: 'ŞAHİN',
    model: 'Sabit Kanat',
    mission: 'Keşif ve tespit.',
    features: ['Detaylı Görüntüleme', 'Uzun Uçuş Süresi'],
    image: '/images/sahin.png',
  },
];
