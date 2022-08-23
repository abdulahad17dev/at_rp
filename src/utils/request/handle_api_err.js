import Swal from "sweetalert2";

export let link = "https://constructionproject.crud.uz/uploaded_files/";

export function catchError(error) {
  if (error.response.status == 401) {
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
        title: "Login yoki parolda xatolik",
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
      title: "Server bilan aloqa mavjud emas !",
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
      title: "Ma'lumot to'liq emas !",
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
      title: "URL manzili noto'g'ri !",
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
  }
}

export function success(res) {
  return Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
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
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "error",
      title: "Foydalanuvchi Geolokatsiyani rad etdi",
    });
  }
}
