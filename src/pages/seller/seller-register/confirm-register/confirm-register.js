// Import global function

const token = localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", async () => {
    if (!token) {
        window.location.href = "../../../login/login.html";
    } else {
        try {
            const response = await fetch("http://localhost:8080/users/sellers/is-not-seller", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token 
                }
            });
            const result = await response.json();
            if (response.ok) {
                null
            } else {
                console.log(result.error)
                window.location.href = "../../seller-homepage/homepage-seller.html"
            }
        } catch (error) {
            console.error(error); 
        }
    }
});

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
            localStorage.setItem("token", result.data)
            window.location.href = "../../seller-homepage/homepage-seller.html"
        }else{
            null
        }
    } catch (error) {
        console.log(error)
    }
}) 

document.querySelector(".confirm-box button:last-child").addEventListener("click", ()=>{
    window.location.href = "../../../homepage/homepage.html"
})