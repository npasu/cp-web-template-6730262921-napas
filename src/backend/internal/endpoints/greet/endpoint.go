package greet

import (
	"github.com/gofiber/fiber/v3"

	"cp-web-template-backend/internal/service"
)

type Router struct {
	Service service.GreetService
}

func NewRouter(service service.GreetService) Router {
	return Router{Service: service}
}

func (r Router) Greet(c fiber.Ctx) error {
	return c.SendString(r.Service.Greet(c.Query("name")))
}
