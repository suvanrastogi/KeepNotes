import AppController from "./AppController.js";
import UIcontroller from "./UIcontroller.js";

class Controller{
    constructor(){
        this.UIcontroller = new UIcontroller() // Initialize the UI controller
        this.getData = [];
        // Load existing notes from local storage
        this.getData = JSON.parse(localStorage.getItem('noteData')) || []; // Retrieve notes from local storage or initialize an empty array
        //we need a way to save data to local storage whenever change occurs
        this.setData=(data)=> localStorage.setItem('noteData', JSON.stringify(data));
        ////call it at places to make sure the data is saved in the local storage each time we make a change
            //localStorate is a web storage API that allows us to store data in the browser
            //we use json.stringify to convert array of notes into a json string the data to a string format
             // Save the notes to local storage //stringify converts the data to a string format
        //we can now use this method to save the data to local storage whenever we make a change to the getData array
        this.openForm()
        this.createNoteData(); // Call the method to set up note creation
        this.createNoteUI(); // Call the method to display existing notes on page load
        this.deleteNodes(); // Call the method to set up note deletion
        this.editNote(); // Call the method to set up note editing
        
    }

    //openform method
    openForm(){
        const {newNote} =this.UIcontroller;
        const openFormFn = (e) => {
            e.preventDefault();//prevents the default behaviour of the button 
            newNote.classList.add('active'); // Add the 'active' class to the newNote element

            window.addEventListener('click', (e) => {
                //e .target that checks if the element with class new note was clicked & closest checks if the element is a child of newNote orany ancestor that experienced the clickthat means the overall button element was clicked                 
                !e.target.closest(".new-note") && newNote.classList.remove('active'); // Remove the 'active' class if clicked outside
            });

        }
        newNote.addEventListener('click',openFormFn);
        newNote.addEventListener('contextmenu',openFormFn);//we are telling the browser to open the form when the right click is pressed
        //contextmenu is the event that is triggered when the right click is pressed
    }

    ////create note method - we wille xtract the elements we already setup in the UIcontroller class
    createNoteData(){
        const {newNote,noteFiles, noteTitle,noteText,noteBtn, createNoteHTML} = this.UIcontroller; // Destructure the UIcontroller properties

        noteBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            e.stopPropagation(); // Prevent the event from bubbling up

            const currDate = new Date().toLocaleDateString('en-IN');// Get the current date in 'en-IN' format into variable currDate

            if(noteTitle.value.trim()!=="" && noteText.value.trim()!==""){//using trim to remove any leading or trailing spaces even if the user enters spaces only
            // Check if the title and note text are not empty   
             const note= new AppController(noteTitle.value,noteText.value,currDate);// Create a new instance of AppController with the note data
            this.getData.push(note); // Add the new note to the getData array
            this.setData(this.getData); // Save the updated notes to local storage
            createNoteHTML(note,noteFiles);
            //why are we callng the below two methods here?
            //because we want to set up the delete and edit functionality for the newly created note
            this.deleteNodes(); // Call the deleteNodes method to set up deletion for the new note
            this.editNote(); // Call the editNote method to set up editing for the new note

            newNote.classList.remove('active'); // Remove the 'active' class from newNote after creating the note
            noteTitle.value = ''; // Clear the title input field
            noteText.value = ''; // Clear the note text input field
            }

        })

        //add event listener for more intuitive feature
        noteText.addEventListener('keydown', (e) => {
            if(e.key ==='Enter'){
                noteBtn.click(); // Trigger the note button click event when Enter is pressed
            }
        })

    }

        createNoteUI(){
            //any note saved in local storage will automatically be displayed on the page 
            const {noteFiles,createNoteHTML}=this.UIcontroller; // Destructure the UIcontroller properties
            this.getData.forEach((noteData) => {
                createNoteHTML(noteData, noteFiles); // Create the note HTML for each note in getData
            });
            //this will display all the notes that are already present in the local storage
        }

                //new method for deletig nodeed
        deleteNodes(){
            const notes=this.UIcontroller.notes(); // Get all notes using the UIcontroller method
            const deleteBtns = this.UIcontroller.deleteBtns(); // Get all delete buttons using the UIcontroller method
            const {noteFiles} = this.UIcontroller; // Get the noteFiles element

            deleteBtns.forEach((btn,i)=>{
                btn.onClick = () =>{
                    noteFiles.removeChild(notes[i]); // Remove the note from the noteFiles container
                    this.getData.splice(i, 1); // Remove the note from the getData array
                    this.setData(this.getData); // Update local storage with the modified getData array
                }
            })

        }

        editNote(){
            const notes = this.UIcontroller.notes(); // selecting all notes on the page present onces actually present in the DOM
            notes.forEach((note,i)=>{
                const noteTitle = note.querySelector('.title'); // Select the title element within the note
                const noteText = note.querySelector('.note-text'); // Select the text element within the note

                noteTitle.addEventListener('blur', ()=>{//blur is the event that is triggered when the user clicks the element out of focus 
                    this.getData[i].title=noteTitle.textContent; // Update the title in the getData array
                    this.setData(this.getData); // Update local storage with the modified getData array
                })

                noteText.addEventListener('blur', ()=>{//blur is the event that is triggered when the user clicks the element out of focus 
                    this.getData[i].note=noteText.textContent; // Update the title in the getData array
                    this.setData(this.getData); // Update local storage with the modified getData array
                })
            })
        }
}

export default Controller;