package app

import (
	"backend/internal/transport"
	"log"
	"net/http"
)

func Run() {

	r := transport.SetupRouter()

	log.Fatal(http.ListenAndServe(":8080", r))
}
