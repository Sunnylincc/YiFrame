FROM node:20-bullseye
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx playwright install chromium --with-deps
RUN npm run build
EXPOSE 3030
CMD ["node","dist/cli/index.js","studio"]
