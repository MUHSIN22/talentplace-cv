import React, { useRef } from 'react'
import homeBannerImage from '../../Assets/Home Banner.svg'
import bannerWave from '../../Assets/Banner wave.png'
import bannerBackground from '../../Assets/Banner background.gif'
import credibilityBadge from '../../Assets/credibility badge.png'
import lineBackground from '../../Assets/line background.png'
import orangeWave from '../../Assets/orange wave.png'
import slide1 from '../../Assets/home slider/slide 1.jpg'
import slide2 from '../../Assets/home slider/slide 2.jpg'
import slide3 from '../../Assets/home slider/slide 3.jpg'
import demoVideo from '../../Assets/video/Testimonial video.m4v'
import { GrPlayFill } from 'react-icons/gr'
import { IoMdPause } from 'react-icons/io'
import { AiFillCloseCircle, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import './Home.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import ResumeSlider from '../ResumeSlider/ResumeSlider'
import Lottie from 'react-lottie'
import graphAnimation from '../../Assets/Animations/graphAnimation.json'
import circle from '../../Assets/circle.png'
import Section2Animation from '../../AnimatedComponents/Section2Animation/Section2Animation'
import Section3Animation from '../../AnimatedComponents/Section3Animation/Section3Animation'
import BannerAnimation from '../../AnimatedComponents/bannerAnimation/BannerAnimation'
import t20Banner from '../../Assets/t20 banner.png'
import {ImQuotesLeft} from 'react-icons/im'

let team = [
    {
        name: 'Anuradha',
        designation: "Team Lead",
        company: "Accenture",
        image: slide1,
        testimonial: "Talentplace cv builder is highly recommended for experienced professionals. Even if you are not looking for a switch, this CV builder will show you the trajectory of your career and help you to plan it further. its roles and responsibility analysis and suggestion is impressive."
    },
    {
        name: 'Roshni Rawat',
        designation: "Senior Associate",
        company: "Larsen & Toubro Infotech",
        image: slide2,
        testimonial: "TalentPlace cv builder is the most potent and must-use tool for growing professionals. It has very few data input points, and in most places, it uses its intelligent mechanism to analyze your skills, roles, responsibilities, etc., and develop a stunning resume."
    },
    {
        name: 'Tulsi Gurung',
        designation: "Marketing Specialist",
        company: "Book my Wizard",
        image: slide3,
        testimonial: "I am wowed with this website. Putting my experience into words was the most challenging task for me, but with the help of TalentPlace CV builder, I created my CV within no time and with complete professionalism. It helped me represent my true self."
    }
]


export default function Home() {
    const [credibilityMeter, setCredibilityMeter] = useState(0)
    const [isPlaying, setPlaying] = useState(false)
    const [itemCount, setItemCount] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const [marginLeft, setMarginLeft] = useState(0);
    const [tBanner, setTBanner] = useState(true)
    const sliderRef = useRef(null);
    const teamSectionRef = useRef(null);
    const [link, setLink] = useState('')

    const defaultOptions = {
        loop: true,
        autoplay: true,
        renderer: 'svg'
    }

    useEffect(() => {
        setInterval(() => {
            setCredibilityMeter((prev) => {
                if (prev === 30) {
                    return 0
                } else {
                    return prev + 1
                }
            })
        }, 300)

        // setItemCount(sliderRef.current.children[1].children.length);
        // setSlideWidth(sliderRef.current.offsetWidth);
    }, [])

    const navigateSlider = (direction) => {
        teamSectionRef.current.classList.add("team-section-animation");
        setTimeout(() => {
            teamSectionRef.current.classList.remove("team-section-animation")
        }, 600)

        if (direction === 1) {
            if (marginLeft > 0) {
                setMarginLeft((prev) => prev - 1)
            }

        } else if (direction === -1) {
            if (marginLeft < 2) {

                setMarginLeft((prev) => prev + 1)
            }
        }
    }

    const playAndPauseVideo = () => {
        let video = document.querySelector('.video-player')
        if (isPlaying) {
            video.pause()
            setPlaying(false)
            return
        }
        video.play();
        setPlaying(true)
    }

    // useEffect(() => {
    //     API.post("/download-sample-file",{user_id: 203})
    //         .then((res) => {
    //             setLink(res.data.data.message)
    //         })
    // },[])
    return (
        <>
            {/* <Header /> */}
            <main className="home-page">
                <section className="home-banner" >
                    {
                        tBanner &&
                        <div className="t20-wrapper">
                            <div className="t20-close-wrapper" onClick={() => { console.log('here'); setTBanner(false) }}>
                                <AiFillCloseCircle className='t20-close' />
                            </div>
                            <img src={t20Banner} alt="" className="t20-banner" onClick={() => window.open("https://t20.talentplace.ai")} />
                        </div>
                    }
                    <div className="banner-content-wrapper">
                        <h1 className="banner-title">
                            Build a Data-Driven
                            <br />
                            <span>Intelligent Resume,</span>
                            <br />
                            in 11 Minutes
                        </h1>
                        <Link to="/signup" className='btn-primary'>Get Started</Link>
                    </div>
                    <div className="banner-image-wrapper">
                        <BannerAnimation />
                        {/* <img src={bannerBackground} alt="TalentPlace Resume Builder" className="banner-image" /> */}
                        {/* <Lottie options={{...defaultOptions,animationData: bannerAnimation}} className="banner-image" /> */}
                    </div>
                    {/* <img src={bannerWave} className="banner-wave" alt="" /> */}
                    <svg id="wave" className='common-wave banner-wave' style={{ transform: 'rotate(0deg)', transition: '0.3s' }} viewBox="0 0 1440 110" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(239, 238, 228, 1)" offset="0%"></stop><stop stop-color="rgba(239, 238, 228, 1)" offset="100%"></stop></linearGradient></defs><path style={{ transform: 'translate(0, 0px)', opacity: 1 }} fill="url(#sw-gradient-0)" d="M0,77L24,75.2C48,73,96,70,144,60.5C192,51,240,37,288,34.8C336,33,384,44,432,53.2C480,62,528,70,576,69.7C624,70,672,62,720,64.2C768,66,816,77,864,71.5C912,66,960,44,1008,34.8C1056,26,1104,29,1152,40.3C1200,51,1248,70,1296,66C1344,62,1392,37,1440,27.5C1488,18,1536,26,1584,33C1632,40,1680,48,1728,47.7C1776,48,1824,40,1872,42.2C1920,44,1968,55,2016,58.7C2064,62,2112,59,2160,47.7C2208,37,2256,18,2304,22C2352,26,2400,51,2448,51.3C2496,51,2544,26,2592,25.7C2640,26,2688,51,2736,55C2784,59,2832,40,2880,33C2928,26,2976,29,3024,25.7C3072,22,3120,11,3168,9.2C3216,7,3264,15,3312,31.2C3360,48,3408,73,3432,86.2L3456,99L3456,110L3432,110C3408,110,3360,110,3312,110C3264,110,3216,110,3168,110C3120,110,3072,110,3024,110C2976,110,2928,110,2880,110C2832,110,2784,110,2736,110C2688,110,2640,110,2592,110C2544,110,2496,110,2448,110C2400,110,2352,110,2304,110C2256,110,2208,110,2160,110C2112,110,2064,110,2016,110C1968,110,1920,110,1872,110C1824,110,1776,110,1728,110C1680,110,1632,110,1584,110C1536,110,1488,110,1440,110C1392,110,1344,110,1296,110C1248,110,1200,110,1152,110C1104,110,1056,110,1008,110C960,110,912,110,864,110C816,110,768,110,720,110C672,110,624,110,576,110C528,110,480,110,432,110C384,110,336,110,288,110C240,110,192,110,144,110C96,110,48,110,24,110L0,110Z"></path></svg>
                </section>

                <section className="easy-build-section container-padding">
                    <div className="easy-build-image-wrapper">
                        <Section2Animation />
                        {/* <Lottie options={{...defaultOptions, animationData: secondSectionAnimation}} className="easy-build-image" /> */}
                        {/* <img src={secondSectionImage} alt="" className="easy-build-image" /> */}
                    </div>
                    <div className="easy-build-content-wrapper">
                        <h2 className="title-secondary">Wow recruiters and get more interview calls</h2>
                        <h3 className="para-primary">
                            Just fill in your current designation and our AI-engine will fetch a convincing description and roles & responsibilities fitting your profile, along with useful insights for your career
                        </h3>
                        <hr />
                        <div className="easy-build-list-wrapper">
                            <ul className="easy-build-list">
                                <li>
                                    <span></span>
                                    <p>Visually appealing resume with graphical representation of your career progression</p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>ATS-friendly resume builder to get past the tracking systems of top companies</p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>Get data-driven insights on how to advance on your career ladder.</p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>Suggested resume templates designed by a team of HR experts</p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>Easily downloadable and shareable resume format you can use to apply for jobs and feature on LinkedIn.</p>
                                </li>
                            </ul>
                        </div>
                        <Link to="/signup" className='btn-primary'>Build My Resume</Link>
                    </div>
                </section>

                <section className="skill-industry-section container-padding">
                    <div className="skill-industry-content">
                        <h2 className="title-secondary">Skill & Industry <br /> Focussed Resume</h2>
                        <h3 className="para-primary">
                            Instead of using vague and non-measurable terms like proficient, highly-skilled, result-driven, etc, we feature your best skills and your level of expertise in each of those. This will help you match with best suited job roles and increase your chances of getting an interview
                        </h3>
                    </div>
                    <div className="skill-industry-image-wrapper">
                        {/* <Lottie options={{...defaultOptions,animationData:easyBuildAnimation}} className="skill-industry-image"/> */}
                        <Section3Animation />
                        {/* <img src={thirdSectionImage} alt="" className="skill-industry-image" /> */}
                    </div>
                </section>

                <section className="credibility-section container-padding">
                    <div className="credibility-meter-wrapper">
                        <img src={credibilityBadge} alt="" className="credibility-badge" />
                        <h6 className="credibility-meter-title">Congratulations</h6>
                        <p className="credibility-meter-description">You have earned expert badge in Java</p>
                        <div className="credibility-meter">
                            <h1 className="credibility-meter-counter">{credibilityMeter}/30</h1>
                        </div>
                        <Link to="/" className='btn-primary'>Take more test</Link>
                    </div>
                    <div className="credibility-content">
                        <h2 className="title-secondary">Increase credibility <br />through Assessment <br />badges</h2>
                        <h3 className="para-primary">
                            Proven skills serve as a point of differentiation. Stand out from competition and let hiring managers verify your skills through skill badges. Take free assessment tests and show off your score on your dynamic resume to increase your chances of getting hired
                        </h3>
                    </div>
                </section>

                <section className="analytics-section" style={{ backgroundImage: `url('${lineBackground}')` }}>
                    <div className="analytics-content">
                        <h2 className="title-secondary">Analytics that <br />measures your growth</h2>
                        <h3 className="para-primary">
                            Visually present your growth trajectory in the same company (promotions & appraisals). Back up your achievements with numbers. Your important metrics like sales numbers, customer satisfaction ratings, or tickets completed will be highlighted in your dynamic resume to let employers know you mean business.
                        </h3>
                    </div>
                    <div className="analytics-image-wrapper">
                        <Lottie options={{ ...defaultOptions, animationData: graphAnimation }} className="analytics-image" />
                        {/* <img src={fifthSectionImage} className="analytics-image" alt="" /> */}
                    </div>
                    <img src={orangeWave} alt="" className="analytics-wave" />
                </section>

                <section className="video-section container-padding">
                    <div className="video-wrapper">
                        <video width="100%" height="auto" controls={isPlaying} className='video-player'>
                            <source src={demoVideo} />
                        </video>
                        {
                            !isPlaying &&
                            <div className="play-pause-wrapper">
                                <div className="play-and-pause-icon" onClick={playAndPauseVideo}>
                                    {
                                        !isPlaying ?
                                            <GrPlayFill />
                                            :
                                            <IoMdPause />
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className="video-content-wrapper">
                        <h2 className="title-secondary">What the Top <br />HR Leaders have to say?</h2>
                        <h3 className="para-primary">
                            Let's hear it from the experts who know it the best. Top hiring experts share their views on the best resumes they have seen, tips to craft a hireable resume, what makes them tick a candidate, along with meaningful career advice on getting hired by top companies.
                        </h3>
                        <hr />
                        <div className="video-list-wrapper">
                            <ul className="video-list">
                                <li>
                                    <span></span>
                                    Amazon
                                </li>
                                <li>
                                    <span></span>
                                    United Health Group
                                </li>
                            </ul>
                            <ul className="video-list">
                                <li>
                                    <span></span>
                                    Cisco
                                </li>
                                <li>
                                    <span></span>
                                    Accenture
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* <section className="team-section container-padding">
                    {/* <img src={circle} className="bg-circle" alt="" /> */}
                    <div className="testimonial-circle">
                        <div className="testimonial-inner-circle"></div>
                    </div>
                    <div className="testimonial-card-wrapper">
                        {
                            team.map((member, index) => (
                                <div className="testimonial-card" key={index}>
                                    <img src={member.image} alt="" className="testimonial-profile" />
                                    <div className="name-and-des">
                                        <h5 className="testimonial-name">{member.name}</h5>
                                        <p className="testimonial-des">{member.designation} ({member.company})</p>
                                    </div>
                                    <p className="testimonial-content">
                                        <ImQuotesLeft className="card-quote"/>
                                        {member.testimonial}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                    {/* <div className="team-content" ref={teamSectionRef}>
                        <p className="team-para">
                            {team[marginLeft].testimonial}
                        </p>
                        <strong className="team-member-name">{team[marginLeft].name}</strong>
                        <p className="team-member-designation">{team[marginLeft].designation}</p>
                        <p className="team-member-company">{team[marginLeft].company}</p>
                    </div>
                    <div className="team-slider" ref={sliderRef}>
                        <div className="slider-nav-wrapper">
                            <div className="slider-nav" onClick={() => navigateSlider(-1)}>
                                <AiOutlineLeft />
                            </div>
                            <div className="slider-nav" onClick={() => navigateSlider(1)}>
                                <AiOutlineRight />
                            </div>
                        </div>
                        <div className="team-slider-wrapper" style={{
                            gridTemplateColumns: `repeat(${itemCount},${slideWidth}px)`,
                            marginLeft: `-${marginLeft * slideWidth}px`
                        }}>
                            <img src={slide1} alt="Accenture " width="100px" className="team-slide" />
                            <img src={slide2} alt="L&T Infotech " width="100px" className="team-slide" />
                            <img src={slide3} alt="Marketing Strategiest " width="100px" className="team-slide" />
                        </div>
                    </div> */}
                </section> */}

                <section className="resume-section container-padding">
                    <h2 className="title-secondary">Pick a resume template. <br /> that defines you best.</h2>
                    <h3 className="para-primary">
                        Show off your skills and impress your future employer through these job-winning resume templates.
                    </h3>
                    <ResumeSlider />
                </section>

                <section className="footer-home container-padding">
                    <div className="footer-image-wrapper">
                        <img src={homeBannerImage} alt="Resume Maker TalentPlace" className="footer-image" />
                    </div>
                    <div className="footer-content">
                        <h2 className="title-secondary">Let your resume do <br />the work</h2>
                        <h3 className="para-primary">
                            Join 1,300,000 job seekers worldwide and get hired faster with your best resume yet
                        </h3>
                        <Link to="/signup" className='btn-primary' >Get Started</Link>
                    </div>
                </section>
            </main>
        </>
    )
}
