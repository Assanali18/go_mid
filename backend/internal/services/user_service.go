package services

import (
	"backend/internal/database"
	"backend/internal/models"
	"errors"
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
	"time"
)

func RegisterUser(user *models.User) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	result := database.DB.Create(user)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func LoginUser(email string, password string) (string, error) {
	var user models.User
	result := database.DB.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return "", errors.New("пользователь не найден")
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return "", errors.New("неверный пароль")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
