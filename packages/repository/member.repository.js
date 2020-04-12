const MemberRepository = require("../../database/mongo/model/member.model")


export async function create(memberInfo) {
    let memberClass = new MemberRepository(memberInfo)
    return MemberRepository.create(memberClass)
}

export async function findByIdAndUpdateUserId(memberID, userID) {
    return MemberRepository.findByIdAndUpdate({ _id: memberID }, { userID: userID })
}

export async function findById(id) {
    return MemberRepository.findById(id)
}

export async function findByIdAndPopulate(id) {
    return MemberRepository.findById(id).populate("userID")
}