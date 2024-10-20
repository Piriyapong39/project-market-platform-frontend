
const token = localStorage.getItem("token")

document.addEventListener("DOMContentLoaded", async ()=>{
    if(!token){
        window.location.href = "../../login/login.html"
    }
    const response = await fetch("http://localhost:8080/users/sellers/authen", {
        method: "POST",
        headers: {
            "Content-Type": "appliaction/json",
            "authorization": "Bearer" + " " + token
        }
    })

    const result = await response.json();
    if(response.ok){
        console.log(result.data)
        document.querySelector(".content > h1:first-child").innerHTML = `Hello, ${result.data.first_name}`
    }else{
        console.log(result.error)
    }
})


// Demo data
const salesData = {
    labels: ['Jan.', 'Feb.', 'March.', 'April.', 'May', 'June', 'July', "August"],
    datasets: [{
        label: 'Total',
        data: [4000, 3000, 5000, 2780, 1890, 2390, 3490, 10000],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.querySelector('#salesChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: salesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});


document.querySelector(".global-btn-logout button").addEventListener("click", ()=>{
    localStorage.removeItem("token")
    window.location.reload();
})
