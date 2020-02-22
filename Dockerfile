# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g yarn
RUN yarn global add create-react-app

# install and cache app dependencies
COPY package.json /app/package.json
RUN yarn install

# start app
CMD ["yarn", "start"]
