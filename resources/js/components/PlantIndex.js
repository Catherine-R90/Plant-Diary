import { globalAPI } from "../api.js";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";

export default function PlantIndex(props) {    
    const [mQuery, setMQuery] = useState({matches: window.innerWidth > 1023 ? true : false});

    const csrf = document.getElementById('csrf').getAttribute('content');

    useEffect(() => {
        let mediaQuery = window.matchMedia("(min-width: 1024)");
        mediaQuery.addEventListener("change", setMQuery);
        return () => mediaQuery.removeEventListener("change", setMQuery);
    }, []);

    return (
        <div className="index">
                    
            <div className="index-header">
                <h1>Your Plants</h1>

                {
                    mQuery && !mQuery.matches ? 
                    <button  className="close" onClick={() => props.setViewPlantIndex(false)}>
                        <FontAwesomeIcon className="close-icon" icon={faCircleXmark} />
                    </button> :
                    null
                }
                

                {
                    props.viewForm ?
                    <div className="form-container">
                        <Form 
                            setViewForm={props.setViewForm}
                            ownPlant={props.ownPlant}
                            disownPlant={props.disownPlant}
                        />
                    </div> 
                    :
                    <button className="confirm" onClick={() => props.setViewForm(true)}>
                        <p>Add New Plant</p>
                        <FontAwesomeIcon className="confirm-icon" icon={faCirclePlus} />
                    </button>
                }
            </div>

            <div className="plantList">
                {props.ownedPlants ? props.assignOwnedPlantsList(props.ownedPlants) : null}
                {/* {props.ownedPlantList == null ? <h1>No plants owned. Time to start growing!</h1> : null} */}
            </div>

        </div>
    );
}