const MemberRepository = require("../../database/mongo/model/member.model")


export async function create(memberInfo) {
    let memberClass = new MemberRepository(memberInfo)
    return MemberRepository.create(memberClass)
}

export async function save(memberInfo) {
    return memberInfo.save()
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

export async function findByIdUserAndPopulate(id) {
    return (await MemberRepository.findOne({ userID: id })).populate("userID");
}

export async function findByUserID(id) {
    return MemberRepository.findOne({ userID: id })
}


export async function addMangaHistory(idUser, idManga) {
    return MemberRepository.updateOne({ userID: idUser }, { $push: { historyReading: idManga } });
}

export async function addChapterUpload(idUser, idChapter) {
    return MemberRepository.updateOne({ userID: idUser }, { $push: { chapterUpload: idChapter } });
}