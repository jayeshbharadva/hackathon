const token = localStorage.getItem('companytoken');

function logout() {
  // Clear user-related data or session variables
  localStorage.removeItem('token');
  sessionStorage.clear();
  // ...additional data clearing if necessary

  // Redirect the user to the login page
  window.location.href = 'companylogin.html';
}

const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  var hid = document.getElementById('hid').value;
  var hname = document.getElementById('hname').value;
  var htagline = document.getElementById('htagline').value;
  var habout = document.getElementById('habout').value;
  var hlevel = document.querySelector('input[name="hlevel"]:checked').value;
  var hprize = document.getElementById('hprize').value;
  var hdescription = document.getElementById('hdescription').value;
  var hpfile = document.getElementById('hpfile');
  var htech = document.getElementById('htech').value;
  var odate = document.getElementById('odate').value;
  var cdate = document.getElementById('cdate').value;
  var asdate = document.getElementById('asdate').value;
  var aldate = document.getElementById('aldate').value;
  var rdate = document.getElementById('rdate').value;
  var htmax = document.getElementById('htmax').value;
  var htmin = document.getElementById('htmin').value;

  const startDate = new Date(odate);
  const endDate = new Date(cdate);
  const submissionStartDate = new Date(asdate);
  const submissionEndDate = new Date(aldate);
  const resultDate = new Date(rdate);

  const file = hpfile.files[0];

  if (endDate <= startDate) {
    alert('End date should be after the start date.');
    return; // Stop form submission
  }

  if (submissionStartDate < startDate || submissionStartDate > endDate) {
    alert('Submission start date should be between the start and end dates.');
    return; // Stop form submission
  }

  if (submissionEndDate < startDate || submissionEndDate > endDate) {
    alert('Submission end date should be between the start and end dates.');
    return; // Stop form submission
  }

  if (!(submissionEndDate > submissionStartDate)) {
    alert('Submission end date should be greater than submission start date');
    return;
  }

  if (!(resultDate > endDate)) {
    alert('result date should be after end date');
    return;
  }

  if (htmax <= 0 || htmin <= 0) {
    alert('team size can not be negative');
    return;
  }

  if (htmax <= htmin) {
    alert('maximum team size should be greater than minimum');
    return;
  }

  // Create a FormData object
  var formData = new FormData();
  formData.append('hid', hid);
  formData.append('hname', hname);
  formData.append('htagline', htagline);
  formData.append('habout', habout);
  formData.append('hlevel', hlevel);
  formData.append('hprize', hprize);
  formData.append('hdescription', hdescription);
  formData.append('file', file);
  formData.append('htech', htech);
  formData.append('hdates[odate]', odate);
  formData.append('hdates[cdate]', cdate);
  formData.append('hdates[asdate]', asdate);
  formData.append('hdates[aldate]', aldate);
  formData.append('hdates[rdate]', rdate);
  formData.append('hteamsize[htmax]', htmax);
  formData.append('hteamsize[htmin]', htmin);

  console.log(hpfile.files.length);
  const response = await savehackdata(formData);
  console.log(response);
  if (response.ok) {
    console.log('data added');
    window.location.href = 'hacklistcompany.html';
  } else {
    console.log('response is false');
  }
});

async function savehackdata(formData) {
  try {
    return await fetch(`http://localhost:3007/hack`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: formData,
    });
  } catch (err) {
    console.log('error in data store');
    return {
      ok: false,
      err: err.msg,
    };
  }
}
