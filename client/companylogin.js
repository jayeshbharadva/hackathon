const form = document.querySelector('form');

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
    if(responce.ok){
       const data = await responce.json();
       localStorage.setItem('companytoken',data.accesstoken);
        if(data.msg){
            console.log(data.msg);
        }
        if(data.accesstoken){
            console.log(data.accesstoken);
        }
        window.location.href = "hacklistcompany.html"; //set redirect to hackathon list of company
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