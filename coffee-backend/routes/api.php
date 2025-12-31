<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FeedbackController;

// Стандартний маршрут Laravel (можна залишити)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Твій маршрут для форми
Route::post('/feedback', [FeedbackController::class, 'store']);