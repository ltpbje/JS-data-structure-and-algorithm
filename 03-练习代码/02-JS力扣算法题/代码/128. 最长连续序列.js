/**
* @param {number[]} nums
* @return {number}
 */
// 输入：nums = [100, 4, 200, 1, 3, 2];
// 输出：4;
// 解释：最长数字连续序列是[1, 2, 3, 4]。它的长度为 4。
var longestConsecutive = function (nums) {
    console.log(nums.sort((a, b) => a - b));
};
longestConsecutive([100, 4, 200, 1, 3, 2]);