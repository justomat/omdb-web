let input = ["kita", "atik", "tika", "aku", "kia", "makan", "kua"];

function bubblesort(arr) {
  let done = false;
  while (!done) {
    done = true;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        done = false;
        let tmp = arr[i - 1];
        arr[i - 1] = arr[i];
        arr[i] = tmp;
      }
    }
  }

  return arr;
}

function solve() {
  let dict = {};
  for (let word of input) {
    let key = bubblesort(word.split(""));
    dict[key] ? dict[key].push(word) : (dict[key] = [word]);
  }
  return Object.values(dict);
}

export default (req, res) => {
  res.status(200).json(solve());
};
