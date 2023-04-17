import app from "./express"
import config from './config/config'
import connectDb from './db';
import userRoute from "./routes/auth";


app.get('/', (req, res) => {
    res.json({ msg: 'Connected Successfully' });
})


app.use('/api', userRoute);


connectDb(config.mongoUri, config.options);

app.listen(config.port, () => {
    console.log(`Server on http://localhost:${config.port}`);
})