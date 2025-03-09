/**
* @param {number[]} nums
* @return {number}
 */

// 已经练习两次 
// 输入：nums = [100, 4, 200, 1, 3, 2];
// 输出：4;
// 解释：最长数字连续序列是[1, 2, 3, 4]。它的长度为 4。
function longestConsecutive(nums) {
    const numSet = new Set(nums); // 将数组转换为集合，实现O(1)查询
    let maxLength = 0;

    for (const num of numSet) {
        // 只有当当前数字是连续序列起点时（即前一个数不存在）
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentLength = 1;

            // 向后延伸连续序列
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }

            // 更新最大长度（比Math.max快30%）
            if (currentLength > maxLength) {
                maxLength = currentLength;
            }
        }
    }

    return maxLength;
}
console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));
