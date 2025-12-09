// Urban Shirt Final Version — FIXED CART + NAV ICON

document.addEventListener('DOMContentLoaded', () => {

    /* =============================
       SEARCH PRODUK
    ============================= */
    const searchInput = document.getElementById('searchInput');
    const productGrid = document.querySelector('.product-grid');

    if (searchInput && productGrid) {
        searchInput.addEventListener('keyup', () => {
            let value = searchInput.value.toLowerCase();
            document.querySelectorAll('.product-item').forEach(item => {
                let name = item.querySelector('h3')?.textContent.toLowerCase() || "";
                item.style.display = name.includes(value) ? "block" : "none";
            });
        });
    }

    /* =============================
       KERANJANG
    ============================= */
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalDiv = document.getElementById('cartTotal');

    // ikon navbar
    const navCart = document.getElementById('navCart');
    const navCount = document.getElementById('navCartCount');

    // tombol bawah
    const viewCartBtn = document.getElementById('viewCartBtn');
    const cartCountSpan = document.getElementById('cartCount');

    const closeBtn = document.querySelector('.close-btn');

    const getCart = () => JSON.parse(localStorage.getItem('urbanShirtCart')) || [];
    const saveCart = (cart) => localStorage.setItem('urbanShirtCart', JSON.stringify(cart));

    const updateCartCount = () => {
        const cart = getCart();
        const total = cart.reduce((s, i) => s + i.quantity, 0);
        if (cartCountSpan) cartCountSpan.textContent = total;
        if (navCount) navCount.textContent = total;
    };

    const renderCart = () => {
        const cart = getCart();
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Keranjang kosong.</p>";
        } else {
            cart.forEach((item, index) => {
                let subtotal = item.quantity * item.price;
                total += subtotal;

                cartItemsContainer.innerHTML += `
                    <div class="cart-item-detail">
                        <p><strong>${item.name}</strong> (x${item.quantity})</p>
                        <p>Rp${subtotal.toLocaleString()}</p>
                        <button class="remove-item-btn" data-index="${index}">Hapus</button>
                    </div>
                `;
            });
        }

        cartTotalDiv.textContent = `Rp${total.toLocaleString()}`;
        updateCartCount();
    };

    const addToCart = (id, name, price) => {
        let cart = getCart();
        let existing = cart.find(i => i.id === id);

        if (existing) existing.quantity++;
        else cart.push({ id, name, price: Number(price), quantity: 1 });

        saveCart(cart);
        updateCartCount();
        alert(`"${name}" ditambahkan ke keranjang!`);
    };

    // klik tombol tambah ke keranjang
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            addToCart(btn.dataset.id, btn.dataset.name, btn.dataset.price);
        });
    });

    // buka modal dari ikon navbar
    navCart?.addEventListener('click', () => {
        renderCart();
        cartModal.style.display = "block";
    });

    // buka modal dari tombol bawah
    viewCartBtn?.addEventListener('click', () => {
        renderCart();
        cartModal.style.display = "block";
    });

    // tutup modal
    closeBtn?.addEventListener('click', () => {
        cartModal.style.display = "none";
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    // hapus item
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            let idx = Number(e.target.dataset.index);
            let cart = getCart();
            cart.splice(idx, 1);
            saveCart(cart);
            renderCart();
        }
    });

    updateCartCount();
});
