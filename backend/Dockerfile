FROM golang:1.18 AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o out ./cmd/app # или укажите путь к основному файлу вашего проекта

FROM ubuntu:latest

WORKDIR /app

COPY --from=builder /app/out .

CMD ["/app/out"]