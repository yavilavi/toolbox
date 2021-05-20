FROM node:14.17.0-alpine

LABEL version="1.0.0"
LABEL description="This is the backend doker image for toolbox technical test for the full stack developer(NODE,- REACT) position "
LABEL maintainer=["yilmer0001@hotmail.com"]

WORKDIR /api

COPY package.json /api/package.json
RUN npm install
COPY . /api
EXPOSE 3001

CMD ["npm", "start"]
