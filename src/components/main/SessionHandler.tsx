import React, { useState, useEffect } from 'react';

const SessionHandler: React.FC = ( props ) => {
    const [ firstLoad, setFirstLoad ] = useState<boolean>( true );

    useEffect( () => {
        if( firstLoad ){
            setFirstLoad( false );
        }
    }, [firstLoad] );

    return (
        <React.Fragment>
            { props.children }
        </React.Fragment>
    )
}

export default SessionHandler;