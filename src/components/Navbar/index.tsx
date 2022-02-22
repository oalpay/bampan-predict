import UserMenu from 'components/Menu/UserMenu'
import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn } from './NavbarElements'

const Navbar = () => {
  const style = {
    marginRight:'10px'
  };
  return (
    <>
      <Nav>
        <Bars />
        <NavBtn>
          <img src="/hippo-white.svg" alt="logo" width="24px" style={style} />
          <img src="/Hippo-predict.png" alt="logo" width="170px" />
        </NavBtn>
        <NavMenu>
          <NavLink to="/">Prediction</NavLink>
          <NavLink to="/vote">Vote Pair</NavLink>
          <NavLink to="/raffle">Raffle</NavLink>
          <NavLink to="/predictions/leaderboard">Leaderboard</NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        {/* <NavBtn> */}
          <UserMenu />
        {/* </NavBtn> */}
      </Nav>
    </>
  )
}

export default Navbar
