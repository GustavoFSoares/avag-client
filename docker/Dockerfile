# base image
FROM node:14.19-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

RUN npm install -s
RUN npm install -s @vue/cli@3.7.0 -g

# start app
CMD ["npm", "run", "dev"]
