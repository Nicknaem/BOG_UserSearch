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
    let [queryName, querySurname] = searchInput.value.split(' ');
    fetch('http://localhost:3000/users',{
        headers:{
            'Accept': 'application/json',       //$$? isn't type json default 
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name: queryName,
            surname: querySurname || ''
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

    let [qName, qSurname] = searchInput.value.split(' ');

    data.forEach((element,index) => {
        let rawText = `${element.name} ${element.surname?element.surname:''}`

        mainBoard.insertAdjacentHTML('beforeend', `<div class="record">Fullname: ${createText(splitOnWords(rawText,[qName,qSurname]))}</div>`);
        document.getElementById('main-board').lastChild.style.animationDelay = `${0.05 * index}s`
    });
}

let splitOnWords = ( fullString, queryWords) => {
    let indexArr = [];
    queryWords.forEach(word=>{
        if(word != undefined){
            let wStart = fullString.search(word);
            indexArr.push(wStart);
            indexArr.push(wStart+word.length);
        }
    }) 

    let start = 0;
    indexArr.push(fullString.length);

    let splitString = [];
    indexArr.forEach(index=>{
        splitString.push(fullString.slice(start,index));
        start = index;
    })
    return splitString;
    //every even-th stringPart in splitString array is your giver word 1,3,...
}

let createText = (textParts)=>{
    let textTemplate = '';

    textParts.forEach((part,index)=>{
        if(!(index%2===0)){
            console.log(`word is: ${part} at index: ${index}`)
            textTemplate = textTemplate.concat(`<span class="query">${part}</span>`);
        }else{
            console.log(`part is: ${part} at index: ${index}`)
            textTemplate = textTemplate.concat(part);
        }
    })

    return textTemplate;
}

searchInput.addEventListener("keyup", debounce( getUsers, 1000));