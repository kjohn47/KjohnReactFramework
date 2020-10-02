import React, { useState, useEffect, useMemo } from 'react';
import DropDown, { IDropDownOption } from '../../../common/inputs/DropDown';
import Row from '../../../common/structure/Row';
import Column from '../../../common/structure/Column';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';
import WithLabel from '../../../common/presentation/wrapper/WithLabel';

const TestDropDown: React.FC = () => {
    const [option, setOption] = useState<IDropDownOption | undefined>();

    const options = useMemo<IDropDownOption[]>(() => {
        return [
            {
                key: "opt1",
                textDictionary: {
                    "PT": "Opção 1",
                    "EN": "Option 1"
                }
            },
            {
                key: "opt2",
                value: 2,
                text: "#(opt_2)"
            }
        ]
    }, []);

    useEffect(() => {
        if(option)
        {
            console.log("OPT: ", option)
        }
    }, [option])

    return (
        <Row>
            <Column>
                <FieldSet Title="Test DropDown">
                    <Row>
                        <Column>
                            <WithLabel text = "DropDown with empty available" inline> 
                                <DropDown 
                                    getSelectedOption = {(opt) => setOption(opt) }
                                    options = {options}
                                    emptyAvailable
                                    emptyText = "#(no_option)"
                                />
                            </WithLabel>
                        </Column>
                    </Row>
                </FieldSet>
            </Column>
        </Row>
    )
}

export default TestDropDown;