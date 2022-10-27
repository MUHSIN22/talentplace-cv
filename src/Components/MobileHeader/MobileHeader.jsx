import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/sidebarLogo.png'
import sideBarData from '../../JSON DB/sideBarData'
import { changePageOn } from '../../redux/Features/ResumeSlice'
import './MobileHeader.css'

export default function MobileHeader() {
    const [isExpanded,setExpansion] = useState(false)
    const navOptionsRef = useRef(null)
    const hamRef = useRef(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hamClickHandler = (event) => {
        event.target.classList.toggle("hamburger--active");
        navOptionsRef.current.classList.toggle("mobile-nav-menu--active")
    }
 
    const hideMenu = () => {
        navOptionsRef.current.classList.remove("mobile-nav-menu--active")
        hamRef.current.classList.remove("hamburger--active")
    }

    const logout = () => {
        let isConfirm = window.confirm("Are you sure to logout?");
        if(isConfirm){
          navigate('/')
          dispatch(logout());
        }
      };

    return (
        <header className="mobile-header">
            <Link to="/" className='header-logo'>
                <img src={logo} alt="" />
            </Link>
            <ul className="hamburger" onClick={hamClickHandler} ref={hamRef}>
                <li className="burger-layer"></li>
                <li className="burger-layer"></li>
                <li className="burger-layer"></li>
            </ul>
            <nav className="mobile-nav-menu" ref={navOptionsRef}>
                <ul className="menu-list">
                    <li className="expandable" onClick={() => navigate('/dashboard/cv')}>
                        <span>My Profile {/*{isExpanded?"-":"+"}*/}</span>
                        {/* {
                            isExpanded&&
                            <ul className="expand-list">
                            {
                                sideBarData.map((item,index) => {
                                    return <li className="expand-option" onClick={()=>{ 
                                        dispatch(changePageOn(item.link))
                                        hideMenu()
                                    }} key={index}>{item.title}</li>
                                })
                            }
                            </ul>
                        } */}
                    </li>
                    <li className="link" onClick={hideMenu}>
                        <Link to="/dashboard/plans">Membership</Link>
                    </li>
                    <li className="link" onClick={hideMenu}>
                        <Link to="/dashboard/referal">Refer</Link>
                    </li>
                    <li className="link" onClick={hideMenu}>
                        <Link to="/dashboard/settings">Settings</Link>
                    </li>
                    <li onClick={logout}>Logout</li>
                </ul>
            </nav>
        </header>
    )
}
