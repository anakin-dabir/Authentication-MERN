import { useEffect, useState } from 'react'
import axios from 'axios'

const Users = () => {
    const [data, setData] = useState([]);
    const [err, setErr] = useState('');
    const showData = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/getUser', { withCredentials: true });
            setData(res.data);

        }
        catch (err) {
            setErr(err.response.data.msg);

        }
    };

    return (
        <>
            <div>Users</div>
            <button onClick={showData}>Show Data</button>
            {
                err === '' ?
                    <>
                        {
                            data.map(data => {
                                return (
                                    <div key={data._id}>
                                        <h1>{data.name}</h1>
                                        <h4>{data.email}</h4>
                                        <p>isVerified: {data.isVerified ? "true" : "false"}</p>
                                    </div>
                                )
                            })
                        }
                    </>
                    :
                    <h1>{err}</h1>
            }
        </>
    )
}

export default Users