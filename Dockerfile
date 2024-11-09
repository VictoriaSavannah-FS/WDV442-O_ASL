
FROM node:16

# working directory||inside>> container
WORKDIR /app


COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

#POrt app will run on ??
EXPOSE 8080

# Starts application
CMD ["node", "server.js"]
