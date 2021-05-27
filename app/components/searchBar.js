const template = document.createElement('template');

template.innerHTML = `
    <style>
        input{
            width: 100%;
            border-radius: 15px;
            line-height: 2.5;
            padding-left: 10px;
            border: solid 1px rgba(0,0,0,0.1);
            box-shadow: rgba(32, 33, 36, 0.18) 2px 2px 6px 0px;
            outline: none;
        }
    </style>
    <input type="text">
`
class searchBar extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // this.shadowRoot.querySelector('input').placeholder = this.getAttribute('placeholder');
        this.shadowRoot.querySelector('input').placeholder = this.textContent; //$$? this.innerText
    }
}


window.customElements.define('search-bar',searchBar)