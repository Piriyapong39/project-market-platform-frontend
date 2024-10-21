document.querySelector("#open-popup-btn").addEventListener("click", ()=>{
    document.querySelector(".global-popup div:first-child").style.display = "block";
    document.querySelector(".global-popup div:last-child").style.display = "block"
})

document.querySelector("#close-popup-btn").addEventListener("click", (e)=>{
    e.preventDefault();
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".popup").style.display = "none";
})


