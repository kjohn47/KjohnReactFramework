import React, { useState } from "react"
import Column from "../common/Column"
import Row from "../common/Row";

const Footer: React.FC = () => 
{
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    return (
        <div className="FooterComponent" onMouseEnter={() => {setIsCollapsed(false)}} onMouseLeave={() => {setIsCollapsed(true)}}>
            {isCollapsed ? 
                <Row className ="FooterCollapsed">
                    <Column>Footer Collapsed</Column>
                </Row> :
                <Row className ="FooterOpened">
                    <Column>Footer Opened</Column>
                </Row>
            }
        </div>
    )
}

export default Footer;