const template = document.createElement('template');
template.innerHTML = `

<style>
*{
    box-sizing: border-box;
    margin: 0;
}
.container div{
    display: inline-block;
    padding: 5px 7px;
    margin: 10px;
    border: 0px;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
}
.container{
    background-color: rgba(255,255,255,0.8);
    max-width: 250px;
    border: 0;
    box-shadow: 1px 1px 5px 1px grey;
    border-radius: 10px;
    max-height: 350px;
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    position: fixed;
    z-index:9;
}
.container::-webkit-scrollbar{
    display: none;
}
.container div{
    display: inline-block;
    background-color: rgba(255,255,255,0.1)
}
.container div:hover{
    background-color: rgba(0,0,0,0.07);
}
p{
    font-size: 15px;
    text-transform: capitalize;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
}
.hamburger-menu{
    display: inline-block;
}
button{
    width: auto;
    height: auto;
    padding: 5px;
    position: relative;
    bottom: -7px;
    cursor: pointer;
    border-radius:48%;
    border: none;
    outline: none;
    background-color: rgba(255,255,255,0.1) 
}
button:hover{
    background-color: rgba(0,0,0,0.07);
}
.btn-bk{
    fill: transparent;
}
.cli{
    fill: grey;
}
.main-cli{

}
a{
    text-decoration: none;
}
</style>

<div class="hamburger-menu" id="hamburger-menu">
    <button class="buttons menu" id="menu">
    <svg class="main-cli" width="40" viewBox="0 0 100 100" fill="none" >
        <circle class="btn-bk" cx="50" cy="50" r="50" fill="white"/>
        <circle class="mn-color" cx="25" cy="25" r="10" fill="black"/>
        <circle class="mn-color" cx="75" cy="25" r="10" fill="black"/>
        <circle class="mn-color" cx="50" cy="25" r="10" fill="black"/>
        <circle class="mn-color" cx="25" cy="50" r="10" fill="black"/>
        <circle class="mn-color" cx="75" cy="50" r="10" fill="black"/>
        <circle class="mn-color" cx="50" cy="50" r="10" fill="black"/>
        <circle class="mn-color" cx="25" cy="75" r="10" fill="black"/>
        <circle class="mn-color" cx="75" cy="75" r="10" fill="black"/>
        <circle class="mn-color" cx="50" cy="75" r="10" fill="black"/>
    </svg>
    
    </button>
    <div class="container" id="container">
      
    </div>
</div>


`;

class hamburgerMenu extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('.main-cli').style.width = this.getAttribute('width');
        this.shadowRoot.querySelector('.main-cli').style.height = this.getAttribute('length');
        let dot = this.shadowRoot.querySelectorAll('.mn-color');
        dot.forEach(element=> element.style.fill = this.getAttribute('color'));
        this.shadowRoot.querySelector(".container").style.display = 'none';
        this.notOpened = true;

        let container = this.shadowRoot.getElementById('container');
        let elementId = document.getElementById(this.id)
        let link = elementId.getAttribute('link')
        
        let apps =[];

        async function loadApps(){
            const appsi = await fetch(link);
            const appss = await appsi.json();
            apps = appss;

            for(const elems of apps){
                let name = elems["name"]
                let link = elems["link"]
                let icon = elems["icon"]
    
    
                let p = document.createElement('p');
                let a = document.createElement('a');
                a.setAttribute("href", link);
                let contain = document.createElement('div');
                p.innerHTML = name;
                a.innerHTML = icon;
                contain.appendChild(a);
                contain.appendChild(p);
                container.appendChild(contain);
            }
        }
      
        if(link){
            loadApps() 
        }else{
            for(const elems of elementId.children){
                let name = elems.getAttribute('name');
                let link = elems.getAttribute('link');
                let icon = elems.getAttribute('icon');
    
    
                let p = document.createElement('p');
                let a = document.createElement('a');
                a.setAttribute("href", link);
                let contain = document.createElement('div');
                p.innerHTML = name;
                a.innerHTML = icon;
                contain.appendChild(a);
                contain.appendChild(p);
                container.appendChild(contain);
        
            }
        }
        
        
    };
    
    toggleMenu(){
        if(this.notOpened){
            this.shadowRoot.querySelector(".container").style.display = 'block';
            this.notOpened = false;
        }else{
            this.shadowRoot.querySelector(".container").style.display = 'none';
            this.notOpened = true;
        }
    }
    connectedCallback(){
        let click = this.shadowRoot.querySelector(".menu");
        click.addEventListener('click', () => {this.toggleMenu()});
    }
}
window.customElements.define('hamburger-menu', hamburgerMenu)



// Simple hamburgerMenu that can contain any list of links with icons(svg)

// Can be used multiple times on the same page 

// Used like a simple html tag 

// *Must specify an ID for each. If multiple used on the same page, unique IDs should be used for each unless all must contain the same links
// if all contain the same ID , all will be populated like the first instance 

// Size of the menu can be changed using the width parameter [eg. width="24"] . Height can also be set with the width.

//Color of the menu can also be changed using the color attribute [eg. color="blue"] .

// Element can be populated in two ways 
// 1. you can specify a link where data can be fetched as json . *Must contain the fields (icon, link ,name).

// 2. can set the elements manually by specifying it in a div . attributes (icon, name , link ) must be set. 

//        [eg. <div name="myname" icon="(can be svg)" link="https://www.myname.com" </div> ]
