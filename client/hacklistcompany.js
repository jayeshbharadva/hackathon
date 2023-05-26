const token = localStorage.getItem('companytoken');

checkauthentication();

function logout() {
    // Clear user-related data or session variables
    localStorage.removeItem('token');
    sessionStorage.clear();
  
    // Redirect the user to the login page
    window.location.href = 'companylogin.html'; 
}

async function checkauthentication(){  
    try{
        const response =  await fetch(`http://localhost:3007/company/hacklist`,{
            method: "GET",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": 'Bearer ' + token
            }
        });
    const res = await response.json();
    data = res.hack;
    console.log(data);
        
        let tabledata = "";
        if(!data){
            console.log("nod data avaulavke");
        }

        else{
        data.map((values)=>{
            let date = values.hdates.aldate;
            date = date.split('T');
            date = date[0];
            tabledata += 
            `
            <div>
                <h3>${values.hname}</h3>
                <div> 
                    <span>${date}</span>
                    <span class="span1"><a href="companyhackdetail.html?hid=${values.hid}"> See Details</a></span>
                </div>
                <div class="div1"> No. Of Participants : 1015</div><hr>
            </div>
            `
        });
        document.getElementById("hacktable").innerHTML = tabledata;
    }    
    }
    catch(err){
        console.log(err);
    }
}

