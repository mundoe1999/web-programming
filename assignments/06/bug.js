
fetch('https://acnh-what-to-catch.herokuapp.com/', {
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
})
.then((res) => {
  return res.json();
})
.then(data => {
  let bugs = getBugsNow(data);
  bugs.sort((a,b) => {
    return b.price - a.price
  })
  renderBugs(bugs);
}) 



// This function calculates which bugs are available at this given time
function getBugsNow(dataset){

  let date = new Date();
  let hour = date.getHours();
  let month = date.getMonth();

  let res = [];

  dataset.forEach(element => {
    if(element["month"].includes(month)){
      // Check if time matches
      let start = element["start"];
      let end = element["end"];
      if(end < start){
        if(hour >= start || hour <= end){
          res.push(element);
        }
      } else {
        if(hour >= start && hour <= end){
          res.push(element);
        }
      }
    }
  });

  return res;
}

function renderBugs(list){
  console.log(list);
  let expensive = document.getElementById("number-one");

  let top_bugs = document.getElementById('lesser-bugs');

  // Want to generate the first Element
  {
    let first = document.createElement("h1");
    first.appendChild(document.createTextNode(list[0]["name"]));
    let price = document.createElement("h2");
    price.appendChild(document.createTextNode(list[0]["price"]));

    expensive.appendChild(first);
    expensive.appendChild(price);
  }


  // Now for the top 5 bugs
  for(let i = 1; i < 6; i++){
    // Creates the main container
    let div = document.createElement("div");
    div.setAttribute('class', 'smaller-item');

    // Generate necessary components for the container
    let name = document.createElement("h2");
    let price = document.createElement("h3");

    // Append text into both components
    name.appendChild(document.createTextNode(list[i]["name"]));
    price.appendChild(document.createTextNode(list[i]["price"]));

    // Append both text elements into the container
    div.appendChild(name);
    div.appendChild(price);

    // Append container to top_bugs
    top_bugs.appendChild(div);
  }
}