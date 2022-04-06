import moment from 'moment';
import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Date from './Date';
import Table from './Table';
import { nanoid } from 'nanoid';
import { globalAPI } from '../../api';

export default function Calendar(props) {
    const [date, setDate] = useState(moment());
    const [calendarDates, setCalendarDates] = useState();
    const [fetchedDates, setFetchedDates] = useState(false);
    
    const day = moment(date).date();
    const year = moment(date).year();

    // FETCH CALENDAR & ASSIGN DATES
    function assignDates(data) {
        setCalendarDates(data);
    }

    function fetchCalendar() {
        setFetchedDates(true);
        globalAPI('GET', 'calendar', null, (data) => {
            assignDates(data);
        }),(request) => {
            console.error('Failed to retrieve calendar dates ' + request.response);
        }
    }

    let calendarList;

    if(calendarDates) {
        calendarList = calendarDates.map(day =>{
            const data = props.ownedPlants.map(plant=>{
                if(plant.id == day.plant_id) {
                    return (
                        <div className='calendar-list' key={'cal-list'+nanoid()}>
                            <li>{plant.name}</li>
                            <li>{day.watered}</li>
                            <li>{day.fertilized}</li>
                            <li>{day.repotted}</li>
                        </div>
                    );
                }
            });
            return data;
        });
    }

    // MAP DATES TO BUTTONS
    function mapDates(date) {
        const month = moment(date).month();

        const year = moment(date).year();

        const days = moment(date).daysInMonth()+1;
        
        const daysArray = Array.from(Array(days).keys()).slice(1);

        const today = moment();
        
        const dates = daysArray.map(date => {
            if(props.ownedPlants) {
                if(date == today.date() && month == today.month() && year == today.year()) {
                    return (
                        <Date 
                            value={date}
                            month={month}
                            year={year}
                            date={year+"-"+month+"-"+date}
                            id="today"
                            key={"date-"+nanoid()}
                            plants={props.ownedPlants}
                            careDiary={props.careDiary}
                            csrf={props.csrf}
                        />
                    );
                } else {
                    return (
                        <Date 
                            value={date}
                            month={month}
                            year={year}
                            date={year+"-"+month+"-"+date}
                            id="not-today"
                            key={"date-"+nanoid()}
                            plants={props.ownedPlants}
                            careDiary={props.careDiary}
                            csrf={props.csrf}
                        />
                    );
                }
            }
        });

        let size = 7;
        let body = [];
        for(let i = 0; i < dates.length; i+= size) {
            body.push(dates.slice(i, i+size));
        }
        
        return <Table body={body} />
    }

    const setPreviousYear = () => {
        setDate(d => d.clone().subtract(1, 'year'));
    }

    const setNextYear = () => {
        setDate(d => d.clone().add(1, 'year'));
    }

    const setPreviousMonth = () => {
        setDate(d => d.clone().subtract(1, 'month'));
    }

    const setNextMonth = () => {
        setDate(d => d.clone().add(1, "month"));
    };


    return (
        <div className="calendar">
            {
                fetchedDates ? null : fetchCalendar()
            }

            <button className="close" onClick={() => props.setViewCalendar(false)}>
                <FontAwesomeIcon className="close-icon" icon={faCircleXmark}/>
            </button>

            <h1 id="current-date">Current Date: {moment().format('DD MMMM YYYY')}</h1>
            

            <div className="cal-btns">
                <button onClick={() => setDate(moment())}>Jump to Current Date</button>
                
                <div className="year">
                    <button
                        onClick={setPreviousYear}
                    >Previous</button>

                    <h3>{year}</h3>
                    
                    <button
                        onClick={setNextYear}
                    >Next</button>
                    
                </div>

                <div className="month">
                    <button
                        onClick={setPreviousMonth}
                    >Previous</button>

                    <h3>{moment(date).format('MMMM')}</h3>

                    <button
                        onClick={setNextMonth}
                    >Next</button>
                </div>
            </div>

            <div className="date-group">
                {mapDates(date)}
            </div>
        </div>
    ); 
}