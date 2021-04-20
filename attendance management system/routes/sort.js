function compare_item(a, b) {
  // a should come before b in the sorted order
  if (parseInt(a.Date.split("/")[2]) < parseInt(b.Date.split("/")[2])) {
    return -1;
    // a should come after b in the sorted order
  } else if (parseInt(a.Date.split("/")[2]) > parseInt(b.Date.split("/")[2])) {
    return 1;
    // and and b are the same
  } else {
    if (parseInt(a.Date.split("/")[1]) < parseInt(b.Date.split("/")[1])) {
      return -1;
      // a should come after b in the sorted order
    } else if (
      parseInt(a.Date.split("/")[1]) > parseInt(b.Date.split("/")[1])
    ) {
      return 1;
    } else {
      if (parseInt(a.Date.split("/")[0]) < parseInt(b.Date.split("/")[0])) {
        return -1;
      } else if (
        parseInt(a.Date.split("/")[0]) > parseInt(b.Date.split("/")[0])
      ) {
        return 1;
      } else return 0;
      // and and b are the same
    }
  }
}
module.exports = {
  compare_item,
};
