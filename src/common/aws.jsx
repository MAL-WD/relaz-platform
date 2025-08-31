
import axios from 'axios'
import dotenv from 'dotenv'
// dotenv.config({ path: '.env' })

export const UploadFile = async (file) => {
    let fileUrl = null;

    // Extract file name and type from the file object
    const fileName = file.name;
    const fileType = file.type;

    // Get the signed URL from the server
    await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url", {
        params: {
            fileName: fileName,
            contentType: fileType
        }
    })
    .then(async ({ data: { uploadURL } }) => {
        console.log(uploadURL);
        
        // Upload the file directly to the signed URL
        await axios({
            method: 'PUT',
            url: uploadURL,
            data: file,
            headers: {
                'Content-Type': fileType
            }
        })
        .then(() => {
            fileUrl = uploadURL.split("?")[0];
            console.log(fileUrl);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return fileUrl;
};

export const UploadImage = async (file) => {
    let fileUrl = null;
    // let fileName=file.name
    // let fileType= file.type
    await axios.get(import.meta.env.VITE_SERVER_DOMAIN  +"/get-upload-url")
    .then(async ({data:{uploadURL}})=>
        {
            console.log(uploadURL)
            await axios({
                method:'PUT',
                url:uploadURL,
                headers:{'Content-Type':'multipart/form-data'},
                data:file
            })
            .then(()=>{
                fileUrl=uploadURL.split("?")[0]
                console.log(fileUrl)
        })
    })
    return fileUrl;
}