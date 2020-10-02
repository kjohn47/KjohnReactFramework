import React, { useState, useEffect, CSSProperties, useCallback } from "react"
import Column from "../common/structure/Column"
import Row from "../common/structure/Row";
import {useMobileWidth} from "../../logic/functions/windowResize";
import { handleClickOutDiv } from "../../logic/functions/misc";

const Footer: React.FC = () => 
{
    const mobileWidth = useMobileWidth();
    const footerRef = React.useRef<HTMLDivElement>( null );
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const handleClickOutFooter = useCallback( (event: any) => handleClickOutDiv(event, footerRef, !isCollapsed, () => setIsCollapsed( true ) ), [isCollapsed]);

    const openerStyle: CSSProperties = {
        display: "block",
        width: "50px"
    }
    

    useEffect( () => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOutFooter );
        // return function to be called when unmounted
        return () => {
            document.removeEventListener( "mousedown", handleClickOutFooter );
        };
        
    }, [ handleClickOutFooter ] )

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