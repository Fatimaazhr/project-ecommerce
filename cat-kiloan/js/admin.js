function dashboard() {
    return {
        // State
        products: [
            {
                id: 1,
                nama: '001 - Cat Kiloan Rizki',
                harga: 13000,
                stok: 25,
                deskripsi: 'Cat tembok interior warna putih cocok untuk dinding rumah bagian dalam.',
                img: '001.jpg'
            },
            {
                id: 2,
                nama: 'Cat Tembok Eksterior Hijau 5L',
                harga: 95000,
                stok: 15,
                deskripsi: 'Cat tembok tahan cuaca warna hijau cocok untuk dinding luar.',
                gambar: 'https://example.com/gambar/cat-hijau.jpg'
            },
            {
                id: 3,
                nama: 'Cat Dasar Alkali Resistan 5L',
                harga: 67000,
                stok: 18,
                deskripsi: 'Cat dasar untuk melapisi permukaan baru dan meningkatkan daya rekat.',
                gambar: 'https://example.com/gambar/cat-dasar.jpg'
            },
            {
                id: 4,
                nama: 'Cat Kayu dan Besi Merah 1L',
                harga: 45000,
                stok: 40,
                deskripsi: 'Cat serbaguna untuk melapisi permukaan kayu dan besi.',
                gambar: 'https://example.com/gambar/cat-merah.jpg'
            },
            {
                id: 5,
                nama: 'Thinner A Special 1L',
                harga: 25000,
                stok: 60,
                deskripsi: 'Thinner khusus untuk melarutkan cat minyak dan pembersih alat.',
                gambar: 'https://example.com/gambar/thinner.jpg'
            }
        ],
        newProduct: {
            id: null,
            nama: '',
            harga: 0,
            stok: 0,
            deskripsi: '',
            gambar: ''
        },
        editedProduct: {
            id: null,
            nama: '',
            harga: 0,
            stok: 0,
            deskripsi: '',
            gambar: ''
        },
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        deleteIndex: null,
        showAlert: false,
        alertMessage: '',
        alertType: '',
        alertIcon: '',

        // Methods
        openAddModal() {
            this.resetNewProduct();
            this.showAddModal = true;
        },
        
        closeAddModal() {
            this.showAddModal = false;
        },
        
        openEditModal(index) {
            this.editedProduct = {...this.products[index]};
            this.deleteIndex = index;
            this.showEditModal = true;
        },
        
        closeEditModal() {
            this.showEditModal = false;
        },
        
        confirmDelete(index) {
            this.deleteIndex = index;
            this.showDeleteModal = true;
        },
        
        closeDeleteModal() {
            this.showDeleteModal = false;
        },
        
        addProduct() {
            // Generate new ID
            const newId = this.products.length > 0 
                ? Math.max(...this.products.map(p => p.id)) + 1 
                : 1;
            
            this.newProduct.id = newId;
            
            // Add to products array
            this.products.unshift({...this.newProduct});
            
            // Close modal and show success message
            this.closeAddModal();
            this.showAlertMessage('Produk berhasil ditambahkan', 'success');
            
            // Reset form
            this.resetNewProduct();
        },
        
        updateProduct() {
            if (this.deleteIndex !== null) {
                // Update the product
                this.products[this.deleteIndex] = {...this.editedProduct};
                
                // Close modal and show success message
                this.closeEditModal();
                this.showAlertMessage('Produk berhasil diperbarui', 'success');
            }
        },
        
        deleteProduct() {
            if (this.deleteIndex !== null) {
                // Remove the product
                this.products.splice(this.deleteIndex, 1);
                
                // Close modal and show success message
                this.closeDeleteModal();
                this.showAlertMessage('Produk berhasil dihapus', 'success');
            }
        },
        
        resetNewProduct() {
            this.newProduct = {
                id: null,
                nama: '',
                harga: 0,
                stok: 0,
                deskripsi: '',
                gambar: ''
            };
        },
        
        handleImageUpload(event, target) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (target === 'newProduct') {
                        this.newProduct.gambar = e.target.result;
                    } else {
                        this.editedProduct.gambar = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        },
        
        showAlertMessage(message, type) {
            this.alertMessage = message;
            this.alertType = `alert-${type}`;
            this.alertIcon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
            this.showAlert = true;
            
            // Hide alert after 5 seconds
            setTimeout(() => {
                this.showAlert = false;
            }, 5000);
        },
        
        formatCurrency(amount) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(amount);
        }
    }
}