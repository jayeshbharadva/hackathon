const form = document.querySelector('form');

form.addEventListener('submit', async(event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const sid = formData.get('sid');
    const spassword = formData.get('spassword');

    const loginobject = {
        sid,
        spassword,
    }
    console.log(loginobject);
    const responce = await login(loginobject);
    console.log(responce);
    if(responce.ok){
       const data = await responce.json();
       console.log(data);
       localStorage.setItem('studenttoken',data.accesstoken);
        if(data.msg){
            console.log(data.msg);
        }
        if(data.accesstoken){
            console.log(data.accesstoken);
        }
        window.location.href = "studenthacklist.html"; //set redirect to hackathon list of company
    }
    }
)

async function login(loginobject){
        try{
            return await fetch(`http://localhost:3007/student/login`,{
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
              },
              body: JSON.stringify(loginobject),
          });
          }
          catch(err){
            console.log('some error occured');
            return{
                ok:false,
            };
          }
        }