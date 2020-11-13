import Axios from "axios";
const Url = 'http://fundoonotes.incubation.bridgelabz.com/api/'

class UserServices {
  createAccount =  (user,callback) => {
    return Axios.post(
       `${Url}user/userSignUp`,
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
        `${Url}user/login`,
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
    forgotPassword = async (user, callback)=>{
      return  Axios.post(
          `${Url}/user/reset`,
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

