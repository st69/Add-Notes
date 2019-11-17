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

        li.setAttribute("class", "post-item");
        p.setAttribute("class", "text");
        span.setAttribute("class", "del");

        p.innerText = e;
        span.innerText = "X";

        li.appendChild(p);
        li.appendChild(span);

        listPosts.appendChild(li)
    })


}


function addNewPost() {

    if(noteTextarea.value == "" ) {
        return alert("Note cannot be empty!")
    }

    let items;
    let li = document.createElement("li");
    let p = document.createElement("p");
    let span = document.createElement("span");

    li.setAttribute("class", "post-item");
    p.setAttribute("class", "text");
    span.setAttribute("class", "del");
    // span.setAttribute("onclick", "delItem(this)");

    p.innerText = noteTextarea.value;
    span.innerText = "X";

    li.appendChild(p);
    li.appendChild(span);

    listPosts.appendChild(li)

    if (localStorage.getItem("items") === null) {
        items = []
    } else {
        items = JSON.parse(localStorage.getItem("items"))
    }

    items.push(p.innerText)
    localStorage.setItem("items", JSON.stringify(items))

    noteTextarea.value = ""
}

function clearFunc() {
    noteTextarea.value = ""
}

function delItem(e) {
    // e.parentNode.remove()
// debugger
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
// debugger
    items.map((task, index) => {
        if(post.children[0].textContent === task) {
            items.splice(index, 1)
        }
    })

    localStorage.setItem("items", JSON.stringify(items))
}

function deleteAllFromStorage() {
    localStorage.clear()
    // listPosts.innerHTML = "" // first way

    //second faster way
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



//ostalo je da se poboljsa remove item i da se pojedinacno uklanjaju iz local storage-a