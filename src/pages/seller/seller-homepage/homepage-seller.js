
const token = localStorage.getItem("token")

document.addEventListener("DOMContentLoaded", async ()=>{
    if(!token){
        window.location.href = "../../login/login.html"
    }
    //const response = await fetch("http://localhost:8080/users/sellers")
})



document.querySelector(".global-btn-logout button").addEventListener("click", ()=>{
    localStorage.removeItem("token")
    window.location.reload();
})
