const numeroBombe = 16;
var nuovoNumero , i = 0 , utenteVivo = true , difficolta , max , arrayNumeriCasuali = [] , arrayNumeriUtente = [];

while ( ( difficolta != 0 ) && ( difficolta != 1 ) && ( difficolta != 2 ) )
    difficolta = prompt("Scegli un livello di difficoltà fra 0 , 1 e 2");

switch(difficolta) {
    case "0" :
        max = 100;
        break;            

    case "1" :
        max = 80;
        break;            
    
    case "2" :
        max = 50;
        break;            
}

alert("Hai Scelto il livello di difficoltà "+difficolta+".\nIl range di numeri andrà da 1 a "+max);

for (i = 0; i < numeroBombe; i++ ) {
    do
        nuovoNumero = Math.floor(Math.random() * max + 1);
    while (isInArray(nuovoNumero,arrayNumeriCasuali));
    arrayNumeriCasuali.push(nuovoNumero);
}   // Ha generato i 16 numeri casuali per il computer

i=0;    // Reset i

while ( i < ( max - numeroBombe) && (utenteVivo == true) ) {

    do
        nuovoNumero = prompt("("+(i+1)+" di "+max+") Inserisci un numero da 1 a 100:");
    while (isLegalNumber(nuovoNumero , max , arrayNumeriUtente) == false)

    i++;
    arrayNumeriUtente.push(nuovoNumero);
    
    if (isInArray(nuovoNumero,arrayNumeriCasuali)) {
        alert("Sei morto al tentativo n."+(i));
        utenteVivo = false;
    }    
}

var punteggio = Math.floor(((i-1)*10)*(100/max));   
// Il pungeggio tiene conto del numero di tentativi e del livello di difficoltà scelto

if (utenteVivo == true) {
    alert("Hai completato il gioco senza commettere errori: sei proprio un grande!");
    punteggio+=100; // Bonus di 100 punti se l'utente arriva fino alla fine
}

alert("In questa partita hai totalizzato complessivamente "+punteggio+" punti.");
alert("I numeri casuali erano: "+arrayNumeriCasuali);
alert("I numeri scelti da te sono stati: "+arrayNumeriUtente);

//  --- Fine Programma  ---


//  --- Definizione Funzioni  ---

function isInArray(valore , array) {
    // Questa funzione controlla se un dato numero è presente in un array (true) o meno (false)
    for (var i = 0; i < array.length; i++) {
        if ( valore == array[i] )
            return true;
    }
    return false;
}

function isLegalNumber(valore , max , array) {
    // Questa funzione controlla se un valore rispetta le condizioni richieste
    if (isNaN(valore)) {
        // Se è un numero
        alert("ERRORE: Hai inserito un valore non numerico. Riprova.")
        return false;
    }
    if ((valore <= 0) || (valore > max)) {
        // Se è compreso fra un minimo ed un massimo
        alert("ERRORE: Il valore deve essere compreso fra 1 e "+max+" . Riprova.")
        return false;
    }
    if (isInArray(valore,array)) {
        // Se era già stato inserito in precedenza
        alert("ERRORE: Avevi già scelto il numero "+valore+" in precedenza. Per favore, riprova.");
        return false;
    }
    return true;
}