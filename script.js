// Global variables and data
let currentLanguage = 'en';
let currentMonth = new Date();
let currentYear = currentMonth.getFullYear();
let audioPlayer = null;
let currentTrack = null;
let isPlaying = false;
let offlineMode = false;
let selectedYear = 'all';
let selectedStatus = 'all';
let selectedMonastery = 'all';

// Sample data for monasteries
const monasteriesData = [
    {
        id: 1,
        name: "Rumtek Monastery",
        localName: "Dharma Chakra Centre",
        location: "Gangtok, Sikkim",
        address: "24km from Gangtok",
        district: "Gangtok",
        establishedYear: "1966",
        founder: "Wangchuk Dorje, 9th Karmapa Lama",
        sect: "Kagyu",
        sectDescription: "One of the four major schools of Tibetan Buddhism, known as the 'Oral Lineage,' emphasizing meditation, Mahamudra, and guru-disciple transmission.",
        description: "The largest monastery in Sikkim and seat of the Karmapa, featuring stunning Tibetan architecture and sacred Buddhist teachings. The stupa enshrines relics of the esteemed Karmapa, serving as a vital symbol of the Karma Kagyu lineage's spiritual authority and sanctity.",
        image: "images/rumtek5.jpg",
        features: ["360° Tour", "Audio Guide", "Digital Archives", "Events"],
        coordinates: [27.2887, 88.5615],
        virtualTour: "https://www.360cities.net/embed_iframe/rumtek-monastery",
        mediaUrl: "https://www.karmapa.org/karma-kagyu/rumtek-monastery/",
        audioGuide: {
            title: "Rumtek Monastery Audio Guide",
            duration: "50 minutes",
            languages: ["English", "Tibetan", "Hindi", "Nepali", "Sikkimese"],
            audioFile: "audio/rumtek_monastery_guide.mp3",
            tracks: [
                { name: "Karma Kagyu Lineage", duration: "8:00" },
                { name: "Golden Stupa History", duration: "12:00" },
                { name: "Sacred Relics", duration: "15:00" },
                { name: "Meditation Practices", duration: "10:00" },
                { name: "Cultural Significance", duration: "5:00" }
            ]
        }
    },
    {
        id: 2,
        name: "Phodong Monastery",
        localName: "Podong",
        location: "North Sikkim",
        address: "28km from Gangtok",
        district: "North Sikkim",
        establishedYear: "1740",
        founder: "Chogyal Gyurmed Namgyal",
        sect: "Kagyu",
        sectDescription: "One of the four major schools of Tibetan Buddhism, known as the 'Oral Lineage,' emphasizing meditation, Mahamudra, and guru-disciple transmission.",
        description: "A serene monastery in North Sikkim known for its beautiful murals and peaceful meditation environment. This stupa stands as the spiritual heart of the monastery, revered for containing relics and representing Kagyu Buddhist devotion.",
        image: "images/phondong1.jpg",
        features: ["360° Tour", "Interactive Map", "Audio Guide", "Events"],
        coordinates: [27.4128, 88.5839],
        virtualTour: "https://www.360cities.net/embed_iframe/phodong-monastery",
        mediaUrl: "https://traveltriangle.com/blog/phodong-monastery/",
        audioGuide: {
            title: "Phodong Monastery Audio Guide",
            duration: "38 minutes",
            languages: ["English", "Tibetan", "Hindi", "Nepali", "Sikkimese"],
            audioFile: "audio/phodong_monastery_guide.mp3",
            tracks: [
                { name: "Sacred Murals", duration: "12:00" },
                { name: "Meditation Practices", duration: "10:00" },
                { name: "Local Traditions", duration: "8:00" },
                { name: "Natural Surroundings", duration: "8:00" }
            ]
        }
    },
    {
        id: 3,
        name: "Pemayangtse Monastery",
        localName: "Pemayangtse",
        location: "Pelling, Sikkim",
        address: "Pemayangtse",
        district: "Gyalshing",
        establishedYear: "1705",
        founder: "Lama Lhatsun Chempo",
        sect: "Nyingma",
        sectDescription: "Oldest of the four major schools of Tibetan Buddhism, founded in the 8th century by Guru Padmasambhava, emphasizing Dzogchen and tantric practices.",
        description: "One of the oldest and most important monasteries in Sikkim, known for its ancient architecture and religious significance. This elaborate model embodies the mythic pure land in Nyingma tradition, expressing deep-rooted spiritual aspiration and artistic devotion.",
        image: "images/pemayant1.jpg",
        features: ["360° Tour", "Interactive Map", "Audio Guide", "Events"],
        coordinates: [27.3044, 88.2528],
        virtualTour: "https://www.360cities.net/embed_iframe/pemayangtse-monastery",
        mediaUrl: "https://traveltriangle.com/blog/pemayangtse-monastery/",
        audioGuide: {
            title: "Pemayangtse Monastery Audio Guide",
            duration: "45 minutes",
            languages: ["English", "Tibetan", "Hindi", "Nepali", "Sikkimese"],
            audioFile: "audio/pemayangtse_monastery_guide.mp3",
            tracks: [
                { name: "Ancient History", duration: "10:00" },
                { name: "Zangdok Palri Model", duration: "15:00" },
                { name: "Religious Artifacts", duration: "12:00" },
                { name: "Monastic Traditions", duration: "8:00" }
            ]
        }
    },
    {
        id: 4,
        name: "Kartok Monastery",
        localName: "Kathog Gompa",
        location: "Pakyong, Sikkim",
        address: "Pakyong",
        district: "East Sikkim",
        establishedYear: "17th century",
        founder: "Chogyal Thutob Namgyal",
        sect: "Nyingma",
        sectDescription: "Oldest of the four major schools of Tibetan Buddhism, founded in the 8th century by Guru Padmasambhava, emphasizing Dzogchen and tantric practices.",
        description: "A historic monastery in East Sikkim known for its ancient conch shell and connection to Sikkim's first king. The shell symbolizes the connection to Sikkim's first king and the coronation, holding ceremonial and historical reverence.",
        image: "images/kartok1.jpg",
        features: ["360° Tour", "Digital Archives", "Audio Guide", "Events"],
        coordinates: [27.2408, 88.5878],
        virtualTour: "https://www.360cities.net/embed_iframe/kartok-monastery",
        mediaUrl: "https://commons.wikimedia.org/wiki/File:Kathog_Monastery_alias_Kartok_Monastery_at_Pakyong_in_East_Sikkim_05.jpg",
        audioGuide: {
            title: "Kartok Monastery Audio Guide",
            duration: "35 minutes",
            languages: ["English", "Tibetan", "Hindi", "Nepali", "Sikkimese"],
            audioFile: "audio/kartok_monastery_guide.mp3",
            tracks: [
                { name: "Ancient Conch Shell", duration: "8:00" },
                { name: "Royal Connection", duration: "10:00" },
                { name: "Historical Significance", duration: "12:00" },
                { name: "Community Life", duration: "5:00" }
            ]
        }
    },
    {
        id: 5,
        name: "Sinon Monastery",
        localName: "Sinon Gumpa",
        location: "West Sikkim",
        address: "10km from Tashiding",
        district: "West Sikkim",
        establishedYear: "1716",
        founder: "Pedi Wangmo",
        sect: "Nyingma",
        sectDescription: "Oldest of the four major schools of Tibetan Buddhism, founded in the 8th century by Guru Padmasambhava, emphasizing Dzogchen and tantric practices.",
        description: "A sacred monastery in West Sikkim known for its historical significance and connection to Pedi Wangmo. The art preserves key moments and figures of Sikkim's Buddhist history, especially celebrating the contributions of Pedi Wangmo and Arhat Nagasena.",
        image: "images/sinon1.jpg",
        features: ["Digital Archives", "Audio Guide", "Events", "Virtual Tour"],
        coordinates: [27.3422, 88.2891],
        virtualTour: "https://www.360cities.net/embed_iframe/sinon-monastery",
        mediaUrl: "https://commons.wikimedia.org/wiki/File:Sinon_Monastery,_West_Sikkim_09.jpg",
        audioGuide: {
            title: "Sinon Monastery Audio Guide",
            duration: "40 minutes",
            languages: ["English", "Tibetan", "Hindi", "Nepali", "Sikkimese"],
            audioFile: "audio/sinon_monastery_guide.mp3",
            tracks: [
                { name: "Pedi Wangmo History", duration: "10:00" },
                { name: "Buddhist Art", duration: "12:00" },
                { name: "Himalayan Views", duration: "10:00" },
                { name: "Spiritual Practices", duration: "8:00" }
            ]
        }
    },
    {
        id: 6,
        name: "Do-drul Chorten",
        localName: "Do-drul Chorten",
        location: "Gangtok, Sikkim",
        address: "M.P.Golai, Tadong",
        district: "Gangtok",
        establishedYear: "1945",
        founder: "Lama Trulshik Rinpoche",
        sect: "Nyingma",
        sectDescription: "Oldest of the four major schools of Tibetan Buddhism, founded in the 8th century by Guru Padmasambhava, emphasizing Dzogchen and tantric practices.",
        description: "A magnificent stupa in Gangtok known for its spiritual significance and beautiful architecture. These relics ensure powerful ritual efficacy and spiritual protection, making the stupa a focal point for merit-making and Nyingma Buddhist practices.",
        image: "images/do drel1.jpg",
        features: ["360° Tour", "Digital Archives", "Audio Guide", "Events"],
        coordinates: [27.3260, 88.6108],
        virtualTour: "https://www.360cities.net/embed_iframe/do-drul-chorten",
        mediaUrl: "https://en.wikipedia.org/wiki/File:Do-drul_Chorten.jpg",
        audioGuide: {
            title: "Do-drul Chorten Audio Guide",
            duration: "42 minutes",
            languages: ["English", "Tibetan", "Hindi", "Nepali", "Sikkimese"],
            audioFile: "audio/do_drul_chorten_guide.mp3",
            tracks: [
                { name: "Stupa Architecture", duration: "12:00" },
                { name: "Sacred Relics", duration: "10:00" },
                { name: "Spiritual Practices", duration: "10:00" },
                { name: "Community Impact", duration: "10:00" }
            ]
        }
    },
    {
        id: 7,
        name: "Ngadak Thupten Shedup Dhargey Choeling Monastery",
        localName: "Ngadak Thupten",
        location: "Namchi, Sikkim",
        address: "Namchi",
        district: "Namchi",
        establishedYear: "17th century",
        founder: "Tesung Namgyal",
        sect: "Nyingma",
        sectDescription: "Oldest of the four major schools of Tibetan Buddhism, founded in the 8th century by Guru Padmasambhava, emphasizing Dzogchen and tantric practices.",
        description: "A historic monastery in Namchi known for its ancient structure and spiritual heritage. The heritage building itself is the artifact, embodying promise and ancient Sikkimese spiritual culture, with an enduring tradition of meditation.",
        image: "images/ndak tupen.jpg",
        features: ["360° Tour", "Interactive Map", "Audio Guide", "Events"],
        coordinates: [27.3661, 88.2197],
        virtualTour: "https://www.360cities.net/embed_iframe/ngadak-monastery",
        mediaUrl: "https://www.tripadvisor.in/Attraction_Review-g2282617-d4138841-Reviews-Ngadak_Monastery-Namchi_South_Sikkim_Sikkim.html",
        audioGuide: {
            title: "Ngadak Monastery Audio Guide",
            duration: "38 minutes",
            languages: ["English", "Tibetan", "Hindi", "Nepali", "Sikkimese"],
            audioFile: "audio/ngadak_monastery_guide.mp3",
            tracks: [
                { name: "Ancient Architecture", duration: "12:00" },
                { name: "Meditation Traditions", duration: "10:00" },
                { name: "Local Culture", duration: "8:00" },
                { name: "Spiritual Heritage", duration: "8:00" }
            ]
        }
    },
    {
        id: 8,
        name: "Doling Monastery",
        localName: "Dorling Gompa",
        location: "South Sikkim",
        address: "Barfung",
        district: "South Sikkim",
        establishedYear: "1718 A.D.",
        founder: "Lama Rigdzin Longyang",
        sect: "Nyingma",
        sectDescription: "Oldest of the four major schools of Tibetan Buddhism, founded in the 8th century by Guru Padmasambhava, emphasizing Dzogchen and tantric practices.",
        description: "A sacred monastery in South Sikkim known for its unique stone artifact. This stone is a unique sacred object, believed to be the actual sign left by the mountain deity, maintaining local spiritual security and divine connection.",
        image: "images/doling1.jpg",
        features: ["360° Tour", "Digital Archives", "Audio Guide", "Events"],
        coordinates: [27.2881, 88.3439],
        virtualTour: "https://www.360cities.net/embed_iframe/doling-monastery",
        mediaUrl: "https://www.trawell.in/sikkim/ravangla/doling-monastery",
        audioGuide: {
            title: "Doling Monastery Audio Guide",
            duration: "35 minutes",
            languages: ["English", "Tibetan", "Hindi", "Nepali", "Sikkimese"],
            audioFile: "audio/doling_monastery_guide.mp3",
            tracks: [
                { name: "Sacred Stone", duration: "10:00" },
                { name: "Mountain Deity", duration: "8:00" },
                { name: "Local Beliefs", duration: "10:00" },
                { name: "Spiritual Practices", duration: "7:00" }
            ]
        }
    },
    {
        id: 9,
        name: "Gonjang Monastery",
        localName: "Gonjang Gompa",
        location: "Gangtok, Sikkim",
        address: "7km from Gangtok",
        district: "Gangtok",
        establishedYear: "1981",
        founder: "Tingkye Gonjang Rimpoche",
        sect: "Nyingma",
        sectDescription: "Oldest of the four major schools of Tibetan Buddhism, founded in the 8th century by Guru Padmasambhava, emphasizing Dzogchen and tantric practices.",
        description: "A modern monastery near Gangtok known for its unique Khamsel ceremony. These idols honor the roots of Buddhist learning and the transmission of hidden teachings, critical for Nyingma spiritual lineage and monastic education.",
        image: "images/gonjang1.jpg",
        features: ["360° Tour", "Interactive Map", "Audio Guide", "Events"],
        coordinates: [27.3690, 88.6131],
        virtualTour: "https://www.360cities.net/embed_iframe/gonjang-monastery",
        mediaUrl: "https://www.esikkimtourism.in/attraction/gonjang-monastery/",
        audioGuide: {
            title: "Gonjang Monastery Audio Guide",
            duration: "40 minutes",
            languages: ["English", "Tibetan", "Hindi", "Nepali", "Sikkimese"],
            audioFile: "audio/gonjang_monastery_guide.mp3",
            tracks: [
                { name: "Khamsel Ceremony", duration: "12:00" },
                { name: "Sacred Relics", duration: "10:00" },
                { name: "Buddhist Learning", duration: "10:00" },
                { name: "Modern Practices", duration: "8:00" }
            ]
        }
    },
    {
        id: 10,
        name: "Serdup Choling Monastery",
        localName: "Serdup Choling",
        location: "Namchi, Sikkim",
        address: "Alley Goompa",
        district: "Namchi",
        establishedYear: "1967",
        founder: "Serdup Dungzin",
        sect: "Nyingma",
        sectDescription: "Oldest of the four major schools of Tibetan Buddhism, founded in the 8th century by Guru Padmasambhava, emphasizing Dzogchen and tantric practices.",
        description: "A beautiful monastery in Namchi known for its art and sculptures. The art and statues in the shrine hall uphold community worship and conserve Buddhist iconography, serving as a center for spiritual practice and cultural preservation.",
        image: "images/serdup1.jpg",
        features: ["360° Tour", "Digital Archives", "Audio Guide", "Events"],
        coordinates: [27.6056, 88.4064],
        virtualTour: "https://www.360cities.net/embed_iframe/serdup-monastery",
        mediaUrl: "https://www.instagram.com/_serdup_official_/",
        audioGuide: {
            title: "Serdup Monastery Audio Guide",
            duration: "42 minutes",
            languages: ["English", "Tibetan", "Hindi", "Nepali", "Sikkimese"],
            audioFile: "audio/serdup_monastery_guide.mp3",
            tracks: [
                { name: "Sacred Art", duration: "12:00" },
                { name: "Buddhist Icons", duration: "10:00" },
                { name: "Community Worship", duration: "10:00" },
                { name: "Cultural Heritage", duration: "10:00" }
            ]
        }
    }
];

