const token = localStorage.getItem('companytoken');

function logout(){
    // Clear user-related data or session variables
    localStorage.removeItem('token');
    sessionStorage.clear();
    // ...additional data clearing if necessary
    
    // Redirect the user to the login page
    window.location.href = 'companylogin.html'; 
}

    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      var hid = document.getElementById('hid').value;
      var hname = document.getElementById('hname').value;
      var htagline = document.getElementById('htagline').value;
      var habout = document.getElementById('habout').value;
      var hlevel = document.getElementById('hlevel').value;
      var hprize = document.getElementById('hprize').value;
      var hdescription = document.getElementById('hdescription').value;
      var hpfile = document.getElementById('hpfile').value;
      var htech = document.getElementById('htech').value;
      var odate = document.getElementById('odate').value;
      var cdate = document.getElementById('cdate').value;
      var asdate = document.getElementById('asdate').value;
      var aldate = document.getElementById('aldate').value;
      var rdate = document.getElementById('rdate').value;
      var htmax = document.getElementById('htmax').value;
      var htmin = document.getElementById('htmin').value;
  
    // Create an object with form values
    var hackathonData = {
        hid,
        hname,
        htagline,
        habout,
        hlevel,
        hprize,
        hdescription,
        hpfile,
        htech,

      hdates: {
        odate,
        cdate,
        asdate,
        aldate,
        rdate,
      },

      hteamsize: {
        htmax,
        htmin,
      },
    };
    const response = await savehackdata(hackathonData);
    console.log(response);
        if(response.ok){
            console.log("data added");
            window.location.href="hacklistcompany.html";
          }
          else{
            console.log("responce is false");
          }
      });  

  async function savehackdata(dataobject){
    try{
      return await fetch(`http://localhost:3007/hack`,{
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