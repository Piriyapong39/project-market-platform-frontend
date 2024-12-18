
// onclick to register
document.querySelector(".form-register").addEventListener("submit", async(e)=>{
    e.preventDefault();
    const formData = {
        email: e.target.email.value,
        password: e.target.password.value,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        address: e.target.address.value
    }
    try {
        const response = await fetch('http://localhost:8080/users/buyers/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const result = await response.json();
        if(response.ok){
            alert(result.data)
            window.location.href = "../login/login.html"
        }else{
            console.log(result)
        }
    } catch (error) {
        console.log(error)
    }

})

