import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Estados para los chistes
  const [randomJoke, setRandomJoke] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryJoke, setCategoryJoke] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const API_BASE = 'https://api.chucknorris.io';

  // Cargar categorías y un chiste aleatorio al iniciar
  useEffect(() => {
    loadCategories();
    getRandomJoke();
  }, []);

  // Obtener categorías
  const loadCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE}/jokes/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      setCategories(['animal', 'career', 'celebrity', 'dev', 'explicit', 'fashion', 'food', 'history', 'money', 'movie', 'music', 'political', 'religion', 'science', 'sport', 'travel']);
    }
  };

  // Obtener chiste aleatorio
  const getRandomJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/jokes/random`);
      setRandomJoke(response.data);
    } catch (error) {
      console.error('Error al obtener chiste aleatorio:', error);
      setRandomJoke({ value: 'Chuck Norris: "Los errores me temen a mí"' });
    }
    setLoading(false);
  };

  // Obtener chiste por categoría
  const getJokeByCategory = async () => {
    if (!selectedCategory) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/jokes/random?category=${selectedCategory}`);
      setCategoryJoke(response.data);
    } catch (error) {
      console.error('Error al obtener chiste por categoría:', error);
      setCategoryJoke({ value: `Chuck Norris no necesita ${selectedCategory}. ${selectedCategory} necesita a Chuck Norris.` });
    }
    setLoading(false);
  };

  // Buscar chistes por texto
  const searchJokes = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/jokes/search?query=${searchQuery}`);
      setSearchResults(response.data.result || []);
      setSearchCount(response.data.total || 0);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      setSearchResults([]);
      setSearchCount(0);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🔫</span>
            <h1 className="text-xl font-bold text-gray-800">Chuck Norris Jokes</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">👤 Hola, {user?.name || 'Usuario'}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Joke Aleatorio */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-yellow-600">🎲 Chiste Aleatorio</h2>
          {randomJoke && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4">
              <p className="text-gray-700">{randomJoke.value}</p>
            </div>
          )}
          <button
            onClick={getRandomJoke}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
          >
            {loading ? 'Cargando...' : '🔄 Nuevo Chiste Aleatorio'}
          </button>
        </div>

        {/* Búsqueda por Categoría */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-green-600">📂 Buscar por Categoría</h2>
          <div className="flex gap-4 mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">-- Selecciona una categoría --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <button
              onClick={getJokeByCategory}
              disabled={!selectedCategory || loading}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:bg-green-300"
            >
              🎯 Obtener Chiste
            </button>
          </div>
          {categoryJoke && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-4">
              <p className="text-gray-700">{categoryJoke.value}</p>
              <p className="text-sm text-gray-500 mt-2">
                Categoría: <span className="font-semibold">{selectedCategory}</span>
              </p>
            </div>
          )}
        </div>

        {/* Búsqueda por Texto */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">🔍 Búsqueda por Texto</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchJokes()}
              placeholder="Escribe una palabra para buscar chistes..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={searchJokes}
              disabled={!searchQuery.trim() || loading}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition disabled:bg-purple-300"
            >
              🔎 Buscar
            </button>
          </div>

          {/* Resultados de búsqueda */}
          {searchCount > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3">
                📋 Resultados encontrados: {searchCount}
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {searchResults.map((joke, index) => (
                  <div key={joke.id || index} className="bg-gray-50 border border-gray-200 p-4 rounded-lg hover:bg-gray-100 transition">
                    <p className="text-gray-700">{joke.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {searchQuery && searchCount === 0 && !loading && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
              <p className="text-red-700">
                ❌ No se encontraron chistes para "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>🍿 API proporcionada por <a href="https://api.chucknorris.io" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">chucknorris.io</a></p>
          <p className="mt-1">Desarrollado con React + Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;