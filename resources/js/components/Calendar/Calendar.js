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
    const [mQuery, setMQuery] = useState({matches: window.innerWidth > 1023 ? true : false});
    
    const calendarDates=props.calendarDates
    const day = moment(date).date();
    const year = moment(date).year();

    // MAP DATES TO BUTTONS
    function mapDates(date) {   
        let month = moment(date).month()+1;
        
        const year = moment(date).year();

        const days = moment(date).daysInMonth()+1;
        
        const daysArray = Array.from(Array(days).keys()).slice(1);

        const today = moment().format('YYYY-MM-DD');

        const dates = daysArray.map(day => {
            let dayNum = day;

            let monthNum = month;

            if(monthNum < 10) {
                monthNum = `0${monthNum}`;
            }
            if(dayNum < 10) {
                dayNum = `0${dayNum}`;
            }

            const date = `${year}-${monthNum}-${dayNum}`;

            const className = [];

            if(date === today) {
                className.push('today');
            } else {
                className.push('not-today');
            }

            calendarDates.map(cal=>{
                if(cal.watered === date) {
                    className.push('watered');
                }
                if(cal.fertilized === date) {
                    className.push('fertilized');
                }
                if(cal.repotted === date) {
                    className.push('repotted');
                }
            });

            return (
                <Date 
                    value={dayNum}
                    month={month}
                    year={year}
                    date={date}
                    key={"date-"+nanoid()}
                    plants={props.ownedPlants}
                    careDiary={props.careDiary}
                    csrf={props.csrf}
                    calendarDates={calendarDates}
                    className={className.join(' ')}
                />
            );
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

    useEffect(() => {
        let mediaQuery = window.matchMedia("(min-width: 1024)");
        mediaQuery.addEventListener("change", setMQuery);
        return () => mediaQuery.removeEventListener("change", setMQuery);
    }, []);

    return (
        <div className="calendar">
            {
                mQuery && !mQuery.matches ? 
                <button className="close" id="calendar-close" onClick={() => props.setViewCalendar(false)}>
                    <FontAwesomeIcon className="close-icon" icon={faCircleXmark}/>
                </button>
                :
                null
            }

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

            
            <ul className='key'>
                <li>Key:</li>
                <li id='watered-key'>Watered</li>
                <li id='fert-key'>Fertilized</li>
                <li id='repot-key'>Repotted</li>
            </ul>
            
        </div>
    ); 
}