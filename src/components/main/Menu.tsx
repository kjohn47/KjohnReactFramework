import React, { useContext } from 'react';
import { AppContext, AppLanguageContext } from '../../common/config/appConfig';
import { ContextActions, AppLanguage } from '../../common/context/appContextEnums';
import Button from '../common/Button';

const Menu: React.FC = ( props ) => {
  const setAppContext = useContext( AppContext )[1];
  const [ appLanguage ] = useContext( AppLanguageContext );

  return (
    <div className="center_menu_button">
      <Button className="button_width" onClick={ () => { setAppContext( { type: ContextActions.ChangeLanguage, payload: { globalLanguage: appLanguage === AppLanguage.PT ? AppLanguage.EN : AppLanguage.PT } } )} } >
        { "Language: " }&rarr;{ " " + ( appLanguage === AppLanguage.EN ? "PT" : "EN" ) }
      </Button>
    </div>
  );
}

export default Menu;