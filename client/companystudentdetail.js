var urlParams = new URLSearchParams(window.location.search);
var encodedObject = urlParams.get('data');
var myObject = JSON.parse(decodeURIComponent(encodedObject));

console.log(myObject);
snameData =  myObject.snameData;
pdata = myObject.values;

fsubmission = pdata.fsubmission;
ssubmission = pdata.ssubmission;

if(fsubmission==undefined){
    fsubmission = 'not submitted yet!!';
}


if(ssubmission==undefined){
    ssubmission = 'not submitted yet!!';
}

var data = 
`<h1>Student Details</h1>
<div class="student-details">
  <p><strong>Student Name:</strong>${snameData.sname} <span id="studentName"></span></p>
  <p><strong>Student Email:</strong>${snameData.semail} <span id="studentEmail"></span></p>
  <p><strong>Problem Statement ID:</strong>${pdata.pid} <span id="problemStatement"></span></p>
  <p><strong>Problem Name:</strong> <span id="problemName">${pdata.pname}</span></p>
  <p><strong>Abstract:</strong>${pdata.abstract} <span id="abstract"></span></p>
  <p><strong>First Submission:</strong>${fsubmission} <span id="firstSubmission"></span></p>
  <p><strong>Second Submission:</strong>${ssubmission} <span id="secondSubmission"></span></p>
</div>`;

document.getElementById('studentDetailsPage').innerHTML = data;