import './App.css';
import Login from './Components/Login/Login';
import { Route, Router, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Onboarding from './Components/Onboarding/Onboarding';
import Signup from './Components/Signup/Signup';
import CVBuilder from './Components/CVBuilder/CVBuilder';
import OTPLogin from './Components/Login/OTPLogin';
import OTPSignup from './Components/Signup/OTPSignup';
import CreatePassword from './Components/Signup/CreatePassword';
import PreventedRoute from './PreventedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getReloadDecider, getResumeMessage, getResumeUpdateStatus, reload as reloadState, resetResumeStatus, resumeInfo, selectFormId, selectReload, selectResumeStatus, setReloadDecider } from './redux/Features/ResumeSlice';
import { resetError, selectAuthentication } from './redux/Features/AuthenticationSlice';
import { useEffect } from 'react';
import { graphDetails } from './redux/Features/GraphSlice';
import DummyForm from './Components/EditForms/ProfilePicture'
import CognitiveSkills from './Components/Form/CognitiveSkills';
import NotFound from './Components/Not_Found/Notfound';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Logout from './Components/Logout/Logout';
import Settings from './Components/Setings/Settings';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import Checking from './Components/checking/Checking';
import Footer from './Components/Footer/Footer';
import PrivacyPolicy from './Components/Footer Links/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from './Components/Footer Links/TermAndConditions/TermsAndConditions';
import CVShare from './Components/CVShare/CVShare';
import AboutUs from './Components/AboutUs/AboutUs';
import CVProfile from './Components/CVProfile/CVProfile';
import PricingPage from './Components/Pricing Page/PricingPage';
import DashboardCv from './Components/DashboardCv/DashboardCv';
import EditProfilePage from './Components/EditProfilePage/EditProfilePage';
import CareerObjectiveEditor from './Components/EditorForms/CareerObjectiveEditor';
import EditFormTemplate from './Util Components/EditFormTemplate/EditFormTemplate';
import careerObjectiveIcon from './Assets/edit icons/career objective.png'
import cognitive from './Assets/edit icons/cognitive.png'
import experience from './Assets/edit icons/experience.png'
import education from './Assets/edit icons/education.png'
import certificate from './Assets/edit icons/certification.png'
import voluntaryIcon from './Assets/edit icons/voluntary.png'
import portfolioIcon from './Assets/edit icons/portfolio.png'

import CognetiveSkills from './Components/EditorForms/CognetiveSkills/CognetiveSkills';
import ExperienceFormEditor from './Components/EditorForms/ExperienceFormEditor';
import DesignationSummaryPage from './Components/DesignationSummaryPage/DesignationSummaryPage';
import EditSummaryPreview from './Components/ExperienceSummaryPreview/ExperienceSummaryPreview';

import { cssTransition, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ObjectToArray from './functionUtils/ObjectToArray';
import ProjectSummaryPage from './Components/ProjectSummaryPage/ProjectSummaryPage';
import EducatiomSummaryReview from './Components/EducationSummaryReview/EducatiomSummaryReview';
import EducationEditorForm from './Components/EditorForms/EducationEditorForm';
import CertificateSummaryPreview from './Components/CertificateSummaryPreview/CertificateSummaryPreview';
import CertificateEditorForms from './Components/EditorForms/CertificateEditorForms';
import VoluntarySummaryPreview from './Components/VoluntarySummaryPreview/VoluntarySummaryPreview';
import ContributionEditForm from './Components/EditorForms/ContributionEditForm';
import PersonalInfoEditor from './Components/EditorForms/PersonalInfoEditor';
import HobbiesEditorForm from './Components/EditorForms/HobbiesEditorForm';
import MembershipSelectionPage from './Components/MembershipSelectionPage/MembershipSelectionPage';
import PortfolioEditorPage from './Components/EditorForms/PortfolioEditorPage';
import PortfolioSummary from './Components/PortfolioSummary/PortfolioSummary';
import Referral from './Components/Referral/Referral';
import { getPaymentInitiated } from './redux/Features/PaymentSlice';
import PaymentRefreshPopup from './Components/PaymentRefreshPopup/PaymentRefreshPopup';
import ContactUs from './Components/ContactUs/ContactUs';
import Blogs from './Components/Blogs/Blogs';
import BlogView from './Components/BlogViewPage/BlogView';

function App() {
  const dispatch = useDispatch()
  const location = useLocation();
  const auth = useSelector(selectAuthentication)
  const form_id = useSelector(selectFormId)
  const reload = useSelector(selectReload)
  const resumeStatus = useSelector(selectResumeStatus);
  const status = useSelector(getResumeUpdateStatus);
  const routeWithoutNav = ['/', '/membership', "/MyProfile", "/myprofile", "/dashboard", "/settings", "/change_password", '/about-us', '/cv-profile', '/pricing', '/dashboard/cv', "/dashboard/edit", "/dashboard/edit-career-objective", "/dashboard/edit-cognetive-skills", "/dashboard/experience-history", "/dashboard/designation-history", "/dashboard/experience-editor",'/dashboard/project-history','/dashboard/education-history','/dashboard/education-editor','/dashboard/certificate-history','/dashboard/certificate-editor','/dashboard/contribution-history','/dashboard/contribution-editor','/dashboard/personal-info-editor','/dashboard/hobbies-editor',"/dashboard/plans",'/dashboard/settings','/dashboard/change_password','/dashboard/portfolio-editor','/dashboard/portfolio-history','/dashboard/referal']
  const routeWithouFooter = ['/membership', "/MyProfile", "/myprofile", "/dashboard", "/settings", "/change_password", "/login", '/signup', '/get-onboard', '/cv-builder', '/OTP-signup', '/create-password', '/cv-profile', "/dashboard/cv", "/dashboard/edit", "/dashboard/edit-career-objective", "/dashboard/edit-cognetive-skills", "/dashboard/experience-history", "/dashboard/designation-history", "/dashboard/experience-editor",'/dashboard/project-history','/dashboard/education-history','/dashboard/education-editor','/dashboard/certificate-history','/dashboard/certificate-editor','/dashboard/contribution-history','/dashboard/contribution-editor','/dashboard/personal-info-editor','/dashboard/hobbies-editor',"/dashboard/plans",'/dashboard/settings','/dashboard/change_password','/dashboard/portfolio-editor','/dashboard/portfolio-history','/dashboard/referal']
  const message = useSelector(getResumeMessage);
  const reloadDecider = useSelector(getReloadDecider)
  const isPaymentIniated = useSelector(getPaymentInitiated)

  useEffect(() => {
    if (auth.authToken && reload) {
      try {
        dispatch(resumeInfo({ user_id: auth.user_id, auth: auth.authToken })).unwrap()
      } catch (error) {
      }
    }
    if (auth.authToken && reload) {
      try {
        dispatch(graphDetails({ user_id: auth.user_id, auth: auth.authToken })).unwrap()
      } catch (error) {
      }
    }

    return () => {

    }
  }, [auth, form_id, reload, dispatch])

  useEffect(() => {

    if (auth.authToken && !form_id) {
      try {
        dispatch(resumeInfo({ user_id: auth.user_id, auth: auth.authToken })).unwrap()
      } catch (error) {
      }
    }
    if (auth.authToken && !form_id) {
      try {
        dispatch(graphDetails({ user_id: auth.user_id, auth: auth.authToken })).unwrap()
      } catch (error) {
      }
    }


    return () => {
    }
  }, [auth, form_id])

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetResumeStatus())
    }, 500)
  }, [status])

  useEffect(() => {
    if (status === "Rejected") {
      ObjectToArray(message).forEach(item => {
        toast.error(item)
      })
    } else if (status === "succeeded") {
      if(message !== "Form Id Updated Successfully."){
        toast.success(message , { toastId: 1 })
      }
      if(reloadDecider){
        dispatch(reloadState())
        dispatch(setReloadDecider(false))
      }
    }
  }, [status])



  useEffect(() => {
    dispatch(resetError())

    return () => {

    }
  }, [location, dispatch])

  return (
    <div className="App">
      {window.location.pathname === '/' ? <Header /> : ""}
      {!routeWithoutNav.includes(window.location.pathname) ? <Navbar /> : ""}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        closeButton={true}
      />
      
      {
        isPaymentIniated &&
        <PaymentRefreshPopup />
      }
      <Routes>
        <Route path='/login' element={<PreventedRoute><Login /></PreventedRoute>} />
        <Route path='/OTP-login' element={<PreventedRoute><OTPLogin /></PreventedRoute>} />
        <Route path='/signup' element={<PreventedRoute><Signup /></PreventedRoute>} />
        <Route path='/OTP-signup' element={<PreventedRoute><OTPSignup /></PreventedRoute>} />
        <Route path='/create-password' element={<PreventedRoute><CreatePassword /></PreventedRoute>} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path='/pricing' element={<PricingPage />} />
        <Route path='/cv-builder' element={<CVBuilder />} />
        <Route path='/get-onboard' element={<Onboarding />} />
        <Route path='/' element={<Home />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/cv-profile' element={<CVProfile />} />

        <Route path='/cv-share/:id' element={<CVShare />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path="/settings" element={<Settings />} />
        <Route path='/dummy' element={<DummyForm />} />
        <Route path='/cs' element={<CognitiveSkills />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogView />} /> 
        <Route path='/dashboard' element={<CVProfile />}>
          <Route path='referal' element={<Referral />} />
          <Route path="cv" element={<DashboardCv />} />
          <Route path='edit' element={<EditProfilePage />} />
          <Route path='plans' element={<MembershipSelectionPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path='change_password' element={<ChangePassword />} />
          <Route path='edit-career-objective' element={
            <EditFormTemplate title="Career Objective" icon={careerObjectiveIcon}>
              <CareerObjectiveEditor />
            </EditFormTemplate>
          } />
          <Route path='edit-cognetive-skills' element={
            <EditFormTemplate title="Cognitive Skills" icon={cognitive}>
              <CognetiveSkills />
            </EditFormTemplate>
          } />
          <Route path='experience-history' element={
            <EditFormTemplate title="Experience" icon={experience}>
              <EditSummaryPreview />
            </EditFormTemplate>
          } />
          <Route path='education-history' element={
            <EditFormTemplate title="Education" icon={education}>
              <EducatiomSummaryReview />
            </EditFormTemplate>
          } />
          <Route path='certificate-history' element={
            <EditFormTemplate title="Certification Courses" icon={certificate}>
              <CertificateSummaryPreview />
            </EditFormTemplate>
          } />
          <Route path='designation-history' element={
            <EditFormTemplate title="Experience" icon={experience}>
              <DesignationSummaryPage />
            </EditFormTemplate>
          } />
          <Route path='project-history' element={
            <EditFormTemplate title="Experience" icon={experience}>
              <ProjectSummaryPage />
            </EditFormTemplate>
          } />
          <Route path='contribution-history' element={
            <EditFormTemplate title="Voluntary Roles" icon={voluntaryIcon}>
              <VoluntarySummaryPreview />
            </EditFormTemplate>
          } />
          <Route path='portfolio-history' element={
            <EditFormTemplate title="Portfolio" icon={portfolioIcon}>
              <PortfolioSummary />
            </EditFormTemplate>
          } />
          <Route path='experience-editor' element={<ExperienceFormEditor />} />
          <Route path="education-editor" element={<EducationEditorForm />} />
          <Route path="certificate-editor" element={<CertificateEditorForms />} />
          <Route path="contribution-editor" element={<ContributionEditForm />} />
          <Route path="personal-info-editor" element={<PersonalInfoEditor />} />
          <Route path="hobbies-editor" element={<HobbiesEditorForm />} />
          <Route path="portfolio-editor" element={<PortfolioEditorPage />} />
        </Route>
      </Routes>
      {!routeWithouFooter.includes(window.location.pathname) ? <Footer /> : null}
    </div>
  );
}

export default App;
