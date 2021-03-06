import Axios from "axios";
import Api from "../config/FundooLoopbackAPI"
const details = JSON.parse(localStorage.getItem("details")); 

class UserNoteServices {
  saveNote =  (data,callback) => {
    return Axios.post(
      `${Api.Url}${Api.addNotes}?access_token=${details.id}`,
      data
     )
       .then((response) => {
         callback(response);
       })
       .catch((error) => {
         callback(error.response);
       });
   }
    getAllNotes =  (callback) => {
        return Axios.get(
          `${Api.Url}${Api.getAllNotes}?access_token=${details.id}`
         )
           .then((response) => {

             callback(response);
           })
           .catch((error) => {
             callback(error.response);
           });
       }

       updateNotes =  (data,callback) => {
        return Axios.post(
          `${Api.Url}${Api.updateNotes}?access_token=${details.id}`,
            data
         )
           .then((response) => {

             callback(response);
           })
           .catch((error) => {
             callback(error.response);
           });
       }

       changesColorNotes = (data,callback) => {
         return Axios.post(
           `${Api.Url}${Api.changesColorNotes}?access_token=${details.id}`,
           data
         )
         .then((response) => {
           callback(response)
         })
         .catch((error)=> {
           callback(error)
         })
       }

       trashNotes = (data,callback) => {
        return Axios.post(
          `${Api.Url}${Api.trashNotes}?access_token=${details.id}`,
          data
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }

      restoreTrashNotes = (data,callback) => {
        return Axios.post(
          `${Api.Url}${Api.restoreTrashNotes}?access_token=${details.id}`,
          data
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }
      deleteForeverNotes = (data,callback) => {
        return Axios.post(
          `${Api.Url}${Api.deleteForeverNotes}?access_token=${details.id}`,
          data
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }

      archiveNotes = (data,callback) => {
        return Axios.post(
          `${Api.Url}${Api.archiveNotes}?access_token=${details.id}`,
          data
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }

      pinUnpinNotes = (data,callback) => {
        return Axios.post(
          `${Api.Url}${Api.pinUnpinNotes}?access_token=${details.id}`,
          data
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }

      updateReminderNotes = (data,callback) => {
        return Axios.post(
          `${Api.Url}${Api.updateReminderNotes}?access_token=${details.id}`,
          data
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }

      removeReminderNotes = (data,callback) => {
        return Axios.post(
          `${Api.Url}${Api.removeReminderNotes}?access_token=${details.id}`,
          data
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }


      getNoteLabelList = (callback) => {
        return Axios.get(
          `${Api.Url}${Api.getNoteLabelList}?access_token=${details.id}`
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }
      

      noteLabels = (data,callback) => {
        return Axios.post(
          `${Api.Url}${Api.noteLabels}?access_token=${details.id}`,
          data
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }

      deleteNoteLabels = (data,callback) => {
        return Axios.delete(
          `${Api.Url}/noteLabels/${data.id}${Api.deleteNoteLabels}?access_token=${details.id}`,
          data
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }

        
      
      updateNoteLabels = (data,callback) => {
        return Axios.post(
          `${Api.Url}/noteLabels/${data.id}${Api.updateNoteLabels}?access_token=${details.id}`,
          data
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }

    
      addLableToNotes = (data,callback) => {
        return Axios.post(
          `${Api.Url}/notes/${data.NoteId}/addLabelToNotes/${data.lableId}/add?access_token=${details.id}`
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }

      removeLableToNotes = (data,callback) => {
        return Axios.post(
          `${Api.Url}/notes/${data.NoteId}/addLabelToNotes/${data.lableId}/remove?access_token=${details.id}`
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }


    
      getNotesListByLabels = (data,callback) => {
        return Axios.post(
          `${Api.Url}/notes/getNotesListByLabel/${data}?access_token=${details.id}`,
          data
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }
      

      addCollaboratorsNotes = (data,callback) => {
        let userData = {
          email : data.email,
          firstName : data.firstName,
          lastName : data.lastName,
          userId : data.userId 
        }
        return Axios.post(
          `${Api.Url}/notes/${data.noteId}/AddCollaboratorsNotes?access_token=${details.id}`,
          userData
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }

      deleteCollaboratorsNotes = (data,callback) => {
        return Axios.delete(
          `${Api.Url}/notes/${data.noteId}/removeCollaboratorsNotes/${data.userId}?access_token=${details.id}`
        )
        .then((response) => {
          callback(response)
        })
        .catch((error)=> {
          callback(error)
        })
      }
      


}

export default new UserNoteServices();
