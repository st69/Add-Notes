const noteTextarea = document.querySelector("#note-textarea");
const addPost = document.querySelector("#add-post");
const clearInput = document.querySelector("#clear-input");
const listPosts = document.querySelector(".list-posts");
const filter = document.querySelector("#filter");
const deleteAllPosts = document.querySelector("#delete-all-posts")

loadAllEvents()

function loadAllEvents() {
    document.addEventListener("DOMContentLoaded", getTasks)
    deleteAllPosts.addEventListener("click", deleteAllFromStorage)
    listPosts.addEventListener("click", delItem)
    addPost.addEventListener("click", addNewPost)
    filter.addEventListener("keyup", filterPosts)
    clearInput.addEventListener("click", clearFunc)
}


function getTasks() {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    items.forEach((e) => {

        let li = document.createElement("li");
        let p = document.createElement("p");
        let span = document.createElement("span");
  let datePrint = document.createElement("span");
        li.setAttribute("class", "post-item");
        p.setAttribute("class", "text");
        span.setAttribute("class", "del");
        datePrint.setAttribute("class", "date")
        p.innerText = e[0];
        span.innerText = "X";
        datePrint.innerText = e[1]

        li.appendChild(p);
        li.appendChild(span);
        li.appendChild(datePrint);

        listPosts.appendChild(li)
    })


}


function addNewPost() {

    let date = new Date();
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let day = date.getDate()
    let month =date.getMonth() + 1
    let year = date.getFullYear()
    let fullDate = `${hours}:${minutes} ${day}.${month}.${year}`
console.log(fullDate)
    if(noteTextarea.value == "" ) {
        return alert("Note cannot be empty!")
    }

    let items;
    let li = document.createElement("li");
    let p = document.createElement("p");
    let span = document.createElement("span");
    let datePrint = document.createElement("span");

    li.setAttribute("class", "post-item");
    p.setAttribute("class", "text");
    span.setAttribute("class", "del");
    datePrint.setAttribute("class", "date")
 

    p.innerText = noteTextarea.value;
    span.innerText = "X";
    datePrint.innerText = fullDate

    li.appendChild(p);
    li.appendChild(span);
    li.appendChild(datePrint)

    listPosts.appendChild(li)

    if (localStorage.getItem("items") === null) {
        items = []
    } else {
        items = JSON.parse(localStorage.getItem("items"))
    }
    let it = [p.innerText, datePrint.innerText]
    items.push(it)
    localStorage.setItem("items", JSON.stringify(items))

    noteTextarea.value = ""
}

function clearFunc() {
    noteTextarea.value = ""
}

function delItem(e) {
    // e.parentNode.remove()
    if(e.target.className == "del") {
        // console.log(e.target.parentElement.innerText + "  is pressed!")
        if(confirm("Are you sure?")) {
            removeFromLS(e.target.parentElement)
            e.target.parentElement.remove()
        }
        
    }
}

function removeFromLS(post) {
    let items = JSON.parse(localStorage.getItem("items"));
debugger
    items.map((task, index) => {
        if(post.children[0].textContent === task[0]) {
            items.splice(index, 1)
        }
    })

    localStorage.setItem("items", JSON.stringify(items))
}

function deleteAllFromStorage() {
    localStorage.clear()
    // listPosts.innerHTML = "" // first way

    //second way
    while(listPosts.firstChild) {
        listPosts.removeChild(listPosts.firstChild)
        
    }
}

function filterPosts(e) {
    const text = e.target.value.toLowerCase()
    document.querySelectorAll(".post-item").forEach((post) => {
        const item = post.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            post.style.display = "block"
        }else{
            post.style.display = "none"
        }
    })
}

