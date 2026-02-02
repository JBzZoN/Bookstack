# 1. Base image (lightweight & stable)
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy dependency files first (layer caching)
COPY package*.json ./

# 4. Install only production dependencies
RUN npm install --only=production

# 5. Copy application source
COPY . .

# 6. Expose application port
EXPOSE 4040

# 7. Start the service
CMD ["node", "server.js"]
