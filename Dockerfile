# pull official base image
FROM node:13.12.0-alpine

# set working directory

WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --silent
# RUN npm install react-scripts@1.1.1 -g --silent # Uncomment to silent logs
RUN npm install react-scripts@1.1.1 -g 

# start app
CMD ["npm", "start"]