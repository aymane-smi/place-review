import React , {useState}from 'react'
import {useDispatch} from 'react-redux';
import './login.css';
import {login} from '../../actions/auth';

function Login({setCloseLogin, setUser}) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const dispatch = useDispatch();
    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        await dispatch(login(email, password));
        setUser(localStorage.getItem('user'));
        if(localStorage.getItem('user'))
            setCloseLogin(true);
    };
    const handleClick = ()=>{
        setCloseLogin(true);
    };
  return (
    <div className='login'>
        <div className='close' onClick={handleClick}>x</div>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
            <input type="email"
                onChange={(evt)=>setEmail(evt.target.value)}
                placeholder="E-mail"
                value={email}
                name="email"
            />
            <input type="password"
                onChange={(evt)=>setPassword(evt.target.value)}
                placeholder="password"
                value={password}
                name="password"
            />
            <button className="btn">Login</button>
        </form>
    </div>
  )
}

export default Login