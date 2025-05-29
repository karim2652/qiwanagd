const partnerData = [
  {
    id: 1,
    name: 'Unilever',
    image: '/assets/images/partners/unilever.webp',
  },
  {
    id: 2,
    name: 'Balady',
    image: '/assets/images/partners/balady.webp',
  },
  {
    id: 3,
    name: 'Albaik',
    image: '/assets/images/partners/albaik.webp',
  },
  {
    id: 4,
    name: 'Zamil',
    image: '/assets/images/partners/Zamil.webp',
  },
  {
    id: 5,
    name: 'Yawmi',
    image: '/assets/images/partners/Yawmi.webp',
  },
  {
    id: 6,
    name: 'The Industrial Group',
    image: '/assets/images/partners/The-Industrial-Group.webp',
  },
  {
    id: 7,
    name: 'Tawuniya',
    image: '/assets/images/partners/Tawuniya.webp',
  },
  {
    id: 8,
    name: 'Tanmiah',
    image: '/assets/images/partners/Tanmiah.webp',
  },
  {
    id: 9,
    name: 'Tameer',
    image: '/assets/images/partners/Tameer.webp',
  },
  {
    id: 10,
    name: 'Takween',
    image: '/assets/images/partners/Takween.webp',
  },
  {
    id: 11,
    name: 'Soft Dreams',
    image: '/assets/images/partners/Soft-Dreams.webp',
  },
  {
    id: 12,
    name: 'Saudi Ceramics',
    image: '/assets/images/partners/Saudi-Ceramics.webp',
  },
  {
    id: 13,
    name: 'Safa Water',
    image: '/assets/images/partners/SafaWater.webp',
  },
  {
    id: 14,
    name: 'SEPCO Environment',
    image: '/assets/images/partners/SEPCO-Environment.webp',
  },
  {
    id: 15,
    name: 'Riyadh Region',
    image: '/assets/images/partners/Riyadh Region.webp',
  },
  {
    id: 16,
    name: 'Rajhi',
    image: '/assets/images/partners/Rajhi.webp',
  },
  {
    id: 17,
    name: 'Perfetto',
    image: '/assets/images/partners/Perfetto.webp',
  },
  {
    id: 18,
    name: 'PG',
    image: '/assets/images/partners/PG.webp',
  },
  {
    id: 19,
    name: 'Neproplast',
    image: '/assets/images/partners/Neproplast.webp',
  },
  {
    id: 20,
    name: 'Naghi',
    image: '/assets/images/partners/Naghi.webp',
  },
  {
    id: 21,
    name: 'Naffco',
    image: '/assets/images/partners/Naffco.webp',
  },
  {
    id: 22,
    name: 'Mazda',
    image: '/assets/images/partners/Mazda.webp',
  },
  {
    id: 23,
    name: 'Masic',
    image: '/assets/images/partners/Masic2.webp',
  },
  {
    id: 24,
    name: 'Mane',
    image: '/assets/images/partners/Mane.webp',
  },
  {
    id: 25,
    name: 'Madinah Regional',
    image: '/assets/images/partners/Madinah Regional.webp',
  },
  {
    id: 26,
    name: 'MS Co.',
    image: '/assets/images/partners/MS-Co..webp',
  },
  {
    id: 27,
    name: 'MEPC',
    image: '/assets/images/partners/MEPC.webp',
  },
  {
    id: 28,
    name: 'Jeddah Foam',
    image: '/assets/images/partners/Jeddah-Foam.webp',
  },
  {
    id: 29,
    name: 'JamJoom Factory',
    image: '/assets/images/partners/JamJoom-Factory.webp',
  },
  {
    id: 30,
    name: 'International Medical Center',
    image: '/assets/images/partners/International-Medical-Center.webp',
  },
  {
    id: 31,
    name: 'IATCO',
    image: '/assets/images/partners/IATCO.webp',
  },
  {
    id: 32,
    name: 'Green Vision',
    image: '/assets/images/partners/Green-Vision.webp',
  },
  {
    id: 33,
    name: 'Goody',
    image: '/assets/images/partners/Goody.webp',
  },
  {
    id: 34,
    name: 'Emad',
    image: '/assets/images/partners/Emad.webp',
  },
  {
    id: 35,
    name: 'Dema',
    image: '/assets/images/partners/Dema.webp',
  },
  {
    id: 36,
    name: 'Cayan Group',
    image: '/assets/images/partners/CayanGroup.webp',
  },
  {
    id: 37,
    name: 'CEPCO',
    image: '/assets/images/partners/CEPCO.webp',
  },
  {
    id: 38,
    name: 'Binladen',
    image: '/assets/images/partners/Binladen.webp',
  },
  {
    id: 39,
    name: 'Berain Water',
    image: '/assets/images/partners/Berain-Water.webp',
  },
  {
    id: 40,
    name: 'Bawan Wood',
    image: '/assets/images/partners/Bawan-Wood.webp',
  },
  {
    id: 41,
    name: 'Basamah',
    image: '/assets/images/partners/Basamah.webp',
  },
  {
    id: 42,
    name: 'Arabian Contractor Co.',
    image: '/assets/images/partners/Arabian-Contractor-Co..webp',
  },
  {
    id: 43,
    name: 'Anaam Group',
    image: '/assets/images/partners/AnaamGroup.webp',
  },
  {
    id: 44,
    name: 'Amaintit',
    image: '/assets/images/partners/Amaintit.webp',
  },
  {
    id: 45,
    name: 'Albaha Municipality',
    image: '/assets/images/partners/Albaha Municipality.webp',
  },
  {
    id: 46,
    name: 'Alamiaa',
    image: '/assets/images/partners/Alamiaa.webp',
  },
  {
    id: 47,
    name: 'Al-Faris Commercial Group',
    image: '/assets/images/partners/Al-Faris-Commercial-Group.webp',
  },
  {
    id: 48,
    name: 'Al-Fanar',
    image: '/assets/images/partners/Al-Fanar.webp',
  },
  {
    id: 49,
    name: 'A.K. Saeed',
    image: '/assets/images/partners/A.K.-Saeed.webp',
  },
];

export default partnerData;
