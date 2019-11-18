import React, { useContext } from 'react';
import { AppContext } from '../../common/config/appConfig';
import { ContextActions, AppLanguage } from '../../common/context/appContextEnums';
import Button from '../common/Button';

const Menu: React.FC = () => {
    const [appContext, setAppContext] = useContext( AppContext );

    return (
      <div className = "center_menu_button">        
          <Button className = "button_width" onClick = { () => {setAppContext( { type: ContextActions.ChangeLanguage, payload: { globalLanguage: appContext.globalLanguage === AppLanguage.PT ? AppLanguage.EN : AppLanguage.PT } } ) } } >
            { "Language: "}&rarr;{ " " +( appContext.globalLanguage === AppLanguage.EN ? "PT" : "EN" ) }
          </Button>        
      </div>
    );
}

export default Menu;