function compare(field, reverse = false) {
  //console.log("reverse", reverse);
  return function(a, b) {
    //console.log("types:", typeof a[field], typeof b[field]);
    let nameA = a[field];
    let nameB = b[field];
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      nameA = a[field].toUpperCase();
      nameB = b[field].toUpperCase();
    } else if (typeof a[field] !== typeof b[field]) {
      nameA = typeof a[field];
      nameB = typeof b[field];
    }
    let result = 0;
    if (nameA < nameB) {
      result = -1;
    } else if (nameA > nameB) {
      result = 1;
    }
    if (reverse) result = result * -1;
    return result;
  };
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function title(string) {
  return string.replace(/(^\w{1})|(\s{1}\w{1})/g,
                        match => match.toUpperCase());
}
