package com.example.weather.dto;

public record CurrentWeather(
        long time,
        double temperature_2m,
        double wind_speed_10m
) {
}