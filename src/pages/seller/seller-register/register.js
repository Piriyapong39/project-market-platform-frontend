
if(localStorage.getItem("token")){
    window.location.href = "./confirm-register/confirm-register.html"
}

document.querySelector(".seller-register-form").addEventListener("submit", async (e)=>{
    e.preventDefault();
    console.log(e.target.email.value)
    const formData = {
        email: e.target.email.value,
        password: e.target.email.value,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        address: e.target.address.value
    }
    try {
        const response = await fetch("http://localhost:8080/users/sellers/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        const result = await response.json();
        if(response.ok){
            console.log(result.data)
            alert(result.data)
        }else{
            alert(result.error)
            console.log(result.error)
        }
    } catch (error) {
        console.log(error)
    }
})