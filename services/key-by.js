export function keyBy(arr, keyMapper) {
  return Object.fromEntries(
    arr.map((value, index) => [keyMapper(value, index), value])
  )
}
