/**
 * 字母异位词分组函数
 * @param {string[]} strs 包含多个单词的数组
 * @return {string[][]} 分组后的二维数组，每组包含互为字母异位的单词
 */
// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
var groupAnagrams = function (strs) {
    // 创建哈希表，键为排序后的字母组合，值为相同字母组成的单词数组
    const map = new Map();

    for (let str of strs) {
        // 将单词字母排序生成统一标识（例如："eat" -> "aet"）
        const key = str.split('').sort().join('');

        // 初始化新字母组合的存储数组
        if (!map.has(key)) {
            map.set(key, []);
        }

        // 将当前单词加入对应字母组合的分组
        map.get(key).push(str);
    }

    // 将Map的值转换为二维数组输出
    const array = Array.from(map.values());
    console.log(map.values());

    console.log(array); // 调试用输出

    return array;
};
// ... existing test code ...

groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);