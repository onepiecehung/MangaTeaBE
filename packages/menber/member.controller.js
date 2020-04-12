const response = require("../../util/response.json")
const MemberService = require("./member.service")

export async function getMemberById(req, res) {
    try {
        let data = await MemberService.findByIdAndPopulate(req.params.id)
        return response.success(res, data)
    } catch (error) {
        return response.error(res, req, error)
    }
}


