import * as response from "../../util/response.json";
import * as CountryService from "./country.service";
import { query } from "express";

export async function addAllCountry(req, res) {
    try {
        let data = await CountryService.addAllCountry()
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}

export async function find(req, res) {
    try {
        let data = await CountryService.find(req.query)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}
