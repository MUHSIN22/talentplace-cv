import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCertificate, SelectDocuments, selectHobbies, selectSocialContribution, selectSocilaLinks, selectVideo } from '../../redux/Features/ResumeSlice'
import CareerTimeline from '../CVComponents/career timeline/CareerTimeline'
import Certificates from '../CVComponents/Certificates/Certificates'
import DocFiles from '../CVComponents/DocFiles/DocFiles'
import Education from '../CVComponents/Education/Education'
import Experience from '../CVComponents/Experience/Experience'
import Hobbies from '../CVComponents/Hobbies/Hobbies'
import LanguageSection from '../CVComponents/LanguageSection/LanguageSection'
import PersonalProfile from '../CVComponents/personalProfile/PersonalProfile'
import SocialContribution from '../CVComponents/SocialContribution/SocialContribution'
import SocialMedia from '../CVComponents/SocialMedia/SocialMedia'
import VideoFiles from '../CVComponents/VideoFiles/VideoFiles'
import './MainCV.css'

export default function MainCV() {
  const socialLinks = useSelector(selectSocilaLinks)
  const contributions = useSelector(selectSocialContribution)
  const videoFiles = useSelector(selectVideo)
  const documents = useSelector(SelectDocuments)
  const hobbies = useSelector(selectHobbies)
  const certificates = useSelector(selectCertificate)

  const [isSocialLinks,setIsSocialLinks] = useState(false)
  const [isHobbies,setIsHobbies] = useState(false)
  useEffect(() => {
    setIsSocialLinks(checkAnyoneAvailable(socialLinks))
    setIsHobbies(checkAnyoneAvailable(hobbies))
  },[socialLinks])
  
  const checkAnyoneAvailable = (data) => {
    let ar = Object.values(data)
    for(let i=0;i<ar.length;i++){
      let item = ar[i];
      if(item !== "" && item !== "undefined"){
        return true;
      }
    }
  }
  return (
    <div className="main-cv-container">
      <PersonalProfile />
      <CareerTimeline />
      <Experience />
      {
        certificates &&
        <Certificates />
      }
      <Education />
      <div className="grid-1-1">
        {
          isHobbies &&
          <Hobbies />
        }
        {
          <LanguageSection />
        }
      </div>
      
      {
        contributions && contributions[0] &&
        <SocialContribution />
      }
      {
        documents && documents[0] &&
        <DocFiles />
      }
      {/* {
        videoFiles &&
        <VideoFiles />
      } */}
      {
        (socialLinks.facebook !== "" || socialLinks.instagram !== "" || socialLinks.linkedin !== "" || socialLinks.other !== "" || socialLinks.twitter !== "") && 
        <SocialMedia />
      }
    </div>
  )
}
