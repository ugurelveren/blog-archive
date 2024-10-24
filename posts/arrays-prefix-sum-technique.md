---
title: "Arrays: Prefix Sum Technique"
date: 2023-02-24
author: "Ugur"
keywords: "prefix sum, arrays, cumulative sum, algorithm, subarray sum"
description: "An introduction to the Prefix Sum technique for efficiently computing cumulative sums in arrays."
---

# Arrays: Prefix Sum Technique

Hello there! The prefix sum technique involves creating an array where the `prefix[i]` is the sum of all elements up to index `i`. This technique can also be referred to as the cumulative sum, inclusive scan, or simply scan.

```
prefix[0] = nums[0]
prefix[1] = nums[0] + nums[1]
prefix[2] = nums[0] + nums[1] + nums[2]
prefix[i] = nums[0] + nums[1]+ nums[2] + .. + nums[i]
```

For example, if the original array is `[1, 2, 3, 4]`, the prefix sum array would be `[1, 3, 6, 10]`.

## Time Complexity

The time complexity of Prefix Sum is O(n) since we need to iterate through the input array once all the items in the array. But after the prefix sum array is computed, we can use it to answer subarray sum queries quickly, in constant time. It allows us to find the sum of any subarray in O(1).

If we want to find the sum of `i` to `j`, the answer is `prefix[j] - prefix[i] + nums[j]`.

### Problem: Finding subarray sum with Prefix Sum

Given an array `nums[]` of size N. Given Q queries and in each query given L and R, Print the sum of array elements from index L to R.

## Conclusion

The prefix sum technique is a useful algorithmic approach for efficiently computing the cumulative sum of a sequence of numbers. By creating a new sequence that represents the sum of all previous elements in the original sequence up to and including the current element, we can calculate the prefix sum in a single pass through the original list. This technique is particularly useful for applications such as image processing and dynamic programming, where it can significantly improve the efficiency of c...

#tech
