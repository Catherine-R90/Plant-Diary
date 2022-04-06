<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plant;

class SearchController extends Controller
{
    public function index() {
        return view('components.search');
    }

    public function search(Request $request) {
        if($request->ajax()) {
            $output = "";
            $plants = Plant::where('name', 'LIKE', '%'.$request->search."%")->get();
        }

        if($plants) {
            foreach($plants as $key => $plant) {
                $output='<tr>'.
                '<td>'.$plant->name.'</td>'.
                '<input type ="hidden" name="id" value="'.$plant->id.'">'.
                '</tr>';
            }
        }

        return Response($output);
    }
}
