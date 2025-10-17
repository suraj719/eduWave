# Frontend Dockerfile
FROM node:18-alpine as build

# Accept build arguments
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_CHAT_API_KEY

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps to resolve conflicts
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Set environment variables for build
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV REACT_APP_CHAT_API_KEY=$REACT_APP_CHAT_API_KEY

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
