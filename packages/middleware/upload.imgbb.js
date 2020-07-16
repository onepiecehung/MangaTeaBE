import axios from "axios";
import FormData from 'form-data';

import { KEY_IMGBB } from "../../server/config/constants";
import * as logger from "../../util/logger";

export async function uploadImgBB(bufferImage) {
    try {
        const form = new FormData();
        form.append("image", bufferImage);
        const formHeaders = form.getHeaders();
        let result = await axios.post(`https://api.imgbb.com/1/upload?key=${KEY_IMGBB}`, form, {
            headers: {
                ...formHeaders
            }
        });
        return result.data;
    } catch (error) {
        // logger.error(error);
        return error;
    }
}