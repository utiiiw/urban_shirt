// app.js - Urban Shirt Online Store (Final Fixed Version)

document.addEventListener('DOMContentLoaded', () => {
    
    // ===================================
    // 1. MOBILE MENU TOGGLE 🍔
    // ===================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        // Definisikan fungsi toggleMenu untuk digunakan oleh event listener
        const toggleMenu = function() {
            navMenu.classList.toggle('active');
        };
        
        // Tambahkan event listener untuk tombol hamburger
        hamburger.addEventListener('click', toggleMenu);
        
        // Tetap pertahankan fungsi global jika ada halaman yang memanggilnya via inline (seperti index.html)
        window.toggleMenu = toggleMenu; 
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
});

// ===================================
    // 5. KERANJANG BELANJA (Katalog Page) 🛍️
    // ===================================
    
    // Hanya jalankan jika kita berada di halaman Katalog dan elemen-elemen keranjang ada
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCountSpan = document.getElementById('cartCount');
    const cartTotalDiv = document.getElementById('cartTotal');
    const viewCartBtn = document.getElementById('viewCartBtn');
    const closeBtn = document.querySelector('.close-btn');

    if (cartModal) {
        
        // --- Fungsi Dasar ---
        
        // Mengambil data keranjang dari Local Storage, atau array kosong jika belum ada
        const getCart = () => JSON.parse(localStorage.getItem('urbanShirtCart')) || [];

        // Menyimpan data keranjang ke Local Storage
        const saveCart = (cart) => localStorage.setItem('urbanShirtCart', JSON.stringify(cart));

        // Memperbarui jumlah item di tombol "Lihat Keranjang"
        const updateCartCount = () => {
            const cart = getCart();
            const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            if(cartCountSpan) {
                cartCountSpan.textContent = totalCount;
            }
        };

        // --- Fungsi Add, Update, Render ---
        
        const renderCart = () => {
            const cart = getCart();
            cartItemsContainer.innerHTML = '';
            let total = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Keranjang kosong.</p>';
            } else {
                cart.forEach((item, index) => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('cart-item-detail');
                    itemDiv.innerHTML = `
                        <p>
                            <strong>${item.name}</strong> 
                            (Rp${(item.price / 1000).toFixed(0)}rb x ${item.quantity})
                            : 
                            Rp${(itemTotal / 1000).toFixed(0)}rb
                        </p>
                        <button class="remove-item-btn" data-index="${index}">Hapus</button>
                    `;
                    cartItemsContainer.appendChild(itemDiv);
                });
            }

            cartTotalDiv.innerHTML = `<h3>Total: Rp${(total / 1000).toFixed(3).replace(/\.000$/, '.000')}</h3>`;
            updateCartCount();
        };

        const addToCart = (productId, name, price) => {
            const cart = getCart();
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id: productId, name, price: parseInt(price), quantity: 1 });
            }

            saveCart(cart);
            alert(`"${name}" ditambahkan ke keranjang!`);
            updateCartCount();
        };
        
        const removeItemFromCart = (index) => {
            let cart = getCart();
            cart.splice(index, 1);
            saveCart(cart);
            renderCart();
        };

        // --- Event Listeners ---
        
        // 1. Tombol Tambah ke Keranjang
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const item = e.target.closest('.product-item');
                if (item) {
                    const id = item.dataset.id;
                    const name = item.dataset.name;
                    const price = item.dataset.price;
                    addToCart(id, name, price);
                }
            });
        });
        
        // 2. Tampilkan Modal
        viewCartBtn.addEventListener('click', () => {
            renderCart();
            cartModal.style.display = 'block';
        });

        // 3. Tutup Modal
        closeBtn.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
        
        // 4. Hapus Item dari Keranjang (Delegasi Event)
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item-btn')) {
                const index = parseInt(e.target.dataset.index);
                removeItemFromCart(index);
            }
        });

        // Inisialisasi hitungan keranjang saat halaman dimuat
        updateCartCount();
    }
});
