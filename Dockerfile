# Use official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install deps
RUN npm install

# Build project
RUN npm run build

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "start"]
