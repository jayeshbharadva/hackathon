// script.js
fetch('navigation.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navigation').innerHTML = data;
  })
  .catch(error => {
    console.error('Error loading navigation:', error);
  });

