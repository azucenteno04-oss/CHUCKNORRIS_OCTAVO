FROM node:20-alpine

WORKDIR /app

# Copiar archivos de configuración
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Instalar dependencias (sin cd)
RUN npm install --prefix frontend
RUN npm install --prefix backend

# Copiar código fuente
COPY frontend ./frontend
COPY backend ./backend

# Construir frontend (sin cd)
RUN npm run build --prefix frontend

# Exponer puerto
EXPOSE 5000

# Iniciar servidor
CMD node backend/server.js
