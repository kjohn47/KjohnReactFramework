import React, { useState } from 'react';

interface IDatePicker {
    startDate: Date;
    endDate: Date;
    selectedDate?: Date;
    callendarVisible?: boolean;
    getSelectedDate: ( selectedDate: Date ) => void;
}

interface ICallendarInput {
    day: string;
    month: string;
    year: string;
}

const DatePicker: React.FC<IDatePicker> = ( props ) => {
    const maxYear = props.endDate.getFullYear();
    const minYear = props.startDate.getFullYear();
    const [ selectedDate, setSelectedDate ] = useState<Date>( props.selectedDate ? props.selectedDate : new Date() );
    const [ selectedYear, setSelectedYear ] = useState<number>( selectedDate.getFullYear() );
    const [ selectedMonth, setSelectedMonth ] = useState<number>( selectedDate.getMonth() );
    const [ showCallendar, setShowCallendar ] = useState<boolean>( props.callendarVisible !== undefined && props.callendarVisible );
    const [ showMonthSelector, setShowMonthSelector ] = useState<boolean>( false );
    const [ showYearSelector, setShowYearSelector ] = useState<boolean>( false );
    const [ callendarInput, setCallendarInput ] = useState<ICallendarInput>({ day: selectedDate.getDate().toString(), month: ( selectedMonth + 1 ).toString(), year: selectedYear.toString() });

    const monthTokens = [ "#(January)", "#(February)", "#(March)", "#(April)", "#(May)", "#(June)", "#(July)", "#(August)", "#(September)", "#(October)", "#(November)", "#(December)" ];
    //const weekToken = [ "#(Mon)", "#(Tue)", "#(Wed)", "#(Thu)", "#(Fri)", "#(Sat)", "#(Sun)" ];
    const weekToken = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];

    const selectNewDate: ( year: number, month: number, day: number ) => void = ( year, month, day ) => {
        let newDate = new Date( year, month, day );
        if ( newDate < props.startDate ) {
            newDate = props.startDate;
        }
        else if ( newDate > props.endDate ) {
            newDate = props.endDate;
        } 
        
        setSelectedDate( newDate );
        props.getSelectedDate( newDate );
        setCallendarInput( { day: newDate.getDate().toString(), month: ( newDate.getMonth() + 1 ).toString(), year: newDate.getFullYear().toString() } );
        !props.callendarVisible && setShowCallendar( false );
    }

    const createYearSelector: () => JSX.Element = () => {
        let years: number[] = [];
        for ( let i = minYear; i <= maxYear; i++ ) {
            years.push( i );
        }

        const updateYear: ( year: number ) => void = ( year ) => {
            if ( selectedYear !== year ) {
                setSelectedYear( year );
                setShowYearSelector( false );
            }
        }

        return (
            <div className="DatePickerSelector">
                {
                    years.map( ( year: number, i: number ) =>
                        <div
                            key={ i }
                            className={ "DatePickerSelectorField" + ( selectedYear === year ? " DatePickerSelectorSelected" : " pointer_cursor" ) }
                            onClick={ () => { updateYear( year ) } }
                        >
                            { year }
                        </div>
                    )
                }
            </div>
        )
    }

    const createMonthSelector: () => JSX.Element = () => {
        const updateMonth: ( month: number ) => void = ( month ) => {
            if ( selectedMonth !== month ) {
                setSelectedMonth( month );
                setShowMonthSelector( false );
            }
        }
        return (
            <div className="DatePickerSelector">
                {
                    monthTokens.map( ( month: string, i: number ) =>
                        <div
                            className={ "DatePickerSelectorField" + ( selectedMonth === i ? " DatePickerSelectorSelected" : " pointer_cursor" ) }
                            key={ i }
                            onClick={ () => { updateMonth( i ) } }
                        >
                            { month }
                        </div>
                    )
                }
            </div>
        )
    }

    const createCalendar: () => JSX.Element = () => {
        let selectedDay = selectedDate.getDate();
        let currentYear = selectedDate.getFullYear();
        let currentMonth = selectedDate.getMonth();
        let lastDate = new Date( selectedYear, ( selectedMonth + 1 ), 0 );
        let numOfDays = lastDate.getDate();
        let startDate = new Date( selectedYear, ( selectedMonth ) );
        let numOfWeek = startDate.getDay();
        let days: number[][] = [ [] ];

        if ( numOfWeek !== 1 ) {
            let lastMonthDate = new Date( selectedYear, selectedMonth, 0 );
            let lastMonthDay = lastMonthDate.getDate();
            if ( numOfWeek === 0 ) {
                for ( let x = 5; x >= 0; x-- ) {
                    days[ 0 ].push( lastMonthDay - x );
                }
            }
            else {
                for ( let x = ( numOfWeek - 1 ); x > 0; x-- ) {
                    days[ 0 ].push( lastMonthDay - ( x - 1 ) );
                }
            }
        }

        let w = 0;
        for ( let i = 1; i <= numOfDays; i++ ) {
            if ( days[ w ].length === 7 ) {
                w++;
            }
            if ( days[ w ] === undefined ) {
                days.push( [] );
            }
            days[ w ].push( i );
        }

        let daysLeft = ( 7 - days[ w ].length );
        for ( let z = 1; z <= daysLeft; z++ ) {
            days[ w ].push( z );
        }

        return (
            <div className={ "DatePickerCallendar noselect" + ( !props.callendarVisible ? " DatePickerCallendarNotVisible" : "" ) }>
                <div className="DatePickerRow">
                    <div className="DatePickerDay DatePickerHeader DatePickerMonth" >
                        <span
                            className="DatePickerArrow pointer_cursor"
                            onClick={ () => { setSelectedMonth( ( selectedMonth - 1 ) < 0 ? 0 : ( selectedMonth - 1 ) ) } }
                        >
                            { "<" }
                        </span>
                        <span
                            className={ "DatePickerText pointer_cursor" + ( showMonthSelector ? " DatePickerTextSelected" : "" ) }
                            onClick={ () => { setShowMonthSelector( !showMonthSelector ) } }
                        >
                            { monthTokens[ selectedMonth ] }
                        </span>
                        { showMonthSelector && createMonthSelector() }
                        <span
                            className="DatePickerArrow pointer_cursor"
                            onClick={ () => { setSelectedMonth( ( selectedMonth + 1 ) > 11 ? 11 : ( selectedMonth + 1 ) ) } }
                        >
                            { ">" }
                        </span>
                    </div>
                    <div className="DatePickerDay DatePickerHeader DatePickerYear" >
                        <span
                            className="DatePickerArrow pointer_cursor"
                            onClick={ () => { setSelectedYear( ( selectedYear - 1 ) < minYear ? minYear : ( selectedYear - 1 ) ) } }
                        >
                            { "<" }
                        </span>
                        <span
                            className={ "DatePickerText pointer_cursor" + ( showYearSelector ? " DatePickerTextSelected" : "" ) }
                            onClick={ () => { setShowYearSelector( !showYearSelector ) } }
                        >
                            { selectedYear }
                        </span>
                        { showYearSelector && createYearSelector() }
                        <span
                            className="DatePickerArrow pointer_cursor"
                            onClick={ () => { setSelectedYear( ( selectedYear + 1 ) > maxYear ? maxYear : ( selectedYear + 1 ) ) } }
                        >
                            { ">" }
                        </span>
                    </div>
                </div>
                <div className="DatePickerRow">
                    { weekToken.map( ( token: string, p: number ) =>
                        <div key={ p } className="DatePickerDay DatePickerWeek" >{ token }</div>
                    ) }
                </div>
                { days.map( ( week: number[], i: number ) => <div className="DatePickerRow" key={ i } >{
                    week.map( ( day: number, z: number ) => {
                        let disabledDay = ( i === 0 && ( day > ( numOfDays - day ) ) ) || ( i > 2 && ( day >= 1 && day <= 7 ) );
                        let daySelected = ( day === selectedDay && currentMonth === selectedMonth && currentYear === selectedYear );
                        let cssClass = "DatePickerDay" + ( disabledDay ? " DatePickerDisabled" : daySelected ? " DatePickerSelected" : " pointer_cursor" );
                        return ( <div className={ cssClass } key={ `w-${ i }-${ z }` } onClick={ disabledDay || daySelected ? undefined : () => selectNewDate( selectedYear, selectedMonth, day ) } >{ day }</div> )
                    } )
                }
                </div> ) }
            </div>
        )
    }

    return (
        <div className="DatePickerDiv">            
            { !props.callendarVisible &&
                <div
                    className="DatePickerInputGroup"
                >
                    <input type="text" className="DatePickerInput" value = {callendarInput.day}/>/
                    <input type="text" className="DatePickerInput" value = {callendarInput.month}/>/
                    <input type="text" className="DatePickerInput" value = {callendarInput.year}/>
                    <span onClick={ () => { setShowCallendar( !showCallendar ) } } >Open</span>
                </div>
            }
            { showCallendar && createCalendar() }
        </div>
    )
}

export default DatePicker;