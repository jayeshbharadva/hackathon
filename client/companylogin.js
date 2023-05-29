const form = document.querySelector('form');

const successmsg = document.getElementById('successmsg');
form.addEventListener('submit', async(event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const cid = formData.get('cid');
    const cpassword = formData.get('cpassword');

    const loginobject = {
        cid,
        cpassword,
    }
    const responce = await login(loginobject);
    const data = await responce.json();
    if(responce.ok){
       localStorage.setItem('companytoken',data.accesstoken);
        window.location.href = "hacklistcompany.html"; //set redirect to hackathon list of company
    }
    else{
        console.log("user is not proper");
        printmsg(data.msg);
    }
    }
)

async function login(loginobject){
        try{
            return await fetch(`http://localhost:3007/company/login`,{
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
              },
              body: JSON.stringify(loginobject),
          });
          }
          catch(err){
            console.log('error in data store');
            return{
                ok:false,
            };
          }
}


function printmsg(msg){
    console.log("hello ");
    successmsg.innerHTML = `<h3>${msg}</h3>`
}