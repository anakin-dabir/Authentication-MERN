import { useState } from 'react'
import axios from 'axios'

const LoginWithEmail = () => {
    const [email, setMail] = useState('');
    const [res, setRes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRes('');
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:4000/api/login', { email }, { withCredentials: true });
            setRes(res.data.msg);
        }
        catch (err) {
            setRes(err.response.data.msg);
        }
        setIsLoading(false);
    }

    return (
        <>
            <h1>LoginWithEmail</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setMail(e.target.value)} placeholder='Email' />
                <input disabled={isLoading} value={isLoading ? "Logging in..." : "Login"} type="submit" />
            </form>
            <p>{res}</p>
        </>
    )
}

export default LoginWithEmail