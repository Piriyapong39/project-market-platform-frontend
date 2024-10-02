export function loadHeader() {
    return fetch("../components/header/header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(headerData => {
            document.getElementById('header').innerHTML = headerData; 
        });
}
