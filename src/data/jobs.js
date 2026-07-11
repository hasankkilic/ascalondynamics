// Kariyer sayfasındaki açık pozisyonlar.
export const jobs = [
  {
    id: 'gomulu-yazilim',
    title: 'Gömülü Yazılım Mühendisi',
    location: 'Ankara',
    type: 'Tam Zamanlı',
    summary: 'UAV ve AR-HUD sistemlerinin gerçek zamanlı gömülü yazılımlarını geliştirir.',
    description:
      'ASCALON HMD ve insansız araç platformlarımızın düşük gecikmeli, gerçek zamanlı gömülü yazılım katmanında çalışacaksınız. Sensör füzyonu, haberleşme protokolleri ve donanım sürücüleri üzerinde uçtan uca sorumluluk alacaksınız.',
    requirements: [
      'C/C++ ile ileri düzeyde gömülü sistem deneyimi',
      'RTOS (FreeRTOS, Zephyr vb.) bilgisi',
      'Donanım-yazılım entegrasyonu ve seri haberleşme protokolleri deneyimi',
    ],
  },
  {
    id: 'bilgisayarli-goru',
    title: 'Bilgisayarlı Görü / Yapay Zeka Mühendisi',
    location: 'Ankara',
    type: 'Tam Zamanlı',
    summary: 'Çok-spektrumlu sensör verisinden nesne tespiti ve hedef takibi algoritmaları geliştirir.',
    description:
      'Termal, optik ve UAV sensör beslemelerini gerçek zamanlı işleyen tespit, sınıflandırma ve takip modelleri üzerinde çalışacaksınız. Modellerin gömülü donanımda düşük gecikmeyle çalışmasını sağlamak da ekibin sorumluluğunda.',
    requirements: [
      'Python ve C++ ile üretim seviyesinde deneyim',
      'OpenCV ve derin öğrenme çerçeveleri (PyTorch/TensorFlow)',
      'Gerçek zamanlı görüntü işleme ve model optimizasyonu deneyimi',
    ],
  },
  {
    id: 'havacilik-sistemleri',
    title: 'Havacılık Sistemleri Mühendisi (VTOL/UAV)',
    location: 'Ankara',
    type: 'Tam Zamanlı',
    summary: 'VTOL ve sabit kanat insansız hava araçlarının aerodinamik ve yapısal tasarımını yürütür.',
    description:
      'Filo genelindeki insansız hava araçlarının konsept tasarımından uçuş testine kadar tüm aşamalarında yer alacaksınız. Aerodinamik performans, yapısal dayanım ve uçuş kontrol entegrasyonu ortak sorumluluk alanları.',
    requirements: [
      'Havacılık, Uzay veya Makine Mühendisliği lisans/yüksek lisans',
      'CAD ve yapısal/aerodinamik analiz araçlarında deneyim',
      'Uçuş testi veya prototipleme deneyimi tercih sebebidir',
    ],
  },
  {
    id: 'donanim-elektronik',
    title: 'Donanım / Elektronik Tasarım Mühendisi',
    location: 'Ankara',
    type: 'Tam Zamanlı',
    summary: 'Kask üstü AR-HUD donanımı ve sensör entegrasyon kartlarının tasarımından sorumlu olur.',
    description:
      'ASCALON HMD kaskının elektronik donanımı, sensör entegrasyon kartları ve güç yönetim sistemleri üzerinde çalışacaksınız. Şema tasarımından prototip doğrulamaya kadar sürecin içinde olacaksınız.',
    requirements: [
      'PCB tasarımı ve gömülü elektronik deneyimi',
      'Sensör entegrasyonu (IMU, termal, optik) deneyimi',
      'Düşük güç tüketimli donanım tasarımı bilgisi',
    ],
  },
];
