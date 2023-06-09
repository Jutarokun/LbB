document.addEventListener('DOMContentLoaded', () => {
    let status = document.createElement('p');
    status.id = 'status';
    status.textContent = 'Logged in';
    document.body.appendChild(status);
    function searchSpecificTask(input) {
        let information = input;
        let token = getToken();
        let htHeader = {
            "Authorization": `Bearer ${token}`
        }
        fetch(`http://localhost:3000/auth/jwt/task/${information}`, {headers: htHeader})
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            let deleteUl = document.getElementById('showUL');
            let deleteUl2 = document.getElementById('ul2');
            if (deleteUl2) {
                deleteUl2.remove();
            } else {
                console.log('item does not exist');
            }
            if (deleteUl) {
                deleteUl.remove();
            } else {
                console.log('element not found');
            }
            let ul = document.createElement('ol');
            let li = document.createElement('li');
            let li2 = document.createElement('li');
            li2.classList.add('box')
            let button1 = document.createElement('button');
            let button2 = document.createElement('button');
            let br = document.createElement('br');
            button1.id = "button1";
            button2.id = "button2";
            button1.textContent = "Change";
            button2.textContent = "Delete";
            button1.style.marginRight = "2%";
            button1.onclick = () => {
                change(information, data.title);
            }
              button2.onclick = () => {
                deleteing(information);
            }
            li2.id = "li2";
            ul.id = 'showUL';
            li.textContent = "title: " + data.title;
            li2.textContent = "completed: " + data.completed;
            document.body.appendChild(ul);
            ul.appendChild(li);
            ul.appendChild(li2);
            li2.append(br);
            li2.appendChild(button1);
            li2.appendChild(button2);
            console.log(data);
          })
          .catch(error => {
            alert('there occured an error please enter a valid id');
            console.error('Error fetching data:', error);
          });
    }
    function handleHashChange() {
        let hash = window.location.hash;
        if (hash.startsWith("#number=")) {
            let input = hash.substring(8);
            let isValid = verifyNumber(input);
            if (isValid) {
                searchSpecificTask(input);
                console.log("Valid number: " + input);
            } else {
                console.log("Invalid number: " + input);
            }
        } else {
            alert('other hash detected please write the command correctly');
        }
    }
    function verifyNumber(input) {
        let regex = /^(?:[0-6]?[0-9]{1,2}|1000)$/;
        if (regex.test(input)) {
            return true;
        } else {
            return false;
        }
    }
    window.addEventListener("hashchange", handleHashChange);
    // Trigger hashchange event again with the same hash value
      function change(id, title) {
        console.log(title);
        // Check if the elements already exist, if so, return
        let li = document.getElementById('li2');
        if (li.querySelector('#label1')) {
            return;
        }
        // Creating the elements
        let label = document.createElement('label');
        let inputBox = document.createElement('input');
        let submit = document.createElement('button');
        let label2 = document.createElement('label');
        let completed = document.createElement('input');
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
    // Make the PUT request with fetch()
    let token = getToken();
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
        let ol = document.getElementById('showUL');
        ol.remove();
        alert('it worked');
        console.log("task updated successfully:", updatedData);
    })
    .catch(error => {
        console.error("Error updating task:", error);
    });
    }
    function deleteing(id) {
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
            alert('there was an error while deleting the task please try again')
            throw new Error('Error deleting item please try again');
        }
        alert('item succesfully deleted')
        let ol = document.getElementById('showUL');
        ol.remove();
        console.log('Item deleted successfully');
    })
    .catch(error => {
        alert('an error has occured: ' + error)
        console.error('Error deleting item:', error);
    });
}
function getToken() {
    let token = localStorage.getItem("bearer");
    return token;
}
function logout() {
    localStorage.removeItem('bearer');
    alert('you are logged out now');
    window.location.href('login.html');
}
let bButton = document.getElementById('back');

bButton.addEventListener('click', () => {
    window.location.href = 'get.html';
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