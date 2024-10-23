

document.querySelector(".login-form").addEventListener("submit", async(e)=>{
    e.preventDefault();
    const formData = {
        email: e.target.email.value,
        password: e.target.password.value
    }

    try {
        const response = await fetch("http://localhost:8080/users/buyers/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const result = await response.json();
        if(response.ok){
            alert("Login successfully")
            console.log("Login successfully")
            localStorage.setItem("token", result.data)
            window.location.href = "../homepage/homepage.html"
        }else{
            alert(result.error)
        }
    } catch (error) {
        console.log(error)
    }
})

$("document").ready(()=>{
    $(".login-form").clikck(()=>{
        $("button")
    })
})

