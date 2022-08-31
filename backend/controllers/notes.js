const { json } = require("express");
const Notes = require("../models/notes");



/* -----------get notes -------------- */
const getNotes = async (req, res) => {

    
    try {
        const notes = await Notes.find({ user: req.userAuth._id});

        res.status(200).json({
            msg:'ok',
            notes
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg:'Error, try again'
        })
    }
    
};

/* -----------get note by id -------------- */
const getNoteById = async (req, res) => {

    const { id } = req.params;

    try {
        //check if exists a note
        const note = await Notes.findById( id );
        
        //check if exists a note
        if ( note ) {
            //get the note
            const note = await Notes.findById( id )

            return res.status(201).json({
                msg:'ok',
                note
            });

        } else {
            return res.status(400).json({
                msg:`There is not any Note with the ID: ${id}`
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error, try again'
        })
        console.log(error);
    };
};


/* -----------create note -------------- */
const createNote = async (req, res) => {

    let data = req.body;
    //console.log(req);
    data = { ...data, user: req.userAuth._id}

    try {
        //create note with the body data
        const note = new Notes( data );

        //save note in database
        await note.save()

        //response
        return res.status(201).json({
            msg: 'ok',
            note
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error, saving on database'
        })
    }
};

/* -----------update note -------------- */
const updateNote = async (req, res) => {

    const { id } = req.params;
    const data = req.body

    
    try {
        const note = await Notes.findById( id );

        //check if exists a note
        if ( note ) {
            //update note
            const newNote = await Notes.findByIdAndUpdate( id, data, {new: true} )

            //response
            return res.status(201).json({
                msg:'ok',
                newNote
            })
        } else {
            return res.status(400).json({
                msg:`There is not any Note with the ID: ${id}`
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error, try again'
        })
        console.log(error);
    };

};

/* -----------delete note -------------- */
const deleteNote = async (req, res) => {

    const { id } = req.params;

    try {

        const note = await Notes.findById( id );
        
        //check if exists a note
        if ( note ) {
            
            //delete note
            await Notes.findByIdAndDelete( id )

            //response
            return res.status(200).json({
                msg:'Note deleted'
            })
        } else {
            return res.status(400).json({
                msg:`There is not any Note with the ID: ${id}`
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error, try again'
        })
        console.log(error);
    };
};


module.exports = {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
}

