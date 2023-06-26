const token = localStorage.getItem('studenttoken');

checkAuthentication();

function logout() {
    // Clear user-related data or session variables
    localStorage.removeItem('studenttoken');
    sessionStorage.clear();
  
    // Redirect the user to the login page
    window.location.href = 'companylogin.html'; 
}

async function checkAuthentication() {  
    try {
        const response =  await fetch(`http://localhost:3007/student/hackpart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        console.log(data);
        let tableData = '';
        if (!data) {
            console.log('No data available');
        } else {
            const promises = data.map(async (values)=>{
                const hid = values.hid;
                try{
                    const hackdetail = await fetch(`http://localhost:3007/hack/hackbyid`,{
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": 'Bearer ' + token
                        },
                        body: JSON.stringify({ hid }),
                    });
                    var detail = await hackdetail.json();
                    console.log(detail);
                    return{
                        detail,values
                    };
                }
                catch(err){
                    console.log("some eroor occured while fetching data");
                    return{
                        ok: false,
                        msg:'some eroor occured while fetching data',
                    }
                }
            });

            const results = await Promise.all(promises);

            results.forEach((data)=>{
                // console.log(data);
            })
}
    }
    catch(error){
        console.log("error in data fetch");
    }
}
function redirectToPage(pageUrl) {
    window.location.href = pageUrl;
}
