import React, { useContext, useState } from 'react';
import { AppContext, AppLanguageContext } from '../../common/config/appConfig';
import { ContextActions, AppLanguage, KnownPages } from '../../common/context/appContextEnums';
import Button from '../common/Button';
import PageSelector from '../common/PageSelector';

interface IMenuItem {
  Title: string;
  Link?: KnownPages;  
  SubMenus?: ISubMenuItem[];
}

interface ISubMenuItem {
  Title: string;
  Link?: KnownPages;
}

export interface IMenuProps {
  Brand?: string;
  MenuNav?: IMenuItem[];
}

const Menu: React.FC<IMenuProps> = ( props ) => {
  const setAppContext = useContext( AppContext )[1];
  const [ appLanguage ] = useContext( AppLanguageContext );  

  return (
    <>
      {props.Brand && <span>&nbsp;<PageSelector page = {KnownPages.Home}>{props.Brand}</PageSelector>&nbsp;</span>}
      <span>&nbsp;&nbsp;</span>
      {
        props.MenuNav && props.MenuNav.map( ( menu, i ) => 
            <MenuItem key = {'menu_' + i} {...menu} />
        )
      }
      <span>
        <Button className="button_width" onClick={ () => { setAppContext( { type: ContextActions.ChangeLanguage, payload: { globalLanguage: appLanguage === AppLanguage.PT ? AppLanguage.EN : AppLanguage.PT } } )} } >
          { "Language: " }&rarr;{ " " + ( appLanguage === AppLanguage.EN ? "PT" : "EN" ) }
        </Button>
      </span>
    </>
  );
}

const MenuItem: React.FC<IMenuItem> = (props) => {
  const[toogle, setToogle] = useState<boolean>(false);
  
  const makeSubMenu = (subMenu: ISubMenuItem) => 
  {
    if(subMenu.Link)
    {
      return <PageSelector page = {subMenu.Link}>{subMenu.Title}</PageSelector>
    }
    return subMenu.Title
  } 

  const makeMenu = (menu: IMenuItem) => 
  {
    if(menu.Link){
      return <PageSelector page = {menu.Link}>{menu.Title}</PageSelector>
    }
    if(menu.SubMenus)
    {
      return <>
        <div>{menu.Title}</div>
          {menu.SubMenus.map( ( subMenu, i ) =>
            <span key={'SubMenu_' + i}>
              {makeSubMenu(subMenu)}
            </span>
          )}
      </>
    }
    return menu.Title;
  }

  return <span onClick = {() => setToogle(!toogle)}>
            &nbsp;|{makeMenu(props)}|&nbsp;
        </span>
}

export default Menu;