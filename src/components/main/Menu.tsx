import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Row from '../common/structure/Row';
import Column, { ColumnNumber } from '../common/structure/Column';
import { IMenuItem } from './MenuComponents/MenuItem';
import SubMenu, { ISubMenuItem } from './MenuComponents/SubMenu';
import LoginForm from './MenuComponents/LoginForm';
import MenusBar from './MenuComponents/MenusBar';
import UserMenu, { IUserCustomMenu } from './MenuComponents/UserMenu';
import { PageType, handleClickOutDiv } from '../../logic/functions/misc';
import DotsLoader, { DotsLoaderColor, DotsLoaderSize, DotsLoaderNrBall } from '../common/presentation/loading/DotsLoader';
import useAppHandler from '../../logic/context/App/AppContextHandler';
import useLoginHandler from '../../logic/context/Login/LoginContextHandler';
import useAppLanguageHandler from '../../logic/context/App/AppLanguageContextHandler';

export interface IMenuProps {
  Brand?: string;
  MenuNav?: IMenuItem[];
  EnableNotifications?: boolean;
  NotificationsRoute?: PageType;
  NotificationRefreshTime?: number;
  CustomUserMenu?: IUserCustomMenu[];
}

const Menu: React.FC<IMenuProps> = ( {
  Brand,
  CustomUserMenu,
  EnableNotifications,
  MenuNav,
  NotificationRefreshTime,
  NotificationsRoute
} ) => {
  const appContext = useAppHandler();
  const loginContext = useLoginHandler().Login;
  const appLanguage = useAppLanguageHandler().appLanguage;
  const [ toogleLang, setToogleLang ] = useState<boolean>( false );
  const [ menuToogle, setMenuToogle ] = useState<boolean>( false );
  const langMenuRef = useRef<HTMLDivElement>( null );

  const handleClickOutLangMenu = useCallback( (event: any) => handleClickOutDiv(event, langMenuRef, toogleLang, () => setToogleLang( false ) ), [toogleLang]);

  const availableLanguages: ISubMenuItem[] = useMemo(() => {
    let langMenu: ISubMenuItem[] = [];
    appContext.App.languageCodes.forEach(item => {
      langMenu.push( {
        Title: item,
        Action: () => { appContext.ChangeLanguage(item) }
      } )
    })

    return langMenu;
    // eslint-disable-next-line
  },[appContext.App.languageCodes, appContext.ChangeLanguage])

  useEffect( () => {
    // add when mounted
    document.addEventListener( "mousedown", handleClickOutLangMenu );
    // return function to be called when unmounted
    return () => {
      document.removeEventListener( "mousedown", handleClickOutLangMenu );
    };
  }, [ handleClickOutLangMenu ] )

  return (
    <Row className='menuRow'>
      {
        loginContext !== undefined ?
          <Column full={ ColumnNumber.C16 } medium={ ColumnNumber.C11 } tablet={ menuToogle ? ColumnNumber.C12 : ColumnNumber.C4 }>
            <MenusBar Brand = {Brand} MenuNav = {MenuNav} toogle={ menuToogle } setToogle={ ( toogleVal ) => { setMenuToogle( toogleVal ) } } />
          </Column> :
          <Column full={ ColumnNumber.C13 } medium={ ColumnNumber.C11 } tablet={ menuToogle ? ColumnNumber.C13 : ColumnNumber.C4 }>
            <MenusBar Brand = {Brand} MenuNav = {MenuNav} toogle={ menuToogle } setToogle={ ( toogleVal ) => { setMenuToogle( toogleVal ) } } />
          </Column>
      }
      {
        loginContext !== undefined ?
          <Column full={ ColumnNumber.C3 } medium={ ColumnNumber.C7 } tablet={ menuToogle ? ColumnNumber.C6 : ColumnNumber.C14 } className="loginMenuCol">
              <UserMenu 
                NotificationsEnabled = {EnableNotifications} 
                CustomMenus = { CustomUserMenu } 
                NotificationsRoute = { NotificationsRoute }
                NotificationRefreshTime = { NotificationRefreshTime }
              />
          </Column> :
          <Column full={ ColumnNumber.C6 } medium={ ColumnNumber.C7 } tablet={ menuToogle ? ColumnNumber.C5 : ColumnNumber.C14 } className="loginMenuCol">
            <LoginForm />
          </Column>
      }
      <Column full={ ColumnNumber.C1 } medium={ ColumnNumber.C2 } tablet={ ColumnNumber.C2 } reference={ langMenuRef }>
        <div style={{textAlign:"right"}}>
          { appContext.App.loadingTranslation ? 
            <div style={{display:"inline-block", paddingTop:"5px", marginLeft:"50%"}}>
              <DotsLoader Color = {DotsLoaderColor.White} Size = {DotsLoaderSize.Medium} DotsNumber={DotsLoaderNrBall.One}/>
            </div>:
            <div className="menuLanguageCol pointer_cursor noselect" onClick={ () => setToogleLang( !toogleLang ) }>
              <span tabIndex={ 0 } className={ ( toogleLang ? ' menuItemColSel' : '' ) }>{ appLanguage }</span>
            </div> 
          }
        </div>
        { toogleLang && <SubMenu
          unToogle={ () => setToogleLang( false ) }
          subMenu={ availableLanguages }
          className='subMenuDropLang'
        /> }
      </Column>
    </Row>
  );
}

export default Menu;