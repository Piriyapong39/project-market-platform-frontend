function logOut(){
    localStorage.removeItem("token")
    window.location.reload();
}
document.querySelector(".global-btn-logout").addEventListener("click", ()=>{
    logOut();
})