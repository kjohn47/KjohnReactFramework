import React from 'react';
import Column from '../../common/structure/Column';
import Row from '../../common/structure/Row';
import PageHeader from '../../common/presentation/display/PageHeader';
import SideMenuPage from '../../common/structure/SideMenuPage';
import TestCards from './DataPresentation/TestCards';
import TestTable from './DataPresentation/TestTable';
import TestButtons from './Inputs/TestButtons';
import TestTextInput from './Inputs/TestTextInput';
import TestServices from './ServicesPage/TestServices';
import useTranslation from '../../../logic/functions/getTranslation';
import TestDatePicker from './Inputs/TestDatePicker';
import TestTabGroup from './DataPresentation/TestTabGroup';
import TestBalloon from './DataPresentation/TestBalloon';
import TestToolTip from './DataPresentation/TestToolTip';
import TestFieldSet from './Inputs/TestFieldSet';
import TestLoader from './ServicesPage/TestLoader';
import TestThemes from './ServicesPage/TestThemes';
import TestLabel from './Inputs/TestLabel';
import TestAlert from './DataPresentation/TestAlert';
import TestPageHeader from './DataPresentation/TestPageHeader';
import TestBadge from './DataPresentation/TestBadge';
import TestFileDownloader from './DataPresentation/TestFileDownloader';
import TestIcons from './ServicesPage/TestIcons';
import TestModals from './ServicesPage/TestModals';
import TestDropDown from './Inputs/TestDropDown';

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
                  title: "Themes",
                  component: <TestThemes />
                },
                {
                  title: "Page Header",
                  component: <TestPageHeader />
                },
                {
                  title: "Loader",
                  component: <TestLoader />
                },
                {
                  title: "Services/Error",
                  component: <TestServices />
                },
                {
                  title: "Icons",
                  component: <TestIcons />
                },
                {
                  title: "Modals",
                  component: <TestModals />
                }
              ]
            },
            {
              title: "Data Presentation",
              submenus: [
                {
                  title: "Cards List",
                  component: <TestCards />
                },
                {
                  title: "Table",
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
                },
                {
                  title: "Alert",
                  component: <TestAlert />
                },
                {
                  title: "Badge",
                  component: <TestBadge />
                },
                {
                  title: "Download",
                  component: <TestFileDownloader />
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
                  component: <TestLabel />
                },
                {
                  title: "Text Inputs",
                  component: <TestTextInput />
                },
                {
                  title: "Buttons",
                  component: <TestButtons />
                },
                {
                  title: "Date Picker",
                  component: <TestDatePicker />
                },
                {
                  title: "DropDown",
                  component: <TestDropDown />
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