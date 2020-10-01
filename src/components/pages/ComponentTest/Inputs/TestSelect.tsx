import React, { useState, useEffect } from 'react';
import Select, { ISelectOption } from '../../../common/inputs/Select';

const TestSelect: React.FC = () => {
    const [option, setOption] = useState<ISelectOption | undefined>();

    useEffect(() => {
        if(option)
        {
            console.log("OPT: ", option)
        }
    }, [option])

    return <Select 
        getSelectedOption = {(opt) => setOption(opt) }
        options = {[
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
        ]}
        emptyAvailable
        emptyText = "#(no_option)"
    />
}

export default TestSelect;