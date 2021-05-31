const template = document.createElement('template');


template.innerHTML = `
    <style>
        #search-input{
            position: relative;
            width: 100%;
            border-radius: 20px;
            line-height: 2.5;
            padding-left: 10px;
            border: solid 1px rgba(0,0,0,0.1);
            box-shadow: rgba(32, 33, 36, 0.18) 2px 2px 6px 0px;
            outline: none;
        }
        .search-bar{
            position: relative;
        }
        .add-button{
            position: absolute;
            top: 8;
            right: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 20px;
            width: 20px;
            border:solid 1px rgba(0,0,0,0.3);
            color: rgba(0,0,0,0.3);;
            font-size: 20px;
            font-weight: bold;
            border-radius: 50%;
            cursor: pointer;
        
            transition: all 0.3s;
        }
        .add-button::after{
            content: '';
            position: absolute;
            transform-origin: center;
            height: 100%;
            width: 100%;
            opacity: 1;
            border:solid 2px rgba(255, 174, 0, 0);
            border-radius: 50%;
        
            transition: all 0.45s cubic-bezier(.32,.83,.59,.99);
        }
        .add-button:hover::after{
            transform-origin: center;
            transform: scale(1.5);
            opacity: 0;
            border:solid 2px rgb(255, 196, 2);
        }
        .add-button:hover{
            border:solid 1px orange;
            color: orange;
        }
    </style>

    <!--<input type="text">-->
    <div class="search-bar">
        <input id="search-input" type="text" placeholder="Search Here">
        <div class="add-button">+</div>
    </div>
`
class SearchBar extends HTMLElement{
    static get is(){
        return 'search-bar';
    }
    constructor(){
        super()
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.getElementById('search-input').placeholder = this.textContent; //$$? this.innerText
        this.shadowRoot.getElementById('search-input').addEventListener('input',(event)=>{
            var event = new CustomEvent("search-input-change", {
                detail: {
                    value: event.target.value
                }
            });
            this.dispatchEvent(event);              
        })
        this.shadowRoot.querySelector('.add-button').addEventListener('click', ()=>{
            var event = new CustomEvent("insert-user", {});
            this.dispatchEvent(event);     
        })
    }
}
//static.get.is... 

window.customElements.define('search-bar',SearchBar)