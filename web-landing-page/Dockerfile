# Use a supported Node.js version (20.x or above)
FROM node:20-slim


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
