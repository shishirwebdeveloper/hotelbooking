# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

# Copy backend and frontend code
COPY backend ./backend
COPY frontend ./frontend

# Expose ports for both services
EXPOSE 3000
EXPOSE 4000

# Build and run app
WORKDIR /app/backend
CMD ["npm", "run", "dev"]
