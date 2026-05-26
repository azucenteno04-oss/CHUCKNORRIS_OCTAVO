const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/test', (req, res) => {
  console.log('Body:', req.body);
  res.json({ ok: true, received: req.body });
});

app.listen(5001, () => {
  console.log('🚀 Servidor de prueba en http://localhost:5001');
});
