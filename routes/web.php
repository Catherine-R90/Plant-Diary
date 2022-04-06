<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlantController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\PlantSchemaController;
use App\Http\Controllers\WebsiteController;
use App\Http\Controllers\ScraperController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ApiPlantController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PlantController::class, 'index']);
Route::get('/dashboard', [PlantController::class, 'index']);

Route::group(['prefix' => 'dashboard'], function() {
    Route::resources([
        'calendar' => CalendarController::class,
        'plants' => PlantController::class,
        ]);
});

Route::delete('/plants/delete/{id}', [PlantController::class, 'plants.destroy']);
Route::post('/plants/delete/all', [PlantController::class, 'deleteAllPlants']);

Route::get('/search', [SearchController::class, 'search']);


// SCRAPER
Route::get('/scrape', [ScraperController::class, 'houseplantExpertScraper']);


Route::get('/api/plant', [ApiPlantController::class, 'fetchAll']);

// Route::get('/api/plant/{id}', [ApiPlantController::class, 'fetchOne']);

Route::get('api/plant/owned', [ApiPlantController::class, 'fetchOwnedPlants']);

Route::get('api/calendar', [ApiPlantController::class, 'fetchCalendar']);

Route::post('/api/plant/own/{id}', [ApiPlantController::class, 'ownPlant']);

Route::post('/api/plant/disown/{id}', [ApiPlantController::class, 'disownPlant']);

Route::post('api/plant/diary', [ApiPlantController::class, 'careDiary']);