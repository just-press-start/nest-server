# Base image
FROM node:12.20.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .
ENV NODE_ENV=dev
# Install app dependencies
RUN yarn install

# Creates a "dist" folder with the production build
RUN yarn run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
