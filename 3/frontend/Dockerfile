FROM node:16-alpine3.11
WORKDIR /frontend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci --production --silent
COPY ["./", "/frontend"]
EXPOSE 3000
CMD ["npm", "start"]