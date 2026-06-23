const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const productoRoutes = require('./routes/productoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes'); // 1. Importar rutas de usuarios
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta informativa
app.get('/', (req, res) => {
    res.json({ message: "Bienvenido a la API de Gestión Operativa Agua de Vida" });
});

// Enlazar rutas a la aplicación
app.use('/api/productos', productoRoutes);
app.use('/api/usuarios', usuarioRoutes); // 2. Activar las rutas de usuarios

// Probar conexión a la base de datos de XAMPP antes de arrancar
db.query('SELECT 1')
    .then(() => {
        console.log('✅ Conexión exitosa a MySQL en XAMPP (aguadevida_db).');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Error crítico al conectar a MySQL en XAMPP:', err.message);
    });