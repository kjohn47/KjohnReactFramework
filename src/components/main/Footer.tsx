import React, { useState, useEffect, CSSProperties } from "react"
import Column from "../common/structure/Column"
import Row from "../common/structure/Row";
import {useMobileWidth} from "../../logic/functions/windowResize";

const Footer: React.FC = () => 
{
    const mobileWidth = useMobileWidth();
    const footerRef = React.useRef<HTMLDivElement>( null );
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    const handleClickOut: ( event: any ) => void = ( event ) => {
        if ( !isCollapsed && footerRef != null && footerRef.current !== null && !footerRef.current.contains( event.target ) ) {
            setIsCollapsed( true );
        }
    }

    const openerStyle: CSSProperties = {
        display: "block",
        width: "50px"
    }

    useEffect( () => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOut );
        // return function to be called when unmounted
        return () => {
            document.removeEventListener( "mousedown", handleClickOut );
        };
        //eslint-disable-next-line
    }, [ isCollapsed ] )

    useEffect(() => {
        if(!mobileWidth.isMobileWidth)
            setIsCollapsed(true);
    }, [mobileWidth.isMobileWidth])

    return (
        <div ref={footerRef} className="FooterComponent" onMouseEnter={() => { !mobileWidth.isMobileWidth && setIsCollapsed(false)}} onMouseLeave={() => {!mobileWidth.isMobileWidth && setIsCollapsed(true)}}>
            {isCollapsed ? 
                <Row className ="FooterCollapsed">
                    <Column>Footer Collapsed {mobileWidth.isMobileWidth && <span onClick={() => { setIsCollapsed(false) }} style={openerStyle}>Open</span>}</Column>
                </Row> :
                <Row className ="FooterOpened">
                    <Column>Footer Opened {mobileWidth.isMobileWidth && <span onClick={() => { setIsCollapsed(true) }} style={openerStyle}>Close</span>}</Column>
                </Row>
            }
        </div>
    )
}

export default Footer;