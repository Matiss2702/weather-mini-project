package com.example.weather.controller;

import com.example.weather.dto.WeatherResponse;
import com.example.weather.service.WeatherService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weathers")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/{city}")
    public WeatherResponse getWeatherByCity(
            @PathVariable String city
    ) {
        return weatherService.getWeatherByCity(city);
    }
}