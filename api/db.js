import mongoose from "mongoose";



const connectDb = async (url, options) => {
    try {
        mongoose.connect(url, options);
        console.log(`DB Connected on ${url}`)
    }
    catch (err) {
        console.log(`Error: ${err}`);
    }
}
export default connectDb;