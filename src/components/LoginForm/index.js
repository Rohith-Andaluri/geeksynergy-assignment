import {useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import {FaUser} from 'react-icons/fa'
import {AiFillLock} from 'react-icons/ai'

import './index.css'
import { Link } from 'react-router-dom'

const LoginForm = () => {
    const [loginUsername, setUsername] = useState('')
    const [loginPassword, setPassword] = useState('')  
    const [showError, setShowError] = useState(false)
    const [invalidCredintialsError, setinvalidCredintialsError] = useState(false)
    const history = useHistory()

    const onChangeUserName = (event) => {
        setUsername(event.target.value)
    }
    
    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitForm =  event => {
        event.preventDefault()
        if (loginUsername === "" || loginPassword === "" ) {
            setShowError(true)
        }
        else {
            setShowError(false)
            const stringifieduserDetailsList = localStorage.getItem('userDetails')
            const userDetailsList = JSON.parse(stringifieduserDetailsList)
            for (let eachObj of userDetailsList) {
                const {username, password} = eachObj
                if (loginUsername === username && loginPassword === password) {
                    history.replace('/')
                    break
                }
                else {
                    setinvalidCredintialsError(true)
                    break
                }
                
            }
        }
        
    }

    return (
        <div className='login-form-container'>
            <form className='login-form' onSubmit={onSubmitForm}>
                {showError && <p className='error-msg'>*Plese fill all the fields!</p>}
                <img className='logo' src='https://hoblist.com/_next/image?url=%2Fimages%2FHoblist_logo.svg&w=2048&q=75' alt='logo' />
                <div className='input-container'>
                    <FaUser className='input-icon' />
                    <input className='input' type='text' name='username' onChange={onChangeUserName} value={loginUsername} placeholder='USER NAME'/>
                </div>
                <div className='input-container'>
                    <AiFillLock className='input-icon' />
                    <input className='input' type='password' name='password' onChange={onChangePassword} value={loginPassword} placeholder='PASSWORD'/>
                </div>
                <button type='submit' className='login-button'>Sign in</button>
                <div className='signup-container'>
                    <p className='signup-desc'>Create An Account </p>
                    <Link to='/signup' className='link'>
                        <p className='signup-link'>Sign Up</p>
                    </Link>
                </div>
                {invalidCredintialsError && <p className='error-msg'>Invalid Credentails</p>}
            </form>
        </div>
    )
}

export default LoginForm