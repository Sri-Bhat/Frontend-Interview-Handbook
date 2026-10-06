function twoSum(nums, target) {
  const seenIndexByvalue = new Map();
  for(let i=0; i<nums.length ; i++) {
    const complement = target - nums[i];
    if(seenIndexByvalue.has(complement)){
      return [seenIndexByvalue.get(complement), i];
    } else {
      seenIndexByvalue.set(nums[i], i);
    }
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
