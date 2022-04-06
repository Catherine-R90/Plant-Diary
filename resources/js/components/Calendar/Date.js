import moment from "moment";
import { nanoid } from "nanoid";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

export default function Date (props) {
    const plants = props.plants;

    const [dateView, setDateView] = useState(false);
    
    const [wateredPlants, setWateredPlants] = useState(plants.map(plant=>{
        return {
            name: plant.name,
            id: plant.id,
            selected: false,
        }
    }));
    
    const [fertilizedPlants, setFertilizedPlants] = useState(plants.map(plant=>{
        return {
            name: plant.name,
            id: plant.id,
            selected: false,
        }
    }));

    const [repottedPlants, setRepottedPlants] = useState(plants.map(plant=>{
        return {
            name: plant.name,
            id: plant.id,
            selected: false,
        }
    }));

    const fullDate = moment().format('DD.MM.YYYY');

    const waterOptions = wateredPlants.map(plant => {
        return (
            <div  className="label-group">
                <label htmlFor="watered">{plant.name}</label>
                <input 
                    type="checkbox" 
                    name="watered"
                    id={plant.id}
                    key={`watered-${nanoid()}`} 
                    value={plant.id} 
                    checked={plant.selected}
                    onChange={() => handleWaterChange(plant.id)}
                />
            </div>
        )
    });

    function handleWaterChange(id) {
        const watered = wateredPlants.map(plant => {
            if(id === plant.id) {
                return {...plant, selected: !plant.selected};
            }
            return plant;
        });
        setWateredPlants(watered);
    }

    const fertOptions = fertilizedPlants.map(plant => {
        return (
            <div  className="label-group">
                <label htmlFor={plant.name}>{plant.name}</label>
                <input 
                    type="checkbox" 
                    name="fertilized" 
                    key={`fert-${nanoid()}`} 
                    value={plant.id} 
                    checked={plant.selected}
                    onChange={() => handleFertChange(plant.id)}
                />
            </div>
        )
    });

    function handleFertChange(id) {
        const fert = fertilizedPlants.map(plant=>{
            if(id === plant.id){
                return {...plant, selected: !plant.selected};
            }
            return plant;
        });
        setFertilizedPlants(fert);
    }

    const repotOptions = repottedPlants.map(plant => {
        return (
            <div className="label-group">
                <label htmlFor={plant.name}>{plant.name}</label>
                <input 
                    type="checkbox" 
                    name="repotted"
                    key={`repot-${nanoid()}`} 
                    value={plant.id} 
                    checked={plant.selected}
                    onChange={() => handleRepotChange(plant.id)}
                />
            </div>
        )
    });

    function handleRepotChange(id) {
        const repot = repottedPlants.map(plant=>{
            if(id===plant.id){
                return {...plant, selected: !plant.selected};
            }
            return plant;
        })
        setRepottedPlants(repot);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let data = new FormData;
        wateredPlants.map(water=>{
           if(water.selected) {
                data.append('id', water.id);
                data.append('watered', props.date);
           }
        });
        fertilizedPlants.map(fert=>{
            if (fert.selected) {
                data.append('id', fert.id);
                data.append('fertilized', props.date);
            }
        });
        repottedPlants.map(repot=>{
            if(repot.selected) {
                data.append('id', repot.id);
                data.append('repotted', props.date);
            }
        });
        props.careDiary(data);
        alert("Care diary updated for "+props.date);
        setDateView(false);
    }

    return (
        <div className="date">
            {
                dateView ?
                    <div className="diary-date">
                        <form onSubmit={handleSubmit} >
                            <button className="close" id="diary-close" onClick={() => setDateView(false)}>
                                <FontAwesomeIcon className="close-icon" icon={faCircleXmark} />
                            </button>

                            <h1>Care diary for {fullDate}</h1>

                            <div className="date-options">
                                <label className="option-label" htmlFor="watered">Watered</label>
                                {waterOptions}

                                <label className="option-label" htmlFor="fertilized">Fertilized</label>
                                {fertOptions}

                                <label className="option-label" htmlFor="repotting">Repotted</label>
                                {repotOptions}
                                
                                <button type="submit" className="confirm">
                                    <FontAwesomeIcon className="confirm-icon" icon={faSquareCheck} />
                                </button>
                                
                            </div>

                        </form>
                    </div>
                :
                    <button
                        className="date-btn"
                        id={props.id} 
                        value={props.value}
                        key={`date-btn-${nanoid()}`}
                        onClick={() => setDateView(true)}
                    >
                        {props.value}
                    </button>
            }
        </div>
    );
}