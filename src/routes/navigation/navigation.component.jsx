import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import { signOutUser } from "../../utils/firebase/firebase.utils"; 

import {NavigationContainer, LogoContainer, NavLinksContainer, NavLink} from './navigation.styles'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

    return (
      <Fragment>
        <NavigationContainer>

            <LogoContainer to='/'>
                <CrwnLogo className='logo' />
            </LogoContainer>

            <NavLinksContainer>
                <NavLink to= '/shop'>
                    SHOP
                </NavLink>
                { currentUser ? (
                  <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                ) : (
                  <NavLink to= '/auth'>
                  SIGN-IN
                  </NavLink>
                )}
                <CartIcon/>
            </NavLinksContainer>
            {isCartOpen && <CartDropDown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

export default Navigation