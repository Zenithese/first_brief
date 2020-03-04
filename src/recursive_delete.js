function recursiveDelete(id){
    console.log('made it')
    if (BFO['folders'][id] && BFO['folders'][id]['children'].length) {
        BFO['folders'][id]['children'].forEach(id => {
            if (BFO['folders'][id] && BFO['folders'][id]['children'].length) {
                recursiveDelete(id)
            }
            
            if (BFO['folders'][id]) {
                if (BFO['folders'][id]['title'].slice(0, 11) === "New Folder ") {
                    let num = BFO['folders'][id]['title'].slice(11)
                    if (num < titleNum) titleNum = Number(num)
                    if (num === titleNum) titleNum -= 1;
                    skip[num] = false
                }
                delete BFO['folders'][id]
            }
            if (BFO['files'][id]) delete BFO['files'][id]
        })
    }
    
    if (BFO['folders'][id]) {
        if (BFO['folders'][id]['title'].slice(0, 11) === "New Folder ") {
            let num = BFO['folders'][id]['title'].slice(11)
            if (num < titleNum) titleNum = Number(num)
            if (num === titleNum) titleNum -= 1;
            skip[num] = false
        }
        delete BFO['folders'][id]
    }
    if (BFO['files'][id]) delete BFO['files'][id]
}

// folderToDelete.remove();
// delete BFO['folders'][folderToDelete.id.slice(6)]
// folderToDelete = null