package app

import (
	"gormADV/internal/transport"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func Run() {
	r := mux.NewRouter()

	transport.SetupRouter()

	log.Fatal(http.ListenAndServe(":8080", r))
}
