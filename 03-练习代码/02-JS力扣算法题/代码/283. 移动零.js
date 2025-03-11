/**
 * 将数组中的零移动到末尾，保持非零元素相对顺序
 * @param {number[]} nums
 * @return {void} 不返回任何内容，直接修改原数组
 */
// 练习2次
var moveZeroes = function (nums) {
    // 双指针法：left标记非零元素应插入的位置，right用于遍历数组
    let left = 0; // 下一个非零元素的目标位置
    let right = 0; // 当前遍历到的位置

    // 遍历整个数组
    for (; right < nums.length; right++) {
        // 当发现非零元素时，将其移动到left位置
        if (nums[right] !== 0) {
            // 当left与right不重合时才交换（减少不必要的原地交换）
            if (left !== right) {
                // 交换元素：将非零元素换到前面，原位置可能变为零（后续处理）
                [nums[left], nums[right]] = [nums[right], nums[left]];
            }
            // 移动left指针，为下一个非零元素腾出位置
            left++;
        }
        // 若nums[right]===0时，right继续前进，left保持不动
        // 最终所有非零元素会被聚集到数组前端，剩余位置自动填充零
    }
};