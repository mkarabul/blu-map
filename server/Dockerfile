# Use the official Node.js LTS image as the base image
FROM node:lts-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Use a smaller base image for the production environment
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
# COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm ci --production

# Expose the port that Express.js will run on
EXPOSE 3000

# Set the environment variable for production
ENV NODE_ENV production

# Start the Express.js application
CMD ["node", "src/index.js"]
