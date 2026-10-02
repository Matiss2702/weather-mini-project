package com.example.weather.dto;

public record WeatherResponse
(
        String city,
        double temperature,
        double windSpeed,
        Long timestamp,
        double latitude,
        double longitude
) {}
