
let input = document.querySelector("input");

let figure = document.querySelector(".profile-image-conatiner")

let profileImage = document.querySelector(".profile-image")

let h2 = document.querySelector("h2");

let p = document.querySelector(".userID");



function handleProfile(event){
   if(event.keyCode == 13){
    let xhr = new XMLHttpRequest();
   
    xhr.open("GET", `https://api.github.com/users/${event.target.value}`);
    
    xhr.onload = function(){
     let userData = JSON.parse(xhr.response);
     profileImage.src = userData.avatar_url;

     h2.innerText = userData.name;

     p.innerText = `@${userData.login}`;
    
    
    
     console.log(userData);
        

    }
    xhr.send();
    
   }
  

}


input.addEventListener('keyup', handleProfile)
