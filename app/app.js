const searchInput = document.getElementById('search-bar');
let timeout;
let debounce = ( callback, delay )=>{
    return function() {
        clearTimeout( timeout );
        timeout = setTimeout(callback, delay );
    }
}  

let getUsers = ()=>{
    let [queryName, querySurname] = searchInputValue.split(' ');
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

let insertUser = ()=>{
    let [queryName, querySurname] = searchInputValue.split(' ');
    fetch('http://localhost:3000/add/user',{
        headers:{
            'Accept': 'application/json',       //$$? isn't type json default 
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name: queryName,
            surname: querySurname || ''
        })
    }).then((response)=>{
        console.log(response);
    })
    getUsers();
}

let renderUsers = (data)=>{
    let mainBoard = document.getElementById('main-board');
    mainBoard.innerHTML = '';

    let [qName, qSurname] = searchInputValue.split(' ');

    data.forEach((element,index) => {
        let rawText = `${element.name} ${element.surname?element.surname:''}`

        mainBoard.insertAdjacentHTML('beforeend', `<user-record style="--delay:${0.05 * index}s">${createText(splitOnWords(rawText,[qName,qSurname]))}</user-record>`);
        // document.getElementById('main-board').lastChild.style.animationDelay = `${0.05 * index}s`
    });
}

let splitOnWords = ( fullString, queryWords) => {
    let indexArr = [];
    queryWords.forEach(word=>{
        if(word != undefined && word != ''){
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
            // console.log(`word is: ${part} at index: ${index}`)
            textTemplate = textTemplate.concat(`<span>${part}</span>`);
        }else{
            // console.log(`part is: ${part} at index: ${index}`)
            textTemplate = textTemplate.concat(part);
        }
    })

    return textTemplate;
}
let searchInputValue;
searchInput.addEventListener("search-input-change", (event)=>{
    searchInputValue = event.detail.value;
    debounce(getUsers, 1000)()
});
searchInput.addEventListener("insert-user",()=>{
    insertUser();
})
