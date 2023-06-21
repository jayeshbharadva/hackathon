function logout() {
  // Clear user-related data or session variables
  localStorage.removeItem("studenttoken");
  sessionStorage.clear();

  window.location.href = 'studentlogin.html';
}

window.addEventListener('DOMContentLoaded', function() {
  var token = localStorage.getItem("studenttoken");

  if (!token) {
    // User is not logged in, redirect to the login page
    window.location.href = 'studentlogin.html';
  }
});

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3007/student/returnname', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem("studenttoken")
      }
    });
    const data = await response.json();
    localStorage.setItem("name", data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function main() {
  try {
    await fetchData();
    const navigationResponse = await fetch('studentnavigation.html');
    const navigationData = await navigationResponse.text();
    document.getElementById('navigation').innerHTML = navigationData;
  } catch (error) {
    console.error('Error:', error);
  }
}

main();