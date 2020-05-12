import React from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';
import Button, { ButtonTypes } from '../../../common/inputs/Button';

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
        <FieldSet Title="Button Disabled">
          <Row>
            <Column className = "TestButtonCol">
              <Button className="TestButtons" buttonType={ ButtonTypes.Default } disabled>Default</Button>
            </Column>
            <Column className = "TestButtonCol">
              <Button className="TestButtons" buttonType={ ButtonTypes.Cancelation } disabled>Cancellation</Button>
            </Column>
            <Column className = "TestButtonCol">
              <Button className="TestButtons" buttonType={ ButtonTypes.Confirmation } disabled>Corfirmation</Button>
            </Column>
            <Column className = "TestButtonCol">
              <Button className="TestButtons" buttonType={ ButtonTypes.Danger } disabled>Danger</Button>
            </Column>
            <Column className = "TestButtonCol">
              <Button className="TestButtons" buttonType={ ButtonTypes.Information } disabled>Information</Button>
            </Column>
            <Column className = "TestButtonCol">
              <Button className="TestButtons" buttonType={ ButtonTypes.Warning } disabled >Warning</Button>
            </Column>
          </Row>
        </FieldSet>
      </Column>
    </Row>
  )
}

export default TestButtons;