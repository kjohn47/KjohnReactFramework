import React from 'react';
import Row from '../../common/Row';
import Column from '../../common/Column';
import DatePicker from '../../common/DatePicker';
import FieldSet from '../../common/FieldSet';

const TestDatePicker: React.FC = () => {
    return (
        <Row>
            <Column>
                <FieldSet Title="DatePicker with fields enabled">
                    <DatePicker
                        startDate={ new Date( "2000/1/1" ) }
                        endDate={ new Date( "2050/1/1" ) }
                        getSelectedDate={ ( selected ) => { console.log( selected ) } }
                    />
                </FieldSet>
            </Column>
            <Column>
                <FieldSet Title="DatePicker with fields disabled">
                    <DatePicker
                        startDate={ new Date( "2000/1/1" ) }
                        endDate={ new Date( "2050/1/1" ) }
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