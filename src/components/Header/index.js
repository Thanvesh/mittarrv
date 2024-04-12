
import {Link} from "react-router-dom"
import "./header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBookOpen, faUser,faHouse,faHeart} from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";


const Header=()=>{
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the JWT token from cookies
        Cookies.remove('jwt_token')
        // Redirect to the login page
        navigate("/login");
      };

return(
    <div className="header-container">
        <Link to="/"  className="header-link"> 
        <div className="logo-container">
            <FontAwesomeIcon className="header-icon" icon={faBookOpen} />
        <h1 className="logo-title">Recipe Store</h1>
        </div>
        </Link>
        
        <ul className="header-list-container">
            <Link to="/Recipe"  className="header-link">
            <li className="header-list-item">
                    <FontAwesomeIcon className="header-list-item-icon" icon={faHouse} />
                    <p className="header-list-item-text">Home</p>
                </li>
            </Link>
            <Link to="/favourite"  className="header-link">
            <li className="header-list-item"> 
                <FontAwesomeIcon className="header-list-item-icon" icon={faHeart} />
                <p className="header-list-item-text">Favourite</p>
            </li></Link>
            <li className="header-list-item" onClick={handleLogout}>
                <FontAwesomeIcon className="header-list-item-icon" icon={faUser} />
                <p className="header-list-item-text">Logout</p>
            </li>
            
        </ul>

    </div>

)
}

export default Header