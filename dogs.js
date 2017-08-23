const dogs = document.getElementById('dogs');
const btn = document.getElementById('dogButt');

let loaded = false;

btn.onclick = () => {
  if (loaded) {
    return;
  }

  //get the JSON from the api
  const url = 'https://dog.ceo/api/breeds/list/all';
  fetch(url).then(response => {
    return response.json();
  }).then(response => {
  	loaded = true;
    
    let content = '<ol>';
    for (let key in response.message) {
    
    	//make sure we don't use javascript's prototype properties
    	if (response.message.hasOwnProperty(key)) {
      
        //create html string with breed and append to content
      	content += `<li>${key}</li>`;

        //if there are any sub-breeds, iterate through them shoving all of them into one html string then appending it to { content }
        if (response.message[key].length > 0) {
          content += response.message[key].reduce((result, item) => {
            return result + `<li>${item}</li>`;
          }, '<ul>');
          
          //add closing tag
          content += '</ul>';
        }
      }
    }
    
    //add closing tag
    content += '</ol>';
    
    dogs.innerHTML = content;
  });
}
