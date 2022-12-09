FROM node:alpine
WORKDIR "/usr/src/app"
COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["node", "--max-old-space-size=12000", "app.js"]
RUN npm run build
CMD ["npx","serve","-s","build"]
