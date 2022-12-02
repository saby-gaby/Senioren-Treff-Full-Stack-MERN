import axiosConfig from "./axiosConfig";
import Cookies from "js-cookie";
import swal from "sweetalert";

export const autoLogout = async () => {
  const isLoggedToken = Cookies.get("isLogged");
  const expiresInMs = isLoggedToken - new Date().getTime();
  const localItems = localStorage.getItem("userId");
  if ((!isLoggedToken && localItems) || (expiresInMs <= 0 && localItems)) {
    await axiosConfig.post("/user/logout");
    localStorage.clear();
    swal({
      title: "Du wurdest automatisch abgemeldet.",
      icon: "warning",
      dangerMode: true,
    }).then(() => {
      location.reload()
    });
  }
};
