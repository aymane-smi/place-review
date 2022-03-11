import React , {useState}from 'react'
import {useDispatch} from 'react-redux';
import './register.css';
import {register} from '../../actions/auth';

function Login({setCloseSignUp, setUser}) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const dispatch = useDispatch();
    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        await dispatch(register({email, password, username}));
        setUser(localStorage.getItem('user'));
        if(localStorage.getItem('user'))
            setCloseSignUp(true);
    };
    const handleClick = ()=>{
        setCloseSignUp(true);
    };
  return (
    <div className='login'>
        <div className='close' onClick={handleClick}>x</div>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
             <input type="text"
                placeholder="username" 
                onChange={(evt)=>setUsername(evt.target.value)}
                value={username}
                name="username"
            />
            <input type="email"
                onChange={(evt)=>setEmail(evt.target.value)}
                placeholder="E-mail"
                value={email}
                name="email"
            />
            <input type="password"
                placeholder="password"
                onChange={(evt)=>setPassword(evt.target.value)}
                value={password}
                name="password"
            />
            <button className="btn">Register</button>
        </form>
    </div>
  )
}

export default Login