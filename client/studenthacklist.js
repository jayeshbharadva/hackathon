const token = localStorage.getItem('studenttoken');
checkAuthentication();

async function checkAuthentication() {  
    try {
        const response =  await fetch('http://localhost:3007/hack/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        const data = await response.json();
        
        let tableData = '';
        if (!data) {
            console.log('No data available');
        } else {
            data.map((values) => {
                let date = values.hdates.aldate;
                date = date.split('T');
                date = date[0];
                tableData += `
                    <div class="column" onclick="redirectToPage('hackathon-details.html?hid=${values.hid}')">
                        <span>${values.hlevel}</span>
                        <span>${values.hname}</span>
                        <div>
                            <span class="info-hack">${date}</span>
                            <span class="info-hack">${values.htech}</span>
                        </div>
                    </div>
                    <hr>
                `;
            });
            document.getElementById('hacktable').innerHTML = tableData;
        }    
    } catch (err) {
        console.log(err);
    }
}

function redirectToPage(pageUrl) {
    window.location.href = pageUrl;
}
