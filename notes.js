const fs= require('fs')
const chalk= require('chalk')


const addNotes = (title,body) => {
const notes=loadNotes()
const duplicate= notes.find((note) => note.title == title )

if(!duplicate){
    notes.push({
        title: title,
        body: body
    })
     save(notes)
     console.log(chalk.green.inverse('New note added!'))
}
else{
    console.log(chalk.red.inverse('Title already taken!'))
}
}

const save= (notes) => {

   const dataJson= JSON.stringify(notes)
  fs.writeFileSync('notes.json',dataJson)
}

const loadNotes = () => {
try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
}
catch (e) {
    return []
}
}

const removeNotes= (title) =>  {
  const notes=loadNotes()
  const keep= notes.filter((note) => note.title != title )

   if (notes.length > keep.length){
    save(keep)
    const data= chalk.green.inverse('Note removed!')
    console.log(data)
}
else{
    const data= chalk.red.inverse('No note found!')
    console.log(data)
}

}

const listNotes= () =>{
    const notes= loadNotes()
      console.log(chalk.inverse('Your notes'))

      notes.forEach((note) => {
          console.log(note.title)
      })
}

const readNote= (title) => {
    const notes= loadNotes()
    const note= notes.find((note) => note.title == title)
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse('Note not found!'))
    }
}
module.exports= {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}