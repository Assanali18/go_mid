package transport

import (
	"backend/internal/middleware"
	"github.com/gorilla/mux"
	"net/http"
)

func SetupRouter() *mux.Router {
	r := mux.NewRouter()

	r.Use(middleware.AuthMiddleware)
	UserRoutes(r)
	TaskRoutes(r)

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Welcome to the Task Management API"))
	})

	return r
}
