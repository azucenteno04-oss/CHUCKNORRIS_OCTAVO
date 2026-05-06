import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
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
          <p className="text-gray-600 mt-2">Inicia sesión para continuar</p>
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
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
          
          <div className="mb-6">
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
          
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200 font-semibold"
          >
            Ingresar
          </button>
        </form>
        
        <p className="text-center text-gray-600 mt-4">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-yellow-600 hover:underline font-semibold">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
