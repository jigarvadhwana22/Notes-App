//Overview : [sync js is used]app.js acts as a interface where user selects one of the 4 options ie. Add,Remove,List,Read. when clicked on : 
//Add will be selected for adding a note which will contain title,body.
//Remove will be selected for removing a particular note 
//List will list all notes present in json file [currently acting as db]
//Read will be opening the body of the particular note user wants to read

//using yargs since it makes command line ui flexible
const { string } = require('yargs');
const notes = require('./notes')
const yargs = require('yargs');
// create add command
yargs.command({
    command : 'add',
    describe : 'Add a new note',
    //now user will add note with title and body
    builder : {//this obj value , will contain all options[obj] tht this add command will support

        title : {// obj title
            describe : 'Note title',
            demandOption : true, //mandatory to enter title
            type : 'string' //value args of title shud be in string only
    
        },
        body : { // obj body
            describe : 'Note body',
            demandOption : true,
            type : 'string'
        }

    },
    handler : function(argv){
       
        //argv is the whole object from that we only want to print title and body

        notes.addNote(argv.title,argv.body); //ADDNOTE functionality in app

        
    }
})

// create remove command
yargs.command({
    command : 'remove',
    describe : 'Remove the note',
    builder : {
        title : {
            describe : 'Note title',
            demandOption : true ,
            type : 'string'
        }
    },
    handler : function(argv){
        notes.removeNote(argv.title); //removeNote functionality in app
    }

    
})
// create list command

yargs.command({
    command : 'list-notes',
    describe : 'List all notes title',
    handler : function(argv){
        notes.listNotes();
    }
})

// create read command

yargs.command({
    command : 'readNotes', //this is command and shud be same whtv u pass from cmndline
    describe : 'Read notes',
    builder : {
        title : { //title mandatory thts y
            describe : 'Note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler : function (argv){
        notes.readNotes(argv.title);
    }
})

yargs.parse();// so that it parses the argv , if not written then code argv passed wont function properly

/* cmd line
For adding -> node app.js add --title="" --body=""

*/