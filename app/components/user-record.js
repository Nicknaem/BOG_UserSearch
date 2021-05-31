const template = document.createElement('template');

template.innerHTML = `
    <style>
        #record{
            border-bottom: 1px solid rgba(0,0,0,0.1);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            opacity: 0;
            color: rgba(0,0,0,0.8);
            padding: 10px 0px;
            animation: slideUp 0.4s forwards ease;
            animation-delay: var(--delay);
        }
        ::slotted(span){
            color: orange;
        }
        @keyframes slideUp {
            0% {
                transform: translateY(100%);
                opacity: 0;
            }
            100% {
                transform: translateY(0%);
                opacity: 1;
            }
        }
    </style>
    <div id="record" >User: <slot></slot></div>
`
class UserRecord extends HTMLElement{
    static get is(){
        return 'user-record';
    }

    constructor(){
        super()

        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.getElementById('record').setAttribute('style',this.getAttribute('style'));
    }

    //$$? should i make style observable and update it?
}


window.customElements.define(UserRecord.is,UserRecord)