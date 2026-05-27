FROM node:20-alpine

WORKDIR /app

# Force rebuild - 2025-05-27 01:00
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

RUN npm install --prefix frontend
RUN npm install --prefix backend

COPY frontend ./frontend
COPY backend ./backend

RUN npm run build --prefix frontend

EXPOSE 5000

CMD node backend/server.js
