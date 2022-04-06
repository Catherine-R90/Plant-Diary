<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $table = 'calendar';

    protected $fillable = [
        'plant_id',
        'watered',
        'fertilized',
        'repotted'
    ];

    public function Plant() {
        return $this->hasMany(Plant::class, 'plant_id', 'id');
    }

    public function jsonSerializeCalendar() {
        return [
            'id' => $this->id,
            'plant_id' => $this->plant_id,
            'watered' => $this->watered,
            'fertilized' => $this->fertilized,
            'repotted' => $this->repotted,
        ];
    }
}
