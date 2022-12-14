import React from 'react'
import './Referral.css'
import amount from '../../Assets/referal/icon 3.png'
import spread from '../../Assets/referal/icon 2.png'
import friend from '../../Assets/referal/icon 1.png'
import referalIllu from '../../Assets/referal/referal-illu.png'
import { BsFacebook, BsLinkedin } from 'react-icons/bs'
import { MdContentCopy } from 'react-icons/md'
import { IoLogoWhatsapp } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { selectResumeDetails } from '../../redux/Features/ResumeSlice'
import shareInvitaion from '../../functionUtils/shareInvitaion'

export default function Referral() {
    const resumeDetails = useSelector(selectResumeDetails)

    const handleInvitation = (media) => {
        shareInvitaion(media, resumeDetails.referral_code)
    }
    return (
        <div className="referal-page-container">
            <div className="referal-landing">
                <div className="referal-landing-left">
                    <h1 className="referal-title">
                        Invite your friends to TalentPlace
                    </h1>
                    <p className="referal-description">
                        Invite your friends to TalentPlace and get Rs.100/-
                        credit when your friend subscribes to any of our
                        awesome plans.  <br />
                        They get an instant credit of Rs.100/- on signup!
                    </p>
                    <div className="btn btn-invite">
                        Invite
                        <div className="social-link-invite">
                            <IoLogoWhatsapp onClick={() => handleInvitation('whatsapp')} className='tooltip-icon wp-icon' />
                            <BsFacebook onClick={() => handleInvitation('facebook')} className='tooltip-icon fb-icon' />
                            <BsLinkedin onClick={() => handleInvitation('linkedin')} className='tooltip-icon in-icon' />
                            <MdContentCopy onClick={() => handleInvitation('copy')} className='tooltip-icon cp-icon' />
                        </div>
                    </div>
                </div>
                <img src={referalIllu} alt="" className="referal-main-illustatration" />
                <strong className="referal-points">Referral Credit available: 200 Points</strong>
            </div>
            <section className="step-section">
                <h1 className="referal-section-heading">Three Easy Steps</h1>
                <div className="steps-wrapper">
                    <div className="step-card">
                        <img src={spread} className="step-card-icon" alt="" />
                        <p className="step-card-text">Spread the word by email or with your link via social sharing</p>
                    </div>
                    <div className="step-card">
                        <img src={friend} className="step-card-icon" alt="" />
                        <p className="step-card-text">Your friend signs up to Talenplace & gets 100 Points on their first purchase</p>
                    </div>
                    <div className="step-card">
                        <img src={amount} className="step-card-icon" alt="" />
                        <p className="step-card-text">You get 10% of their first order amount, up to ???100</p>
                    </div>
                </div>
            </section>

            <section className="section-condition">
                <h1 className="referal-section-heading">Don't Let Your Friends Waste Another Minute</h1>
                <p className="condition-text">Nobody likes to waste time. That's why Talentplace empowers entrepreneurs to connect with pros who can help them do more with less. You've experienced this power. Now, you can share it and earn up to ???100 for every friend who signs up and makes their first order.</p>
                <a href="">Read More.</a>
            </section>
        </div>
    )
}
