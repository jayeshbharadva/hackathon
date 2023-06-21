const form = document.querySelector('form');
const msg = document.getElementById('msg');


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
    const data = await responce.json();
    if(responce.ok){
       localStorage.setItem('studenttoken',data.accesstoken);
        window.location.href = "studenthacklist.html"; //set redirect to hackathon list of company
    }
    else{
        console.log("erroor msg to be printed");
        errormsg(data.msg)
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

function errormsg(errmsg){
    msg.innerHTML = `<h2>${errmsg}</h2>`
}