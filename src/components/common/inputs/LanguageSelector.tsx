import React, { useMemo, useState } from 'react';
import useAppLanguageHandler from '../../../logic/context/App/AppLanguageContextHandler';
import useAppHandler from '../../../logic/context/App/AppContextHandler';
import { AppLanguage } from '../../../logic/context/App/appContextEnums';

interface ILanguageList {
    Text: string;
    Action: () => void;
}

const LanguageSelector: React.FC = () => {
    const {ChangeLanguage} = useAppHandler();
    const {appLanguage} = useAppLanguageHandler();
    const [open, setOpen] = useState<boolean>(false);

    const availableLanguages: ILanguageList[] = useMemo( () => {
        let langList: ILanguageList[] = [];
        for ( let item in AppLanguage ) {
            langList.push( {
            Text: item,
            Action: () => { ChangeLanguage(item as AppLanguage) }
          } )
        }
    
        return langList;
        // eslint-disable-next-line
      }, [] )

      const handleLanguageChange = (action: () => void): void => {
        action();
        setOpen(false);
      }

      return (
        <div className="LanguageSelector">
            <div onClick={ () => {setOpen((prevOpen) => !prevOpen)} } className = "pointer_cursor LanguageSelector_Box">
                <div className = "LanguageSelector_Box_Text">
                    {appLanguage}
                </div>
                <div className = "LanguageSelector_Box_Arrow">
                    {open ? '▲' : '▼'}
                </div>
            </div>
            {open && <div className="LanguageSelector_List">
                {availableLanguages.map((lang, i) => 
                    <div key={`Lang_${i}`} onClick={() => handleLanguageChange(lang.Action)} className = "pointer_cursor LanguageSelector_Item">
                        {lang.Text}
                    </div>)}
            </div>}
        </div>
      )
}

export default LanguageSelector;