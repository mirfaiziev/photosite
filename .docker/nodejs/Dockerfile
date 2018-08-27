FROM node:alpine
EXPOSE 3000
WORKDIR /code

RUN set -ex; npm install yarn; \
    yarn install;

CMD ["yarn", "encore", "dev", "--watch"]
# CMD ["npm", "run", "watch"]