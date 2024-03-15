import app from './app.js';
import cloudinary from 'cloudinary';

cloudinary.v2.config({                                  //configure cloudinary          
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,      //cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});                  //use errorMiddleware to handle errors

const PORT=process.env.PORT || 8085;


app.listen(PORT, () => {
    console.log(`server is up and running on port number: ${PORT}`)
}); 
