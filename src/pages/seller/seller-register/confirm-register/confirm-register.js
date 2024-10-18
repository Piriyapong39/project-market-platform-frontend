
document.querySelector(".confirm-box:first-child")
console.log(document.querySelector(".confirm-box button:last-child"))

const token = localStorage.getItem("token")
if(!token){
    window.location.href = "../../../login/login.html"
}
document.addEventListener("DOMContentLoaded", async ()=>{
    try {
        const response = await fetch("http://localhost:8080/users/sellers/is-not-seller", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer" + " " + token
            }
        })
        const result = await response.json()
        if(response.ok){
            null
        }else{
            console.log(result.error)
            window.location.href = "../../seller-homepage/seller.html"
        }
    } catch (error) {
        console.log(error)
    }
})


document.querySelector(".confirm-box button:first-child").addEventListener("click", async ()=>{
    try {
        const response = await fetch("http://localhost:8080/users/sellers/to-seller", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer" + " " + token
            }
        })
        const result = await response.json()
        if(response.ok){
            console.log(result.data)
        }else{
            console.log(result.error)
        }
    } catch (error) {
        console.log(error)
    }
}) 