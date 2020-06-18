import axios from "axios";
import FormData from 'form-data';
import * as logger from "../../util/logger";

import { CLIENT_ID_IMGUR } from "../../server/config/constants";

export async function uploadImgur(bufferImage) {
    try {
        let dataImage = new FormData();
        dataImage.append("image", bufferImage);
        const formHeaders = dataImage.getHeaders();
        let url_ava = await axios.post("https://api.imgur.com/3/image/", dataImage, {
            headers: {
                'Authorization': `Client-ID ${CLIENT_ID_IMGUR}`,
                ...formHeaders
            },
        });
        return url_ava.data;
    } catch (error) {
        logger.error(error);
        return error;
    }
}