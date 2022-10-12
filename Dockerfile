FROM node:16-slim AS deps
WORKDIR /usr/src/iforal
COPY package.json ./
RUN npm install

FROM node:16-slim AS builder
RUN apt-get update
RUN apt-get install -y openssl
WORKDIR /usr/src/iforal
COPY . .
COPY --from=deps /usr/src/iforal/node_modules ./node_modules
RUN npm run prisma:generate
RUN npm run prisma:inline
RUN npm run build

FROM node:16-slim AS runner
RUN apt-get update
RUN apt-get install -y openssl
WORKDIR /usr/src/iforal
ENV NODE_ENV production
RUN mkdir /usr/src/iforal/storage
RUN chmod -R 777 /usr/src/iforal/storage
COPY --from=builder /usr/src/iforal/build ./build
COPY --from=builder /usr/src/iforal/node_modules ./node_modules
COPY --from=builder /usr/src/iforal/package.json ./package.json
EXPOSE 3000
CMD ["node", "./build"]