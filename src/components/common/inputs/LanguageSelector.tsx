import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import useAppLanguageHandler from '../../../logic/context/App/AppLanguageContextHandler';
import useAppHandler from '../../../logic/context/App/AppContextHandler';
import { handleClickOutDiv, executeClickEnterSpace } from '../../../logic/functions/misc';

interface ILanguageList {
    Text: string;
    Action: () => void;
}

const LanguageSelector: React.FC = () => {
    const {App, ChangeLanguage} = useAppHandler();
    const {appLanguage} = useAppLanguageHandler();
    const [open, setOpen] = useState<boolean>(false);
    const langSelectorRef = useRef<HTMLDivElement>( null );
    const langDropBoxRef = useRef<HTMLDivElement>(null);

    const availableLanguages: ILanguageList[] = useMemo( () => {
        let langList: ILanguageList[] = [];
        App.languageCodes.forEach( item => {
            langList.push( {
            Text: item,
            Action: () => { ChangeLanguage(item) }
          } )
        })
    
        return langList;
      }, [App.languageCodes, ChangeLanguage] )

      const handleLanguageChange = (action: () => void): void => {
        action();
        setOpen(false);
        langDropBoxRef.current && langDropBoxRef.current.focus();
      }

      const handleClickOutLang = useCallback( (event: any) => handleClickOutDiv(event, langSelectorRef, open, () => setOpen( false ) ), [open]);

      useEffect( () => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOutLang );
        // return function to be called when unmounted
        return () => {
          document.removeEventListener( "mousedown", handleClickOutLang );
        };
      }, [ handleClickOutLang ] )

      return (
        <div className="LanguageSelector" ref={langSelectorRef}>
            <div 
              ref = {langDropBoxRef}
              onClick={ () => {setOpen((prevOpen) => !prevOpen)} } 
              className = {"pointer_cursor LanguageSelector_Box" + (open ? " LanguageSelector_Box_Selected" : "")}
              onKeyDown={(event) => executeClickEnterSpace(event, () => setOpen((prevOpen) => !prevOpen))}
              tabIndex={0}
            >
                <div className = "LanguageSelector_Box_Text">
                    {appLanguage}
                </div>
                <div className = "LanguageSelector_Box_Arrow">
                    {open ? '▲' : '▼'}
                </div>
            </div>
            {open && <div className="LanguageSelector_List">
                {availableLanguages.map((lang, i) => 
                    <div 
                      tabIndex = {lang.Text === appLanguage ? undefined : 0}
                      key={`Lang_${i}`} 
                      onClick={lang.Text === appLanguage ? undefined : () => handleLanguageChange(lang.Action)} 
                      className = {"LanguageSelector_Item" + (lang.Text === appLanguage ? " LanguageSelector_Item_Disabled" : " pointer_cursor")}
                      onKeyDown={(event) => executeClickEnterSpace(event, () => handleLanguageChange(lang.Action))}  
                    >
                        {lang.Text}
                    </div>)}
            </div>}
        </div>
      )
}

export default LanguageSelector;