// app.js - Urban Shirt Online Store (Final Fixed Version)

document.addEventListener('DOMContentLoaded', () => {
    
    // ===================================
    // 1. MOBILE MENU TOGGLE 🍔
    // ===================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        // Karena HTML index menggunakan inline onclick="toggleMenu()", 
        // kita definisikan fungsi global ini.
        window.toggleMenu = function() {
             navMenu.classList.toggle('active');
        };
        // Tambahkan juga event listener langsung untuk konsistensi
        hamburger.addEventListener('click', window.toggleMenu);
    }

    // ===================================
    // 2. SEARCH FUNCTIONALITY (Katalog Page) 🔍
    // ===================================
    const searchInput = document.getElementById('searchInput');
    const productGrid = document.getElementById('productGrid');
    
    // Hanya jalankan jika elemen pencarian dan grid ada (halaman katalog)
    if (searchInput && productGrid) {
        const productItems = productGrid.querySelectorAll('.product-item');

        const filterProductsBySearch = (searchTerm) => {
            const searchLower = searchTerm.toLowerCase().trim();

            productItems.forEach(item => {
                // Ambil teks dari h3 (nama produk)
                const productName = item.querySelector('h3') ? item.querySelector('h3').textContent.toLowerCase() : '';
                
                // Cek apakah nama produk mengandung teks pencarian
                if (productName.includes(searchLower)) {
                    item.style.display = 'block'; 
                } else {
                    item.style.display = 'none'; 
                }
            });
        };

        searchInput.addEventListener('keyup', (e) => {
            filterProductsBySearch(e.target.value);
        });
    }


    // ===================================
    // 3. TESTIMONIAL SLIDER (Testimoni Page) 💬
    // ===================================
    const testiItems = document.querySelectorAll('.testi-item');
    let currentTesti = 0;

    if (testiItems.length > 0) {
        const showTestimonial = (index) => {
            testiItems.forEach((item, i) => {
                // Sembunyikan semua kecuali yang aktif
                item.style.display = i === index ? 'block' : 'none'; 
            });
        };

        showTestimonial(currentTesti); // Tampilkan yang pertama

        // Loop otomatis setiap 4 detik
        setInterval(() => {
            currentTesti = (currentTesti + 1) % testiItems.length;
            showTestimonial(currentTesti);
        }, 4000); 
    }

    // ===================================
    // 4. CONTACT FORM ALERT (Kontak Page) ✉️
    // ===================================
    const contactForm = document.querySelector('#contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Pesan berhasil dikirim! Terima kasih sudah menghubungi Urban Shirt.');
            contactForm.reset();
        });
    }
    
    /* Catatan: Fitur GALLERY FILTER (Nomor 3 di sesi sebelumnya) dihapus karena 
       tidak ada elemen filter di HTML yang Anda berikan. */
});