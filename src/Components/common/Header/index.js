import React from 'react'
import'./style.css'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const user = useSelector(state => state.user.user)
  const location=useLocation();
  const currentPath=location.pathname;
  return (
    <div className='nav'>
      <div className='gradient'></div>
          <div className='links'>
          {!user && (
          <Link to="/signup" className="signup" style={{ color: "rgb(159, 166, 248)" }}>
            SignUp
          </Link>
        )}
            <Link to="/" className={currentPath=="/home" ? "active" :""}>home</Link>
            <Link to={`/podcasts`} className={currentPath=="/podcasts" ? "active" :""}>Podcast</Link>
            <Link to="/create-a-podcast" className={currentPath=="/create-a-podcast" ? "active" :""}>Start A Podcast</Link>
            <Link to={`/profile/${user?.uid}`} className={currentPath=="/profile" ? "active" :""}>Profile</Link>
          </div>
     </div>
   
  )
}

export default Header;