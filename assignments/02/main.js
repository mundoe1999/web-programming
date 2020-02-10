function generateDeck(){
    let arr = [];
    let suit = ['Coin', 'Cup', 'Club', "Sword"];

    for(let i = 0; i < suit.length; i++){
        for(let j = 0; j < 12; j++){
            arr.push(`${suit[i]} ${j}`);
        }
    }

    return arr;
}


function ShuffleOne(deck){
    let res = [];
    while(deck.length > 0){
        // insert into new array randomly
        let pos = Math.floor(Math.random()*deck.length);
        res.push(deck.splice(pos,1)[0]);
    }

    displayDeck(res);
    return res;
}


function ShuffleTwo(deck){
    // Swap positions between two cards 
    for(let i = 0; i < deck.length;i++){
        let pos = Math.floor(Math.random()*deck.length);

        while(pos == i){
            pos = Math.floor(Math.random()*deck.length);
        }
        let temp = deck[i];
        deck[i] = deck[pos];
        deck[pos] = temp;

    }

    displayDeck(deck);
    return deck;
}

function displayDeck(deck){
    let contents = document.getElementById("displayer");
        contents.innerHTML = "<h3>The Current Shuffled Deck is: </h3>";
    deck.forEach(element => {
        contents.innerHTML += element + "</br>";    
    });
}