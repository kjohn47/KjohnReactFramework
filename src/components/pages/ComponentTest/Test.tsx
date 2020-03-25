import React from 'react';
import Column from '../../common/Column';
import Row from '../../common/Row';
import PageHeader from '../../common/PageHeader';
import SideMenuPage from '../../common/SideMenuPage';
import TestCards from './DataPresentation/TestCards';
import TestTable from './DataPresentation/TestTable';
import TestButtons from './Inputs/TestButtons';
import TestTextInput from './Inputs/TestTextInput';
import TestServices from './ServicesPage/TestServices';
import useTranslation from '../../../common/context/pageText/getTranslation';
import TestDatePicker from './Inputs/TestDatePicker';
import TestTabGroup from './DataPresentation/TestTabGroup';
import TestBalloon from './DataPresentation/TestBalloon';
import TestToolTip from './DataPresentation/TestToolTip';
import TestFieldSet from './Inputs/TestFieldSet';
import TestLoader from './ServicesPage/TestLoader';
import TestThemes from './ServicesPage/TestThemes';

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
              title: "Page and Services",
              submenus: [
                {
                  title: "Test Themes",
                  component: <TestThemes />
                },
                {
                  title: "Loader",
                  component: < TestLoader />
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
                  title: "Tooltips",
                  component: <TestToolTip />
                },
                {
                  title: "Tab Group",
                  component: <TestTabGroup />
                },
                {
                  title: "Balloon",
                  component: <TestBalloon />
                }
              ]
            },
            {
              title: "Inputs",
              submenus: [
                {
                  title: "FieldSet",
                  component: <TestFieldSet />
                },
                {
                  title: "Label",
                  component: () => <></>
                },
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