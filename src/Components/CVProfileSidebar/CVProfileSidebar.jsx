import React from 'react'
import './CVProfileSidebar.css'
import logo from "../../Assests/sidebarLogo.png";
import { NavLink, useNavigate } from 'react-router-dom';
import myProfile from '../../Assets/sidebar icons/my profile.png'
import membership from '../../Assets/sidebar icons/membership.png'
import settings from '../../Assets/sidebar icons/settings.png'
import logoutIcon from '../../Assets/sidebar icons/logout.png'
import referalIcon from '../../Assets/sidebar icons/my portfolio.png'
import { useRef } from 'react';
import { reload, resetResume } from '../../redux/Features/ResumeSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/Features/AuthenticationSlice';

export default function CVProfileSidebar() {
    const sidebarRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleSidebar = (event) => {
        let isActive = document.querySelector('.breadcrump--active')
        event.target.classList.toggle("breadcrump--active")
        sidebarRef.current.classList.toggle("cv-profile-sidebar--active")
        if (!isActive) {
            document.querySelector(".cv-profile-container").classList.add("cv-profile-container--expaned")
        } else {
            document.querySelector(".cv-profile-container").classList.remove("cv-profile-container--expaned")
        }
    }

    const logoutUser = () => {
        let isConfirm = window.confirm("Are you sure to logout?");
        if (isConfirm) {
            navigate('/')
            sessionStorage.clear();
            sessionStorage.removeItem("persist:authentication")
            dispatch(logout());
            dispatch(resetResume())
            dispatch(reload())
        }
    };

    return (
        <nav className="cv-profile-sidebar" ref={sidebarRef}>
            <div className="sidebar-toggle-wrapper">
                <img src={logo} alt="Talentplace" className="sidebar-logo" />
                <div className="breadcrump" onClick={toggleSidebar}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
            </div>
            <div className="sidebar-links-wrapper">
                <NavLink to="/dashboard/cv" className="sidebar-link">
                    <img src={myProfile} alt="" className="sidebar-link-icon" />
                    <span className='sidebar-link-text'>My Profile</span>
                </NavLink>
                <NavLink to="/dashboard/plans" className="sidebar-link">
                    <img src={membership} alt="" className="sidebar-link-icon" />
                    <span className='sidebar-link-text'>Membership</span>
                </NavLink>
                <NavLink to="/dashboard/referal" className="sidebar-link">
                    <img src={referalIcon} alt="" className="sidebar-link-icon" />
                    <span className='sidebar-link-text'>Refer</span>
                </NavLink>
                <NavLink to="/dashboard/settings" className="sidebar-link">
                    <img src={settings} alt="" className="sidebar-link-icon" />
                    <span className='sidebar-link-text'>Settings</span>
                </NavLink>
                <div onClick={logoutUser} className="sidebar-link">
                    <img src={logoutIcon} alt="" className="sidebar-link-icon" />
                    <span className='sidebar-link-text'>Logout</span>
                </div>
            </div>
        </nav>
    )
}
