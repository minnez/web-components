const template = document.createElement('template');
template.innerHTML = `
<style>
*{
    box-sizing: border-box;
}
.tool{
    display: inline-block;
    margin: 10px;
    padding: 0px;
    position: relative;
    cursor: pointer;
}
.icon{
    display: inline-block;
    width: 10px;
    height: 10px;
}
.message-box{
    display: inline-block;
    padding: 10px;
    position: absolute;

    z-index: 7;
    min-width: 200px;
    max-width: 300px;
    background-color: white;
    border: 0;
    box-shadow: 1px 1px 5px 1px grey;
    border-radius: 10px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    
}
.sp{
    height: 400px;
}

</style>
<div class="tool">
    <div class="icon">
        <svg class = "icn" width="16"  viewBox="0 0 35 35" fill="none" >
            <circle class="icon-color" cx="17.5" cy="17.5" r="17.5" fill="#B0B0B0"/>
            <rect x="14" y="16" width="7" height="15" fill="white"/>
            <circle cx="17.5" cy="9.5" r="3.5" fill="white"/>
        </svg>
    </div>
    <div class="message-box">
        <slot name="message" />
    </div>
</div>
`;

class infoTip extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('.icn').style.width = this.getAttribute('width');
        this.shadowRoot.querySelector('.icon-color').style.fill = this.getAttribute('color');
        this.shadowRoot.querySelector(".message-box").style.display = 'none';
        this.notOpened = true;

        var rect = this.shadowRoot.querySelector('.tool').getBoundingClientRect();

        if(rect.top <200){
            if(((window.innerWidth - rect.right) < 200)){
                this.shadowRoot.querySelector('.message-box').style.top = "25px";
                this.shadowRoot.querySelector('.message-box').style.right = "25px";
            }else{
                this.shadowRoot.querySelector('.message-box').style.top = "25px";
            }
        }else if(((window.innerWidth - rect.right) < 200)){
            if(rect.top <200){
                //document.getElementById('new').innerText = "bottom left";
                this.shadowRoot.querySelector('.message-box').style.top = "10px";
                this.shadowRoot.querySelector('.message-box').style.right = "10px";
            }else{
                //document.getElementById('new').innerText = "top left";
                this.shadowRoot.querySelector('.message-box').style.bottom = "15px";
                this.shadowRoot.querySelector('.message-box').style.right = "15px";
            }
        }else{
            //document.getElementById('new').innerText = "top right";
            this.shadowRoot.querySelector('.message-box').style.bottom = "25px";
        }

    }
    mouseEnter(){
        this.shadowRoot.querySelector(".message-box").style.display = 'block';  
    }
    mouseLeave(){
        this.shadowRoot.querySelector(".message-box").style.display = 'none';  
    }
    toggleMenu(){
        if(this.notOpened){
            this.shadowRoot.querySelector(".message-box").style.display = 'block';
            this.notOpened = false;
        }else{
            this.shadowRoot.querySelector(".message-box").style.display = 'none';
            this.notOpened = true;
        }
    }
    connectedCallback(){
        let hover = this.shadowRoot.querySelector(".icon");
        //hover.addEventListener('click', () => {this.toggleMenu()})
        hover.addEventListener('mouseenter', () => {this.mouseEnter()});
        hover.addEventListener('mouseleave', () => {this.mouseLeave()});
    }
    
}
window.customElements.define('info-tip', infoTip)


// info tip tool 
// can be used to give short information about anything
//How to use 
// used like an html tag
// [ eg. <info-tip ><span slot="message">[information is placed here]<span></info-tip>]
// color of the icon can be changed by setting the color attribute of the tag
// [ eg. <info-tip color="blue" ><span slot="message" >[infomation]<span></info-tip> ]
// width of the icon can be changed by setting the width attribute of the tag
// [ eg. <info-tip width="24" ><span slot="message" >[infomation]<span></info-tip> ]
