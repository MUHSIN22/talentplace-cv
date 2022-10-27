import React, { Fragment, useState } from 'react'
import loginVector from '../../Assests/CreatePass-vector.png'
import { ReactComponent as Password } from '../../Assests/icons/lock.svg';
import IconPasswordInput from '../IconInput/IconPasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { createPassword, selectAutheError, selectAuthLoading, selectAuthMessage, selectReg_id, setError } from '../../redux/Features/AuthenticationSlice';
import isStrongPassword from 'validator/lib/isStrongPassword'
import Alert from '../Alert/Alert';
const tooltip = 'Must be a minimum of eight characters long and contain at least one uppercase and one lowercase letter (A, z), one numeric character (0-9), and one special character (such as !, %, @, or #).'
export default function CreatePassword() {
    const [form, setForm] = useState({
        password: '',
        confirm_password: ''
    })
    const message = useSelector(selectAuthMessage);
    const loading = useSelector(selectAuthLoading)
    const dispatch = useDispatch()
    const reg_id = useSelector(selectReg_id)
    const error = useSelector(selectAutheError)
    
    function handleChange(evt) {
        const value = evt.target.value
        setForm({
            ...form,
            [evt.target.name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (Validation(form, dispatch)) {
            try {
                dispatch(createPassword({ ...form, user_id: reg_id })).unwrap()
            } catch (error) {
            }
        }

    }
    return (
        <div className="login">
            <div className="col-30 justify-center otp-side">
                <form>
                {message&&!loading && 
                    Object.values(message)[0] &&
                    Object.values(message).map((item,index) => (
                        <Fragment key={index}>
                            {
                                item[0]&&
                                <Alert error={error} message={item[0]}/>
                            }
                        </Fragment>
                    ))
                }
                    <h1>Set your password here</h1>
                    <div className="form-row">
                        <IconPasswordInput name={'password'} handleChange={handleChange} placeholder='Password' label='Create a strong password' icon={<Password />} tooltip={tooltip} width='95' validation={message&&message.password} />
                    </div>
                    <div className="form-row">
                        <IconPasswordInput name={'confirm_password'} handleChange={handleChange} placeholder='Confirm Password' label='Type your password again' icon={<Password />} width='95' validation={message&&message.confirm_password} />
                    </div>
                    <div className="form-row my-2">
                        <button onClick={handleSubmit} className="btn primary">{loading?'Loading...':"Register"}</button>
                    </div>


                </form>
            </div>
            <div className="col-70 image-side">
                <img src={loginVector} alt="" />
            </div>
        </div>
    )
}
function Validation(form, dispatch) {
    let flag = true;
    let errorList = {
        "password": [],
        "confirm_password": [],
    }
    if (isStrongPassword(form.password)) {
        errorList.password[0] = null
    } else {
        errorList.password[0] = 'Enter a strong password';
        flag = false;
    }
    if (form.password === form.confirm_password) {
        errorList.confirm_password[0] = null
    } else {
        errorList.confirm_password[0] = "Password doesn't match";
        flag = false;
    }
    dispatch(setError(errorList))
    return flag

}
