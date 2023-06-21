const token = localStorage.getItem('companytoken');
if(!token){
    window.location.href = "companylogin.html";
}

const hacktable = document.getElementById('hacktable');

checkauthentication();

async function checkauthentication() {  
    try {
        const response = await fetch(`http://localhost:3007/company/hacklist`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token
            }
        });
        const res = await response.json();
        const data = res.hack;
        let tabledata = "";
        if (!data) {
            hacktable.innerHTML =  `<h2>You have not hosted any hachathon!! host a hackathon</h2>`
        } else {
            const promises = data.map(async (values) => {
                const hid = values.hid;
                try {
                    const studentresponse = await fetch(`http://localhost:3007/student/studentinfo`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": 'Bearer ' + token
                        },
                        body: JSON.stringify({ hid }),
                    });
                    const studentData = await studentresponse.json();
                    return {
                        values,
                        participantsCount: studentData.length
                    };
                } catch (error) {
                    console.log("Error in student data API call:", error);
                }
            });

            const results = await Promise.all(promises);

            results.forEach((result) => {
                console.log(result);
                const { values, participantsCount } = result;
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
                            <span>${values.hlevel}</span>
                        <div class="div1"> No. Of Participants: ${participantsCount}</div><hr>
                    </div>
                    `;
            });

            hacktable.innerHTML = tabledata;
        }
    } catch (err) {
        console.log(err);
    }
}
