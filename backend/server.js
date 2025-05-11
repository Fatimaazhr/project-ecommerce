require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const protect = require('./middleware/authMiddleware');  // Mengimpor middleware 'protect'
const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Pasang middleware CORS
app.use(cors()); // Mengizinkan semua origin (untuk dev environment)

// Middleware untuk parsing JSON body di request
app.use(express.json());

// Gunakan rute yang memerlukan autentikasi
app.use('/api', userRoutes);

// Routing Produk
app.use('/api/admin/produk', productRoutes);


// Contoh rute yang dilindungi oleh middleware 'protect'
app.get('/protected', protect, (req, res) => {
    res.json({ message: 'Ini adalah rute yang dilindungi, kamu sudah terautentikasi!', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
