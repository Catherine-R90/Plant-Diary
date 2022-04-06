<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OwnedPlant extends Model
{
    protected $fillable = [
        "plant_id"
    ];

    public function plants() {
        return $this->hasMany('App\Models\Plant', 'plant_id')->withPivot(
            'name', 
            'watering', 
            'fertilizer', 
            'light',
            'humidity',
            'temperature',
            'repotting'
        );
    }

    public function jsonSerializeOwned() {
        return [
            'id' => $this->id,
            'plant_id' => $this->plant_id,
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
