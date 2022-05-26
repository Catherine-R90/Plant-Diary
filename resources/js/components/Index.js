import React, {useState, useEffect} from "react";
import Plant from "./Plant";
import Calendar from "./Calendar/Calendar";
import PlantIndex from "./PlantIndex";
import logo from "../images/logo.png";
import { nanoid } from "nanoid";
import { globalAPI } from "../api.js";

export default function Index() {
    const [ownedPlants, setOwnedPlants] = useState();
    const [fetchedOwnedPlants, setFetchedOwnedPlants] = useState(false);
    const [viewPlantIndex, setViewPlantIndex] = useState(false);
    const [viewCalendar, setViewCalendar] = useState(false);
    const [viewDetail, setViewDetail] = useState(false);
    const [viewForm, setViewForm] = useState(false);
    const [mQuery, setMQuery] = useState({matches: window.innerWidth > 1023 ? true : false});

    const csrf = document.getElementById('csrf').getAttribute('content');

    function assignOwnedPlants(data) {
        setOwnedPlants(data);
        assignOwnedPlantsList(data);
    }

    function assignOwnedPlantsList(data) {
        const ownedPlantList = data.map(plant=>{
            return (
                <Plant 
                    id={plant.id}
                    name={plant.name}
                    watering={plant.watering}
                    fertilizer={plant.fertilizer}
                    light={plant.light}
                    humidity={plant.humidity}
                    temperature={plant.temperature}
                    repotting={plant.repotting}
                    owned={true}
                    key={"plant-"+nanoid()}
                    csrf={csrf}
                    fetchOwnedPlants={fetchOwnedPlants}
                    assignOwnedPlants={assignOwnedPlants}
                    careDiary={careDiary}
                    setViewPlantIndex={setViewPlantIndex}
                    ownPlant={ownPlant}
                    disownPlant={disownPlant}
                    viewDetail={viewDetail}
                    setViewDetail={setViewDetail}
                />
            );
        });
        return ownedPlantList;
    }
    
    function fetchOwnedPlants() {
        setFetchedOwnedPlants(true);
        globalAPI('GET', 'plant/owned', 
        null,
        (result, request) => {
            assignOwnedPlants(result);
        },
        (request) => {
            console.error("Request failed.")
        });
    }    

    function careDiary(data) {
        globalAPI("POST", "plant/diary", data);
    }

    function ownPlant(id, name) {
        globalAPI('POST', 'plant/own/'+id);
        alert(name + " added to owned plants.");
        setViewForm(false);
        setViewDetail(false);
        const updatedOwned = fetchOwnedPlants();
        assignOwnedPlantList(updatedOwned);
    }

    function disownPlant(id, name) {
        globalAPI('POST', 'plant/disown/'+id);
        alert(name + " removed from owned plants.")
        setViewDetail(false);
        const updatedOwned = fetchOwnedPlants();
        assignOwnedPlants(updatedOwned);
    }

    useEffect(() => {
        let mediaQuery = window.matchMedia("(min-width: 1024)");
        mediaQuery.addEventListener("change", setMQuery);
        return () => mediaQuery.removeEventListener("change", setMQuery);
    }, []);

    return (
        <div className="app">
            <nav>
                <div id="logo">
                    <img src={logo}></img>
                </div>
            </nav>
            
            {
                fetchedOwnedPlants ? null :
                fetchOwnedPlants()
            }

            {
                ownedPlants ?
                <div className="inner-app">
                    {
                        mQuery && !mQuery.matches ? 
                        <div className="inner-app">
                            {
                                viewPlantIndex ?
                                    <PlantIndex 
                                        ownedPlants={ownedPlants}
                                        fetchOwnedPlants={fetchOwnedPlants}
                                        assignOwnedPlants={assignOwnedPlants}
                                        assignOwnedPlantsList={assignOwnedPlantsList}
                                        setViewPlantIndex={setViewPlantIndex}
                                        ownPlant={ownPlant}
                                        disownPlant={disownPlant}
                                        viewForm={viewForm}
                                        setViewForm={setViewForm}
                                    /> :
                                null
                            }
                            {
                                viewCalendar ? 
                                <div className="calendar-container">
                                    {
                                        ownedPlants ?
                                        <Calendar 
                                            ownedPlants={ownedPlants}
                                            careDiary={careDiary}
                                            setViewCalendar={setViewCalendar}
                                            csrf={csrf}
                                        /> :
                                        null
                                    }
                                </div> :
                                null
                            }
                            {
                                viewPlantIndex || viewCalendar ?
                                null :
                                <div className="index-btn-group">
                                    <button className="index-button" onClick={(()=>setViewPlantIndex(true))}>View Owned Plants</button>
                                    <button className="index-button"  onClick={() => setViewCalendar(true)}>View Calendar</button>
                                </div>
                            }
                        </div> :
                        <div className="inner-app">
                            <PlantIndex 
                                ownedPlants={ownedPlants}
                                fetchOwnedPlants={fetchOwnedPlants}
                                assignOwnedPlants={assignOwnedPlants}
                                assignOwnedPlantsList={assignOwnedPlantsList}
                                setViewPlantIndex={setViewPlantIndex}
                                ownPlant={ownPlant}
                                disownPlant={disownPlant}
                                viewForm={viewForm}
                                setViewForm={setViewForm}
                            />
                            <Calendar 
                                ownedPlants={ownedPlants}
                                careDiary={careDiary}
                                setViewCalendar={setViewCalendar}
                                csrf={csrf}
                            />
                        </div>
                    }
                </div> : null
            }
        </div>  
    );
}