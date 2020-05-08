import React from 'react';
import Row from '../../../common/structure/Row';
import Column from '../../../common/structure/Column';
import DatePicker from '../../../common/inputs/DatePicker';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';

const TestDatePicker: React.FC = () => {
    const today = new Date();
    return (
        <Row>
            <Column>
                <FieldSet Title="DatePicker with fields enabled">
                    <DatePicker
                        startDate={ new Date( "2000/5/10" ) }
                        endDate={ new Date( "2050/1/1" ) }
                        getSelectedDate={ ( selected ) => { console.log( selected ) } }
                    />
                </FieldSet>
            </Column>
            <Column>
                <FieldSet Title="DatePicker with fields disabled">
                    <DatePicker
                        startDate={ new Date( today.getFullYear() - 50 ) }
                        endDate={ today }
                        getSelectedDate={ ( selected ) => { console.log( selected ) } }
                        disableEdit
                    />
                </FieldSet>
            </Column>
            <Column>
                <FieldSet Title="DatePicker with callendar">
                    <DatePicker
                        startDate={ new Date( "2000/1/1" ) }
                        endDate={ new Date( "2050/1/1" ) }
                        getSelectedDate={ ( selected ) => { console.log( selected ) } }
                        calendarVisible
                    />
                </FieldSet>
            </Column>
        </Row>
    )
}

export default TestDatePicker;