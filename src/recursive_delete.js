function recursiveDelete(id){
    console.log('made it')
    if (BFO['folders'][id] && BFO['folders'][id]['children'].length) {
        BFO['folders'][id]['children'].forEach(id => {
            if (BFO['folders'][id] && BFO['folders'][id]['children'].length) {
                recursiveDelete(id)
            }
            
            if (BFO['folders'][id]) delete BFO['folders'][id]
            console.log(id)
            if (BFO['files'][id]) delete BFO['files'][id]
        })
    }
    
    if (BFO['folders'][id]) delete BFO['folders'][id]
    console.log(id)
    if (BFO['files'][id]) delete BFO['files'][id]
}

// folderToDelete.remove();
// delete BFO['folders'][folderToDelete.id.slice(6)]
// folderToDelete = null