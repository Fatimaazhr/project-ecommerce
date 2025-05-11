document.addEventListener('alpine:init', () => {
    // Menggunakan Alpine.store untuk produk
    Alpine.store('products', {
        items: [
            { id: 1, name: '001 - Cat Kiloan Rizki', img: '001.jpg', price: 13000 },
            { id: 2, name: '002 - Cat Kiloan Rizki', img: '005.jpg', price: 13000 },
            { id: 3, name: '003 - Cat Kiloan Rizki', img: '003.jpg', price: 13000 },
            { id: 4, name: '004 - Cat Kiloan Rizki', img: '004.jpg', price: 13000 },
            { id: 5, name: '005 - Cat Kiloan Rizki', img: '005.jpg', price: 13000 },
            { id: 6, name: '006 - Cat Kiloan Rizki', img: '006.jpg', price: 13000 },
            { id: 7, name: '007 - Cat Kiloan Rizki', img: '007.jpg', price: 13000 },
            { id: 8, name: '008 - Cat Kiloan Rizki', img: '008.jpg', price: 13000 },
            { id: 9, name: '009 - Cat Kiloan Rizki', img: '009.jpg', price: 13000 },
            { id: 10, name: '010 - Cat Kiloan Rizki', img: '010.jpg', price: 13000 },
            { id: 11, name: '011 - Cat Kiloan Rizki', img: '011.jpg', price: 13000 },
            { id: 12, name: '012 - Cat Kiloan Rizki', img: '012.jpg', price: 13000 },
            { id: 13, name: '013 - Cat Kiloan Rizki', img: '013.jpg', price: 13000 },
            { id: 14, name: '014 - Cat Kiloan Rizki', img: '014.jpg', price: 13000 },
            { id: 15, name: '015 - Cat Kiloan Rizki', img: '015.jpg', price: 13000 },
            { id: 16, name: '016 - Cat Kiloan Rizki', img: '016.jpg', price: 13000 }
        ]
    });

    // Inisialisasi Cart
    const cart = {
        items: [],
        total: 0,
        quantity: 0,
        
        add(newItem) {
            const cartItem = this.items.find(item => item.id === newItem.id);
        
            if (!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                cartItem.quantity++;
                cartItem.total = cartItem.price * cartItem.quantity;
                this.quantity++;
                this.total += cartItem.price;
            }
        
            this.save(); // Menyimpan cart ke localStorage
        },
        
        remove(id) {
            const cartItem = this.items.find(item => item.id === id);
            if (!cartItem) return;
        
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
                cartItem.total = cartItem.price * cartItem.quantity;
                this.quantity--;
                this.total -= cartItem.price;
            } else {
                this.items = this.items.filter(item => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        
            this.save(); // Menyimpan cart ke localStorage
        },

        // Menghapus seluruh item
        removeAll(id) {const cartItem = this.items.find(item => item.id === id);
            if (!cartItem) return;

            this.quantity -= cartItem.quantity;
            this.total -= cartItem.total;
            this.items = this.items.filter(item => item.id !== id);

            this.save(); // Menyimpan cart ke localStorage
        },
        
        save() {
            localStorage.setItem('cart', JSON.stringify({
                items: this.items,
                total: this.total,
                quantity: this.quantity,
            }));
        },
        
        init() {
            const saved = JSON.parse(localStorage.getItem('cart'));
            if (saved) {
                this.items = saved.items || [];
                this.total = saved.total || 0;
                this.quantity = saved.quantity || 0;
            }
        }
    };
    
    
    Alpine.store('cart', cart);

    // PENTING! Panggil init setelah set store-nya
    Alpine.store('cart').init();

    // 3. Tambahkan data untuk halaman detail
    Alpine.data('detailProduk', () => ({
    produk: {},
    
    init() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlParams.get('id'));

        // Ambil data produk dari store
        this.produk = Alpine.store('products').items.find(item => item.id === id);
    },

    belanjaSekarang() {
        // Tambahkan produk ke keranjang
        Alpine.store('cart').add(this.produk);

        // Redirect ke halaman keranjang
        window.location.href = 'cart.html';
    }
}));
});

// Konversi Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat( 'id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};




  
  
  