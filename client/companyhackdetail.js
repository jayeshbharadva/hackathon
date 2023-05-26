const token = localStorage.getItem('companytoken');

const urlParams = new URLSearchParams(window.location.search);
const hid = urlParams.get('hid');
console.log(hid);

hackdetails();
document.getElementById('detail').addEventListener('click', function() {
    redirectToPage('companystudentdetail.html?hid=' + hid);
});

function redirectToPage(pageUrl) {
    window.location.href = pageUrl;
}

async function hackdetails() {
    try {
        const response = await fetch(`http://localhost:3007/hack/${hid}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token
            }
        });
        const res = await response.json();
        let tabledata = "";
        if (!res) {
            tabledata += "<h2>no data available</h2>";
        } else {
            tabledata += `
            <h1>${res.hname}</h1>
            <h2>${res.hname}</h2>
            <div class="container">
                <p>${res.habout}</p>
                <p>Manager name: Jayesh Bharadva</p>
            </div>
            <div class="div1">
                <table>
                    <tr>
                        <th>Hackathon Details:</th>
                        <th>Mentor Details:</th>
                    </tr>
                    <tr>
                        <td>There will be a list of Hackathon statements in which there</td>
                        <td>Dr. Amit Rathod (Professor at VGEC, PhD Data Science)</td>
                    </tr>
                    <tr>
                        <td>will be industry-wise problems. You can select</td>
                        <td>Prof. Jay Patel</td>
                    </tr>
                    <tr>
                        <td>the problem statement and then choose it and need to work</td>
                        <td>Prof. Mian Bhatt</td>
                    </tr>
                    <tr>
                        <td>on that.</td>
                    </tr>
                    <tr>
                        <td>Max ${res.hteamsize.htmax} team members allowed.</td>
                    </tr>
                    <tr>
                        <th>Problem Statement</th>
                    </tr>
                    <tr>
                        <td>Problem category will be based on Data Science, Data Mining, Python, Java Programming, Cybersecurity, and Networking</td>
                    </tr>
                    <tr>
                        <td>
                            <nav><a href="#">Click here</a></nav>
                            to download the problem statement file.
                        </td>
                    </tr>
                    <tr>
                        <th>Rewards</th>
                    </tr>
                    <tr>
                        <td>${res.hprize}</td>
                    </tr>
                    <tr>
                        <td>Also, some good job offers to some good team members.</td>
                    </tr>
                </table>
            </div>
            <div class="important-dates">
                <table>
                    <tr>
                        <th>Important Dates</th>
                    </tr>
                    <tr>
                        <td>Opening Date:</td>
                        <td>${res.hdates.odate.split('T')[0]}</td>
                    </tr>
                    <tr>
                        <td>Closing Date:</td>
                        <td>${res.hdates.cdate.split('T')[0]}</td>
                    </tr>
                    <tr>
                        <td>Submission Start Date:</td>
                        <td>${res.hdates.asdate.split('T')[0]}</td>
                    </tr>
                    <tr>
                        <td>Submission End Date:</td>
                        <td>${res.hdates.aldate.split('T')[0]}</td>
                    </tr>
                    <tr>
                        <td>Result Date:</td>
                        <td>${res.hdates.rdate.split('T')[0]}</td>
                    </tr>
                </table>
            </div>
            `;
        }
        document.getElementById("hackathon-detail").innerHTML = tabledata;
    } catch (err) {
        console.log("fetch request failed");
    }
}
