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
}

export default new UserServices();

