import Axios from "axios";
import Api from "../config/FundooLoopbackAPI.js"

class UserServices {
  createAccount =  (user,callback) => {
    return Axios.post(
      `${Api.Url}${Api.userSignUp}`,
       user
     )
       .then((response) => {
         callback(response);
       })
       .catch((error) => {
         callback(error.response);
       });
   }
   userLogin = async (user,callback) => {
    return await Axios.post(
      `${Api.Url}${Api.userSignIn}`,
        user
      )
        .then((response) => {
          callback(response);
        })
        .catch((error) => {
          callback(error);
        });
    }
    forgotPassword = async (user, callback)=>{
      return  Axios.post(
        `${Api.Url}${Api.userResetPass}`,
          user
        )
          .then((response) => {
            console.log(response);
            callback(response);
          })
          .catch((error) => {
            callback(error);
          });
      }
  
}



export default new UserServices();

