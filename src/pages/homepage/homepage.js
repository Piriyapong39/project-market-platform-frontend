
document.addEventListener("DOMContentLoaded", ()=>{
    if(!localStorage.token){
        window.location.href = "../login/login.html"
    }
})

document.querySelector(".li-btn-logout button").addEventListener("click", async ()=>{
    localStorage.removeItem("token");
    window.location.href = "../login/login.html"
})

