const Api = {
    Url : 'http://fundoonotes.incubation.bridgelabz.com/api',
    userSignIn : '/user/login',
    userSignUp :'/user/userSignUp',
    userResetPass :'/user/reset',
    getAllNotes :'/notes/getNotesList',
    addNotes: '/notes/addNotes',
    updateNotes : '/notes/updateNotes',
    changesColorNotes : '/notes/changesColorNotes',
    trashNotes : '/notes/trashNotes',
    restoreTrashNotes : '/notes/trashNotes',
    deleteForeverNotes : '/notes/deleteForeverNotes',
    archiveNotes : '/notes/archiveNotes',
    pinUnpinNotes : '/notes/pinUnpinNotes',
    updateReminderNotes : '/notes/addUpdateReminderNotes',
    removeReminderNotes : '/notes/removeReminderNotes',
    getNoteLabelList : '/noteLabels/getNoteLabelList',
    noteLabels : '/noteLabels',
    deleteNoteLabels : '/deleteNoteLabel',
    updateNoteLabels : '/updateNoteLabel',
    searchUserList : '/user/searchUserList',
    uploadProfileImage : '/user/uploadProfileImage'
}

export default Api