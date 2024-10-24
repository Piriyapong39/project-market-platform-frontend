
/* Reload function */
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

/* function get product to create table */
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
            <td><button class="delete-product-btn">Delete</button></td>
        `;
        row.id = `${e.product_id}`
        tbody.appendChild(row);
    });
}

// function insert product in popup after click on submit
document.querySelector(".form-insert-product").addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const form = document.querySelector(".form-insert-product")
    const formData = new FormData(form);
    try {
        const response = await fetch("http://localhost:8080/products/manage-stock/insert-product", {
            method: "POST",
            headers: {
                "authorization": `Bearer ${token}`
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


// function preview product
document.querySelector("#preview-btn").addEventListener("click", async (e) => {
    e.preventDefault(); 
    try {
        const form = document.querySelector(".form-insert-product");
        const formData = new FormData();        
        const pictureFiles = form.querySelector('input[name="files"]').files;
        const mainPicture = form.querySelector('input[name="file"]').files[0];
        const picturesArray = Array.from(pictureFiles);
        console.log(picturesArray)
        if (mainPicture) {
            const mainPictureObject = new File(
                [mainPicture], 
                'mainPicture.jpg',  
                { type: mainPicture.type }
            );
            picturesArray.unshift(mainPictureObject); 
        } else {
            console.log("You must insert main picture");
            return;
        }

        if(picturesArray.length > 5){
            throw new Error("picture files must less than 5 pictures");
        }
        formData.append('product_name', form.product_name.value);
        formData.append('product_desc', form.product_desc.value);
        formData.append('product_price', form.product_price.value);
        formData.append('product_stock', form.product_stock.value);
        formData.append('category_id', form.category_id.value);
        picturesArray.forEach(file => {
            formData.append('files', file);  
        });
        
        console.log('Files to be uploaded:');
        formData.getAll('files').forEach(file => {
            console.log('File:', file.name, 'Size:', file.size, 'Type:', file.type);
        });


        const formDataPreview = {
            product_name: form.product_name.value,
            product_desc: form.product_desc.value,
            product_price: form.product_price.value,
            product_stock: form.product_stock.value,
            catagory_id: form.catagory_id.val
        }

        // config each data
        const productDetail = document.querySelector(".product-details")
    
        // product name
        const productName = productDetail.querySelector("h2:first-child")
        productName.innerHTML = formDataPreview.product_name

        // product description
        const product_desc = productDetail.querySelector("ul:first-of-type");
        product_desc.innerHTML = '';
        const lines = formDataPreview.product_desc.split('\n').filter(line => line.trim() !== '');
        lines.forEach(line => {
            const li = document.createElement('li');
            li.textContent = line.trim();
            product_desc.appendChild(li);
        });

        // product price
        const product_price = productDetail.querySelector("#preview-price li")
        product_price .innerHTML = `$ ${parseFloat(formDataPreview.product_price).toFixed(2)} USD`

        // product stock
        const product_stock = productDetail.querySelector("#preview-stock li")
        product_stock.innerHTML = parseInt(formDataPreview.product_stock)

        // category
        const categoryVal = productDetail.querySelector("#preview-category li")
        const catagory_id = Number(formDataPreview.category_id)
        switch (catagory_id){
            case 1: 
                categoryVal.innerHTML = "Electronics"
                break
            case 2:
                categoryVal.innerHTML = "Automotive part"
                break
            case 3:
                categoryVal.innerHTML = "Stationary"
                break
            case 4:
                categoryVal.innerHTML = "Phone and Accessory"
                break
            case 5:
                categoryVal.innerHTML = "Entertainment"
                break
            case 6:
                categoryVal.innerHTML = "Outfit"
        }   
        
    } catch (error) {
        alert(error)
        console.log(error)
    }
});

// function reset product data


/* function click to change images in popup => preview */
function changeImage(src, thumbnail) {
    document.querySelector('.main-img').src = src;
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnail.classList.add('active');
}




















