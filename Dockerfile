FROM node:20-alpine

WORKDIR /app

# Copiar archivos de configuración
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Instalar dependencias
RUN cd frontend && npm install
RUN cd backend && npm install

# Copiar código fuente
COPY frontend ./frontend
COPY backend ./backend

# Construir frontend
RUN cd frontend && npm run build

# Exponer puerto
EXPOSE 5000

# Iniciar
CMD ["sh", "-c", "cd backend && node server.js"]
