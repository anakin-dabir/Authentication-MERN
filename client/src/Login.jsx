import { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [formData, setformData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [res, setRes] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    }
    const submitformData = async (e) => {
        e.preventDefault();
        setRes('');
        setIsLoading(true);
        console.log(formData);
        setTimeout(async () => {
            try {
                const response = await axios.post('http://localhost:4000/api/login', formData,
                    {
                        withCredentials: true,
                    }
                );
                setRes(response.data.msg);
            }
            catch (err) {
                setRes(err.response.data.msg);

            }
            setIsLoading(false);
        }, 2000);
    }


    const logoutHandle = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/logout', {},
                { withCredentials: true, }
            );
            setRes(response.data.msg);
        }
        catch (err) {
            setRes(err.response.data.msg);

        }
    }

    const userDetails = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/getUser', { withCredentials: true });
            console.log(response);
        }
        catch (err) {
            console.log(err.response);
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={submitformData}>
                <input type="text" name="email" onChange={handleChange} placeholder='Email' />
                <input type="password" name="password" onChange={handleChange} placeholder='Password' />
                <input type="submit" disabled={isLoading} value={isLoading ? "Loading..." : "Login"} />
            </form>
            <p>{res}</p>
            <button onClick={logoutHandle}>Logout</button>
            <button onClick={userDetails}>Click Here</button>
        </>
    )
}

export default Login;