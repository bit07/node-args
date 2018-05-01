FROM mhart/alpine-node

ENV CONFIG .

WORKDIR /src
ADD log log/

COPY package.json .
RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "start", "-p 3001"]