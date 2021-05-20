FROM node:14.17.0-alpine as builder

LABEL version="1.0.0"
LABEL description="This is the client doker image for toolbox technical test for the full stack developer(NODE,- REACT) position "
LABEL maintainer=["yilmer0001@hotmail.com"]

WORKDIR /client

COPY package.json /client/package.json

RUN npm install

COPY . /client

RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=builder /client/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
