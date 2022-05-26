import { useState } from "react";
import { globalAPI } from "../api";
import { nanoid } from "nanoid";
import Plant from "./Plant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faLeaf } from "@fortawesome/free-solid-svg-icons";

export default function Form(props) {
    const [query, setQuery] = useState('');
    const [plants, setPlants] = useState();
    const [fetchedPlants, setFetchedPlants] = useState(false);

    // FETCH PLANTS
    function assignPlants(data) {
        setPlants(data);
        assignPlantList(data);
    }

    function assignPlantList(data) {
        const plantList = data.map(plant => {
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
                    key={"plant-"+nanoid()}
                    csrf={props.csrf}
                />
            );
        });
        return plantList;
    }

    function fetchPlants() {
        setFetchedPlants(true);
        globalAPI('GET', 'plant', 
        null,
        (data) => {
            assignPlants(data)
        },
        () => {
            console.error("Request failed.")
        });
    }

    // SEARCH
    function handleQuery(e) {
        setQuery(e.target.value);
    }

    function handleSubmit(event, id, name) {
        event.preventDefault();
        if(confirm (`Add ${name} to owned plants?`)) {
            props.ownPlant(id, name);
        } else {
            alert("Cancelled adding " + name + ".");
        }
    }

    let filteredResults;

    if(plants) {
        filteredResults = plants.filter(plant => {
            if(plant.name.toLowerCase().includes(query.toLowerCase())) {
                return plant;
            }
        })
        .map(plant => {
            return (
                <div key={plant.id} className="query-result">
                    <button onClick={(e) => handleSubmit(e, plant.id, plant.name)}>{plant.name}</button>
                    <FontAwesomeIcon icon={faLeaf} className="leaf-icon" />
                </div>
            );
        });
    }

    return (
        <div className="form">
            {
                fetchedPlants ? null:
                fetchPlants()
            }

            <button className="close" onClick={() => props.setViewForm(false)}>
                <FontAwesomeIcon className="close-icon" id="form-close" icon={faCircleXmark} />
            </button>

            <h1>Add New Plant</h1>
            
            <form >

                <div className="search-cancel">
                    <input 
                        type="text" 
                        onChange={handleQuery} 
                        value={query}
                        placeholder="Search Plants"
                    />
                </div>

                <div className="results">
                    {filteredResults}
                </div>

            </form>
        </div>
    );
}