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
import TestServices from './TestServices';
import useTranslation from '../../../common/context/pageText/getTranslation';
import TestDatePicker from './TestDatePicker';
import TestTabGroup from './TestTabGroup';

const Test: React.FC = () => {
  const { getTranslation } = useTranslation();
  return (
    <Row className="TestApp">
      <Column>
        <PageHeader>
          { getTranslation( "_TestPage", "#(TestPage Title)" ) }
        </PageHeader>
        <SideMenuPage
          title="Test Side Menu"
          presentationComponent={ <span>Welcome to test page of components</span> }
          menus={ [
            {
              title: "Hash and Services",
              submenus: [
                {
                  title: "Test hash",
                  component: <TestHash />
                },
                {
                  title: "Call Services",
                  component: < TestServices />
                }
              ]
            },
            {
              title: "Data Presentation",
              submenus: [
                {
                  title: "Cards components",
                  component: <TestCards />
                },
                {
                  title: "Table component",
                  component: <TestTable />
                },
                {
                  title: "Tab Group",
                  component: <TestTabGroup />
                }
              ]
            },
            {
              title: "Inputs",
              submenus: [
                {
                  title: "Text input component",
                  component: <TestTextInput />
                },
                {
                  title: "Buttons",
                  component: <TestButtons />
                },
                {
                  title: "Date Picker",
                  component: <TestDatePicker />
                }
              ]
            },
          ] }
        />
      </Column>
    </Row>
  );
}

export default Test;