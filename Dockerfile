FROM node:20-alpine

WORKDIR /app

# Copiar archivos de configuración
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Instalar dependencias
RUN npm install --prefix frontend
RUN npm install --prefix backend

# Copiar TODO el código fuente
COPY frontend ./frontend
COPY backend ./backend

# Reconstruir frontend (con la URL correcta)
RUN npm run build --prefix frontend

# Exponer puerto
EXPOSE 5000

# Iniciar backend
CMD node backend/server.js
