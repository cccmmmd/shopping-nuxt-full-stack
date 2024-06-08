FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npx prisma generate && npm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]