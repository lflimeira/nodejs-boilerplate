# base
FROM pagarme/docker-nodejs:8.11 as base
WORKDIR /boilerplate
COPY .env.* /boilerplate/
COPY package*.json /boilerplate/
RUN apk --update add --no-cache python make g++

# development
FROM pagarme/docker-nodejs:8.11 as development
WORKDIR /boilerplate
ENV DOTENV_PATH .env.example
COPY --from=base /boilerplate .
RUN npm install
ENV NODE_ENV=development
COPY scripts /boilerplate/scripts
RUN chmod +x /boilerplate/scripts/start_server.sh
COPY src /boilerplate/src
COPY tests /boilerplate/tests
EXPOSE 3000

# production-s
FROM pagarme/docker-nodejs:8.11 as production-s
WORKDIR /boilerplate
COPY scripts /boilerplate/scripts
COPY src /boilerplate/src
ENV NODE_ENV=production
RUN npm install --production
ENTRYPOINT /boilerplate/scripts/start-server.sh