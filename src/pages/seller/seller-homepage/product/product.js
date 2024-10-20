document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "../../../login/login.html";
        return;
    }
    try {
        const response = await fetch("http://localhost:8080/products/manage-stock/get-product", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });
        const result = await response.json();
        if (response.ok) {
            insertTableData(result.data);
        } else {
            console.log(result.error);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
});

function insertTableData(productData) {
    const tbody = document.querySelector(".container-table tbody");
    const baseUrl = "http://localhost:8080/picture-files"; 
    productData.forEach(e => {
        const row = document.createElement("tr");
        let imagesHtml = ''
        e.pic_paths.forEach(e => {
            const path = e.split("\\")
            const pathSplit = path.splice(7)
            const partJoint = pathSplit.join("/")
            console.log(partJoint)
            imagesHtml = `${baseUrl}/${partJoint}`
        }
        )
        row.innerHTML = `
            <td><img src="${imagesHtml}"></td>
            <td>${e.product_name}</td>
            <td>${e.product_desc}</td>
            <td>${e.product_price}</td>
            <td>${e.product_stock}</td>
        `;
        tbody.appendChild(row);
    });
}