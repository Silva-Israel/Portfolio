let container = document.querySelector('ul');
let para = document.createElement("P");

function getCharacter() {
    container.innerHTML = '';
    para.innerHTML = '';
    let input = document.querySelector('#character');
    const apikey = 'c3f0ba032bbd087b25ce37482a3fcfd7c89b7ff1';
    const url = `https://comicvine.gamespot.com/api/characters/?api_key=${apikey}&filter=name:${input.value}&format=json`;

    fetch(url)
        .then(result => {
            if(result.ok) return result.json()
            throw new Error('Network response was not OK.')
        })
        .then(response => {
            // document.querySelector("#name").innerHTML = response.results[0].name;
            // document.querySelector("#info").innerHTML = response.results[0].deck;
            // document.querySelector("#image").src = response.results[0].image.small_url;

            response.results.forEach((character) => {
                let li = document.createElement("LI");
                let text = document.createTextNode(character.name);
                li.appendChild(text);
                container.appendChild(li);
                li.onclick = function showPerson() {            
                            para.innerHTML =
                                `
                                <img src="${character.image.thumb_url}">
                                <br>
                                <strong>Name: </strong>${character.name}
                                <br>
                                <strong>Description: </strong>${character.deck}
                                
                                `;
                            container.appendChild(para);
                };
            });
        });

    input.value = '';
}
