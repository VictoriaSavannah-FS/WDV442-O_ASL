# from Node.js image githubRepo notes (most stable LTS vesion so far)
FROM node:22.11.0

#sets the WORKDIR inside CONTAINER-->
WORKDIR /usr/src/app

#copies --> files and dependnecies
COPY package.json .
RUN npm install

#Sequelize CLI --> installing here so no more intalls depedn later
RUN npm install -g sequelize-cli

#copies all other files--> into CONTAINER
COPY . .

# PoRt on Server
EXPOSE 3000

# Start--> application
CMD ["npm", "start"]

