import React from 'react';
import "../../styles/Row.scss";

const Row: React.FC< { className?: string } > = ( props ) => {
    return (
        <div className = { "RowDiv" + ( props.className !== undefined ? ( " " + props.className ) : "" ) }>
            {props.children}
        </div>
    );
}

export default Row;