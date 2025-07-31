class UIcontroller{
constructor(){
    //creating a funtion that slects all element with class notes and store them in a array
    this.notes=()=>[...document.querySelectorAll('.note')];
    this.deleteBtns = ()=>[...document.querySelectorAll('.delete-btn')];
    this.newNote = document.querySelector(".new-note"); //this is used to select the present instance of the class
    this.noteFiles = document.querySelector(".notes-files");//this is used to select the note files
    this.noteForm = document.querySelector(".note-form"); //this is used to select the note form
    this.noteTitle = document.querySelector(".title-input"); //this is used to select the
    this.noteText=document.querySelector(".notes-text-input"); //this is used to select the note text input
    this.noteBtn = document.querySelector(".notes-btn"); //this is used to select the note button
}

createNoteHTML(noteData,noteFilesEl){//noteData represents the new note we created  and notefilesEl is container where all the notes are displayed
    //by passing bohth as parameters we make this function reusable
    //we can store the html into a variable with help of template literals

    const noteHTML = `
            <div class="note">
                <h2 class="title" contenteditable="true">${noteData.title}</h2>
                <p class="note-text" contenteditable="true">${noteData.note}</p>
                <div class="settings">
                    <span class="date">${noteData.time}</span>
                    <a href="#" class="delete-btn"><i class="bx bxs-trash"></i></a>
                </div>
            </div>`

            noteFilesEl.insertAdjacentHTML("beforeend",noteHTML);//we use insertAdjacentHTML to insert the html into the noteFilesEl container
            //beforeend means that the html will be inserted at the end of the container

    }
};

export default UIcontroller;

//add new note button so we set a constructor to initialize the button 