// Comprehensive events data with past, present, and future events
const eventsData = [
    // 2023 Events (Previous Year)
    {
        id: 1,
        title: "Tse Chu Festival 2023",
        date: new Date(2023, 4, 15), // May 2023
        time: "10:00",
        location: "Rumtek Monastery",
        description: "A vibrant festival celebrating Guru Rinpoche's birthday with ritualistic dances and colorful ceremonies.",
        duration: "5-8 days",
        capacity: 100,
        price: "Free",
        monasteryId: 1,
        bookingLink: "",
        status: "completed",
        year: 2023
    },
    {
        id: 2,
        title: "Saga Dawa Festival 2023",
        date: new Date(2023, 4, 20), // May 2023
        time: "06:00",
        location: "Phodong Monastery",
        description: "The 'Triple Blessed Festival' celebrating the birth, enlightenment, and parinirvana of Buddha.",
        duration: "1 day",
        capacity: 50,
        price: "Free",
        monasteryId: 2,
        bookingLink: "",
        status: "completed",
        year: 2023
    },
    {
        id: 3,
        title: "Kagyed Dance Festival 2023",
        date: new Date(2023, 11, 15), // December 2023
        time: "09:00",
        location: "Pemayangtse Monastery",
        description: "Ritualistic dances performed to bring peace and good fortune for the new year.",
        duration: "3 days",
        capacity: 80,
        price: "Free",
        monasteryId: 3,
        bookingLink: "",
        status: "completed",
        year: 2023
    },

    // 2024 Events (Current Year)
    {
        id: 4,
        title: "Tse Chu Festival 2024",
        date: new Date(2024, 4, 15), // May 2024
        time: "10:00",
        location: "Rumtek Monastery",
        description: "A vibrant festival celebrating Guru Rinpoche's birthday with ritualistic dances and colorful ceremonies.",
        duration: "5-8 days",
        capacity: 100,
        price: "Free",
        monasteryId: 1,
        bookingLink: "",
        status: "completed",
        year: 2024
    },
    {
        id: 5,
        title: "Kagyed Dance Festival 2024",
        date: new Date(2024, 11, 15), // December 2024
        time: "09:00",
        location: "Pemayangtse Monastery",
        description: "Ritualistic dances performed to bring peace and good fortune for the new year.",
        duration: "3 days",
        capacity: 80,
        price: "Free",
        monasteryId: 3,
        bookingLink: "",
        status: "upcoming",
        year: 2024
    },
    {
        id: 6,
        title: "Chaam Festival 2024",
        date: new Date(2024, 1, 15), // February 2024
        time: "10:00",
        location: "Do-drul Chorten",
        description: "Monks perform ritualistic masked dances to purify the monastery and dispel negative energies.",
        duration: "2 days",
        capacity: 60,
        price: "Free",
        monasteryId: 6,
        bookingLink: "",
        status: "completed",
        year: 2024
    },

    // 2025 Events (Future Year)
    {
        id: 7,
        title: "Tse Chu Festival 2025",
        date: new Date(2025, 4, 15), // May 2025
        time: "10:00",
        location: "Rumtek Monastery",
        description: "A vibrant festival celebrating Guru Rinpoche's birthday with ritualistic dances and colorful ceremonies.",
        duration: "5-8 days",
        capacity: 120,
        price: "Free",
        monasteryId: 1,
        bookingLink: "",
        status: "upcoming",
        year: 2025,
        bookingOpen: true
    },
    {
        id: 8,
        title: "Saga Dawa Festival 2025",
        date: new Date(2025, 4, 20), // May 2025
        time: "06:00",
        location: "Phodong Monastery",
        description: "The 'Triple Blessed Festival' celebrating the birth, enlightenment, and parinirvana of Buddha.",
        duration: "1 day",
        capacity: 60,
        price: "Free",
        monasteryId: 2,
        bookingLink: "",
        status: "upcoming",
        year: 2025,
        bookingOpen: true
    },
    {
        id: 9,
        title: "Kagyed Dance Festival 2025",
        date: new Date(2025, 11, 15), // December 2025
        time: "09:00",
        location: "Pemayangtse Monastery",
        description: "Ritualistic dances performed to bring peace and good fortune for the new year.",
        duration: "3 days",
        capacity: 90,
        price: "Free",
        monasteryId: 3,
        bookingLink: "",
        status: "upcoming",
        year: 2025,
        bookingOpen: true
    },
    {
        id: 10,
        title: "Chaam Festival 2025",
        date: new Date(2025, 1, 15), // February 2025
        time: "10:00",
        location: "Do-drul Chorten",
        description: "Monks perform ritualistic masked dances to purify the monastery and dispel negative energies.",
        duration: "2 days",
        capacity: 70,
        price: "Free",
        monasteryId: 6,
        bookingLink: "",
        status: "upcoming",
        year: 2025,
        bookingOpen: true
    },
    {
        id: 11,
        title: "Khamsel Ceremony 2025",
        date: new Date(2025, 10, 15), // November 2025
        time: "08:00",
        location: "Gonjang Monastery",
        description: "Rare display of sacred relics led by Gonjang Rinpoche, held every three years.",
        duration: "3 days",
        capacity: 50,
        price: "₹500",
        monasteryId: 9,
        bookingLink: "",
        status: "upcoming",
        year: 2025,
        bookingOpen: true
    },

    // 2026 Events (Future Year)
    {
        id: 12,
        title: "Tse Chu Festival 2026",
        date: new Date(2026, 4, 15), // May 2026
        time: "10:00",
        location: "Rumtek Monastery",
        description: "A vibrant festival celebrating Guru Rinpoche's birthday with ritualistic dances and colorful ceremonies.",
        duration: "5-8 days",
        capacity: 120,
        price: "Free",
        monasteryId: 1,
        bookingLink: "",
        status: "upcoming",
        year: 2026,
        bookingOpen: false
    },
    {
        id: 13,
        title: "Saga Dawa Festival 2026",
        date: new Date(2026, 4, 20), // May 2026
        time: "06:00",
        location: "Phodong Monastery",
        description: "The 'Triple Blessed Festival' celebrating the birth, enlightenment, and parinirvana of Buddha.",
        duration: "1 day",
        capacity: 60,
        price: "Free",
        monasteryId: 2,
        bookingLink: "",
        status: "upcoming",
        year: 2026,
        bookingOpen: false
    },
    {
        id: 14,
        title: "Tibetan Buddhist Meditation Retreat 2026",
        date: new Date(2026, 6, 10), // July 2026
        time: "06:00",
        location: "Rumtek Monastery",
        description: "Deep meditation practice with experienced lamas in the serene Himalayan setting of Sikkim.",
        duration: "7 days",
        capacity: 25,
        price: "₹6,000",
        monasteryId: 1,
        bookingLink: "",
        status: "upcoming",
        year: 2026,
        bookingOpen: false
    },
    {
        id: 15,
        title: "Sikkimese Thangka Painting Workshop 2026",
        date: new Date(2026, 7, 15), // August 2026
        time: "09:00",
        location: "Serdup Monastery",
        description: "Learn traditional Sikkimese Thangka painting techniques from master artists.",
        duration: "5 days",
        capacity: 15,
        price: "₹9,000",
        monasteryId: 10,
        bookingLink: "",
        status: "upcoming",
        year: 2026,
        bookingOpen: false
    },
];

