const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Ruta de registro
app.post('/api/auth/register', (req, res) => {
    console.log('📝 Body recibido:', req.body);
    res.json({ msg: 'Funciona', data: req.body });
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor de prueba en http://localhost:${PORT}`);
});