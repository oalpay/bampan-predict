import UserMenu from 'components/Menu/UserMenu'
import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavBtn>
          <p>Bambam predict</p>
        </NavBtn>
        <NavMenu>
          <NavLink to="/">Prediction</NavLink>
          <NavLink to="/raffle">Raffle</NavLink>
          <NavLink to="/predictions/leaderboard">Leaderboard</NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <UserMenu />
        </NavBtn>
      </Nav>
    </>
  )
}

export default Navbar
