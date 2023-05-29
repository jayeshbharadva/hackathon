const token = localStorage.getItem('companytoken');
const urlParams = new URLSearchParams(window.location.search);
const hid = urlParams.get('hid');

const student = document.getElementById("student");

fetchdata();

async function fetchdata(){
    try{
        const response = await fetch(`http://localhost:3007/student/studentinfo`,{
            method: 'POST',
            headers:{
                "Content-Type" : "application/json",
                "Authorization": 'Bearer ' + token
            },
            body:JSON.stringify({hid}),
        });
        const data = await response.json();
        var tabledata = `<ul class="student-list">`;

    // Create an array of promises for concurrent requests
    const requests = data.map(async (values) => {
      try {
        const snameResponse = await fetch(`http://localhost:3007/student/${values.sid}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
          }
        });
        const snameData = await snameResponse.json();
        return { snameData, values };
      } catch (error) {
        console.log("Error in fetching sname:", error);
        return null; // Return null if there's an error
      }
    });
  
    // Wait for all requests to complete
    const results = await Promise.all(requests);
  
    // Generate the tabledata using the results
    results.forEach( (result) => {
      if (result) {
        const { snameData, values } = result;
        var encodedObject = encodeURIComponent(JSON.stringify(result));
        var url = 'companystudentdetail.html?data=' + encodedObject;

        tabledata += `
          <li class="student-list-item">
            <span class="student-name">${snameData.sname}</span> - <span class="problem-name">${values.pname}</span>
            <a class="details-button" href="${url}">Details</a>
          </li>
        `;
      }
      else{
        console.log("else block");
      }
    });
    if (results.length === 0) {
      student.innerHTML = "<h2>no student participated in this hackathon</h2>";
    } else {
      student.innerHTML = tabledata;
    }
  }
    catch{
        console.log("error in backend api call please check!!!!");
        console.log(hid);
    }
}