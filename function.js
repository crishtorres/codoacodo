async function fetchHTML(options){
    let {url, success} = options;
    try {
      let res = await fetch(url, {headers: {'Content-Type': "text/html; charset=utf-8"}});
      let html = await res.text();
      success(html);
    } catch (error) {
      console.log(error)
    }
}


export {
  fetchHTML
}