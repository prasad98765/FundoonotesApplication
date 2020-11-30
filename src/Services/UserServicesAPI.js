import Axios from "axios";
import Api from "../config/FundooLoopbackAPI.js"
const details = JSON.parse(localStorage.getItem("details")); 


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
          console.log("login data",response);
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

      searchUserList = async (user, callback)=>{
        return  Axios.post(
          `${Api.Url}${Api.searchUserList}?access_token=${details.id}`,
            user
          )
            .then((response) => {
              callback(response);
            })
            .catch((error) => {
              callback(error);
            });
        }
  
        uploadProfileImage = async (user, callback)=>{
          return  Axios.post(
            `${Api.Url}${Api.uploadProfileImage}?access_token=${details.id}`,
              user
            )
              .then((response) => {
                callback(response);
              })
              .catch((error) => {
                callback(error);
              });
          }
    
    
  
}



export default new UserServices();

