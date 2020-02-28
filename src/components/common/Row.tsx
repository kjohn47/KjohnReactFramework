import React from 'react';

const Row: React.FC<{ className?: string, reference?: any }> = ( props ) => {
    return (
        <div className={ "RowDiv" + ( props.className !== undefined ? ( " " + props.className ) : "" ) } ref={ props.reference }>
            { props.children }
        </div>
    );
}

export default Row;