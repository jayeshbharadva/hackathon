const token = localStorage.getItem('studenttoken');

const urlParams = new URLSearchParams(window.location.search);
const hid = urlParams.get('hid');
console.log(hid);

function logout(){
    // Clear user-related data or session variables
    localStorage.removeItem('token');
    sessionStorage.clear();
    // ...additional data clearing if necessary
    
    // Redirect the user to the login page
    window.location.href = 'studentlogin.html'; 
}

    const form = document.querySelector('form');
    const errorMessageContainer = document.getElementById('error-message-container');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      var pid = document.getElementById('pid').value;
      var pname = document.getElementById('pname').value;
      var abstract = document.getElementById('abstract').value;
  
    // Create an object with form values
    var hackathonData = {
        hid,
        pid,
        pname,
        abstract,
    };
    const response = await savehackdata(hackathonData);
    const res = await response.json();
    console.log(res);
        if(response.ok){
            console.log("data added");
            // window.location.href="hacklistcompany.html";
          }
          else{
            console.log("responce is false");
            displayErrorMessage(res.msg);
          }
      });  

  async function savehackdata(dataobject){
    try{
      return await fetch(`http://localhost:3007/student/partinhackathon`,{
      method:"POST",
      headers: {
          "Content-Type" : "application/json",
          "Authorization": 'Bearer ' + token
        },
        body: JSON.stringify(dataobject),
    });
    }
    catch(err){
      console.log('error in data store');
      return{
          ok:false,
      };
    }
}
function displayErrorMessage(message) {
  errorMessageContainer.innerHTML = `<p class="error-message">${message}</p>`;
}