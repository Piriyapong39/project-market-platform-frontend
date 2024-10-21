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
        if(e.pic_paths){
            e.pic_paths.forEach(e => {
                const path = e.split("\\")
                const pathSplit = path.splice(7)
                const partJoint = pathSplit.join("/")
                imagesHtml = `${baseUrl}/${partJoint}`}
            )
        }else{
            null
        }
        row.innerHTML = `
            <td><img src="${imagesHtml}"></td>
            <td>${e.product_name}</td>
            <td>${e.product_desc}</td>
            <td>${e.product_price}</td>
            <td>${e.product_stock}</td>
            <td>${e.category_name}</td>
        `;
        row.id = `${e.product_id}`
        tbody.appendChild(row);
    });
}


// function insert product in popup after click on submit
document.querySelector(".form-insert-product").addEventListener("submit", async (e) => {
    e.preventDefault();

    // token
    const token = localStorage.getItem("token");

    // 
    const form = document.querySelector(".form-insert-product")
    const formData = new FormData(form);
    try {
        console.log("Sending request to server...");
        const response = await fetch("http://localhost:8080/products/manage-stock/insert-product", {
            method: "POST",
            headers: {
                "authorization": "Bearer" + " " + token
            },
            body: formData
        });
        const result = await response.json();
        if (response.ok) {
            console.log("Success:", result.data);
            document.querySelector(".overlay").style.display = "none";
            document.querySelector(".popup").style.display = "none";
            window.location.reload();
        } else {
            console.log(result.error)
        }
    } catch (error) {
        console.log(error)
    }
});








// Insert Product Button
// document.querySelector(".global-btn:first-child").addEventListener("click", async () => {
//     const tbody = document.querySelector(".container-table table tbody")

//     // Create new row and cell
//     const newRow = document.createElement("tr")
//     const newCell = document.createElement("td")

//     // Create data that will append in td
//     const rowCount = tbody.querySelectorAll("tr").length
//     newCell.innerHTML = `Hello Row ${rowCount + 1}`

//     newRow.appendChild(newCell)
//     tbody.appendChild(newRow)
// });

// Delete product button
// document.querySelector(".global-btn:nth-child(2)").addEventListener("click", () => {
//     const tbody = document.querySelector(".container-table table tbody");
//     const lastRow = tbody.lastElementChild;
//     if (lastRow) {
//         lastRow.classList.add("remove-animation");
//         lastRow.addEventListener('animationend', () => {
//             tbody.removeChild(lastRow);
//         });
//     } else {
//         null
//     }
// });