
document.addEventListener("DOMContentLoaded", ()=>{
    if(!localStorage.token){
        window.location.href = "../login/login.html"
    }
})

document.querySelector(".global-btn-logout").addEventListener("click", async ()=>{
    localStorage.removeItem("token");
    window.location.href = "../login/login.html"
})

