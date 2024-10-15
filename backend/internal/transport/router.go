package transport

import (
	"backend/internal/middleware"
	"github.com/gorilla/mux"
	"log"
)

func SetupRouter() *mux.Router {
	r := mux.NewRouter().StrictSlash(true)
	log.Println("Setting up routes")
	r.Use(middleware.CORSMiddleware)
	r.Use(middleware.AuthMiddleware)

	UserRoutes(r)
	TaskRoutes(r)

	return r
}
