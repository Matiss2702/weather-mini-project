package com.example.weather.dto;

import java.util.List;

public record GeocodingResponse (
        List<GeocodingResult> results
){}
