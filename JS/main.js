// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati

// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.

// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.

// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.

// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

const numeroBombe = 16;
var max = 100;  // range di numeri
var nuovoNumero , i = 0 , utenteVivo = true , arrayNumeriCasuali = [] , arrayNumeriUtente = [];


for (i = 0; i < numeroBombe; i++ ) {
    do
        nuovoNumero = generateRandom(max);
    while (isInArray(nuovoNumero,arrayNumeriCasuali));
    arrayNumeriCasuali.push(nuovoNumero);    
}   // Ha generato i 16 numeri casuali per il computer


console.log("I numeri casuali erano i seguenti: "+arrayNumeriCasuali);  // DEBUG


i=0;    // Reset i

while ( i < ( max - numeroBombe) && (utenteVivo == true) ) {

    nuovoNumero = prompt("("+(i+1)+" di "+max+") Inserisci un numero da 1 a 100:");
    
    while (isInArray(nuovoNumero,arrayNumeriUtente)) {
        nuovoNumero = prompt("Avevi già scelto il numero "+nuovoNumero+". Per favore, riprova.");
    }

    i++;

    arrayNumeriUtente.push(nuovoNumero);
    
    if (isInArray(nuovoNumero,arrayNumeriCasuali)) {
        console.log("Sei morto al tentativo numero "+(i));
        utenteVivo = false;
    }    
}

if (utenteVivo == true) {
    console.log("Hai completato il gioco senza commettere errori!");
}

console.log("In questa partita hai totalizzato complessivamente "+((i-1)*10)+" punti."); // 1 tentativo = 10 punti
console.log("I numeri casuali erano i seguenti: "+arrayNumeriCasuali);
console.log("I numeri scelti da te sono i seguenti: "+arrayNumeriUtente);


function generateRandom(max) {
    var numeroCasuale = Math.floor(Math.random() * max + 1);
    return numeroCasuale;
}

function isInArray(valore , array) {
    for (var i = 0; i < array.length; i++) {
        if ( valore == array[i] )
            return true;
    }
    return false;
}
