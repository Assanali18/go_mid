FROM golang:1.23 AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o out ./cmd

FROM ubuntu:latest

WORKDIR /app

COPY --from=builder /app/out .
COPY --from=builder /app/.env .


CMD ["/app/out"]
