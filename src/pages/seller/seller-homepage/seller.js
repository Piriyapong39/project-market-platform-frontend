document.addEventListener("DOMContentLoaded", async ()=>{
    const token = localStorage.getItem("token")
    console.log(token)
    if(!token){
        window.location.href = "../../login/login.html"
    }
    try {
        const response = await fetch("http://localhost:8080/products/manage-stock/seller-homepage", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer"+ " " + token 
            }
        })
        const result = await response.json();
        if(response.ok){
            console.log(result)
        }else{
            window.location.href = "../seller-register/register.html"
        }
    } catch (error) {
        console.log(error)
    }
})