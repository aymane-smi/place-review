import React, {useState} from 'react'
import './style.css';
import {useDispatch} from 'react-redux';
import {createPin} from '../../actions/pin';
function Create({long, lat, setNewPlace}) {
  const [form , setForm] = useState({title: '', desc: '', rating: 0});
  const {username} = JSON.parse(localStorage.getItem('user'))?.user || null;
  const dispatch = useDispatch();
  // const handleChange = (evt)=>{
  //   console.log(evt.target.name);
  //   setForm({
  //     [evt.target.name] : evt.target.value
  //   });
  // };
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    dispatch(createPin({...form, long, lat, username}));
    setForm({title: '', desc: '', rating: ''});
    setNewPlace(null);
  };
  return (
    <div className='create'>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">title</label>
            <input type="text"
                   onChange={(evt)=>setForm({...form, title: evt.target.value})}
                   name="title"
                   value={form.title}
                   id="title"
            />
            <label htmlFor='desc'>Description</label>
            <textarea id="desc" 
                      value={form.desc}
                      onChange={(evt)=>setForm({...form, desc: evt.target.value})}
                      name="desc"
            />
            <label htmlFor="rating">Rating</label>
            <select name="rating" id="rating" onChange={(evt)=>setForm({...form, rating: Number.parseInt(evt.target.value)})}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            <button className="button">Add Pin</button>
        </form>
    </div>
  )
}

export default Create