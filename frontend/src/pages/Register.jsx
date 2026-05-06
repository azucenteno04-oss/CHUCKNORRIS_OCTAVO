import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔫</div>
          <h1 className="text-3xl font-bold text-gray-800">Chuck Norris Jokes</h1>
          <p className="text-gray-600 mt-2">Crea tu cuenta gratis</p>
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Tu nombre"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="tu@email.com"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200 font-semibold"
          >
            Registrarse
          </button>
        </form>
        
        <p className="text-center text-gray-600 mt-4">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-yellow-600 hover:underline font-semibold">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;