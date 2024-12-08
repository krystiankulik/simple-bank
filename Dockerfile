# Use Node.js image for local development
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install all dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Prisma CLI globally (for migrations)
RUN npm install -g prisma

# Expose application port
EXPOSE 3000

# Run Prisma migrations and start the development server
CMD ["sh", "-c", "prisma migrate dev && npm run dev"]