const template = document.createElement('template');

template.innerHTML = `
    <style>
        .container{
            width: 50%;
            margin: auto;
            margin-top: 50px;
        }
    </style>
    <div class="container">
        <slot></slot>
    </div>
`
class MainContainer extends HTMLElement{
    static get is(){
        return 'main-container';
    }
    constructor(){
        super()
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}


window.customElements.define(MainContainer.is,MainContainer)