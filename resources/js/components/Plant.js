import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleInfo, faBook, faTrashCan, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

export default function Plant(props) {
    const [viewInfo, setViewInfo] = useState(false);
    const [viewCareDiary, setViewCareDiary] = useState(false);
    const [watered, setWatered] = useState('');
    const [fertilized, setFertilized] = useState('');
    const [repotted, setRepotted] = useState('');

    function handleWaterChange(e) {
        setWatered(e.target.value);
    }

    function handleFertChange(e) {
        setFertilized(e.target.value);
    }

    function handleRepotChange(e) {
        setRepotted(e.target.value);
    }

    function handleFormSubmit(event, id, name) {
        event.preventDefault();
        let data = new FormData();
        data.append('id', id);
        if(watered) {
            data.append('watered', watered);
        }
        if(fertilized) {
            data.append('fertilized', fertilized);
        }
        if(repotted) {
            data.append('repotted', repotted);
        }
        
        props.careDiary(data);
        alert("Care diary updated for "+name+".");
        return setViewCareDiary(false);
    }

    return (
        <div className="plant">
            {
                props.viewDetail ?
                <div className="plant-detail">                 
                    {
                        viewInfo ?
                        
                        <div className="plant-info">
                            <h1>Care information for {props.name}</h1>
                            <button className="close" onClick={() => setViewInfo(false)}>
                                <FontAwesomeIcon className="close-icon" icon={faCircleXmark}/>
                            </button>

                            <ul>
                                <li><span className="plant-title">Watering:</span> {props.watering}</li>
                                <li><span className="plant-title">Fertilizer:</span> {props.fertilizer}</li>
                                <li><span className="plant-title">Light:</span> {props.light}</li>
                                <li><span className="plant-title">Humidity: </span>{props.humidity}</li>
                                <li><span className="plant-title">Temperature: </span>{props.temperaure}</li>
                                <li><span className="plant-title">Repotting: </span>{props.repotting}</li>
                            </ul>
                        </div> :
                        null
                    }

                    {
                        viewCareDiary ?
                        <div className="care-diary">
                            <h1>Care Diary for {props.name}</h1>
                            <button className="close" onClick={() => setViewCareDiary(false)}>
                                <FontAwesomeIcon className="close-icon" icon={faCircleXmark}/>
                            </button>

                            <form onSubmit={(e) => handleFormSubmit(e, props.id, props.name)}>
                                <div className="label-group">
                                    <label htmlFor="watered">Last Watered</label>
                                    <input type="date" name="watered" onChange={handleWaterChange} />
                                </div>

                                <div className="label-group">
                                    <label htmlFor="fertilized">Last Fertilized</label>
                                    <input type="date" name="fertilized" onChange={handleFertChange} />
                                </div>

                                <div className="label-group">
                                    <label htmlFor="repotted">Last Repotted</label>
                                    <input type="date" name="repotted" onChange={handleRepotChange} />
                                </div>

                                <div className="label-group">
                                    <button className="confirm" type="submit">
                                        <FontAwesomeIcon className="confirm-icon" icon={faSquareCheck} />
                                    </button>
                                </div>
                                
                            </form> 
                        </div>
                            :
                        null
                    }
                    {
                        viewInfo || viewCareDiary ?
                        null :
                        <div className="plant-options">
                            <button className="close" onClick={() => props.setViewDetail(false)}>
                            <FontAwesomeIcon className="close-icon" icon={faCircleXmark}/>
                                </button>
                            <div className="text-icon-group">
                                <h1>{props.name}</h1>

                                {/* TO DO: ADD LAST WATERTERED ETC */}
                                {/* <h4>Last watered: {props.watered}</h4> */}
                            </div>
                            <div className="plant-btn-group">
                                <button onClick={() => setViewInfo(true)}>
                                    Plant Info
                                    <FontAwesomeIcon className="plant-icon" icon={faCircleInfo} />
                                </button>
                                <button onClick={() => setViewCareDiary(true)}>
                                    Care Diary
                                    <FontAwesomeIcon className="plant-icon" icon={faBook} />
                                </button>
                            </div>
                            <div className="plant-btn-group">
                                <button onClick={() => props.disownPlant(props.id, props.name)}>
                                    Delete plant
                                    <FontAwesomeIcon className="plant-icon" icon={faTrashCan}/>
                                </button>
                            </div>
                        </div>
                    }                    

                </div> :
                <div className="plant-button">
                    <button onClick={() => props.setViewDetail(true)}><h2>{props.name}</h2></button>
                </div>
                
            }
        </div>
    );
}