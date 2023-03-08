FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN npm install && mv node_modules ../
COPY . .
EXPOSE 5001
RUN chmod +x /usr/src/app/docker-entrypoint.sh
ENTRYPOINT [ "sh" ]
CMD ["./docker-entrypoint.sh"]