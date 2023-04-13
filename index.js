document.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('search');
    let buttonShowAll = document.getElementById('showAll');
    console.log('code went here');


//making the get on a specific task
button.addEventListener('click', () => {
    let information = document.getElementById('taskID').value;
fetch(`http://localhost:3000/task/${information}`)
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
    ul.id = 'showUL';
    li.textContent = "title: " + data.title;
    li2.textContent = "completed: " + data.completed;
    document.body.appendChild(ul);
    ul.appendChild(li);
    ul.appendChild(li2);
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
});


//making the get for more tasks

buttonShowAll.addEventListener('click', () => {
    fetch(`http://localhost:3000/tasks`)
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
    console.error('Error fetching data:', error);
  });
})


//making post
    //make a post request on api
    let buttonPost = document.getElementById('submitPOST');
buttonPost.addEventListener('click', () => {
    console.log('it went here');
    let header = document.getElementById('title').value;
    let data = {
        "completed" : false,
        "title" : `${header}`
    }
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
    fetch('http://localhost:3000/tasks', requestOptions)
    .then(response => {
            if (!response.ok) {
            alert('Something went wrong');
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Your data has been sent');
            console.log(data);
        })
        .catch(error => {
            alert('There was an error while fetching: ' + error)
            console.error('Error fetching data:', error);
        });
    })


        //deleting things
        function deleteing(id) {
            let li = document.getElementById('li_' + id);
            li.remove();
            console.log(id);
            fetch(`http://localhost:3000/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                alert('something went wrong')
                throw new Error('Error deleting item: ' + response.status);
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
        put(id, checkBoxValue, true)
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
    fetch(`http://localhost:3000/tasks`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
        throw new Error(`Failed to update task. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(updatedData => {
        console.log("task updated successfully:", updatedData);
    })
    .catch(error => {
        console.error("Error updating task:", error);
    });
}

})
