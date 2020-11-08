import qs from "querystring"

export function getData(url) {
    const result = fetch(url);
    return result;
}

export function postData(url,data) {
    console.log("hahahahahahah")
    console.log(JSON.stringify(data))
    const result = fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    return result;
}

export function deleteData(url, data){
    const result = fetch(url, {
        method: "delete",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
    return result;
}