// Sample archives data
const archivesData = [
    {
        id: 1,
        title: "Tibetan Buddhist Sutras",
        category: "manuscripts",
        period: "medieval",
        description: "Ancient Tibetan Buddhist texts and teachings preserved in Rumtek Monastery library.",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
        monasteryId: 1,
        year: "1200 AD"
    },
    {
        id: 2,
        title: "Sikkimese Thangka Paintings",
        category: "murals",
        period: "medieval",
        description: "Traditional Sikkimese Thangka paintings depicting Buddhist deities and teachings.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        monasteryId: 2,
        year: "1400 AD"
    },
    {
        id: 3,
        title: "Himalayan Sacred Art Collection",
        category: "artifacts",
        period: "medieval",
        description: "Traditional Himalayan thangka paintings and sacred Buddhist artifacts from Sikkim.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=200&fit=crop",
        monasteryId: 3,
        year: "1300 AD"
    },
    {
        id: 4,
        title: "Sikkimese Buddhist Manuscripts",
        category: "manuscripts",
        period: "medieval",
        description: "Rare Sikkimese Buddhist manuscripts and religious texts from Enchey Monastery.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
        monasteryId: 4,
        year: "1500 AD"
    },
    {
        id: 5,
        title: "Tibetan Calligraphy Art",
        category: "documents",
        period: "medieval",
        description: "Ancient Tibetan calligraphy and meditation texts from Phodong Monastery.",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
        monasteryId: 5,
        year: "1200 AD"
    },
    {
        id: 6,
        title: "Sikkimese Monastery Murals",
        category: "murals",
        period: "medieval",
        description: "Detailed documentation of Sikkimese monastery murals and architectural elements.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        monasteryId: 6,
        year: "1600 AD"
    },
    {
        id: 7,
        title: "Sikkimese Monastic Rules",
        category: "documents",
        period: "medieval",
        description: "Ancient rules and practices of Sikkimese monasticism and Buddhist traditions.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=200&fit=crop",
        monasteryId: 4,
        year: "1700 AD"
    },
    {
        id: 8,
        title: "Tibetan Prayer Wheels",
        category: "artifacts",
        period: "medieval",
        description: "Traditional Tibetan prayer wheels and religious artifacts from Rumtek Monastery.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
        monasteryId: 1,
        year: "1100 AD"
    },
    {
        id: 9,
        title: "Sikkimese Festival Masks",
        category: "artifacts",
        period: "medieval",
        description: "Traditional Chaam dance masks and ceremonial artifacts from Sikkim monasteries.",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
        monasteryId: 4,
        year: "1800 AD"
    },
    {
        id: 10,
        title: "Himalayan Buddhist Icons",
        category: "artifacts",
        period: "medieval",
        description: "Sacred Buddhist icons and statues from the monasteries of Sikkim.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        monasteryId: 3,
        year: "1400 AD"
    }
];

