# from the Docker- GoLang Website
FROM golang:1.23

WORKDIR /usr/src/app

# decided not to use the go.mody moduels 
#COPY go.mod go.sum ./
#RUN go mod download && go mod verify

COPY . .
RUN go build -v -o /usr/local/bin/app ./index.go

CMD ["/usr/local/bin/app"]

