/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
// 输出: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]];
var groupAnagrams = function (strs) {
    const map = new Map();
    for (let item of strs) {
        const key = item.split('').sort().join('');
        if (!map.has(key)) {
            map.set(key, []);
        }
        // console.log(1, map.get(key));

        map.get(key).push(item);
        // console.log(2, map.get(key));
    }


    const resArr = Array.from(map.values());
    console.log(resArr);

};
groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);