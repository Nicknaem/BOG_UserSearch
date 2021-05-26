const searchInput = document.getElementById('search-input');

function debounce( callback, delay ) {
    let timeout;
    return function() {
        clearTimeout( timeout );
        
        timeout = setTimeout( 
//----------------------------------- try 1
        // () => {
        //     getUsers().then((result) => {
        //         console.log(result)
        //         //renderUsers results
        //     })
        // }
        getUsers, delay );
    }
}  

let getUsers = ()=>{
    fetch('http://localhost:3000/users',{
        headers:{
            'Accept': 'application/json',       //$$? isn't type json default 
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name: searchInput.value
        })
    })
    .then((response)=> response.json())
    .then((result) => {
      renderUsers(result);
    })
    .catch((err)=> console.log(err))
}

// let insertUser = ()=>{
//     fetch('http://localhost:3000/users',{
//         method: 'post',
//         body: new URLSearchParams({
//             name: searchInput.value 
//         })
//     })
// }

let renderUsers = (data)=>{
    let mainBoard = document.getElementById('main-board');
    mainBoard.innerHTML = '';
    data.forEach((element,index) => {
        mainBoard.insertAdjacentHTML('beforeend', `<div class="record">Fullname: ${element.name} ${!element.surnmae?element.surnmae:''}</div>`);
        document.getElementById('main-board').lastChild.style.animationDelay = `${0.05 * index}s`
    });
}

searchInput.addEventListener("keyup", debounce( getUsers, 1000));