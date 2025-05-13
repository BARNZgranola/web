// BARNZ Granola - JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }

    // Language Switcher
    const langEnBtn = document.getElementById('lang-en');
    const langIdBtn = document.getElementById('lang-id');
    
    if (langEnBtn && langIdBtn) {
        langEnBtn.addEventListener('click', () => {
            console.log("English language button clicked");
            setActiveLanguageButton('en');
            changeLanguage('en');
        });
        
        langIdBtn.addEventListener('click', () => {
            console.log("Indonesian language button clicked");
            setActiveLanguageButton('id');
            changeLanguage('id');
        });
    } else {
        console.warn("Language buttons not found");
    }

    function setActiveLanguageButton(lang) {
        if (!langEnBtn || !langIdBtn) {
            console.warn("Language buttons not available for setting active state");
            return;
        }
        
        if (lang === 'en') {
            langEnBtn.classList.add('active', 'bg-amber-200');
            langEnBtn.classList.remove('bg-transparent');
            langIdBtn.classList.remove('active', 'bg-amber-200');
            langIdBtn.classList.add('bg-transparent');
        } else {
            langIdBtn.classList.add('active', 'bg-amber-200');
            langIdBtn.classList.remove('bg-transparent');
            langEnBtn.classList.remove('active', 'bg-amber-200');
            langEnBtn.classList.add('bg-transparent');
        }
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if it's open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Scroll to the element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all section elements
    document.querySelectorAll('section > div').forEach(section => {
        observer.observe(section);
    });

    // Add animation class
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-fade-in {
            animation: fadeIn 1s ease forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Check if there's a stored language preference and apply it
    try {
        const storedLanguage = localStorage.getItem('language') || 'en';
        console.log(`Applying stored language: ${storedLanguage}`);
        setActiveLanguageButton(storedLanguage);
        changeLanguage(storedLanguage);
    } catch (error) {
        console.error("Error applying stored language:", error);
        // Fallback to English
        setActiveLanguageButton('en');
        changeLanguage('en');
    }

    // Optimized Ingredient Slider - updates every 100ms
    function setupIngredientsSlider() {
        const slider = document.querySelector('.ingredients-slider');
        if (!slider) return;
        
        // Make sure all duplicate cards exactly match the originals 
        const allItems = slider.querySelectorAll('.ingredient-card');
        const originalItems = Math.floor(allItems.length / 2);
        
        // Create perfect duplicates to ensure seamless animation
        for (let i = 0; i < originalItems; i++) {
            const original = allItems[i];
            const duplicate = allItems[i + originalItems];
            
            // Copy exact dimensions and styling
            duplicate.style.minWidth = original.style.minWidth || window.getComputedStyle(original).minWidth;
            duplicate.style.height = original.style.height || window.getComputedStyle(original).height;
        }
        
        // Handle any potential hiccups during scrolling by using requestAnimationFrame
        let lastKnownScrollPosition = 0;
        let ticking = false;
        
        function smoothScrollCheck() {
            // Force repaint to ensure smooth animation
            slider.style.transform = 'translateZ(0)';
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            lastKnownScrollPosition = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    smoothScrollCheck();
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
    
    // Initialize the slider
    window.addEventListener('load', setupIngredientsSlider);
    window.addEventListener('resize', setupIngredientsSlider);

    // Shop Location Map Links
    document.querySelectorAll('.shop-location').forEach(shop => {
        shop.addEventListener('click', function() {
            const mapUrl = this.getAttribute('data-map-url');
            if (mapUrl) {
                window.open(mapUrl, '_blank');
            }
        });
    });

    // Shop Slider Controls
    const scrollLeftBtn = document.querySelector('.scroll-btn-left');
    const scrollRightBtn = document.querySelector('.scroll-btn-right');
    const shopContainer = document.querySelector('.shop-locations-container');

    if (scrollLeftBtn && scrollRightBtn && shopContainer) {
        scrollLeftBtn.addEventListener('click', () => {
            shopContainer.scrollBy({
                left: -280,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            shopContainer.scrollBy({
                left: 280,
                behavior: 'smooth'
            });
        });
    }
});

// Language Switching Functionality
function changeLanguage(lang) {
    console.log(`Changing language to: ${lang}`);
    
    try {
        const translations = {
            'en': {
                // Navigation
                'home': 'Home',
                'products': 'Products',
                'ingredients': 'Ingredients',
                'about': 'About Us',
                'contact': 'Contact',
                
                // Hero Section
                'hero-title': 'Let NATURE <span class="text-amber-400">fuel your DAY</span> with every BITE!',
                'hero-desc': 'Handcrafted with love using only the finest organic ingredients. <br>Start your day with a bowl of nature\'s best!',
                'cta-button': 'Order Now',
                
                // Products Section
                'products-title': 'Products',
                'product-1-desc': 'Our classic recipe with oats, syrup, cashews, and dried fruits.',
                'product-2-desc': 'Rich dark chocolate chunks with almonds and coconut flakes.',
                'product-3-desc': 'Strawberry, Coconut, Roselle and Banana, this traditional recipe gets a tropical twist.',
                'product-4-desc': 'High quality mix of protein-rich seeds, nuts, healthy fats and Omega-3&6.',
                'product-5-desc': 'Indulge your senses and get a caffeine boost with this granola mocha flavoured.',
                'add-to-cart': 'Add to Cart',
                
                // Ingredients Section
                'ingredients-title': 'Ingredients',
                'ingredient-1': 'Organic Jumbo Oats',
                'ingredient-1-desc': 'Whole grain goodness that keeps you full longer.',
                'ingredient-2': 'Raw & Roasted Cashews',
                'ingredient-2-desc': 'Protein-rich nuts that add crunch and nutrition.',
                'ingredient-3': 'Vegan Honey',
                'ingredient-3-desc': 'Sweet natural goodness from local beekeepers.',
                'ingredient-4': 'Coconut Flakes',
                'ingredient-4-desc': 'Adds tropical flavor and healthy fats.',
                'ingredient-5': 'Strawberries',
                'ingredient-5-desc': 'Tangy berries packed with antioxidants.',
                'ingredient-6': 'Pumpkin & Quinoa Seeds',
                'ingredient-6-desc': 'Rich in minerals and provides a nutty flavor.',
                'ingredient-7': 'Chia & Sunflower Seeds',
                'ingredient-7-desc': 'Tiny powerhouses of fiber, omega-3 fatty acids and protein.',
                'ingredient-8': 'Roselle Flower',
                'ingredient-8-desc': 'Natural sweetener that adds rich flavor and antioxidants.',
                
                // About Section
                'about-title': 'About BARNZ',
                'about-p1': 'Om Swastyastu! <br>Headquartered in Bali, Indonesia, well known as The Islands of Gods, BARNZ has been dreamed and began with a simple vision: We are going to be part of the change and chain.',
                'about-p2': 'CHANGE: to provide nutritious high-quality granola that uses only the finest organic ingredients. <br>CHAIN: focused on feed the ecological chain, support local producers and based on permaculture\'s philosophy.',
                'about-p3': 'It is our challenge, you just dedicate yourself to enjoying it!',
                'find-us-title': 'Where to Find Us?',
                
                // Product Properties
                'product-properties': ' ',
                'gluten-free': 'Gluten Free',
                'no-sugar': 'No Sugar Added',
                'low-carb': 'Low Carb',
                'vegan': 'Vegan',
                'halal': 'Halal',
                'non-gmo': 'Non-GMO',
                
                // Contact Section
                'contact-title': 'Get in Touch',
                'name-label': 'Name',
                'email-label': 'Email',
                'subject-label': 'Subject',
                'message-label': 'Message',
                'send-message': 'Send Message',
                
                // Footer
                'quick-links': 'Quick Links',
                'contact-us': 'Contact Us',
                'newsletter': 'Newsletter',
                'subscribe-desc': 'Subscribe to get updates on new products and special offers.',
                'your-email': 'Your email',
                'copyright': '© 2023 BARNZ Granola. All rights reserved.'
            },
            'id': {
                // Navigation
                'home': 'Beranda',
                'products': 'Produk',
                'ingredients': 'Bahan',
                'about': 'Tentang Kami',
                'contact': 'Kontak',
                
                // Hero Section
                'hero-title': 'Biar ALAM <span class="text-amber-400">segarkan harimu </span>di tiap GIGITAN!',
                'hero-desc': 'Dibuat dengan cinta menggunakan bahan-bahan organik terbaik. <br>Mulailah hari kamu dengan semangkuk yang terbaik dari alam!',
                'cta-button': 'Pesan Sekarang',
                
                // Products Section
                'products-title': 'Produk',
                'product-1-desc': 'Resep klasik kami dengan gandum oat, tebu, kacang mede, dan buah-buahan kering.',
                'product-2-desc': 'Potongan cokelat hitam kaya dengan almond dan irisan kelapa.',
                'product-3-desc': 'Stroberi, Kelapa, Rosella dan Pisang, resep tradisional ini mendapat sentuhan tropis.',
                'product-4-desc': 'Campuran berkualitas tinggi dari biji-bijian kaya protein, kacang-kacangan, lemak sehat dan Omega-3&6',
                'product-5-desc': 'Manjakan indra Anda dan dapatkan dorongan kafein dengan granola rasa moka ini.',
                'add-to-cart': 'Tambahkan ke Keranjang',
                
                // Ingredients Section
                'ingredients-title': 'Bahan-Bahan',
                'ingredient-1': 'Oat Jumbo Organik',
                'ingredient-1-desc': 'Kebaikan biji-bijian utuh yang membuat Anda kenyang lebih lama.',
                'ingredient-2': 'Kecang Mede',
                'ingredient-2-desc': 'Kacang kaya protein yang menambahkan kerenyahan dan nutrisi.',
                'ingredient-3': 'Madu Vegan',
                'ingredient-3-desc': 'Kelezatan manis alami dari peternak lebah lokal.',
                'ingredient-4': 'Kelapa',
                'ingredient-4-desc': 'Menambahkan rasa tropis dan lemak sehat.',
                'ingredient-5': 'Stroberi',
                'ingredient-5-desc': 'Buah beri asam yang kaya antioksidan.',
                'ingredient-6': 'Biji Labu & Quinoa',
                'ingredient-6-desc': 'Kaya mineral dan memberikan rasa gurih.',
                'ingredient-7': 'Biji Matahari & Chia',
                'ingredient-7-desc': 'Sumber daya kecil yang kaya akan serat, asam lemak omega-3 dan protein.',
                'ingredient-8': 'Bunga Rosella',
                'ingredient-8-desc': 'Pemanis alami yang menambahkan rasa kaya dan antioksidan.',
                
                // About Section
                'about-title': 'Tentang BARNZ',
                'about-p1': 'Om Swastyastu! <br>Berpusat di Bali, Indonesia, yang terkenal sebagai Pulau Dewata.<br> BARNZ memiliki visi sederhana sejak awal: untuk menjadi bagian dari perubahan dan rantai.',
                'about-p2': 'PERUBAHAN: menyediakan granola bergizi berkualitas tinggi yang hanya menggunakan bahan-bahan organik terbaik. <br>RANTAI:  berfokus pada pemenuhan kebutuhan rantai ekologi, dengan mendukung produsen lokal dan berlandaskan filosofi permakultur.',
                'about-p3': 'Inilah tantangan kami, dan kamu cukup menikmati BARNZ!',
                'find-us-title': 'Dimana Menemukan Kami?',
                
                // Product Properties
                'product-properties': ' ',
                'gluten-free': 'Tanpa Gluten',
                'no-sugar': 'Tanpa Gula Buatan',
                'low-carb': 'Rendah Karbo',
                'vegan': 'Vegan',
                'halal': 'Halal',
                'non-gmo': 'Tanpa GMO',
                
                // Contact Section
                'contact-title': 'Hubungi Kami',
                'name-label': 'Nama',
                'email-label': 'Email',
                'subject-label': 'Subjek',
                'message-label': 'Pesan',
                'send-message': 'Kirim Pesan',
                
                // Footer
                'quick-links': 'Tautan Cepat',
                'contact-us': 'Hubungi Kami',
                'newsletter': 'Buletin',
                'subscribe-desc': 'Berlangganan untuk mendapatkan pembaruan tentang produk baru dan penawaran spesial.',
                'your-email': 'Email Anda',
                'copyright': '© 2023 BARNZ Granola. Semua hak dilindungi undang-undang.'
            }
        };

        // Translate all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            try {
                const key = element.getAttribute('data-translate');
                if (translations[lang] && translations[lang][key]) {
                    if (element.innerHTML.includes('<span') || element.tagName === 'H1' || element.tagName === 'H2' || 
                        element.tagName === 'H3' || element.tagName === 'P' || translations[lang][key].includes('<br>')) {
                        element.innerHTML = translations[lang][key];
                    } else {
                        element.textContent = translations[lang][key];
                    }
                }
            } catch (error) {
                console.error(`Error translating element: ${element}`, error);
            }
        });

        // Store the language preference in localStorage
        try {
            localStorage.setItem('language', lang);
        } catch (error) {
            console.error("Error storing language preference:", error);
        }
    } catch (error) {
        console.error("Error in changeLanguage function:", error);
    }
} 