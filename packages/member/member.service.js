const MemberRepository = require("../repository/member.repository")
const logger = require("../../util/logger")
const { USER_ERROR } = require("../../globalConstant/index")

export async function findByIdAndPopulate(id) {
    try {
        let data = await MemberRepository.findByIdAndPopulate(id)
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}