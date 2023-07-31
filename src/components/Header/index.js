import {useHistory} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const Header = ({ renderModal }) => {
    
    const history = useHistory()
    const onLogout = () => {
       history.replace('/login')
    }

    const onClickCompanyInfo = () => {
        console.log("Clicked")
        renderModal()
    }

    return (
        <div className='w-100'>
            <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-container p-2">
                <a class="navbar-brand mr-5 ml-5" href="/">
                    <img src='https://hoblist.com/_next/image?url=%2Fimages%2FHoblist_logo.svg&w=2048&q=75' className='logo mb-0' alt='logo' />
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse options-container" id="navbarSupportedContent" >
                    <ul class="navbar-nav mr-auto nav-options">
                        <li class="nav-item active option">
                            <a class="nav-link" href="/">Home </a>
                        </li>
                        <li class="nav-item option">
                            <a class="nav-link" href="/">Categories</a>
                        </li>
                        <li class="nav-item option">
                            <a class="nav-link" href="/">Movies</a>
                        </li>
                    </ul>
                    <button type="button" class="info-button" data-toggle="modal" data-target="#exampleModalCenter" onClick={onClickCompanyInfo}>
                        Company Info
                    </button>
                    <form class="form-inline my-2 my-lg-0 search-container">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <button className='home-logout-button' type='button' onClick={onLogout}>Logout</button>
                </div>
            </nav>
            
        </div>  
    )
}

export default Header