export function desc(
  d: string,
  setDes: React.Dispatch<React.SetStateAction<string>>,
  setSubgenre: React.Dispatch<React.SetStateAction<string>>,
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (d === "") {
    setDes("");
    setSelected(false);
  } else if (d !== "") {
    setDes(d);
    setSubgenre(d);
    setSelected(true);
  }
}

export async function checked(
  checkedDes: any,
  setRequiredDesc: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckedDesc: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (checkedDes) {
    setRequiredDesc(false);
    setCheckedDesc(false);
  } else {
    setRequiredDesc(true);
    setCheckedDesc(true);
  }
}

export function saveSubgenre(subgenre: any, requiredDesc: any) {
  console.log({ name: "subgenre", isDescription: requiredDesc });
}
