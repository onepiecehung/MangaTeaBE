import { MANGA } from "../../globalConstant/index";

import * as MemberService from "./member.service";
import * as response from "../../util/response.json";

export async function getMemberById(req, res) {
    try {
        let data = await MemberService.findByIdAndPopulate(req.params.id)
        return response.success(res, data, 200)
    } catch (error) {
        return response.error(res, req, error)
    }
}

export async function saveManga(req, res) {
    try {
        if (!req.query.idManga || req.query.idManga.length == 0) {
            return response.error(res, req, MANGA.MANGA_MISSING_ID)
        }
        let data = await MemberService.saveManga(req.query.idManga, req.user)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}

export async function unsavedManga(req, res) {
    try {
        if (!req.query.idManga || req.query.idManga.length == 0) {
            return response.error(res, req, MANGA.MANGA_MISSING_ID)
        }
        let data = await MemberService.unsavedManga(req.query.idManga, req.user)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}

export async function addMangaFavorite(req, res) {
    try {
        if (!req.query.idManga || req.query.idManga.length == 0) {
            return response.error(res, req, MANGA.MANGA_MISSING_ID)
        }
        let data = await MemberService.addMangaFavorite(req.query.idManga, req.user)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}


export async function removeMangaFavorite(req, res) {
    try {
        if (!req.query.idManga || req.query.idManga.length == 0) {
            return response.error(res, req, MANGA.MANGA_MISSING_ID)
        }
        let data = await MemberService.removeMangaFavorite(req.query.idManga, req.user)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}

export async function addMangaHistory(req, res) {
    try {
        if (!req.query.idManga || req.query.idManga.length == 0) {
            return response.error(res, req, MANGA.MANGA_MISSING_ID)
        }
        let data = await MemberService.addMangaHistory(req.query.idManga, req.user)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}

export async function removeMangaHistory(req, res) {
    try {
        if (!req.query.idManga || req.query.idManga.length == 0) {
            return response.error(res, req, MANGA.MANGA_MISSING_ID)
        }
        let data = await MemberService.removeMangaHistory(req.query.idManga, req.user)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}

export async function removeAllMangaHistory(req, res) {
    try {
        let data = await MemberService.removeAllMangaHistory(req.user)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}