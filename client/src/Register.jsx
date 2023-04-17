import { useState } from 'react'
import axios from 'axios';



const Register = () => {
    const [formData, setformData] = useState({ name: '', email: '', password: '' });
    const [res, setRes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    }

    const submitForm = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setRes('');
        console.log(formData);
        setTimeout(async () => {
            try {
                const response = await axios.post('http://localhost:4000/api/register', formData);
                setRes(response.data.msg);
            }
            catch (err) {
                setRes(err.response.data.msg);
            }

            setIsLoading(false);
        }, 2000);


    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={submitForm}>
                <input type="text" placeholder="Name" name="name" onChange={handleChange} />
                <input type="text" placeholder="Email" name="email" onChange={handleChange} />
                <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                <input disabled={isLoading} type="submit" value={isLoading ? "Registering..." : "Register"} />
            </form>
            {isLoading && <p>Loading...</p>}
            <h1>{res}</h1>
        </>
    )
}

export default Register;




