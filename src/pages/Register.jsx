import axios from 'axios';
import React from 'react'
import { API_URL } from '../config';

function Register() {
    const [form, setForm] = React.useState({
        name: '',
        email: '',
        Role: '',
        password: ''
    });

    const handlechange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    }

    const handeSubmit = async (e) => {
        e.preventDefault();
        const result=  await axios.post(`${API_URL}/api/auth/register`,form)
        console.log(result);
        
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <h1>Register</h1>
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={handlechange} />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handlechange} />
            <select style={{ padding: '5px', width: '170px' }}
                name="Role"
                value={form.Role}
                onChange={handlechange}
            >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Shopper">Shopper</option>
            </select>

            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handlechange} />
            <button onClick={handeSubmit}>Register</button>
            <p>Alerady have Account <a href="/">Login</a> </p>


        </div>
    )
}

export default Register
