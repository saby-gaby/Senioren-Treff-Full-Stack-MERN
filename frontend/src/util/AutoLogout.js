import axiosConfig from "./axiosConfig";

export const autoLogout = async () => {

        try {
          await axiosConfig.post("/user/logout")
          localStorage.clear()
          console.log("automatically logged out");
        } catch (error) {
          console.log(error);
    }
}
 
