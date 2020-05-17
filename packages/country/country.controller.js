import * as response from "../../util/response.json";
import * as CountryService from "./country.service";

export async function addAllCountry(req, res) {
    try {
        let data = await CountryService.addAllCountry()
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}


