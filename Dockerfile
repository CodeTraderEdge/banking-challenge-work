# Use Node.js 22.14 como base
FROM node:22.14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy project files
COPY . .

# Expose API port
EXPOSE 3000

# Command to start the server
CMD ["npm", "run", "start"]
