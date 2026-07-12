import React from 'react'
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = React.useState({
        email: '',
        password: ''
    });

    const handlechange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    }

    const handeSubmit = (e) => {
        e.preventDefault();
        const result=  await axios.post(`${API_URL}/api/auth/login`,form)
        const data = result.data;
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        }else{
            alert(data.message);
        }
    }

    return (
        <div style={{ display: 'grid', gap: '10px', justifyContent: 'center', alignItems: 'center', }}>
            <h1>Login</h1>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handlechange} />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handlechange} />
            <button onClick={handeSubmit}>Login</button>
            <p>Don't have Account <a href="/register">Register</a> </p>
        </div>
    )
}

export default Login
