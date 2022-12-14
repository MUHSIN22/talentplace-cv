import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ReactComponent as ChevronRight } from '../../Assests/icons/chvron-right.svg';
import loginVector from '../../Assests/OTP-vector.png'
import Countdown from '../../Countdown';
import { resendOTP, selectAutheError, selectAuthentication, selectAuthLoading, selectAuthMessage, validateOtp } from '../../redux/Features/AuthenticationSlice';
import Alert from '../Alert/Alert';
import OTP from '../IconInput/OTP'
export default function OTPLogin() {
  const location = useLocation()
  const auth = useSelector(selectAuthentication)
  const error = useSelector(selectAutheError)
  const loading = useSelector(selectAuthLoading)
  const message = useSelector(selectAuthMessage)
  const [otp, setOtp] = useState('')
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(validateOtp({ user_id: auth.user_id, otp })).unwrap()
    } catch (error) {
    }
  }
  const [expired, setExpired] = useState(false)
  function handleExpire() {
    setExpired(true)
  }

  const resendCode = (event) => {
    event.preventDefault();
    dispatch(resendOTP({user_id: auth.user_id,country_code: location.state.code, mobile_no: location.state.num}))

  }
  return (
    <div className="login">
      <div className="col-30 otp-side">
        <form>
          {message && !loading && <Alert error={error} message={typeof message === "string" ? message : null} />}
          <h1>Enter the OTP here to login</h1>
          <p>Enter OTP sent to {location.state.mobile_no}</p>
          {expired ? <p>Please resend code</p> : <p> This code will expire in <Countdown minutes={1} seconds={30} trigger={handleExpire} /></p>}
          <div className="form-row">
            <OTP otp={otp} setOtp={setOtp} />
          </div>
          <div className="form-row">
            <div className="col-20 code-not-recieve">
              <p>Didn’t receive the code? <button className='btn-link' onClick={resendCode}>Resend Code </button> </p>
            </div>

          </div>
          <div className="form-row my-2">
            <button onClick={handleSubmit} className='btn primary'>Continue <ChevronRight /> </button>
          </div>

        </form>
      </div>
      <div className="col-70 image-side">
        <img src={loginVector} alt="" />
      </div>
    </div>
  )
}
