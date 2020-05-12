import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AppRegex } from '../../../logic/config/regexEnum';
import useTranslation from '../../../logic/functions/getTranslation';
import { scrollToRef } from '../../../logic/functions/misc';

interface IDatePicker {
    startDate: Date;
    endDate: Date;
    selectedDate?: Date;
    calendarVisible?: boolean;
    disableEdit?: boolean;
    getSelectedDate: ( selectedDate: Date ) => void;
    disabled?: boolean;
}

enum DatePickerTextField {
    day = "day",
    year = "year",
    month = "month"
}

interface ICalendarInput {
    [ DatePickerTextField.day ]: string;
    [ DatePickerTextField.month ]: string;
    [ DatePickerTextField.year ]: string;
}

const DatePicker: React.FC<IDatePicker> = ( props ) => {
    //// Max and min year
    const maxYear = props.endDate.getFullYear();
    const minYear = props.startDate.getFullYear();
    //// State hooks
    const [ selectedDate, setSelectedDate ] = useState<Date>( props.selectedDate ? props.selectedDate : new Date() );
    const [ selectedYear, setSelectedYear ] = useState<number>( selectedDate.getFullYear() );
    const [ selectedMonth, setSelectedMonth ] = useState<number>( selectedDate.getMonth() );
    const [ showCalendar, setShowCalendar ] = useState<boolean>( props.calendarVisible !== undefined && props.calendarVisible );
    const [ showMonthSelector, setShowMonthSelector ] = useState<boolean>( false );
    const [ showYearSelector, setShowYearSelector ] = useState<boolean>( false );
    const [ calendarInput, setCalendarInput ] = useState<ICalendarInput>( { [ DatePickerTextField.day ]: selectedDate.getDate().toString(), [ DatePickerTextField.month ]: ( selectedMonth + 1 ).toString(), [ DatePickerTextField.year ]: selectedYear.toString() } );
    //// refs hooks to dropdown
    const yearSelectedRef = useRef<HTMLDivElement>( null );
    const monthSelectedRef = useRef<HTMLDivElement>( null );
    const datePickerRef = useRef<HTMLDivElement>( null );
    //// Translate hook
    const { getTranslation } = useTranslation();
    ////handle click out event to close calendar
    const handleClickOut: ( event: any ) => void = ( event ) => {
        if ( !props.calendarVisible && showCalendar && ( datePickerRef !== null && datePickerRef.current !== null && !datePickerRef.current.contains( event.target ) ) ) {
            setShowCalendar( false );
            setShowYearSelector( false );
            setShowMonthSelector( false );
            setSelectedMonth( selectedDate.getMonth() );
            setSelectedYear( selectedDate.getFullYear() );
        }
        if ( showYearSelector && yearSelectedRef !== null && yearSelectedRef.current !== null && yearSelectedRef.current.parentElement !== null && !yearSelectedRef.current.parentElement.contains( event.target )
            && yearSelectedRef.current.parentElement.previousElementSibling !== null && !yearSelectedRef.current.parentElement.previousElementSibling.contains( event.target ) ) {
            setShowYearSelector( false );
        }
        if ( showMonthSelector && monthSelectedRef !== null && monthSelectedRef.current !== null && monthSelectedRef.current.parentElement !== null && !monthSelectedRef.current.parentElement.contains( event.target )
            && monthSelectedRef.current.parentElement.previousElementSibling !== null && !monthSelectedRef.current.parentElement.previousElementSibling.contains( event.target ) ) {
            setShowMonthSelector( false );
        }
    }

    //// useEffect hooks
    useEffect( () => {
        if ( showYearSelector ) {
            scrollToRef( yearSelectedRef );
        }
    }, [ showYearSelector ] )

    useEffect( () => {
        if ( showMonthSelector ) {
            scrollToRef( monthSelectedRef );
        }
    }, [ showMonthSelector ] )

    useEffect( () => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOut );
        // return function to be called when unmounted
        return () => {
            document.removeEventListener( "mousedown", handleClickOut );
        };
        //eslint-disable-next-line
    }, [ showCalendar, showYearSelector, showMonthSelector ] )

    useEffect( () => {
        if( !props.calendarVisible && props.disabled )
        {
            setShowCalendar(false);
        }
    }, [props.calendarVisible, props.disabled]) 

    //// Translate tokens
    const monthTokens = useMemo( () => ( [
        getTranslation( "_datePicker", "#(January)" ),
        getTranslation( "_datePicker", "#(February)" ),
        getTranslation( "_datePicker", "#(March)" ),
        getTranslation( "_datePicker", "#(April)" ),
        getTranslation( "_datePicker", "#(May)" ),
        getTranslation( "_datePicker", "#(June)" ),
        getTranslation( "_datePicker", "#(July)" ),
        getTranslation( "_datePicker", "#(August)" ),
        getTranslation( "_datePicker", "#(September)" ),
        getTranslation( "_datePicker", "#(October)" ),
        getTranslation( "_datePicker", "#(November)" ),
        getTranslation( "_datePicker", "#(December)" )
    ] ), [getTranslation] );
    const weekToken = useMemo( () => ( [
        getTranslation( "_datePicker", "#(Mon)" ),
        getTranslation( "_datePicker", "#(Tue)" ),
        getTranslation( "_datePicker", "#(Wed)" ),
        getTranslation( "_datePicker", "#(Thu)" ),
        getTranslation( "_datePicker", "#(Fri)" ),
        getTranslation( "_datePicker", "#(Sat)" ),
        getTranslation( "_datePicker", "#(Sun)" )
    ] ), [getTranslation] );
    //// updates the date and returns on getSelectedDate to parent
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
        setCalendarInput( { [ DatePickerTextField.day ]: newDate.getDate().toString(), [ DatePickerTextField.month ]: ( newDate.getMonth() + 1 ).toString(), [ DatePickerTextField.year ]: newDate.getFullYear().toString() } );
        !props.calendarVisible && setShowCalendar( false );
    }
    //// handler for open or close callendar, makes reset on close
    const showHideCalendar: () => void = () => {
        if( !props.disabled ) {
            if ( showCalendar ) {
                setShowMonthSelector( false );
                setShowYearSelector( false );
                setSelectedMonth( selectedDate.getMonth() );
                setSelectedYear( selectedDate.getFullYear() );
            }
            setShowCalendar( !showCalendar );
        }
    }
    //// handler for changes in text with validation for max day, month, year and number only
    const updateTextValue: ( event: React.FormEvent<HTMLInputElement>, field: DatePickerTextField ) => void = ( event, field ) => {
        if ( !props.disableEdit && !props.disabled ) {
            let numberReg = new RegExp( AppRegex.NumberOnly );
            let validInput = ( numberReg.test( event.currentTarget.value ) || event.currentTarget.value === "" );
            if ( validInput && event.currentTarget.value !== "" ) {
                let parsedInput: number = +event.currentTarget.value;
                switch ( field ) {
                    case DatePickerTextField.day: {
                        let maxDay = new Date( selectedYear, ( selectedMonth + 1 ), 0 ).getDate();
                        validInput = ( parsedInput > 0 && parsedInput <= maxDay );
                        break;
                    }
                    case DatePickerTextField.month: {
                        validInput = ( parsedInput > 0 && parsedInput <= 12 );
                        break;
                    }
                    case DatePickerTextField.year: {
                        validInput = ( parsedInput > 0 && parsedInput <= maxYear );
                        break;
                    }
                }
            }

            if ( validInput ) {
                setCalendarInput( {
                    ...calendarInput,
                    [ field ]: event.currentTarget.value
                } );
            }
        }
    }
    //// updates the date with values from inputs and correct them to be on range
    const updateDateFromInput: () => void = () => {
        if ( !props.disableEdit && !props.disabled ) {
            let newYear: number = +calendarInput[ DatePickerTextField.year ];
            let newMonth: number = +calendarInput[ DatePickerTextField.month ] - 1;
            let newDay: number = +calendarInput[ DatePickerTextField.day ];
            let maxDay = new Date( newYear, ( newMonth ), 0 ).getDate();
            newYear = newYear < minYear ? minYear : newYear > maxYear ? maxYear : newYear;
            newMonth = ( newYear === minYear && newMonth < props.startDate.getMonth() ) ?
                props.startDate.getMonth() : ( newYear === maxYear && newMonth > props.endDate.getMonth() ) ?
                    props.endDate.getMonth() : ( newMonth ) > 11 ?
                        11 : ( newMonth );
            newDay = ( newYear === minYear && newMonth === props.startDate.getMonth() && newDay < props.startDate.getDate() ) ?
                props.startDate.getDate() : ( newYear === maxYear && newMonth === props.endDate.getMonth() && newDay > props.endDate.getDate() ) ?
                    props.endDate.getDate() : newDay > maxDay ?
                        maxDay : newDay;
            setSelectedMonth( newMonth );
            setSelectedYear( newYear );
            selectNewDate( newYear, newMonth, newDay );
        }
    }
    //// Generates the list of years from min to max from range
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
            <div className="DatePickerSelector KRFScroll">
                {
                    years.map( ( year: number, i: number ) =>
                        <div
                            key={ i }
                            className={ "DatePickerSelectorField" + ( selectedYear === year ? " DatePickerSelectorSelected" : " pointer_cursor" ) }
                            onClick={ () => { updateYear( year ) } }
                            ref={ selectedYear === year ? yearSelectedRef : undefined }
                        >
                            { year }
                        </div>
                    )
                }
            </div>
        )
    }
    //// Generates the list of months
    const createMonthSelector: () => JSX.Element = () => {
        const updateMonth: ( month: number ) => void = ( month ) => {
            if ( selectedMonth !== month ) {
                setSelectedMonth( month );
                setShowMonthSelector( false );
            }
        }
        return (
            <div className="DatePickerSelector KRFScroll">
                {
                    monthTokens.map( ( month: string, i: number ) =>
                        <div
                            className={ "DatePickerSelectorField" + ( selectedMonth === i ? " DatePickerSelectorSelected" : " pointer_cursor" ) }
                            key={ i }
                            onClick={ () => { updateMonth( i ) } }
                            ref={ selectedMonth === i ? monthSelectedRef : undefined }
                        >
                            { month }
                        </div>
                    )
                }
            </div>
        )
    }
    //// Generates the date picker text inputs
    const createInputGroup: () => JSX.Element = () => {
        return (
            <div
                className="DatePickerInputGroup noselect"
            >
                <input
                    type="text"
                    className={ "DatePickerInput" + ( props.disableEdit || props.disabled ? " DatePickerInputDisabled" : "" ) }
                    value={ calendarInput[ DatePickerTextField.day ] }
                    onChange={ ( event: React.FormEvent<HTMLInputElement> ) => { updateTextValue( event, DatePickerTextField.day ) } }
                    onBlur={ () => updateDateFromInput() }
                />/
                <input
                    type="text"
                    className={ "DatePickerInput" + ( props.disableEdit || props.disabled ? " DatePickerInputDisabled" : "" ) }
                    value={ calendarInput[ DatePickerTextField.month ] }
                    onChange={ ( event: React.FormEvent<HTMLInputElement> ) => { updateTextValue( event, DatePickerTextField.month ) } }
                    onBlur={ () => updateDateFromInput() }
                />/
                <input
                    type="text"
                    className={ "DatePickerInput" + ( props.disableEdit || props.disabled ? " DatePickerInputDisabled" : "" ) }
                    value={ calendarInput[ DatePickerTextField.year ] }
                    onChange={ ( event: React.FormEvent<HTMLInputElement> ) => { updateTextValue( event, DatePickerTextField.year ) } }
                    onBlur={ () => updateDateFromInput() }
                />
                <span className={ `DatePickerButton${!props.disabled ? " pointer_cursor" : ""} noselect` + ( showCalendar ? ' DatePickerButtonSelected' : '' ) } onClick={ () => { showHideCalendar() } } >[ v ]</span>
            </div>
        )
    }
    //// Generates the date picker calendar
    const createCalendar: () => JSX.Element = () => {
        let selectedDay = selectedDate.getDate();
        let currentYear = selectedDate.getFullYear();
        let currentMonth = selectedDate.getMonth();
        let numOfDays = new Date( selectedYear, ( selectedMonth + 1 ), 0 ).getDate();
        let numOfWeek = new Date( selectedYear, ( selectedMonth ) ).getDay();
        let days: number[][] = [ [] ];
        //// Add days from previous month
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
        //// Add days to the correct week on days array
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
        //// Add days from next month
        let daysLeft = ( 7 - days[ w ].length );
        for ( let z = 1; z <= daysLeft; z++ ) {
            days[ w ].push( z );
        }
        //// Return calendar
        return (
            <div className={ "DatePickerCalendar noselect" + ( !props.calendarVisible ? " DatePickerCalendarNotVisible" : "" ) }>
                <div className="DatePickerRow">
                    <div className="DatePickerDay DatePickerHeader DatePickerMonth" >
                        <span
                            className={`DatePickerArrow${!props.disabled ? " pointer_cursor" : ""}`}
                            onClick={ () => { !props.disabled && setSelectedMonth( ( selectedMonth - 1 ) < 0 ? 0 : ( selectedMonth - 1 ) ) } }
                        >
                            { "<" }
                        </span>
                        <span
                            className={ `DatePickerText${!props.disabled ? " pointer_cursor" : ""}` + ( showMonthSelector ? " DatePickerTextSelected" : "" ) }
                            onClick={ () => { !props.disabled && setShowMonthSelector( !showMonthSelector ) } }
                            onBlur={ () => { setShowMonthSelector( false ) } }
                        >
                            { monthTokens[ selectedMonth ] }
                        </span>
                        { showMonthSelector && createMonthSelector() }
                        <span
                            className={`DatePickerArrow${!props.disabled ? " pointer_cursor" : ""}`}
                            onClick={ () => {!props.disabled && setSelectedMonth( ( selectedMonth + 1 ) > 11 ? 11 : ( selectedMonth + 1 ) ) } }
                        >
                            { ">" }
                        </span>
                    </div>
                    <div className="DatePickerDay DatePickerHeader DatePickerYear" >
                        <span
                            className={`DatePickerArrow${!props.disabled ? " pointer_cursor" : ""}`}
                            onClick={ () => { !props.disabled && setSelectedYear( ( selectedYear - 1 ) < minYear ? minYear : ( selectedYear - 1 ) ) } }
                        >
                            { "<" }
                        </span>
                        <span
                            className={ `DatePickerText${!props.disabled ? " pointer_cursor" : ""}` + ( showYearSelector ? " DatePickerTextSelected" : "" ) }
                            onClick={ () => { !props.disabled && setShowYearSelector( !showYearSelector ) } }
                        >
                            { selectedYear }
                        </span>
                        { showYearSelector && createYearSelector() }
                        <span
                            className={`DatePickerArrow${!props.disabled ? " pointer_cursor" : ""}`}
                            onClick={ () => { !props.disabled && setSelectedYear( ( selectedYear + 1 ) > maxYear ? maxYear : ( selectedYear + 1 ) ) } }
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
                        let outOfRange = ( selectedYear === minYear && ( selectedMonth < props.startDate.getMonth() || ( selectedMonth === props.startDate.getMonth() && day < props.startDate.getDate() ) ) );
                        outOfRange = outOfRange || ( selectedYear === maxYear && ( selectedMonth > props.endDate.getMonth() || ( selectedMonth === props.endDate.getMonth() && day > props.endDate.getDate() ) ) );
                        let disabledDay = ( ( ( i === 0 && ( day > ( numOfDays - day ) ) ) || ( i > 3 && ( day >= 1 && day <= 7 ) ) ) || outOfRange );
                        let daySelected = ( day === selectedDay && currentMonth === selectedMonth && currentYear === selectedYear );
                        let cssClass = "DatePickerDay" + ( daySelected ? " DatePickerSelected" : disabledDay || props.disabled ? " DatePickerDisabled" : " DatePickerSelectable pointer_cursor" );
                        return ( <div className={ cssClass } key={ `w-${ i }-${ z }` } onClick={ disabledDay || daySelected || props.disabled ? undefined : () => selectNewDate( selectedYear, selectedMonth, day ) } >{ day }</div> )
                    } )
                }
                </div> ) }
            </div>
        )
    }
    //// Returns date picker
    return (
        <div className="DatePickerDiv" ref={ datePickerRef }>
            { !props.calendarVisible && createInputGroup() }
            { showCalendar && createCalendar() }
        </div>
    )
}

export default DatePicker;