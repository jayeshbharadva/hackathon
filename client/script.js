function logout() {
  // Clear user-related data or session variables
  localStorage.removeItem("companytoken");
  sessionStorage.clear();

  console.log(localStorage.getItem("companytoken"));
  // Redirect the user to the login page
  window.location.href = 'companylogin.html';
}

window.addEventListener('DOMContentLoaded', function() {
  var companyToken = localStorage.getItem("companytoken");

  if (!companyToken) {
    // User is not logged in, redirect to the login page
    window.location.href = 'companylogin.html';
  }
});

fetch('http://localhost:3007/company/returnname')
  .then(data=>response.json())
  .then(data=>{
    console.log(data);
  })

// script.js
fetch('navigation.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navigation').innerHTML = data;
  })
  .catch(error => {
    console.error('Error loading navigation:', error);
  });



