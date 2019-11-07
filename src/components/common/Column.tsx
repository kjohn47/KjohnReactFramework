import React from 'react';
import "../../styles/Column.scss";

export enum ColumnNumber {
    C1 = "1",
    C2 = "2",
    C3 = "3",
    C4 = "4",
    C5 = "5",
    C6 = "6",
    C7 = "7",
    C8 = "8",
    C9 = "9",
    C10 = "10",
    C11 = "11",
    C12 = "12",
    C13 = "13",
    C14 = "14",
    C15 = "15",
    C16 = "16",
    C17 = "17",
    C18 = "18",
    C19 = "19",
    C20 = "20",
}

interface IColumn {    
    full?: ColumnNumber;
    large?: ColumnNumber;
    medium?: ColumnNumber;
    tablet?: ColumnNumber;
    mobile?: ColumnNumber;
    className?: string;
}

const getCssString: ( config: IColumn ) => string = ( config ) => {
    let colCss: string = "";

    if( config.full )
        colCss += " ColumnDivFull-" + config.full;
    if( config.large )
        colCss += " ColumnDivLarge-" + config.large;
    if( config.medium )
        colCss += " ColumnDivMedium-" + config.medium;
    if( config.tablet )
        colCss += " ColumnDivTablet-" + config.tablet;
    if( config.mobile )
        colCss += " ColumnDivMobile-" + config.mobile;

    return "ColumnDiv" + colCss + ( config.className !== undefined ? " " + config.className : "" );
}

 const Column: React.FC< IColumn > = ( props ) => {
     let css = getCssString( props ); 
     return (
         <div className = { css } >
             { props.children }
         </div>
     )
 }

export default Column;