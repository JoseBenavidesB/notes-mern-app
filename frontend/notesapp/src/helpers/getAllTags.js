
export const getAllTags = (notes = []) => {
    
    let combine = [];
    notes.map( note => {
        combine.push(...note.tags)
    })
    

    const newArr = combine.filter((n, index) => {
        return combine.indexOf(n) === index;
    });

    //console.log(newArr);
    return newArr

}
