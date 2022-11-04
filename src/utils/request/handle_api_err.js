import Swal from "sweetalert2";

export let link = "https://constructionproject.crud.uz/uploaded_files/";

export function catchError(error) {
  console.log(error);
  if (error.response.status == 401) {
    console.clear();
    localStorage.removeItem("role");
    localStorage.removeItem("access_token");
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    })
      .fire({
        icon: "error",
        title: "Логин ёки паролда хатолик",
      })
      .then(() => {
        if (window.location.pathname == "/") {
          console.log();
        } else {
          window.location.href = "/";
        }
      });
  } else if (error.message == "Network Error") {
    return Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "warning",
      title: "Интернет билан алоқа мавжуд эмас",
    });
  } else if (error.response.status == 422) {
    return Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "warning",
      title: "Маълумот тўлиқ эмас",
    });
  } else if (error.response.status == 404) {
    return Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "error",
      title: "УРЛ манзил нотўғри !",
    });
  } else if (error.response.status == 400) {
    return Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "error",
      title: error.response.data.detail,
    });
  } else if (error.response.data.detail == "Inactive user") {
    console.clear();
    localStorage.clear();
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    })
      .fire({
        icon: "error",
        title: "Логин ёки паролда хатолик",
      })
      .then(() => {
        if (window.location.pathname == "/") {
          console.log();
        } else {
          window.location.href = "/";
        }
      });
  }
  console.clear();
}

export function success(res) {
  return Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
  }).fire({
    icon: "success",
    title: res.data.detail,
  });
}

export function position_err(err) {
  if (err.message == "User denied Geolocation") {
    return Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "error",
      title: "Фойдаланувчи Геолокацияни рад этди",
    });
  }
}
