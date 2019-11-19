import React from 'react';
import Column from '../../common/Column';
import Row from '../../common/Row';
import FieldSet from '../../common/FieldSet';
import Button, { ButtonTypes } from '../../common/Button';

const TestButtons: React.FC = () => {
  return (
    <Row>
      <Column>
        <FieldSet Title="Button types">
          <Row>
          <Column className = "TestButtonCol">
              <Button className="TestButtons" buttonType={ ButtonTypes.Default }>Default</Button>
            </Column>
            <Column className = "TestButtonCol">
              <Button className="TestButtons" buttonType={ ButtonTypes.Cancelation }>Cancellation</Button>
            </Column>
            <Column className = "TestButtonCol">
              <Button className="TestButtons" buttonType={ ButtonTypes.Confirmation }>Corfirmation</Button>
            </Column>
            <Column className = "TestButtonCol">
              <Button className="TestButtons" buttonType={ ButtonTypes.Danger }>Danger</Button>
            </Column>
            <Column className = "TestButtonCol">
              <Button className="TestButtons" buttonType={ ButtonTypes.Information }>Information</Button>
            </Column>
            <Column className = "TestButtonCol">
              <Button className="TestButtons" buttonType={ ButtonTypes.Warning }>Warning</Button>
            </Column>
          </Row>
        </FieldSet>
      </Column>
    </Row>
  )
}

export default TestButtons;