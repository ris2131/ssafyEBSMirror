FROM node:alpine
WORKDIR "/usr/src/app"
COPY package.json ./
RUN npm install
RUN npm i -S serve
RUN npm run-script build
ENTRYPOINT [ "./node_modules/.bin/serve", "-s", "build" ]