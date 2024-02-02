const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

// code->Currency code
// countryList[code]->Country code

for( let code in countryList){
console.log(code,countryList[code]);
}

for( let options of dropdowns){
    for(currCode in countryList){
       let newOption= document.createElement("option");
       newOption.innerText= currCode;
       newOption.value= currCode;
       if(options.name==="from"&& currCode==="USD"){
        newOption.selected= "selected";
       }
       else if(options.name==="to"&& currCode==="INR"){
            newOption.selected= "selected";
       }
       options.append(newOption);  

    }
    
    options.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
let currCode=element.value;
let countryCode=countryList[currCode];
let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
};

btn.addEventListener("click",async(evt)=>{
     evt.preventDefault();                //to remove the default behaviour of button on click
   let amt =document.querySelector(".amount input");
   let amtValue =amt.value;
//    console.log(amtValue);
if(amtValue===""|| amtValue<1){
    amtValue=1;
    amt.value=1;
}

let URL =`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
let response= await fetch(URL);
// console.log(response);
let data= await response.json();
let rate=data[toCurr.value.toLowerCase()];
let finalAmount=amtValue * rate;
msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});


