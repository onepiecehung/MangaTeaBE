import * as GenreRepository from "../repository/genre.repository";
import * as logger from "../../util/logger";



export async function insertMultiple(genreInfoArray) {
    try {
        let data = await GenreRepository.createMultiple(genreInfoArray)
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}


export async function find() {
    try {
        let data = await GenreRepository.findAll()
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}


export async function findById(id) {
    try {
        let data = await GenreRepository.findById(id)
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}


export async function create(genreInfo) {
    try {
        let data = await GenreRepository.create(genreInfo)
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}