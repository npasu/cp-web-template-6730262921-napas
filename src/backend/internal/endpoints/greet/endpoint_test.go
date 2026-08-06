package greet_test

import (
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"cp-web-template-backend/internal/endpoints/greet"
	"cp-web-template-backend/internal/service"

	"github.com/gofiber/fiber/v3"
	"github.com/stretchr/testify/require"
)

func TestGreetEndpoint(t *testing.T) {
	t.Parallel()

	mockService := &service.MockService{}
	mockService.On("Greet", "").Return(`{"message": "Hello, friend!"}`)
	mockService.On("Greet", "Ann").Return(`{"message": "Hello, Ann!"}`)

	app := fiber.New()
	router := greet.NewRouter(mockService)
	router.Register(app)

	req1 := httptest.NewRequest(http.MethodGet, "/greet", nil)
	resp1, err := app.Test(req1)
	require.NoError(t, err)
	body1, _ := io.ReadAll(resp1.Body)
	resp1.Body.Close()

	require.Equal(t, http.StatusOK, resp1.StatusCode)
	require.Equal(t, `{"message": "Hello, friend!"}`, string(body1))

	req2 := httptest.NewRequest(http.MethodGet, "/greet?name=Ann", nil)
	resp2, err := app.Test(req2)
	require.NoError(t, err)
	body2, _ := io.ReadAll(resp2.Body)
	resp2.Body.Close()

	require.Equal(t, http.StatusOK, resp2.StatusCode)
	require.Equal(t, `{"message": "Hello, Ann!"}`, string(body2))

	mockService.AssertExpectations(t)
}