// Hotel booking data for each monastery
const hotelBookingData = {
    1: { // Rumtek Monastery
        name: "Rumtek Monastery",
        location: "Gangtok",
        makeMyTripUrl: "https://www.makemytrip.com/hotels/gangtok-hotels-near-rumtek_monastery.html?utm_source=chatgpt.com",
        nearbyHotels: ["Hotel Mount Jopuno", "The Elgin Mount", "Hotel Sonam Delek"],
        distance: "2-5 km",
        priceRange: "₹2,000 - ₹8,000"
    },
    2: { // Phodong Monastery
        name: "Phodong Monastery",
        location: "North Sikkim",
        makeMyTripUrl: "https://www.makemytrip.com/hotels/hotel-listing/?cc=IN&checkin=10232025&checkout=10242025&city=CTXCV&country=IN&firstTimeUserState=0&locusId=CTXCV&locusType=city&mmPoiTag=POI%7CPhodong%20Monastery%7CPOI65094%7Cundefined%7Cundefined&roomStayQualifier=2e0e&rsc=1e2e0e&searchText=Phodong%20Monastery",
        nearbyHotels: ["Hotel Mount Jopuno", "The Elgin Mount", "Hotel Sonam Delek"],
        distance: "25-30 km",
        priceRange: "₹1,500 - ₹6,000"
    },
    3: { // Pemayangtse Monastery
        name: "Pemayangtse Monastery",
        location: "Pelling",
        makeMyTripUrl: "https://www.makemytrip.com/hotels/pelling-hotels-near-pemayangtse_monastery.html?utm_source=chatgpt.com",
        nearbyHotels: ["Hotel Mount Pandim", "The Elgin Mount Pelling", "Hotel Garuda"],
        distance: "1-3 km",
        priceRange: "₹1,800 - ₹7,000"
    },
    4: { // Kartok Monastery
        name: "Kartok Monastery",
        location: "Pakyong",
        makeMyTripUrl: "https://www.makemytrip.com/hotels/pakyong-hotels-near-kartok_monastery.html?utm_source=perplexity",
        nearbyHotels: ["Hotel Mount Jopuno", "The Elgin Mount", "Hotel Sonam Delek"],
        distance: "15-20 km",
        priceRange: "₹1,500 - ₹5,500"
    },
    5: { // Sinon Monastery
        name: "Sinon Monastery",
        location: "West Sikkim",
        makeMyTripUrl: "https://www.makemytrip.com/hotels/hotel-listing/?checkin=09182025&checkout=09192025&city=CTXPE&country=IN&isV2=true&locusId=CTXPE&locusType=city&mmPoiTag=LPOI%7CSinon%20Monastery%7CCTXPE%7C27.3423753%7C88.2900301&roomStayQualifier=2e0e&rsc=1e2e0e&searchText=Sinon%20Monastery",
        nearbyHotels: ["Hotel Mount Pandim", "The Elgin Mount Pelling", "Hotel Garuda"],
        distance: "8-12 km",
        priceRange: "₹1,200 - ₹4,500"
    },
    6: { // Do-drul Chorten
        name: "Do-drul Chorten",
        location: "Gangtok",
        makeMyTripUrl: "https://www.makemytrip.com/hotels/gangtok-hotels-near-do_drul_chorten_monastery.html?utm_source=perplexity",
        nearbyHotels: ["Hotel Mount Jopuno", "The Elgin Mount", "Hotel Sonam Delek"],
        distance: "1-3 km",
        priceRange: "₹2,000 - ₹8,000"
    },
    7: { // Ngadak Monastery
        name: "Ngadak Monastery",
        location: "Namchi",
        makeMyTripUrl: "https://www.makemytrip.com/hotels/namchi-hotels.html",
        nearbyHotels: ["Hotel Mount Pandim", "The Elgin Mount Pelling", "Hotel Garuda"],
        distance: "2-5 km",
        priceRange: "₹1,500 - ₹5,000"
    },
    8: { // Doling Monastery
        name: "Doling Monastery",
        location: "South Sikkim",
        makeMyTripUrl: "https://www.makemytrip.com/hotels/ravangla-hotels.html?utm_source=perplexity",
        nearbyHotels: ["Hotel Mount Pandim", "The Elgin Mount Pelling", "Hotel Garuda"],
        distance: "5-8 km",
        priceRange: "₹1,200 - ₹4,000"
    },
    9: { // Gonjang Monastery
        name: "Gonjang Monastery",
        location: "Gangtok",
        makeMyTripUrl: "https://www.makemytrip.com/hotels/gangtok-hotels.html?utm_source=perplexity",
        nearbyHotels: ["Hotel Mount Jopuno", "The Elgin Mount", "Hotel Sonam Delek"],
        distance: "5-8 km",
        priceRange: "₹2,000 - ₹8,000"
    },
    10: { // Serdup Choling Monastery
        name: "Serdup Choling Monastery",
        location: "Namchi",
        makeMyTripUrl: "https://www.makemytrip.com/hotels/namchi-hotels.html?utm_source=chatgpt.com",
        nearbyHotels: ["Hotel Mount Pandim", "The Elgin Mount Pelling", "Hotel Garuda"],
        distance: "1-3 km",
        priceRange: "₹1,500 - ₹5,000"
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadMonasteries();
    initializeMap();
    loadEvents();
    loadArchives();
    loadAudioGuides();
    setupImageUpload();
    setupLanguageSelector();
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Map controls
    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateMapLayer(this.dataset.layer);
        });
    });

    // Calendar navigation
    document.getElementById('prevYear').addEventListener('click', () => {
        currentYear--;
        currentMonth = new Date(currentYear, currentMonth.getMonth(), 1);
        loadEvents();
    });

    document.getElementById('nextYear').addEventListener('click', () => {
        currentYear++;
        currentMonth = new Date(currentYear, currentMonth.getMonth(), 1);
        loadEvents();
    });

    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth.setMonth(currentMonth.getMonth() - 1);
        currentYear = currentMonth.getFullYear();
        loadEvents();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth.setMonth(currentMonth.getMonth() + 1);
        currentYear = currentMonth.getFullYear();
        loadEvents();
    });

    // Filter event listeners
    document.getElementById('yearFilter').addEventListener('change', (e) => {
        selectedYear = e.target.value;
        loadEvents();
    });

    document.getElementById('statusFilter').addEventListener('change', (e) => {
        selectedStatus = e.target.value;
        loadEvents();
    });

    document.getElementById('monasteryFilter').addEventListener('change', (e) => {
        selectedMonastery = e.target.value;
        loadEvents();
    });

    // Archive search
    document.getElementById('searchBtn').addEventListener('click', searchArchives);
    document.getElementById('archiveSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchArchives();
    });

    // Archive filters
    document.getElementById('categoryFilter').addEventListener('change', searchArchives);
    document.getElementById('periodFilter').addEventListener('change', searchArchives);

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Audio player controls
    document.getElementById('playPauseBtn').addEventListener('click', togglePlayPause);
    document.getElementById('downloadBtn').addEventListener('click', downloadAudio);
    document.getElementById('offlineBtn').addEventListener('click', toggleOfflineMode);

    // Booking form
    document.getElementById('bookingForm').addEventListener('submit', handleBooking);
}

