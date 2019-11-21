import React from 'react';
import Row from '../../common/Row';
import Column from '../../common/Column';
import DatePicker from '../../common/DatePicker';

const TestDatePicker: React.FC = () => {
    return (
        <Row>
            <Column>
                <DatePicker
                    startDate={ new Date( "2000/1/1" ) }
                    endDate={ new Date( "2050/1/1" ) }
                    getSelectedDate={ ( selected ) => { console.log( selected ) } }                    
                />
            </Column>
            <Column>
                <DatePicker
                    startDate={ new Date( "2000/1/1" ) }
                    endDate={ new Date( "2050/1/1" ) }
                    getSelectedDate={ ( selected ) => { console.log( selected ) } }
                    callendarVisible
                />
            </Column>
        </Row>
    )
}

export default TestDatePicker;