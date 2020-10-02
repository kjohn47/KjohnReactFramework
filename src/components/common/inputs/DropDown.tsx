import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { IDictionary, handleClickOutDiv, executeClickEnterSpace } from '../../../logic/functions/misc';
import useAppLanguageHandler from '../../../logic/context/App/AppLanguageContextHandler';
import useTranslation from '../../../logic/functions/getTranslation';

export interface IOptionOut {
    key: string;
    value?: number;
}

export interface IDropDownOption extends IOptionOut {
    textDictionary?: IDictionary<string>;
    text?: string;
    defaultSelected?: boolean;
}

interface IDropDownProps {
    emptyAvailable?: boolean;
    emptyText?: string;
    translationProcess?: string;
    getSelectedOption: (option: IOptionOut) => void;
    options: IDropDownOption[];
}

const getOptionIndex = (options: IDropDownOption[]): number => {
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

const DropDown: React.FC<IDropDownProps> = ({
    emptyAvailable,
    emptyText,
    translationProcess,
    getSelectedOption,
    options
}) => {
    const {appLanguage} = useAppLanguageHandler();
    const {getTranslation} = useTranslation();
    const emptyOption: IDropDownOption = useMemo<IDropDownOption>(() => {
     return { 
         key: "",
         text: emptyText !== undefined ? getTranslation( translationProcess ? translationProcess : "_dropdown", emptyText) : "---" } 
    }, [emptyText, getTranslation, translationProcess]);

    const items = useMemo(() => {
        return emptyAvailable ? [emptyOption, ...options] : options
    }, [options, emptyAvailable, emptyOption]);

    const [open, setOpen] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(getOptionIndex(items));

    const selectRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const itemList = useMemo(() => {
        return items.map((o, i) => 
        <div 
            tabIndex= {selectedIndex === i ? undefined : 0} 
            key={`option_${i}`} 
            onClick={() => setSelectedIndex(i)} 
            onKeyDown={(event) => executeClickEnterSpace(event, () => setSelectedIndex(i)) }
            className={`DropDownBox_Item${selectedIndex === i ? " DropDownBox_Item_Selected" : " pointer_cursor"}`}
        >
            <span>{(o.textDictionary && o.textDictionary[appLanguage]) || (o.text && getTranslation( translationProcess ? translationProcess : "_dropdown", o.text)) || o.value || o.key}</span>
        </div>)
    }, [selectedIndex, items, appLanguage, getTranslation, translationProcess]);

    const handleClickOutSelect = useCallback( (event: any) => handleClickOutDiv(event, selectRef, open, () => setOpen(false) ), [open]);

    useEffect(() => {
        const selected = items[selectedIndex];
        getSelectedOption({key: selected.key, value: selected.value});
        setOpen(false);
        dropdownRef.current && dropdownRef.current.focus();
        // eslint-disable-next-line
    }, [selectedIndex]);

    useEffect( () => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOutSelect);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener( "mousedown", handleClickOutSelect);
        };
        // eslint-disable-next-line
      }, [ handleClickOutSelect ] )

    const selectedItem = items[selectedIndex];

    return (
        <div className="DropDownInput" ref = {selectRef}>
            <div 
                onClick={() => setOpen(prev => !prev)} 
                className={`pointer_cursor DropDownBox${open ? " DropDownBoxOpen" : ""}`} 
                tabIndex= {0} 
                onKeyDown={(event) => executeClickEnterSpace(event, () => setOpen(prev => !prev))}
                ref={dropdownRef}
            >
                <div className="DropDownBox_Text">
                    {
                        (selectedItem.textDictionary && selectedItem.textDictionary[appLanguage]) || 
                        (selectedItem.text && getTranslation( translationProcess ? translationProcess : "_dropdown", selectedItem.text)) || 
                        selectedItem.value || 
                        selectedItem.key
                    }
                </div>
                <div className="DropDownBox_Arrow">
                    {open ? '▲' : '▼'}
                </div>
            </div>
            {open && <div className="DropDownBox_List">
                {itemList}
            </div>}
        </div>
    )
}

export default DropDown;