import app from './app.js';
import coudinary from 'cloudinary';

cloudinary.v2.config({                                  //configure cloudinary          
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,      //cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {                    //start the server.process.env is a global object in Node.js that provides access to environment variables,
    console.log(`server running on port ${process.env.PORT}`);  //app.listen() is a callback function that gets called once the server is running
});



