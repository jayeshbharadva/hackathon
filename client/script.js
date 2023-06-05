function logout() {
  // Clear user-related data or session variables
  localStorage.removeItem("companytoken");
  console.log("logged out");
  sessionStorage.clear();

  console.log(localStorage.getItem("companytoken"));
  // Redirect the user to the login page
  window.location.href = 'companylogin.html';
}

// script.js
fetch('navigation.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navigation').innerHTML = data;
  })
  .catch(error => {
    console.error('Error loading navigation:', error);
  });



