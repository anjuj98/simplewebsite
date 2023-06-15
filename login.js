
const form=document.querySelector("form"),
eField= form.querySelector(".email"),
eInput = eField.querySelector("input"),
pField= form.querySelector(".password"),
pInput = pField.querySelector("input");


form.onsubmit = (e)=>{
    e.preventDefault();
    if(eInput.value==""){
        eField.classList.add("shake","error");
    }else{
        checkEmail();
    }
    if(pInput.value==""){
        pField.classList.add("shake","error");
    }

setTimeout(()=>{
    eField.classList.remove("shake");
    pField.classList.remove("shake");

},400);



eInput.onkeyup=()=>{
    checkEmail();
}


function checkEmail(){
    let pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!eInput.value.match(pattern)){
          eField.classList.add("error");
          let errorText=eField.querySelector(".error-text");
          (eInput.value !="") ? errorText.innerText = "Enter a valid email address" : errorText.innerText="Email can't be blank";
      }else{
          eField.classList.remove("error");
      }
  }

pInput.onkeyup=()=>{
    if(pInput.value == ""){
        pField.classList.add("error");
    }else{
        pField.classList.remove("error");
    }
}

if(!eField.classList.contains("error") && !pField.classList.contains("error")){
    window.location.href="navigationbar.html";
}
}