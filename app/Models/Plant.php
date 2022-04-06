<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'watering',
        'fertilizer',
        'light',
        'humidity',
        'temperature',
        'repotting',
        'link'
    ];

    public function ownedPlants() {
        return $this->belongsToMany('App\Models\OwnedPlant')->withPivot(
            'name', 
            'watering',
            'fertilizer', 
            'light',
            'humidity',
            'temperature',
            'repotting',
        );
    }

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'watering' => $this->watering,
            'fertilizer' => $this->fertilizer,
            'light' => $this->light,
            'humidity' => $this->humidity,
            'temperature' => $this->temperature,
            'repotting' => $this->repotting,
        ];
    }
}
