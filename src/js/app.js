      
"use strict"  


 
window.onload = init;
function init () {
         getData() //När sidan startar så anropas funktionen getData()      
          }

  
      async function getData() {  //Funktion som hämtar data från API
          const response = await fetch ("http://127.0.0.1:3000/api/workexperiences")
          const data = await response.json();
          
          displayData(data)            
          console.log(data);}

        
      function displayData(data) { //Funktion som visar erfarenheterna i en lista

              let expEl = document.getElementById ("erfarenhet");
              expEl.innerHTML="";

              data.forEach(exp => {  //Loopar igenom erfarenheterna
              let newElLi= document.createElement ("li")      //Skapar nytt element (li)

              let newText=document.createTextNode (exp.companyname+ " " + exp.jobtitle + " " + exp.location ) //Skapar texten till det som visas i listan
              newElLi.setAttribute('id', exp._id) //Skapar attributet id
           
              newElLi.appendChild(newText) //Lägger newText som "barn" till newElLi
              expEl.appendChild(newElLi) // Lägger newElLi som "barn" till expEl

            
              newElLi.addEventListener ("click", deleteWorkexperience, false); //anropar funktionen deleteWorkexperience vid klick           
              }); 
        
    }
    
      
    async function deleteWorkexperience(e) {  //Funktion som visar delatar erfarenheter            
              
               
      let id= e.target.id;          
               
      const response = await fetch(`http://127.0.0.1:3000/api/workexperiences/${id}`, 
        
        { method: "DELETE",
          headers: {
                    "content-type": "Application/json"
                 },
          });
          const data= await response.json();
             console.log(data);
           
              getData()           
            
        } 



        

        
  document.getElementById("submits").addEventListener("click", createWorkexperience); 

      async function createWorkexperience (companyname, jobtitle, location){
            let companynameEl=document.getElementById("companyname")
            let jobtitleEl=document.getElementById("jobtitle")
            let locationEl=document.getElementById("location")

            companyname=companynameEl.value
            jobtitle=jobtitleEl.value
            location=locationEl.value

            let workexperience = {  
            companyname: companyname,
            jobtitle: jobtitle,
            location:location
            }

            const response = await fetch ("http://127.0.0.1:3000/api/workexperiences", {
                method: "POST",
                headers: {
                    "content-type": "Application/json"
                },
                body: JSON.stringify(workexperience)
            })
            const data= await response.json();
            console.log(data);
            
        }

