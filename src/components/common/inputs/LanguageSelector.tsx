import React, { useMemo } from 'react';
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

      return <>
        {appLanguage}
        <br />
        {availableLanguages.map((lang, i) => <div key={`Lang_${i}`} onClick={lang.Action}>{lang.Text}</div>)}
      </>

}

export default LanguageSelector;