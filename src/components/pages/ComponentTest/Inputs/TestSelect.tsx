import React from 'react';
import Select from '../../../common/inputs/Select';
import useTranslation from '../../../../logic/functions/getTranslation';

const TestSelect: React.FC = () => {
    const {getTranslation} = useTranslation();
    return <Select 
        getSelectedOption = {(opt) => console.log("Selected Opt:", opt) }
        options = {[
            {
                key: "opt1",
                value: "Option 1",
                textTranslated: {
                    "PT": "Opção 1",
                    "EN": "Option 1"
                }
            }
        ]}
        emptyAvailable = {true}
        emptyText = {getTranslation("_select", "#(no_option)")}
    />
}

export default TestSelect;