// Monastery Functions
function loadMonasteries() {
    const grid = document.getElementById('monasteryGrid');
    grid.innerHTML = '';

    monasteriesData.forEach(monastery => {
        const card = createMonasteryCard(monastery);
        grid.appendChild(card);
    });
}

function createMonasteryCard(monastery) {
    const card = document.createElement('div');
    card.className = 'monastery-card fade-in';
    card.innerHTML = `
        <div class="monastery-image">
            <img src="${monastery.image}" alt="${monastery.name}" onerror="this.style.display='none'">
            <div class="monastery-badges">
                ${monastery.features.map(feature => `<span class="badge">${feature}</span>`).join('')}
            </div>
        </div>
        <div class="monastery-content">
            <h3 class="monastery-title">${monastery.name}</h3>
            <p class="monastery-location">
                <i class="fas fa-map-marker-alt"></i>
                ${monastery.location}
            </p>
            <p class="monastery-description">${monastery.description}</p>
            <div class="monastery-features">
                ${monastery.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            <div class="monastery-actions">
                <button class="btn btn-primary learn-more-btn" onclick="event.stopPropagation(); openLearnMore('${monastery.mediaUrl}')">
                    <i class="fas fa-external-link-alt"></i>
                    Learn More
                </button>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        window.location.href = `details.html?id=${monastery.id}`;
    });
    return card;
}

function showMonasteryDetails(monastery) {
    const modal = document.getElementById('monasteryModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="monastery-details">
            <div class="monastery-header">
                <h2>${monastery.name}</h2>
                <p class="monastery-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${monastery.location}
                </p>
            </div>
            <div class="monastery-image-large">
                <img src="${monastery.image}" alt="${monastery.name}" onerror="this.style.display='none'">
            </div>
            <div class="monastery-info">
                <h3>About</h3>
                <p>${monastery.description}</p>
                
                <h3>Features Available</h3>
                <div class="features-grid">
                    ${monastery.features.map(feature => `
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
                
                <h3>Virtual Tour</h3>
                <p>Experience this monastery through our immersive 360° virtual tour.</p>
                <button class="btn btn-primary" onclick="openVirtualTour('${monastery.virtualTour}', '${monastery.name}')">
                    <i class="fas fa-vr-cardboard"></i>
                    Start Virtual Tour
                </button>
                
                <h3>Audio Guide</h3>
                <p>Download our comprehensive audio guide available in multiple languages.</p>
                <button class="btn btn-primary" onclick="loadAudioGuide(${monastery.id})">
                    <i class="fas fa-headphones"></i>
                    Start Audio Guide
                </button>
                
                <h3>Learn More</h3>
                <p>Discover more about this monastery from external sources.</p>
                <button class="btn btn-secondary" onclick="openLearnMore('${monastery.mediaUrl}')">
                    <i class="fas fa-external-link-alt"></i>
                    Learn More
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Map Functions
function initializeMap() {
    const mapElement = document.getElementById('map');
    mapElement.innerHTML = `
        <div class="map-placeholder">
            <i class="fas fa-map-marked-alt" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <h3>Interactive Map</h3>
            <p>Click on the map controls above to explore different layers</p>
            <div class="map-features">
                <div class="map-feature">
                    <i class="fas fa-mountain"></i>
                    <span>Monasteries</span>
                </div>
                <div class="map-feature">
                    <i class="fas fa-camera"></i>
                    <span>Attractions</span>
                </div>
                <div class="map-feature">
                    <i class="fas fa-route"></i>
                    <span>Travel Routes</span>
                </div>
            </div>
        </div>
    `;
}

function updateMapLayer(layer) {
    const mapElement = document.getElementById('map');
    let content = '';
    
    switch(layer) {
        case 'monasteries':
            content = `
                <div class="map-layer">
                    <div class="map-placeholder">
                        <i class="fas fa-map-marked-alt" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h3>Interactive Monastery Map</h3>
                        <p>Explore the monasteries through the interactive map interface</p>
                    </div>
                </div>
            `;
            break;
        case 'attractions':
            content = `
                <div class="map-layer">
                    <h3>Sikkim Cultural Attractions</h3>
                    <div class="attraction-markers">
                        <div class="marker attraction" style="left: 20%; top: 30%;">
                            <i class="fas fa-camera"></i>
                            <span>Thangka Art Galleries</span>
                        </div>
                        <div class="marker attraction" style="left: 60%; top: 40%;">
                            <i class="fas fa-utensils"></i>
                            <span>Sikkimese Cuisine</span>
                        </div>
                        <div class="marker attraction" style="left: 40%; top: 60%;">
                            <i class="fas fa-bed"></i>
                            <span>Homestays & Guesthouses</span>
                        </div>
                        <div class="marker attraction" style="left: 70%; top: 50%;">
                            <i class="fas fa-book"></i>
                            <span>Monastery Libraries</span>
                        </div>
                        <div class="marker attraction" style="left: 30%; top: 70%;">
                            <i class="fas fa-hiking"></i>
                            <span>Himalayan Trekking</span>
                        </div>
                        <div class="marker attraction" style="left: 80%; top: 20%;">
                            <i class="fas fa-music"></i>
                            <span>Buddhist Music Centers</span>
                        </div>
                        <div class="marker attraction" style="left: 50%; top: 15%;">
                            <i class="fas fa-mountain"></i>
                            <span>Kanchenjunga Views</span>
                        </div>
                        <div class="marker attraction" style="left: 10%; top: 50%;">
                            <i class="fas fa-leaf"></i>
                            <span>Tea Gardens</span>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'routes':
            content = `
                <div class="map-layer">
                    <h3>Pilgrimage & Travel Routes</h3>
                    <div class="route-info">
                        <div class="route-item">
                            <i class="fas fa-hiking"></i>
                            <span>Pilgrimage Trails</span>
                        </div>
                        <div class="route-item">
                            <i class="fas fa-mountain"></i>
                            <span>Mountain Paths</span>
                        </div>
                        <div class="route-item">
                            <i class="fas fa-walking"></i>
                            <span>Meditation Walks</span>
                        </div>
                        <div class="route-item">
                            <i class="fas fa-route"></i>
                            <span>Cultural Tours</span>
                        </div>
                        <div class="route-item">
                            <i class="fas fa-compass"></i>
                            <span>Spiritual Journeys</span>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'transport':
            content = `
                <div class="map-layer">
                    <h3>Transportation Hubs</h3>
                    <div class="transport-info">
                        <div class="transport-item">
                            <i class="fas fa-plane"></i>
                            <span>International Airports</span>
                        </div>
                        <div class="transport-item">
                            <i class="fas fa-train"></i>
                            <span>Railway Stations</span>
                        </div>
                        <div class="transport-item">
                            <i class="fas fa-bus"></i>
                            <span>Local Transport</span>
                        </div>
                        <div class="transport-item">
                            <i class="fas fa-ship"></i>
                            <span>Ferry Services</span>
                        </div>
                        <div class="transport-item">
                            <i class="fas fa-motorcycle"></i>
                            <span>Local Guides</span>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    mapElement.innerHTML = content;
}

// Events Functions
function loadEvents() {
    updateCalendar();
    loadEventsList();
}

function updateCalendar() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    document.getElementById('currentMonth').textContent = monthNames[currentMonth.getMonth()];
    document.getElementById('currentYear').textContent = currentMonth.getFullYear();
    
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Check if this day has events
        const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const dayEvents = eventsData.filter(event => 
            event.date.toDateString() === dayDate.toDateString()
        );
        
        if (dayEvents.length > 0) {
            dayElement.classList.add('has-event');
            
            // Add event count indicator
            const eventCount = document.createElement('div');
            eventCount.className = 'event-count';
            eventCount.textContent = dayEvents.length;
            dayElement.appendChild(eventCount);
            
            // Add event tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'event-tooltip';
            tooltip.innerHTML = dayEvents.map(event => 
                `<div class="tooltip-event">
                    <strong>${event.title}</strong><br>
                    <small>${event.time} - ${event.location}</small>
                </div>`
            ).join('');
            dayElement.appendChild(tooltip);
            
            // Add click handler
            dayElement.addEventListener('click', () => showDayEvents(dayDate));
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

function loadEventsList() {
    const eventsList = document.getElementById('eventsList');
    
    // Apply filters
    let filteredEvents = eventsData.filter(event => {
        const matchesMonth = event.date.getMonth() === currentMonth.getMonth();
        const matchesYear = event.date.getFullYear() === currentMonth.getFullYear();
        const matchesYearFilter = selectedYear === 'all' || event.year.toString() === selectedYear;
        const matchesStatusFilter = selectedStatus === 'all' || event.status === selectedStatus;
        const matchesMonasteryFilter = selectedMonastery === 'all' || event.monasteryId.toString() === selectedMonastery;
        
        return matchesMonth && matchesYear && matchesYearFilter && matchesStatusFilter && matchesMonasteryFilter;
    });
    
    eventsList.innerHTML = '';
    
    if (filteredEvents.length === 0) {
        eventsList.innerHTML = '<p class="no-events">No events found matching your criteria.</p>';
        return;
    }
    
    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        eventsList.appendChild(eventCard);
    });
}

function showDayEvents(dayDate) {
    const dayEvents = eventsData.filter(event => 
        event.date.toDateString() === dayDate.toDateString()
    );
    
    if (dayEvents.length === 0) return;
    
    // Create modal for day events
    const modal = document.createElement('div');
    modal.className = 'modal day-events-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Events on ${dayDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</h2>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="day-events-list">
                    ${dayEvents.map(event => `
                        <div class="day-event-item">
                            <div class="event-time">${event.time}</div>
                            <div class="event-details">
                                <h3>${event.title}</h3>
                                <p>${event.description}</p>
                                <div class="event-meta">
                                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                                    <span><i class="fas fa-users"></i> ${event.capacity} spots</span>
                                    <span><i class="fas fa-euro-sign"></i> ${event.price}</span>
                                </div>
                            </div>
                            <div class="event-actions">
                                <button class="btn btn-primary" onclick="bookEvent(${event.id})">
                                    <i class="fas fa-ticket-alt"></i> Book
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal functionality
    modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card fade-in';
    card.innerHTML = `
        <div class="event-header">
            <h3 class="event-title">${event.title}</h3>
            <span class="event-date">${event.date.toLocaleDateString()}</span>
        </div>
        <p class="event-description">${event.description}</p>
        <div class="event-meta">
            <span><i class="fas fa-clock"></i> ${event.time}</span>
            <span><i class="fas fa-users"></i> ${event.capacity} spots</span>
            <span><i class="fas fa-euro-sign"></i> ${event.price}</span>
        </div>
        <div class="event-actions">
            <button class="btn btn-primary" onclick="bookEvent(${event.id})">
                <i class="fas fa-ticket-alt"></i>
                Book Event
            </button>
            <button class="btn btn-secondary" onclick="viewEventDetails(${event.id})">
                <i class="fas fa-info-circle"></i>
                Details
            </button>
        </div>
    `;
    
    return card;
}

function bookEvent(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;
    
    // Check if booking is open
    if (event.bookingOpen === false) {
        alert('Booking for this event is not yet open. Please check back later.');
        return;
    }
    
    // Populate booking modal with event details
    document.getElementById('bookingEventTitle').textContent = event.title;
    document.getElementById('bookingEventDate').textContent = event.date.toLocaleDateString();
    document.getElementById('bookingEventTime').textContent = event.time;
    document.getElementById('bookingEventLocation').textContent = event.location;
    document.getElementById('bookingEventPrice').textContent = event.price;
    document.getElementById('bookingEventCapacity').textContent = `${event.capacity} spots available`;
    document.getElementById('bookingEventDescription').textContent = event.description;
    
    // Calculate total cost
    const price = event.price === 'Free' ? 0 : parseInt(event.price.replace('₹', '').replace(',', ''));
    document.getElementById('totalCost').textContent = `₹${price}`;
    
    // Reset form
    document.getElementById('bookingForm').reset();
    
    // Show modal
    document.getElementById('bookingModal').style.display = 'block';
}

function handleBooking(e) {
    e.preventDefault();
    
    const formData = {
        eventName: document.getElementById('eventName').value,
        attendeeName: document.getElementById('attendeeName').value,
        attendeeEmail: document.getElementById('attendeeEmail').value,
        attendeePhone: document.getElementById('attendeePhone').value,
        attendeeCount: document.getElementById('attendeeCount').value
    };
    
    // Simulate booking process
    setTimeout(() => {
        alert('Booking confirmed! You will receive a confirmation email shortly.');
        document.getElementById('bookingModal').style.display = 'none';
        document.getElementById('bookingForm').reset();
    }, 1000);
}

// Virtual Tours Functions
function openVirtualTour(tourUrl, title) {
    const modal = document.getElementById('tourModal');
    const tourTitle = document.getElementById('tourTitle');
    const tourViewer = document.getElementById('tourViewer');
    
    tourTitle.textContent = `${title} - Virtual Tour`;
    tourViewer.innerHTML = `
        <iframe src="${tourUrl}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
    `;
    
    modal.style.display = 'block';
}

// Learn More Functions
function openLearnMore(url) {
    if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        alert('Learn More link not available for this monastery.');
    }
}

// Archives Functions
function loadArchives() {
    const archivesGrid = document.getElementById('archivesGrid');
    archivesGrid.innerHTML = '';
    
    archivesData.forEach(archive => {
        const archiveCard = createArchiveCard(archive);
        archivesGrid.appendChild(archiveCard);
    });
}

function createArchiveCard(archive) {
    const card = document.createElement('div');
    card.className = 'archive-item fade-in';
    card.innerHTML = `
        <div class="archive-image">
            <img src="${archive.image}" alt="${archive.title}" onerror="this.style.display='none'">
        </div>
        <div class="archive-content">
            <h3 class="archive-title">${archive.title}</h3>
            <p class="archive-meta">${archive.year} • ${archive.category}</p>
            <p class="archive-description">${archive.description}</p>
        </div>
    `;
    
    card.addEventListener('click', () => showArchiveDetails(archive));
    return card;
}

function searchArchives() {
    const searchTerm = document.getElementById('archiveSearch').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const period = document.getElementById('periodFilter').value;
    
    const filteredArchives = archivesData.filter(archive => {
        const matchesSearch = archive.title.toLowerCase().includes(searchTerm) ||
                            archive.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || archive.category === category;
        const matchesPeriod = period === 'all' || archive.period === period;
        
        return matchesSearch && matchesCategory && matchesPeriod;
    });
    
    const archivesGrid = document.getElementById('archivesGrid');
    archivesGrid.innerHTML = '';
    
    if (filteredArchives.length === 0) {
        archivesGrid.innerHTML = '<p class="no-results">No archives found matching your criteria.</p>';
        return;
    }
    
    filteredArchives.forEach(archive => {
        const archiveCard = createArchiveCard(archive);
        archivesGrid.appendChild(archiveCard);
    });
}

function showArchiveDetails(archive) {
    alert(`Archive Details:\n\nTitle: ${archive.title}\nYear: ${archive.year}\nCategory: ${archive.category}\nDescription: ${archive.description}`);
}

// Audio Guide Functions
function loadAudioGuides() {
    const audioLocations = document.getElementById('audioLocations');
    audioLocations.innerHTML = '';
    
    monasteriesData.forEach(monastery => {
        const locationItem = document.createElement('div');
        locationItem.className = 'location-item';
        locationItem.innerHTML = `
            <div class="location-name">${monastery.audioGuide.title}</div>
            <div class="location-duration">${monastery.audioGuide.duration}</div>
        `;
        
        locationItem.addEventListener('click', () => loadAudioGuide(monastery.id));
        audioLocations.appendChild(locationItem);
    });
}

function loadAudioGuide(monasteryId) {
    const monastery = monasteriesData.find(m => m.id === monasteryId);
    if (!monastery) return;
    
    currentTrack = monastery.audioGuide;
    document.getElementById('currentTrack').textContent = currentTrack.title;
    document.getElementById('currentLocation').textContent = monastery.name;
    
    // Update location items
    document.querySelectorAll('.location-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.location-item').classList.add('active');
}

function togglePlayPause() {
    const btn = document.getElementById('playPauseBtn');
    const icon = btn.querySelector('i');
    
    if (isPlaying) {
        // Pause
        icon.className = 'fas fa-play';
        isPlaying = false;
        // In a real app, you would pause the audio here
    } else {
        // Play
        icon.className = 'fas fa-pause';
        isPlaying = true;
        // In a real app, you would play the audio here
        simulateProgress();
    }
}

function simulateProgress() {
    if (!isPlaying) return;
    
    const progress = document.getElementById('progress');
    let width = 0;
    
    const interval = setInterval(() => {
        if (width >= 100 || !isPlaying) {
            clearInterval(interval);
            if (width >= 100) {
                isPlaying = false;
                document.getElementById('playPauseBtn').querySelector('i').className = 'fas fa-play';
            }
            return;
        }
        
        width += 2;
        progress.style.width = width + '%';
    }, 100);
}

function downloadAudio() {
    if (!currentTrack) {
        alert('Please select an audio guide first.');
        return;
    }
    
    alert(`Downloading ${currentTrack.title}...\n\nThis feature would download the audio guide for offline use.`);
}

function toggleOfflineMode() {
    const btn = document.getElementById('offlineBtn');
    const icon = btn.querySelector('i');
    
    offlineMode = !offlineMode;
    
    if (offlineMode) {
        icon.className = 'fas fa-wifi-slash';
        btn.style.background = '#e74c3c';
        alert('Offline mode enabled. Audio guides will be available without internet connection.');
    } else {
        icon.className = 'fas fa-wifi';
        btn.style.background = '#667eea';
        alert('Online mode enabled. Full features available with internet connection.');
    }
}

// Image Upload Functions
function setupImageUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('imageUpload');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    fileInput.addEventListener('change', handleFileSelect);
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const files = e.dataTransfer.files;
    handleFiles(files);
}

