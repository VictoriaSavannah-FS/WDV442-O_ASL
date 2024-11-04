FROM rust:1.61.0 AS builder
WORKDIR /usr/src/myapp
COPY . .
RUN cargo install --path .
FROM debian:buster-slim
RUN apt-get update & apt-get install -y extra-runtime-dependencies & rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/hello_world /usr/local/bin/hello_world
CMD ["/usr/local/bin/hello_world"]
