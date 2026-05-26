const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://chuck:chuck123@cluster0.idyhflx.mongodb.net/chuck_norris';

console.log('🔄 Conectando a MongoDB...');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conexión exitosa a MongoDB');
    console.log('📀 Base de datos:', mongoose.connection.name);
    console.log('📊 Estado de conexión:', mongoose.connection.readyState);
    
    // Crear un usuario de prueba
    const testSchema = new mongoose.Schema({
      name: String,
      email: String,
      test: Boolean
    });
    const Test = mongoose.model('Test', testSchema);
    
    const testUser = new Test({ name: 'Prueba', email: 'test@prueba.com', test: true });
    
    return testUser.save();
  })
  .then(() => {
    console.log('✅ Usuario de prueba guardado correctamente');
    console.log('🎉 TODO FUNCIONA CORRECTAMENTE');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ ERROR:', err.message);
    console.error('Detalles:', err);
    process.exit(1);
  });