function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    const uploadedImages = document.getElementById('uploadedImages');
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'uploaded-image fade-in';
                imageContainer.innerHTML = `
                    <img src="${e.target.result}" alt="Uploaded image">
                    <div class="image-actions">
                        <button class="image-action" onclick="deleteImage(this)">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="image-action" onclick="shareImage(this)">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                `;
                uploadedImages.appendChild(imageContainer);
            };
            reader.readAsDataURL(file);
        }
    });
}

function deleteImage(button) {
    button.closest('.uploaded-image').remove();
}

function shareImage(button) {
    alert('Image sharing feature would be implemented here.');
}

// Language Functions
function setupLanguageSelector() {
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', function() {
        currentLanguage = this.value;
        updateLanguage();
    });
}

function updateLanguage() {
    // In a real app, this would load different language files
    const translations = {
        en: {
            heroTitle: "Discover Sacred Heritage",
            heroSubtitle: "Explore ancient monasteries through immersive virtual tours, interactive maps, and digital archives"
        },
        es: {
            heroTitle: "Descubre el Patrimonio Sagrado",
            heroSubtitle: "Explora monasterios antiguos a través de tours virtuales inmersivos, mapas interactivos y archivos digitales"
        },
        fr: {
            heroTitle: "Découvrez le Patrimoine Sacré",
            heroSubtitle: "Explorez d'anciens monastères grâce à des visites virtuelles immersives, des cartes interactives et des archives numériques"
        },
        de: {
            heroTitle: "Entdecken Sie das Heilige Erbe",
            heroSubtitle: "Erkunden Sie alte Klöster durch immersive virtuelle Touren, interaktive Karten und digitale Archive"
        },
        it: {
            heroTitle: "Scopri il Patrimonio Sacro",
            heroSubtitle: "Esplora antichi monasteri attraverso tour virtuali immersivi, mappe interattive e archivi digitali"
        }
    };
    
    const t = translations[currentLanguage] || translations.en;
    document.querySelector('.hero-content h1').textContent = t.heroTitle;
    document.querySelector('.hero-content p').textContent = t.heroSubtitle;
}

// Utility Functions
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states
function showLoading(element) {
    element.innerHTML = '<div class="loading">Loading...</div>';
}

function hideLoading(element) {
    // Remove loading state
}

// Initialize map layer on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        updateMapLayer('monasteries');
    }, 1000);
});
