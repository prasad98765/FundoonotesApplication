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

}

export default new UserNoteServices();
