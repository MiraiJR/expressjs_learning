# Build stage
FROM node:22.12.0 AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY ./src ./src
COPY ./prisma ./prisma
COPY tsconfig.json ./
COPY nodemon.json ./
COPY .env ./
RUN npm install

# Production stage
FROM node:22.12.0
WORKDIR /app
COPY --from=build /app ./

EXPOSE 3000
CMD ["npm", "run", "start:dev"]