import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import LocationOn from '@material-ui/icons/LocationOn';
import StarIcon from '@material-ui/icons/Star';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPins } from '../../actions/pin';
import { logout } from '../../actions/auth';
import Create from '../Creation/create';
import Login from '../Auth/login';
import Register from '../Auth/register';
import { format } from 'timeago.js';


function Map() {
  const [user, setUser] = useState(null);
  const [closeLogin, setCloseLogin] = useState(true);
  const [closeSignUp, setCloseSignUp] = useState(true);
  const dispatch = useDispatch();
  const selector = useSelector(state => state?.pin);
  const [newPlace, setNewPlace] = useState(null);
  useEffect(() => {
    dispatch(getPins());
  }, []);
  const [currentId, setCurrentId] = useState(null);
  const handleClick = (id) => setCurrentId(id);
  const handleAdd = (evt) => {
    const { lng, lat } = evt.lngLat;
    setNewPlace({
      lat: lat,
      long: lng
    });
  };
  const handleLogin = () => {
    setCloseLogin(false);
    setCloseSignUp(true);
  };
  const handleSignUp = () => {
    setCloseSignUp(false);
    setCloseLogin(true);
  };
  const handleLogout = () => {
    dispatch(logout());
    setUser(localStorage.getItem('user'));
  };
  const username = user ? JSON.parse(user)?.user?.username : null;
  return (
    <ReactMapGL
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 1.5
      }}
      style={{ width: "97vw", height: "97vh" }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      mapStyle="mapbox://styles/aymanebel/cl0iixim9002y14qbrjzk2w0c"
      onDblClick={handleAdd}
    >
      {selector.map((mark, i) => (
        <Marker longitude={mark.long} latitude={mark.lat} anchor="left" key={i} >
          <LocationOn style={{ fontSize: "20px", color: mark.username === username ? "tomato" : "slateblue" }} cursor="pointer" onClick={() => handleClick(mark._id)} />
          {mark._id === currentId && (<Popup key={i} longitude={mark.long} latitude={mark.lat} onClose={() => setCurrentId(null)} closeOnClick={false} anchor="top" >
            <div className='card'>
              <label>Place</label>
              <h2>{mark.title}</h2>
              <label>Review</label>
              <p className="desc">{mark.desc}</p>
              <label>Rating</label>
              <div>
                {Array(mark.rating).fill(<StarIcon className="star" />)}
              </div>
              <label>Information</label>
              <span className="username">Created by <b>{mark.username}</b> <i>{format(mark.createdAt)}</i></span>
            </div>
          </Popup>)}
        </Marker>
      ))}
      {newPlace && user && (<Marker latitude={newPlace.lat} longitude={newPlace.long}>
        <LocationOn />
        <Popup longitude={newPlace.long} latitude={newPlace.lat} closeButton={true} closeOnClick={false} onClose={() => { setNewPlace(null) }}>
          <Create long={newPlace.long} lat={newPlace.lat} setNewPlace={setNewPlace} />
        </Popup>
      </Marker>)}
      <div className='auth'>
        {!user && <>
          <button onClick={handleLogin}>login</button>
          <button onClick={handleSignUp}>signup</button>
        </>}
        {user && <button onClick={handleLogout}>logout</button>}
      </div>
      {!closeLogin && <Login setCloseLogin={setCloseLogin} setUser={setUser} />}
      {!closeSignUp && <Register setCloseSignUp={setCloseSignUp} setUser={setUser} />}
    </ReactMapGL>
  )
}

export default Map;