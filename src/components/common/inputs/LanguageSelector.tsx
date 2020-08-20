import React, { useMemo, useState, useRef, useEffect } from 'react';
import useAppLanguageHandler from '../../../logic/context/App/AppLanguageContextHandler';
import useAppHandler from '../../../logic/context/App/AppContextHandler';

interface ILanguageList {
    Text: string;
    Action: () => void;
}

const LanguageSelector: React.FC = () => {
    const {App, ChangeLanguage} = useAppHandler();
    const {appLanguage} = useAppLanguageHandler();
    const [open, setOpen] = useState<boolean>(false);
    const langSelectorRef = useRef<HTMLDivElement>( null );

    const availableLanguages: ILanguageList[] = useMemo( () => {
        let langList: ILanguageList[] = [];
        App.languageCodes.forEach( item => {
            langList.push( {
            Text: item,
            Action: () => { ChangeLanguage(item) }
          } )
        })
    
        return langList;
        // eslint-disable-next-line
      }, [App.languageCodes] )

      const handleLanguageChange = (action: () => void): void => {
        action();
        setOpen(false);
      }

      const handleClickOut: ( event: any ) => void = ( event ) => {
        if ( open && langSelectorRef != null && langSelectorRef.current !== null && !langSelectorRef.current.contains( event.target ) ) {
          setOpen( false );
        }
      }

      useEffect( () => {
        // add when mounted
        document.addEventListener( "mousedown", handleClickOut );
        // return function to be called when unmounted
        return () => {
          document.removeEventListener( "mousedown", handleClickOut );
        };
        //eslint-disable-next-line
      }, [ open ] )

      return (
        <div className="LanguageSelector" ref={langSelectorRef}>
            <div onClick={ () => {setOpen((prevOpen) => !prevOpen)} } className = {"pointer_cursor LanguageSelector_Box" + (open ? " LanguageSelector_Box_Selected" : "")}>
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
                      key={`Lang_${i}`} 
                      onClick={lang.Text === appLanguage ? undefined : () => handleLanguageChange(lang.Action)} 
                      className = {"LanguageSelector_Item" + (lang.Text === appLanguage ? " LanguageSelector_Item_Disabled" : " pointer_cursor")}>
                        {lang.Text}
                    </div>)}
            </div>}
        </div>
      )
}

export default LanguageSelector;