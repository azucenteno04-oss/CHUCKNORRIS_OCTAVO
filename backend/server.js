const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = 'mongodb+srv://chuck:chuck123@cluster0.idyhflx.mongodb.net/chuck_norris';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error:', err.message));

const User = mongoose.model('User', {
  name: String,
  email: { type: String, unique: true },
  password: String
});

// RUTA DE PRUEBA
app.post('/api/test', (req, res) => {
  console.log('🔥 TEST endpoint llamado');
  console.log('Body:', req.body);
  res.json({ success: true, received: req.body });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.post('/api/auth/register', async (req, res) => {
  console.log('📝 REGISTRO llamado');
  console.log('Body:', req.body);
  
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Faltan campos' });
    }
    
    const user = new User({ name, email, password });
    await user.save();
    
    console.log('✅ Usuario guardado:', email);
    res.json({ token: 'token-123', user: { id: user._id, name, email } });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ msg: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  console.log('🔍 LOGIN llamado');
  console.log('Email:', req.body.email);
  
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }
    
    res.json({ token: 'token-123', user: { id: user._id, name: user.name, email } });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
