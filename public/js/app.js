console.log("client sie javascript is loaded");


const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = '';
messageTwo.textContent = '';
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchElement.value;
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageTwo.textContent = data.error
        }else{
            messageOne.textContent = data.forecast;
            messageTwo.textContent = data.location;
        }
       
    })
})

})