myArr =  new Array(9).fill(false);
console.log(myArr);


function slicer(i, Arr) {
    Arr = Arr.slice(0,i).concat(true, Arr.slice(i, Arr.length-1));
    console.log(Arr);
}

slicer(8, myArr);