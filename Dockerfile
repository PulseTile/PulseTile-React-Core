# Use base Docker image from official Node.js repos
# 'carbon' tracks current Long Term Support version of Node
FROM node:carbon

WORKDIR /pulsetile

# install dependencies
RUN npm install

# Expose port 3000 for node server
EXPOSE 3000

CMD npm start
