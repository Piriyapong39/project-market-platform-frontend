document.querySelector("#open-popup-btn").addEventListener("click", ()=>{
    document.querySelector('.overlay').classList.add('active');
    document.querySelector('.popup').classList.add('active');
})

document.querySelector("#close-popup-btn").addEventListener("click", (e)=>{
    e.preventDefault();
    document.querySelector('.overlay').classList.remove('active');
    document.querySelector('.popup').classList.remove('active');
})


