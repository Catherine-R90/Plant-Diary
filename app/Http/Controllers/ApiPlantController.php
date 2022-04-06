<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plant;
use App\Models\OwnedPlant;
use App\Models\Calendar;
use Goutte\Client;

class ApiPlantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function fetchAll()
    {
        $plants = Plant::all();
        
        $collection = [];
        foreach($plants as $plant) {
            $collection[] = $plant->jsonSerialize();
        }

        return json_encode($collection);
    }

    public function fetchOwnedPlants() {
        $plants = OwnedPlant::all();
        $allPlants = Plant::all();
        $collection = [];
        foreach($plants as $plant) {
            foreach($allPlants as $aPlants) {
                if($plant->plant_id === $aPlants->id) {
                    $collection[] = $aPlants->jsonSerialize();
                }
            }
        }

        return json_encode($collection);
    }

    public function fetchCalendar() {
        $calendar = Calendar::all();
        $collection = [];
        foreach($calendar as $cal) {
            $collection[] = $cal->jsonSerializeCalendar();
        }
        return json_encode($collection);
    }

    public function ownPlant($id) {
        $plant = Plant::find($id);
        $ownedPlant = new OwnedPlant;
        $ownedPlant->plant_id = $plant->id;
        $ownedPlant->save();
    }

    public function disownPlant($id) {
        $plant = OwnedPlant::where('plant_id', $id);
        $plant->delete();
    }

    public function careDiary(Request $request) {
        $calendar = new Calendar;
        $calendar->plant_id = $request->id;
        if($request->watered != null) {
            $calendar->watered = $request->watered; 
        }
        if($request->fertilized != null) {
            $calendar->fertilized = $request->fertilized;
        }
        if($request->repotted != null) {
            $calendar->repotted = $request->repotted;
        }
        $calendar->save();
    }
}
