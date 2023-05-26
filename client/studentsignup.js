const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    var sid = document.getElementById('sid').value;
    var sname = document.getElementById('sname').value;
    var semail = document.getElementById('semail').value;
    var spassword = document.getElementById('spassword').value;
    const formdata = {
        sid,sname,semail,spassword,
    }
    console.log(formdata);
    const response = await savestudent(formdata);
    if(response.ok){
        console.log('data enetred successfully');
        window.location.href="studentlogin.html";
    }
    else{
        console.log('problem in data entry');
    }
});

  async function savestudent(dataobject){
    try{
      return await fetch(`http://localhost:3007/student/`,{
      method:"POST",
      headers: {
          "Content-Type" : "application/json",
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

  