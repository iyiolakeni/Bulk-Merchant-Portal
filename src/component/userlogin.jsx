import '../css/login.css';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  return(
    <div className="App">
    <div className='new'></div>
    <div className='loginDiv'>
    <div className='login'>
    <input className='username' placeholder='Username'/>
    <input className='password'placeholder='Password'/>
    </div>
    <button><Link to="/Dashboard">LOGIN</Link></button>
    <Link to="/Signup">New User?</Link>
    </div>
    </div>
  )
}
export default UserLogin;