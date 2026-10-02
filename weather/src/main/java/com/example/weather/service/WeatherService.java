package com.example.weather.service;

import com.example.weather.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class WeatherService {

    private final RestClient geocodingClient;
    private final RestClient weatherClient;

    public WeatherService() {

        this.geocodingClient = RestClient.builder()
                .baseUrl("https://geocoding-api.open-meteo.com/v1")
                .build();

        this.weatherClient = RestClient.builder()
                .baseUrl("https://api.open-meteo.com/v1")
                .build();
    }

    public WeatherResponse getWeatherByCity(String city) {

        GeocodingResponse geocodingResponse =
                geocodingClient.get()
                        .uri(
                                "/search?name={city}&language=fr&format=json",
                                city
                        )
                        .retrieve()
                        .body(GeocodingResponse.class);

        if (geocodingResponse == null
                || geocodingResponse.results() == null
                || geocodingResponse.results().isEmpty()) {
            throw new RuntimeException("Ville introuvable");
        }

        GeocodingResult location =
                geocodingResponse.results().getFirst();

        ForecastResponse forecast =
                weatherClient.get()
                        .uri(
                                "/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,wind_speed_10m&timeformat=unixtime",
                                location.latitude(),
                                location.longitude()
                        )
                        .retrieve()
                        .body(ForecastResponse.class);

        return new WeatherResponse(
                location.name(),
                forecast.current().temperature_2m(),
                forecast.current().wind_speed_10m(),
                forecast.current().time(),
                forecast.latitude(),
                forecast.longitude()
        );
    }
}