const fs = require("fs")
const prompt = require('prompt-sync')();

const addPerson=(id,Fname,Lname,age,city)=>{
    const data = loadInfo()
    const dupData = data.filter((user)=>{
        return user.id === id 
    })

    if (dupData.length == 0){
        data.push({
            id:id,
            Fname:Fname,
            Lname:Lname,
            age:age,
            city:city
        })      

        saveData(data)
    }else{
        console.log("ERROR: Duplicated Data")
    }

}

const loadInfo = ()=>{
    try{
        const dataJson = fs.readFileSync("dataEntry.json").toString()
        return JSON.parse(dataJson)
    }

    catch{
        return[]
    }
}

const saveData =(data) =>{
    const saveDataJSON = JSON.stringify(data)
    fs.writeFileSync("dataEntry.json",saveDataJSON)

}

const readData=(id)=>{
    const data=loadInfo()

    const userSearch = data.find((user)=>{
        return user.id == id
    })

    if (userSearch) {
        console.log("Info of ID number "+ id +" is:\n" + JSON.stringify(userSearch, null, 2))
    }
    else
    {
        console.log("**ID NOT FOUND**")
    }
}

const readAllData=()=>{
    const data = loadInfo()
    if (data === 0) {
        console.log("**NO DATA FOUND**")
    }else{
        console.log("All Entries:");
        console.log(JSON.stringify(data, null, 2));
    }
}

const delData =(id)=>{
    const data = loadInfo()

    const keepData = data.filter((user) =>{
        return user.id !== id
    })
    console.log("You Have Successfully Deleted ID Number: " + id) 
    saveData(keepData)
}

const clearAllData=()=>{
    const answer = prompt("ARE YOU SURE YOU WANT TO CLEAR DATA (Y/N)?")
    if (answer.toLowerCase() === 'y') {        
        console.log("**DATA CLEARED**")
        saveData([])
    }else
    {
        console.log("Every thing as it is :)")
    }
}

module.exports = {
    addPerson,
    delData,
    readData,
    readAllData,
    clearAllData
}