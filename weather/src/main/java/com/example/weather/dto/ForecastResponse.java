package com.example.weather.dto;

public record ForecastResponse(
        double latitude,
        double longitude,
        CurrentWeather current
) {
}