import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleInfo, faBook, faTrashCan, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export default function Plant(props) {
    const [viewInfo, setViewInfo] = useState(false);
    const [viewDetail, setViewDetail] = useState(false);
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

    const calendarList = props.calendarDates.map(cal=>{
        const li = [];
        if(cal.plant_id === props.id){
            if(cal.watered) {
                li.push(<li>Last Watered: {moment(cal.watered).format('DD-MM-YYYY')}</li>);
            }
            if(cal.fertilized) {
                li.push(<li>Last Fertilized: {moment(cal.fertilized).format('DD-MM-YYYY')}</li>);
            }
            if(cal.repotted) {
                li.push(<li>Last Repotted: {moment(cal.repotted).format('DD-MM-YYYY')}</li>);
            }
        }
        return li;
    })

    return (
        <div className="plant">
            {
                viewDetail ?
                <div className="plant-detail">
                    <button className="close" id="plant-detail-close" onClick={() => {
                        if(viewInfo) {
                            setViewInfo(false);
                        }
                        else if(viewCareDiary) {
                            setViewCareDiary(false);
                        }
                        else if(viewDetail) {
                            setViewDetail(false);
                        } 
                        
                    }}>
                        <FontAwesomeIcon className="close-icon" icon={faCircleXmark}/>
                    </button>
                    <h1>{props.name}</h1>
             
                    {
                        viewInfo ?
                        
                        <div className="plant-info">
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

                            <ul className="cal-list">
                                {
                                    calendarList.map(li=>{
                                        if(li != null) {
                                            return li;
                                        } else {
                                            return null;
                                        }
                                    })
                                }
                            </ul>

                            <form onSubmit={(e) => handleFormSubmit(e, props.id, props.name)}>
                                <div className="label-group">
                                    <label htmlFor="watered">Update Watered</label>
                                    <input type="date" name="watered" onChange={handleWaterChange} />
                                </div>

                                <div className="label-group">
                                    <label htmlFor="fertilized">Update Fertilized</label>
                                    <input type="date" name="fertilized" onChange={handleFertChange} />
                                </div>

                                <div className="label-group">
                                    <label htmlFor="repotted">Update Repotted</label>
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
                    <button onClick={() => setViewDetail(true)}><h2>{props.name}</h2></button>
                </div>
                
            }
        </div>
    );
}