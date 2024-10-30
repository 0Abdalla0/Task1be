const fs = require("fs")
const yargs = require("yargs")
const DataEntry = require("./DataEntry")
//ADD User
    yargs.command({
       command : "add" ,
       describe : " to add ",
       builder : {
        Fname : {
            describe :"First name desc in add command",
            demandOption : true ,
            type : "string"
         },
        Lname : {
            describe :"Last name desc in add command",
            demandOption : true ,
            type : "string"
         }
       },
       handler :(user)=> {
         DataEntry.addPerson(user.id , user.Fname , user.Lname, user.age,user.city)
       }
   })

   //Display All Users
   yargs.command({
       command:"displayUser",
       describe:"Display All Data",
       builder:{
           id: {
               describe:"id to search for",
               demandOption:true,
               type:"string"
            }
        },
        handler:(user)=>{
            DataEntry.readData(user.id)
        }
        
    })
    //Read All Data
    yargs.command({
        command:"displayAll",
        describe:"Read All Data",
        handler:()=>{
            DataEntry.readAllData()
        }
    })
    
    //Delete Single ID
      yargs.command({
          command : "delete" ,
          describe : " to delete ",
          handler :(user)=> {
              DataEntry.delData(user.id)
           }
       })
    //Delete All Data
    yargs.command({
        command:"clearAll",
        describe:"Delete All Data",
        handler:()=>{
            DataEntry.clearAllData()
        }
    })
    
    yargs.parse()  
    