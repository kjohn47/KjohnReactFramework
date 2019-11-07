import React from 'react';

const Row: React.FC< { className?: string } > = ( props ) => {
    return (
        <div className = { "RowDiv" + ( props.className !== undefined ? ( " " + props.className ) : "" ) }>
            {props.children}
        </div>
    );
}

export default Row;