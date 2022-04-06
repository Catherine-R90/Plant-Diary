<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plant;
use Goutte\Client;
use Symfony\Component\HttpClient\HttpClient;

class ScraperController extends Controller
{
    public function houseplantExpertScraper() {
        $client = new Client;

        // SITE TO CRAWL
        $crawler = $client->request('GET', 'https://www.guide-to-houseplants.com/house-plants-encyclopedia-a-z.html');

        // GET PLANT NAME
        $plantLinks = $crawler->filter('.Liner > a')->each(function ($node){
            return $node->text();
        });

        $deadPlant = array_shift($plantLinks);

        // SELECT PLANT LINK AND GET URI
        foreach($plantLinks as $plantLink) {
            $link = $crawler->selectLink($plantLink)->link();
            $uris[] = $link->getUri();
        }

        // $deadUri = array_shift($uris);

        foreach($uris as $uri) {
            // CRAWL EACH PLANT PAGE
            $crawler = $client->request('GET', $uri);

            // GET NAME AND VALUES
            $titles = $crawler->filter('.Liner > h1')->each(function ($node){
                return $node->text();
            });
            $results = $crawler->filter('.Liner > p ')->each(function ($node){
                return $node->text();
            });
            $repottingResult =$crawler->filter('.Liner > p > span')->each(function ($node){
                return $node->text();
            });
            
            foreach($plantLinks as $plantLink) {
                foreach($titles as $title) {
                    if(str_contains($title, $plantLink)) {
                        $name = $plantLink;
                    } else {
                        $removeUri = str_replace('https://www.guide-to-houseplants.com/', "", $uri);
                        $removeHtml = str_replace('.html', "", $removeUri);
                        $cleanName = str_replace("-", " ", $removeHtml);

                        if(stripos($plantLink, $cleanName) !== false) {
                            $name = $plantLink;
                        }
                    }
                }
            }

            // ITERATE THROUGH RESULTS FOR VALUES
            foreach($results as $result) {
                if(strstr($result, 'Light:') != null) {
                    $light = strstr($result, 'Light:');
                }
                if(strstr($result, 'Water:') != null) {
                    $watering = strstr($result, 'Water:');
                }
                if(strstr($result, 'Fertilizer:') != null) {
                    $fertilizer = strstr($result, 'Fertilizer:');
                }
                if(strstr($result, 'Humidity:') != null) {
                    $humidity = strstr($result, 'Humidity:');        
                }
                if(strstr($result, 'Temperature:') != null) {
                    $temperature = strstr($result, 'Temperature:');
                }
            }

            foreach($repottingResult as $rResult) {
                if(strstr($rResult, 'Repot') != null) {
                    $repotting = strstr($rResult, 'Repot');
                }
            }

            // FIND ARRAY INDEX OF VALUE
            $lightKey = array_search($light, $results);
            $waterKey = array_search($watering, $results);
            $fertKey = array_search($fertilizer, $results);
            $humidityKey = array_search($humidity, $results);
            $repotKey = array_search($repotting, $results);
            $tempKey = array_search($temperature, $results);

            // REMOVE VALUE NAME FROM STRING
            $light = str_replace("Light:", "", $results[$lightKey]);
            $water = str_replace("Water:", "", $results[$waterKey]);
            $fertilizer = str_replace("Fertilizer:", "", $results[$fertKey]);
            $humidity = str_replace("Humidity:", "", $results[$humidityKey]);
            $temperature = str_replace("Temperature:", "", $results[$tempKey]);

            // ASSIGN VALUES
            // CREATE NEW PLANT AND ASSIGN NAME AND URI
            $plant = [
                'name' => $name,
                'link' => $uri,
                'light' => $light,
                'watering' => $water,
                'fertilizer' => $fertilizer,
                'humidity' => $humidity,
                'repotting' => $repotting,
                'temperature' => $temperature
            ];

            // SAVE PLANT
            $existingPlant = Plant::where('name', $plant['name'])->first();
            if($existingPlant) {
                $existingPlant->update($plant);
            } else {
                Plant::create($plant);
            }
        }

        return redirect()->to('/');
    }
}
