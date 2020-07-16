var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey: "public_eaf0JJngdmfKXZdsq7XWSvqPwJ0=",
    privateKey: "private_0Tl05rFqIbVbJxe1DeuMbmaJ3Ko=",
    urlEndpoint: "https://ik.imagekit.io/3at/"
});




export async function uploadImageKIT(bufferImage, nameImage) {
    try {
        let data = await imagekit.upload({
            file: bufferImage, //required
            fileName: nameImage,   //required
        });
        return data;
    } catch (error) {
        console.log(error);

    }
}