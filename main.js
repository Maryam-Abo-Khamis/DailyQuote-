// var from DOM
let message=document.querySelector('.message')
let btn =document.querySelector('.btn')
let oldTools=document.querySelector('.tools')
let parentFa=document.querySelector('.qoute-favorite');
let favDiv=document.querySelector('.favorite');
let partOne=document.querySelector('.partOne')
let alreadyFav=false;
//variable 
let quotes=["لا تُفسِد الودّ في برود الردّ","مهما ڪانت الصعوبات الي انت بيها رح تعدي ثق بالله 🌷","عِش لأجل حلمك حࢪًا  مثابࢪًا ڪُن شخصًا يُستضاءُ بهِ الأمل "," - انجحوا ، فهناك عيون لتڪسروها ، ورؤوس لترفعوها 👩🏻‍🎓♥️."," تذڪر ! أنت سويت الي عليك و الباقي ڪلّه بيد الله سبحانه و تعالى 🦋"," نَحنُ لَنا لَهفةُ التَّمني و السَّعي ، ولله سِرُّ الإجابة و سِرُّ التوقيتِ و سِرُّ الدَّهشة."," لا تقلل من قدراتك ، أنت عظيم لا تغفل عن مميزاتك 💓."," - سأواصل ولن اتوقف عن حلمي ابدًا 👩🏻‍⚕🤍."," • وعلى باب الأمل سنڪون صابرين مهما ڪانت الأقدار 💙.","اللهُّم اجعلنا ممن يأتونَ إليكَ بالدعاءَ فتأتي إليهمْ بالرحمةِ و الإستجابة 🦋","اللهُّم اجعلنا ممن يأتونَ إليكَ بالدعاءَ فتأتي إليهمْ بالرحمةِ و الإستجابة 🦋"]
let favorite='';
let like =0;
//current time and date
let today=new Date();
let day=today.getDate();
let month=today.getMonth();
let year=today.getFullYear();
let hour=today.getHours();
let minute=today.getMinutes();
let monthName=['Jan','Feb','Mar','Apr','May','Jun',
                'Jul','Aug','Sep','Oct','Nov','Dec']
//END DECLETATION OF VARIABLE







//------------------------
//START PART OF FUNCTIONS
//------------------------
function createQoute(){
    let rand=Math.floor(Math.random()*quotes.length)
    if(message.innerHTML===quotes[rand])
        createQoute()
    return quotes[rand]
}
//CREATE NEW TOOLS WITH DEFAULT COLORS
function setTools(){

    let tools=document.createElement('div')
    tools.className='tools'
    tools.innerHTML=
                `
                <i class="fa-regular fa-copy " title="copy"></i>
                <i class="fa-regular fa-star " title="Favorit"></i>                     
                <i class="fa-regular fa-heart" title="Like"></i>
                `
    oldTools.innerHTML=tools.innerHTML
}

function fixTime (hour,m){
    let ampm=hour>=12?'PM':'AM';
    hour=hour%12;
    hour=hour?hour :12;
    m=m<10?'0'+m:m;
    return`at ${hour}:${m} ${ampm}`
}
//create Node of qoute favorite
function createNode(e){
    if(e!==null){
        let div=document.createElement('div')
        div.className='fav-div';
        div.innerHTML=
        `<p>${e[0]}</p>
        <div class='container-fav'>
            <i class="fa-solid fa-trash"></i>
            <span>${e[1]}</span>
            <span class='date-time'>${e[2]}</span>
        </div>
        `
        return div;
    }
}
//function to show favorite qoutes
function createFav(mess,day,month,year,hour ,minute)
{   
    if(mess!==''){
        let f=mess+','+`${fixTime(hour,minute)},`+`${day} ${monthName[month]} ${year}|`+localStorage.getItem('favorite')        
        localStorage.setItem('favorite',f)
        favorite=f;
    }
    parentFa.innerHTML=""
    let favUNI=Array.from(new Set(favorite.split('|'))).filter((e)=>e!==null &&e!==''&& e!=='undefined')

    console.log(favUNI)
    for(let i=0;i<favUNI.length;i++){
        let element=favUNI[i].split(',')
        parentFa.appendChild(createNode(element))
    }
    
    return; 
}
function deleteqoutFav(mess){
    let fav=[... new Set(favorite.split('|').filter((e)=>e!==null))];
    let i=0;
    while(i<fav.length){
        let element=fav[i].split(',')
        if(mess===element[0]){
            fav[i]='';
            break;
        }
        i++;
    }
    favorite=fav.filter((e)=>e!==null&&e!=='').join('|')
    localStorage.setItem('favorite',favorite);

}

//------------------------
//END PART OF FUNCTIONS
//------------------------



//------------------------
//START PART OF EVENTS
//------------------------

window.onload=function(){
    if(localStorage.getItem('favorite')){
        favorite=localStorage.getItem('favorite');
        createFav('')
    }else{
        console.log('not have a local already' )
        localStorage.setItem('favorite','')
    }
    //if the day is new day
    if(localStorage.getItem('day') && day!==+localStorage.getItem('day')){
            message.innerHTML= createQoute()
            setTools()
            alreadyFav=false;
            console.log('its a new day')
            localStorage.setItem('day',day);
            localStorage.setItem('qoutDay', message.innerHTML)
    }
    else if(!localStorage.getItem('day'))
    {
        message.innerHTML= createQoute()
        setTools()
        alreadyFav=false;
        console.log('its a new day')
        localStorage.setItem('day',day);
        localStorage.setItem('qoutDay', message.innerHTML)
        let index=localStorage.getItem('index-pic')+1;
        localStorage.setItem('index-pic',index)
    }
    if(localStorage.getItem('qoutDay')){
        message.innerHTML=localStorage.getItem('qoutDay')
        setTools()
        alreadyFav=false;
    }else {
        localStorage.setItem('qoutDay', message.innerHTML)
    }
    if(localStorage.getItem('index-pic')){
        let index=localStorage.getItem('index-pic');
        partOne.style.cssText=`background-image: url(img/pic${index}.jpg)`
    }
    else{
        localStorage.setItem('index-pic',0)
    }

}
// click on button to get new qoute
btn.addEventListener('click',function(){
    console.log('hi from click')
   message.innerHTML= createQoute()
   setTools()
   alreadyFav=false;

})

// click on font awesome to liked it or add to favorite or copy it
oldTools.addEventListener('click',function(e){
    let  target=e.target
    let mess=message.innerHTML;
    if(target.tagName==='I'){
        //copy
        if(target===oldTools.children[0])
            {
                if(navigator.clipboard){
                    navigator.clipboard.writeText(mess)  
                    oldTools.children[0].classList.add('click')
                }
            }
        //favorite
        else if(target===oldTools.children[1])
            {
                //make star clicked once time
                if(alreadyFav) 
                    return
                oldTools.children[1].classList.add('click')
                createFav(mess,day,month,year,hour,minute);
                //make i clicked once time
                alreadyFav=true;
            }
        //like
        else {
           
            oldTools.children[2].classList.toggle('click')
            if(like)
                like=0;
            else 
                like=1;
        }

        }
    })
//DELETE A FAVORITE QOUTE 
favDiv.addEventListener('click',function(e){
    if(e.target.classList.contains('fa-trash')){
        let target=e.target 
        let parent=target.parentElement;
        let mess=parent.previousElementSibling.innerHTML
        parent.parentElement.remove();
        deleteqoutFav(mess);
    }
})
//------------------------
//END PART OF EVENTS
//------------------------
