export default function onlyUnique<T>(arr: Array<T>): Array<T> {
  return arr.filter((value, index, array) => array.indexOf(value) === index);
}
