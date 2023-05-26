const token = localStorage.getItem('companytoken');
const urlParams = new URLSearchParams(window.location.search);
const hid = urlParams.get('hid');


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
        console.log(data);
        var tabledata = `<ul class="student-list">`;

if (!data) {
    tabledata += "<h2>no student participated in this hackathon</h2>";
  } else {
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
        console.log(values);
        tabledata += `
          <li class="student-list-item">
            <span class="student-name">${snameData.sname}</span> - <span class="problem-name">${values.pname}</span>
            <a class="details-button" href="#" onclick="showStudentDetails(result)">Details</a>
          </li>
        `;
        console.log();
      }
    });
  }
          document.getElementById("student").innerHTML = tabledata;
    }
    catch{
        console.log("error in backend api call please check!!!!");
        console.log(hid);
    }
}

function showStudentDetails(result) {
  const { snameData, values } = result;
  console.log('name data',snameData);
  console.log('values',values);
  document.getElementById("studentName").textContent = student.name;
  document.getElementById("problemStatement").textContent = student.problemStatement;
  document.getElementById("abstract").textContent = student.abstract;
  document.getElementById("problemName").textContent = student.problemName;
  document.getElementById("firstSubmission").textContent = student.firstSubmission;
  document.getElementById("secondSubmission").textContent = student.secondSubmission;

  // Hide student list page and show student details page
  document.getElementById("studentListPage").style.display = "none";
  document.getElementById("studentDetailsPage").style.display = "block";
}