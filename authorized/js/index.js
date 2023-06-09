document.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('search');
    let buttonShowAll = document.getElementById('showAll');
    console.log('code went here');

    let status = document.createElement('p');
    status.id = 'status';
    status.textContent = 'Logged in';
    document.body.appendChild(status);

function showEverything() {
    let token = getToken();
    let htHeader = {
        "Authorization": `Bearer ${token}`
    }
    fetch(`http://localhost:3000/auth/jwt/tasks`, { headers: htHeader})
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      let deleteUl = document.getElementById('ul2');
      let deleteUl2 = document.getElementById('showUL');
      if (deleteUl2) {
          deleteUl2.remove();
      } else {
          console.log('element does not exist')
      }
      if (deleteUl) {
          deleteUl.remove();
      } else {
          console.log('element not found');
      }
      // Create a Set to keep track of unique keys
      let uniqueKeys = new Set();
      let ul = document.createElement('ol');
      document.body.appendChild(ul);
      data.forEach(item => {
          // Check if the key is unique
          if (!uniqueKeys.has(item.id)) {
              uniqueKeys.add(item.id);
              let button1 = document.createElement('button');
              let button2 = document.createElement('button');
              button1.id = "button1_" + item.id;
              button2.id = "button2_" + item.id;
              button1.textContent = "Change";
              button2.textContent = "Delete";
              button1.style.marginRight = "2%";
              button1.onclick = () => {
                  change(item.id, item.title);
              }
              button2.onclick = () => {
                  deleteing(item.id);
              }
              let newLi = document.createElement('li');
              newLi.classList.add('box');
              newLi.textContent = "title: " + item.title + "\n" + "completed: " + item.completed + "\n";
              newLi.style.whiteSpace = "pre";
              newLi.style.marginBottom = "3%";
              newLi.appendChild(button1);
              newLi.appendChild(button2);
              newLi.id = "li_" + item.id;
              ul.id = "ul2";
              ul.appendChild(newLi);
          }
      });
  })

    .catch(error => {
      alert('something went wrong while fetching the data please try again')
      console.error('Error fetching data:', error);
    });
}

//making the get for more tasks

buttonShowAll.addEventListener('click', () => {
    showEverything();
})


//making post
    //make a post request on api
    let buttonPost = document.getElementById('submitPOST');
buttonPost.addEventListener('click', () => {
    console.log('it went here');
    let header = document.getElementById('title').value;
    let token = getToken();
    let data = {
        "completed" : false,
        "title" : `${header}`
    }
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      };
    fetch('http://localhost:3000/auth/jwt/tasks', requestOptions)
    .then(response => {
            if (!response.ok) {
            alert('Something went wrong');
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Your data has been sent');
            showEverything();
            console.log(data);
        })
        .catch(error => {
            alert('There was an error please try again or check the size of your input')
            console.error('Error fetching data:', error);
        });
    })


        //deleting things
        function deleteing(id) {
            let li = document.getElementById('li_' + id);
            li.remove();
            console.log(id);
            let token = getToken();
            fetch(`http://localhost:3000/auth/jwt/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) {
                alert('something went wrong')
                throw new Error('There was an error while deleting please try again');
            }
            alert('item succesfully deleted')
            console.log('Item deleted successfully');
        })
        .catch(error => {
            alert('an error has occured: ' + error)
            console.error('Error deleting item:', error);
        });
    }
    function change(id, title) {
        console.log(title);
        // Check if the elements already exist, if so, return
        let li = document.getElementById('li_' + id);
        if (li.querySelector('#label1')) {
            return;
        }
        // Creating the elements
        let label = document.createElement('label');
        let inputBox = document.createElement('input');
        inputBox.classList.add('inputShow');
        let submit = document.createElement('button');
        let label2 = document.createElement('label');
        let completed = document.createElement('input');
        completed.classList.add('boxLeft');
        let br1 = document.createElement('br');
        let br2 = document.createElement('br');
        let br3 = document.createElement('br');
        let br4 = document.createElement('br');
        label.id = "label1";
        submit.id = "putSubmit";
        submit.textContent = "submit changes";
        submit.onclick = () => {
            console.log(title);
            transfer(id, title);
        }
        submit.setAttribute('type', 'submit');
        inputBox.setAttribute('type', 'text');
        inputBox.setAttribute('name', 'header');
        completed.setAttribute('type', 'checkbox');
        completed.setAttribute('name', 'completed');
        completed.id = "completed";
        label2.setAttribute('for', 'completed');
        label2.id = "label2";
        label2.textContent = "Have you completed this task? "
        inputBox.id = "header";
        label.textContent = 'Enter a new name';
        label.setAttribute('for', 'header');
        //appending the elements with line breaks
        li.appendChild(br1);
        li.appendChild(label);
        li.appendChild(br2);
        li.appendChild(inputBox);
        li.appendChild(br3);
        li.appendChild(label2);
        li.appendChild(completed);
        li.appendChild(br4);
        li.appendChild(submit);
        //adding event listener to remove the elements on button click
        submit.addEventListener('click', function() {
            li.removeChild(label);
            li.removeChild(br1);
            li.removeChild(inputBox);
            li.removeChild(br2);
            li.removeChild(label2);
            li.removeChild(completed);
            li.removeChild(submit);
            li.removeChild(br3);
            li.remove(br4);
        });
    }
    function transfer(id, title) {
    let checkBoxValue = document.getElementById('completed').value;
    let titleValue = document.getElementById('header').value;
    let isTrue = false;
    if (checkBoxValue == "on" && titleValue == "") {
        if (checkBoxValue == "on") {
            isTrue = true;
        }
        put(id, title, isTrue);
    } else if(checkBoxValue == 'on' && titleValue != '' || titleValue != ' ') {
        put(id, titleValue, true)
    } else {
        put(id, title, false)
    }
}
    function put(id, title, completed) {
    //transfering the data
    const data = {
        id: id,
        title: title,
        completed: completed
    };
    let token = getToken();

    // Make the PUT request with fetch()
    fetch(`http://localhost:3000/auth/jwt/tasks`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
        throw new Error(`Failed to update task Please try again. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(updatedData => {
        alert('task updated succesfully');
        showEverything();
        console.log("task updated successfully:", updatedData);
    })
    .catch(error => {
        alert('there was an error while changing the task please try again');
    });
}

function handleHashChange() {
    let hash = window.location.hash;
    if (hash === "#searchTask") {
        window.location.href = "specificData.html";
    }
}
window.addEventListener('hashchange', handleHashChange);

function getToken() {
    let token = localStorage.getItem("bearer");
    return token;
}
function logout() {
    localStorage.removeItem('bearer');
    alert('you are logged out now');
    window.location.href = 'login.html';
}
let logButton = document.getElementById('logoutButton');

logButton.addEventListener('click', () => {
    logout();
})

function testJWTToken() {
    let token = getToken();
    if (token == null) {
        window.location.href = 'login.html';
        alert('You are not an authenticated user!')
    }
}

testJWTToken();

})
