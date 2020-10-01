import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { IDictionary, handleClickOutDiv } from '../../../logic/functions/misc';
import useAppLanguageHandler from '../../../logic/context/App/AppLanguageContextHandler';

export interface ISelectOption {
    key: string;
    value: string;
    textTranslated?: IDictionary<string>;
    defaultSelected?: boolean;
}

interface ISelectProps {
    startOpen?: boolean;
    emptyAvailable?: boolean;
    emptyText?: string;
    getSelectedOption: (option: ISelectOption) => void;
    options: ISelectOption[];
}

const getOptionIndex = (options: ISelectOption[]): number => {
    if(options != null && options.length > 0)
    {
        const optionIndex = options.findIndex(o => o.defaultSelected);
        if(optionIndex >= 0)
        {
            return optionIndex;
        }
    }

    return 0;
}

const Select: React.FC<ISelectProps> = ({
    startOpen,
    emptyAvailable,
    emptyText,
    getSelectedOption,
    options
}) => {
    const {appLanguage} = useAppLanguageHandler();

    const emptyOption: ISelectOption = useMemo<ISelectOption>(() => {
     return { 
         key: "",
         value: emptyText!== undefined ? emptyText : "---" } 
    }, [emptyText]);

    const items = useMemo(() => {
        return emptyAvailable ? [emptyOption, ...options] : options
    }, [options, emptyAvailable, emptyOption]);

    const [open, setOpen] = useState<boolean>(startOpen ? startOpen : false);
    const [selectedIndex, setSelectedIndex] = useState<number>(getOptionIndex(items));

    const lastSelectedKey = useRef<string>(items[selectedIndex].key);
    const selectRef = useRef<HTMLDivElement>(null);

    const itemList = useMemo(() => {
        return items.map((o, i) => 
        <div key={`option_${i}`} onClick={() => setSelectedIndex(i)} className={`${selectedIndex === i ? " selectedOption" : " pointer_cursor"}`}>
            {(o.textTranslated && o.textTranslated[appLanguage]) || o.value}
        </div>)
    }, [selectedIndex, items, appLanguage]);

    const handleClickOutSelect = useCallback( (event: any) => handleClickOutDiv(event, selectRef, open, () => setOpen(false) ), [open]);

    useEffect(() => {
        const selected = items[selectedIndex];
        getSelectedOption(selected);
        lastSelectedKey.current = selected.key;
        setOpen(false);
        // eslint-disable-next-line
    }, [selectedIndex]);

    useEffect(() => {
        const selected = items.findIndex(o => o.key === lastSelectedKey.current);
        if(selected < 0)
        {
            setSelectedIndex(getOptionIndex(items));
        }
        else if(selected !== selectedIndex)
        {
            setSelectedIndex(selected);
        }
        // eslint-disable-next-line
    }, [items])

    useEffect( () => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOutSelect);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener( "mousedown", handleClickOutSelect);
        };        
      }, [ handleClickOutSelect ] )

    const selectedItem = items[selectedIndex];

    return (
        <div className="SelectInput" ref = {selectRef}>
            <div>{(selectedItem.textTranslated && selectedItem.textTranslated[appLanguage]) || selectedItem.value}
            </div>
            <div onClick={() => setOpen(prev => !prev)} className={"pointer_cursor"}>
                {open ? 'A' : 'V'}
            </div>
            {open && <div>
                {itemList}
            </div>}
        </div>
    )
}

export default Select;