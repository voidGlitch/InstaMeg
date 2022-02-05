export function NamesInitials(name) {
  console.log(name);
  const splitName = name.toUpperCase().split(" ");
  console.log(splitName);
  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  } else {
    return splitName[0][0];
  }
}
