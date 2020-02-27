var BFO = {
    'folders': {
        0: {
            'top': '300px',
            'left': '570px',
            'parent': null,
            'children': [1]
        },
        1: {
            'top': '50px',
            'left': '50px',
            'parent': 0,
            'children': [2, "14ORiDonb8Tt2JLDmcL56VjHaK5j2xqlQ"]
        },
        2: {
            'top': '50px',
            'left': '150px',
            'parent': 1,
            'children': []
        },
        3: {
            'top': '200px',
            'left': '370px',
            'parent': null,
            'children': []
        }
    },
    'files': {
        "14ORiDonb8Tt2JLDmcL56VjHaK5j2xqlQ": {
            'top': '100px',
            'left': '200px',
            'parent': 0
        },
    },
    'wallpaper': null
};

let keys = Object.entries(BFO['folders'])

function sortParents(array) {
    let sorted = new Array
    let parentObject = new Object
    parentObject[null] = true

    while (array.length) {
        let temp = new Array
        let revisedArray = new Array

        for (let i = 0; i < array.length; i++) {

            if (parentObject[array[i][1]['parent']]) {
                sorted.push(array[i][0])
                temp.push(array[i][0])
                // array.splice(i, 1)
                // i-- 
            } else {
                revisedArray.push(array[i])
            }

        }

        for (let i = 0; i < temp.length; i++) {
            parentObject[temp[i]] = true
        }

        array = revisedArray.slice()
        console.log(array.length)
    }

    return sorted
}

function recursiveDelete(id) {
    console.log('recursing', id)
    if (BFO['folders'][id] && BFO['folders'][id]['children'].length) {
        BFO['folders'][id]['children'].forEach(id => {
            console.log('iterating', id)
            if (BFO['folders'][id] && BFO['folders'][id]['children'].length) {
                recursiveDelete(id)
            }

            if (BFO['folders'][id]) delete BFO['folders'][id]
            if (BFO['files'][id]) delete BFO['files'][id]
        })
    }

    if (BFO['folders'][id]) delete BFO['folders'][id]
    if (BFO['files'][id]) delete BFO['files'][id]
}

console.log(recursiveDelete(0))
console.log(BFO)
// console.log(keys)
// console.log(sortParents(keys))