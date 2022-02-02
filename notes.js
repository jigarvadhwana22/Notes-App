//Overview : notes.js contains all the logic part that will be executed on a accordingly options selected by the user

const fs = require("fs");
const chalk = require('chalk');

const getNotes = function () {
    return 'Your notes..';
}//just for testing purpose


const readNotes = function(title){
    var flg= 0;
    const notes = loadNotes();
    //nw title i hve to search if found then print it with its body if not then say title not found

    notes.forEach(function(note){
        if(note.title === title){
            console.log(note.title +"\n"+note.body);
            flg = 1;
        }
    })
    if(flg==0)console.log(chalk.inverse.red("Title not found"));

}


const listNotes = function(){
    const notes = loadNotes();//loading notes arr of objs
    console.log(chalk.inverse.magenta("Your Notes : "));
    
    notes.forEach(function(item){ //traversing single single obj
        console.log(item.title); // printing tht particular objs title

    })
    
}

function removeNote(title) {
    //title entered shud be check whether it exists or not if it does then remove else print msg title not found
    const notes = loadNotes(); //all data that is array of objs will be stored in notes
    const notesToKeep = notes.filter(function (note) {
        //filter method will return new array filled with elements that pass a test provided by a function
        //so  now we r checking if title entered is not present in the notes.title then add all those elemnts in notesTokeep
        //so obj1{title : , body: }, obj2{..}....one by one note mai ayenge, untill all r done
        return note.title !== title; //return true; 

        
    });

    //if a note is removed or not [will do by comparing 2arrays length is same then not removed if different then removed, so keeping saveNotes() later coz it will add if nt note is avlbl]
    if (notes.length > notesToKeep.length) { //tht means a note was removed
        console.log(chalk.inverse.green("Note Removed"));
        saveNotes(notesToKeep); //nw save it

    } else {
        console.log(chalk.inverse.red("Note not Removed"));
        //note nt removed so nothing wil come coz our aim is removeNote
    }


}
const addNote = function (title, body) {
    const notes = loadNotes(); // loading the notes , since this is called first time catch block will execute and now note will hold an empty array, now u can assign the values title, body and save

    //now we want that if title already exists then print msg that title already taken so we dont add that title and body in notes.json file

    //*****LOGIC****//so for that we currently have 3 items stored in 0,1,2 index of notes now from those 3 index will check if the current title received via arg , exists already ? if yes then we wont add else will add. [so basically whenever title is entered via arg , we will traverse the whole index from strt to end to check if tht title exists or not]

    //console.log(notes[0].title); will return "stock market" cz array of obj h 
    // [0]=>title , body
    //[1] => title , body
    var doesTitleExist = 0;  
debugger;
    for (var i = 0; i < notes.length; i++) {//for traversing index
        if (notes[i].title === title) {
            console.log(chalk.inverse.red("Title already taken..!!"));
            doesTitleExist = 1;
            break; //meaning u found the duplicate title then there is no point in traversing more
        }
    }

    if (doesTitleExist == 0) {
        //if it doesnt exist then add it 
        notes.push({//obj ko push({..content..})
            title: title,
            body: body
        }); //array method
        saveNotes(notes);
        console.log(chalk.inverse.green("New note added"));
    }

    

}

const saveNotes = (notes) => {
    //now for saving note into json we have to make it to string
    const dataJSON = JSON.stringify(notes);
    //now writing it to json file 
    fs.writeFileSync('notes.json', dataJSON);

}
//still we havent created json file 
// also addNote will store in array of objects 
const loadNotes = function () {
    try {
        //trying to read the json file, if it exists then converting it to obj and returning it
        const dataBuffer = fs.readFileSync('notes.json');
        const data = JSON.parse(dataBuffer.toString());
        return data;

    }//if the file doesnt exist then it will throw an error which is handle by catch block , and in return will return an empty array[so first time when file doesnt exist at that time try block will fail, control will come to catch at that time catch will return an empty array , from wherever it is calld therafter catch block wont be executed in future , coz data exist h , so try run hoga , obj banayga return ]
    catch (e) {
        return [];

    }
}

//exporting 2 functions
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNotes : readNotes
}
