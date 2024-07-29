const callbackdiv = document.querySelector(".callbackTask")
const button = document.querySelector(".button")

button.addEventListener("click", callbackFunction);

function callbackFunction(){
    console.log("hi")
   
    const changeText = document.createElement("p")
    changeText.innerHTML = "Please Wait While The callback is being Executed"
    callbackdiv.appendChild(changeText)
    changeText.classList.add("chagetext")

    setTimeout(() => {
        changeText.innerHTML = "Callback Executed After 5 Seconds"
       
    }, 5000);

    // changeText.innerHTML = ""




}