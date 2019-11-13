import React from 'react';
import Column from '../../common/Column';
import Row from '../../common/Row';
import PageHeader from '../../common/PageHeader';
import SideMenuPage from '../../common/SideMenuPage';
import TestHash from './TestHash';
import TestCards from './TestCards';
import TestTable from './TestTable';
import TestButtons from './TestButtons';
import TestTextInput from './TestTextInput';

const Test: React.FC = () => {    

  return (
    <Row className="TestApp">
      <Column>
      <PageHeader>
        Test page :)
      </PageHeader>    
        <SideMenuPage 
          title = "Test Side Menu"
          presentationComponent = { <span>Welcome to test page of components</span> }
          menus = {[
            {
              title: "Hash and Login",
              startCollapsed: true,
              submenus: [
                {
                  title: "Test hash",
                  component: <TestHash />
                }
              ]
            },
            {
              title: "Cards",
              submenus: [
                {
                  title: "Cards components",
                  component: <TestCards />
                }
              ]
            },
            {
              title: "Table",
              submenus: [
                {
                  title: "Table component",
                  component: <TestTable />
                }
              ]
            },
            {
              title: "Inputs",
              submenus: [
                {
                  title: "Text input component",
                  component: <TestTextInput />
                }
              ]
            },
            {
              title: "Buttons",
              submenus: [
                {
                  title: "Buttons with services",
                  component: <TestButtons />
                }
              ]
            }
          ]}
        />                  
      </Column>
    </Row>
  );
}

export default Test;