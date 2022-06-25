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
  let body = { name: subgenre, isDescriptionRequired: requiredDesc };
  function post(url: any, body: any) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    console.log(requestOptions);
    return fetch(url, requestOptions).then(handleResponse);
  }

  function handleResponse(response: any) {
    return response.text().then((text: any) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        console.log("Data not submitted");
        return Promise.reject(error);
      }
    });
  }
  post("https://reqres.in/api/subgenre", body);
}

export function saveBookInfo(bookInfo: any) {
  function post(url: any, body: any) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    console.log(requestOptions);
    return fetch(url, requestOptions).then(handleResponse);
  }

  function handleResponse(response: any) {
    return response.text().then((text: any) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        console.log("Data not submitted");
        return Promise.reject(error);
      }
    });
  }
  post("https://reqres.in/api/bookInfo", bookInfo);
}
