import React, { useState, useEffect, CSSProperties } from "react"
import Column from "../common/structure/Column"
import Row from "../common/structure/Row";
import useWindowSize from "../../logic/functions/windowResize";
import { mobileWidth } from "../../logic/config/configuration";

const Footer: React.FC = () => 
{
    const [ width ] = useWindowSize();
    const footerRef = React.useRef<HTMLDivElement>( null );
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(width <= mobileWidth);

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
        if(width <= mobileWidth)
        {
            setIsMobile(true);
        }
        else
        {
            setIsMobile(false);
            setIsCollapsed(true);
        }
    }, [width])

    return (
        <div ref={footerRef} className="FooterComponent" onMouseEnter={() => { !isMobile && setIsCollapsed(false)}} onMouseLeave={() => {!isMobile && setIsCollapsed(true)}}>
            {isCollapsed ? 
                <Row className ="FooterCollapsed">
                    <Column>Footer Collapsed {isMobile && <span onClick={() => { setIsCollapsed(false) }} style={openerStyle}>Open</span>}</Column>
                </Row> :
                <Row className ="FooterOpened">
                    <Column>Footer Opened {isMobile && <span onClick={() => { setIsCollapsed(true) }} style={openerStyle}>Close</span>}</Column>
                </Row>
            }
        </div>
    )
}

export default Footer;