var BFO = {
    'folders': {
        0: {
            'top': '300px',
            'left': '570px',
            'parent': 2
        },
        1: {
            'top': '50px',
            'left': '50px',
            'parent': null
        },
        2: {
            'top': '50px',
            'left': '150px',
            'parent': 1
        },
        3: {
            'top': '50px',
            'left': '50px',
            'parent': null
        },
        4: {
            'top': '50px',
            'left': '150px',
            'parent': 1
        }
    },
    'files': {
        "14ORiDonb8Tt2JLDmcL56VjHaK5j2xqlQ": {
            'top': '100px',
            'left': '200px',
            'parent': 'innerFolder-0'
        },
    }
};

let keys = Object.entries(BFO['folders'])

function sortParents(array) {
    let sorted = new Array
    let parentObject = new Object
    parentObject[null] = true

    while (array.length) {
        let temp = new Array

        for (let i = 0; i < array.length; i++) {

            if (parentObject[array[i][1]['parent']]) {
                sorted.push(array[i][0])
                temp.push(array[i][0])
                array.splice(i, 1)
                i--
            }

        }

        for (let i = 0; i < temp.length; i++) {
            parentObject[temp[i]] = true
        }

        console.log(array.length)
    }

    return sorted
}

console.log(keys)
console.log(sortParents(keys))