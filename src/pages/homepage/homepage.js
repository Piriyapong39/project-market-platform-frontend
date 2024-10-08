import { loadHeader } from "../../utils/header-footer-navbar.js";

document.addEventListener("DOMContentLoaded", function() {
    loadHeader()
        .then(() => {
            return fetch("../src/pages/homepage/homepage.html");
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(homepageData => {
            document.getElementById('homepage').innerHTML = homepageData; 
        })
        .catch(error => console.error('Error loading content:', error));
});