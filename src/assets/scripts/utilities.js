export function removeItemFromArray(array, elementToRemove) {
   //TODO: we may have to check for index to be 0
    const index = array.indexOf(elementToRemove),
        firstSplitOfArray = array.slice(0, index),
        secondSplitOfArray = array.slice(index + 1, array.length),
        updatedArray = firstSplitOfArray.concat(secondSplitOfArray);

    return updatedArray;
}

export function getPlayerPosition(playerObject) {
    return playerObject.POS.toLowerCase();
}

export function sumObjectOfArraysLength(obj) {
    //TODO: write logic to check if array 
    let sum = 0;
    for (let arr in obj) {
        sum += obj[arr].length;
    }
    return sum;
}

// export function replaceItemInArray(array, item) {
//     const replaceIndex = array.indexOf(item),
//         newArray = array[replaceIndex] = item;

//     return newArray;
// }