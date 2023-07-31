import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {AiFillLock} from 'react-icons/ai'
import {MdEmail} from 'react-icons/md'
import {BiSolidPhoneCall} from 'react-icons/bi'
import {MdWork} from 'react-icons/md'

import './index.css'


const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')  
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [profession, setProfession] = useState('Profession')
    const [showError, setShowError] = useState(false)
    const [userDetailsList, setUserDetailsList] = useState([])

    useEffect(() => {
        const stringifiedData = JSON.stringify(userDetailsList)
        localStorage.setItem("userDetails", stringifiedData)
    }, [userDetailsList]);

    const professionArray = ['Software Engineer', 'Charted Accountant', 'Doctor', 'Teacher', 'Lawyer','Business','Student']

    const onChangeUserName = (event) => {
        setUsername(event.target.value)
    }
    
    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangePhone = (event) => {
        setPhone(event.target.value)
    }

    const onChangeProfession = (event) => {
        setProfession(event.target.value)
    }

    const onSubmitForm = event => {
        event.preventDefault()
         
        
        if (username === "" || password === "" || email === '' || phone === '') {
            setShowError(true)
        }
        else {
            setShowError(false)
            const userData = {username,password,email,phone,profession}
            setUserDetailsList([...userDetailsList, userData])
            setUsername('')
            setPassword('')
            setEmail('')
            setPhone('')
            setProfession('Profession')
        }
    }

    return (
        <div className='login-form-container'>
            <form className='login-form' onSubmit={onSubmitForm}>
                {showError && <p className='error-msg'>*Plese fill all the fields!</p>}
                <img className='logo' src='https://hoblist.com/_next/image?url=%2Fimages%2FHoblist_logo.svg&w=2048&q=75' alt='logo' />
                <div className='input-container'>
                    <FaUser className='input-icon' />
                    <input className='input' type='text' name='username' onChange={onChangeUserName} value={username} placeholder='USER NAME' />
                </div>
                <div className='input-container'>
                    <AiFillLock className='input-icon' />
                    <input className='input' type='password' name='password' onChange={onChangePassword} value={password} placeholder='PASSWORD'/>
                </div>
                <div className='input-container'>
                    <MdEmail className='input-icon' />
                    <input className='input' type='email' name='email' onChange={onChangeEmail} value={email} placeholder='EMAIL'/>
                </div>
                <div className='input-container'>
                    <BiSolidPhoneCall className='input-icon' />
                    <input className='input' type='tel' name='number' onChange={onChangePhone} value={phone} placeholder='MOBILE NUMBER'/>
                </div>
                <div className='input-container-profession'>
                    <MdWork className='input-icon' />
                    <select class="form-select mb-3 select-container" aria-label="example">
                        <option value="Profession" onChange={onChangeProfession} active='true'>Profession</option>
                        {professionArray.map((eachValue,index) => (
                            <option value={eachValue} key={`value${index+1}`}>{eachValue}</option>
                        ))}
                    </select>
                </div>

                <button type='submit' className='login-button'>Create Account</button>
                <div className='signup-container'>
                    <p className='signup-desc'>Already Have an Account </p>
                    <Link to='/login' className='link'>
                        <p className='signup-link'>Login</p>
                    </Link>
                </div>
            </form>
        </div>
        
    )
    
}



export default LoginForm