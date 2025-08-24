export function sum(nums: readonly number[]): number {
  let total = 0;
  for (const num of nums) {
    total += num;
  }
  return total;
}
