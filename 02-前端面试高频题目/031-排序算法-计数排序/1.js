var arr = [5, 7, 5, 4, 9, 1];
function countSort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    // const maxValue = Math.max(...arr);
    const maxValue = findMax(arr);
    const counts = new Array(maxValue);
    arr.forEach((item, index) => {
        if (!counts[item]) {
            counts[item] = 0;
        }
        counts[item]++;
    });
    console.log(counts);
    let newarr = [];
    let sortIndex = 0;
    counts.forEach((item, index) => {
        // console.log(item, index);
        // 循环一定要有终止条件
        while (item > 0) {
            newarr[sortIndex++] = index;
            item--;
        }

    });
    console.log(newarr);
    return newarr;


}
countSort(arr);

function findMax(arr) {
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
    }
    // console.log(max);

    return max;

}