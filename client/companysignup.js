const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
event.preventDefault();
const formData = new FormData(form);
const cid = formData.get('cid');
const cname = formData.get('cname');
const cemail = formData.get('cemail');
const cpassword = formData.get('cpassword');
const cdescription = formData.get('cdescription');

const formDataObject = {
    cid,
    cname,
    cemail,
    cpassword,
    cdescription
  };
  const response = await savelogindata(formDataObject);
  if(response.ok){
      console.log("data added");
      window.location.href="companylogin.html";
    }
    else{
      console.log("responce is false");
    }
});

async function savelogindata(dataobject){
      try{
        return await fetch(`http://localhost:3007/company/`,{
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
