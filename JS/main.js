const numeroBombe = 16;

var arrayNumeriCasuali = [] , arrayNumeriUtente = [];
var nuovoNumero , i, punteggio = 0 , difficolta , max, celleMancanti;

document.getElementById("restart-game").addEventListener('click' , function()  { 
    location.reload();
        } 
    );  // Assegna evento al Pulsante Reload

while ( ( difficolta != 0 ) && ( difficolta != 1 ) && ( difficolta != 2 ) || ( difficolta == "" ))
  difficolta = prompt("Scegli un livello di difficoltà fra 0 , 1 e 2"); // Ha chiesto il grado di difficoltà

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

celleMancanti = max - numeroBombe;  // Inizializza celle mancanti

for (i = 0; i < numeroBombe; i++ ) {    
    do
    nuovoNumero = Math.floor(Math.random() * max + 1);
    while (isInArray(nuovoNumero,arrayNumeriCasuali));
    arrayNumeriCasuali.push(nuovoNumero);
}   // Ha generato i 16 numeri casuali per il computer

for (i = 1; i <= max; i++ ) // Popola la lista nell'HTML
document.getElementById("inner-field").innerHTML += '<li id="single-cell-'+i+'">'+i+'</li>';

for (i = 1; i <= max; i++ ) // Assegna onclick ad ogni <li>
document.getElementById("single-cell-"+i).onclick = function() { scopriCella(this.innerHTML) }; 

aggiornaPunteggio(0);    // Inizializza punteggio nell'html
alert("Hai Scelto il livello di difficoltà "+difficolta+".\nIl range di numeri andrà da 1 a "+max);
document.getElementById("celle-mancanti-text").innerHTML = celleMancanti;   // Inizializza celle mancanti nell'html
document.getElementById("face-img").src ="img/happy.png";    // Inizializza faccina nell'html

   //  --- Fine Programma  ---
   
   
   //  --- Definizione Funzioni  ---

function scopriCella(cella) {   
    if ( (isInArray(cella,arrayNumeriCasuali)) || (celleMancanti==0) )
        gameOver();
    else if (!isInArray(cella,arrayNumeriCasuali)) {
        document.getElementById("single-cell-"+cella).classList = "not-bomb";
        aggiornaPunteggio(10);
        removeOnClick(cella);   // Rimuove Onclick dalla Cella
        celleMancanti--;
        document.getElementById("celle-mancanti-text").innerHTML = celleMancanti;
    }
}

function gameOver() {    
    
    for( i = 0; i < arrayNumeriCasuali.length; i++) // Scopri tutte le bombe
        document.getElementById("single-cell-"+arrayNumeriCasuali[i]).classList = "bomb-here";

    removeOnClick(-1);  //Rimuovi onclick
    document.getElementById("face-img").src ="img/sad.png"; // Faccina Triste

    if (celleMancanti==0) {
        alert("Hai completato il gioco senza Errori.\nQuesto ti fa guadagnare 100 punti bonus!");
        aggiornaPunteggio(100);
    }
    else
        alert("Oh, no, hai centrato una bomba. Peccato: ti mancavano soltanto "+celleMancanti+" celle da scoprire.");
    alert("In questa partita hai totalizzato "+punteggio+" punti.");
       
}

function aggiornaPunteggio(valore) {
    // Il punteggio tiene conto del numero di celle scoperte e del coefficiente di difficoltà
    punteggio += Math.floor(valore * (100/max));    // Incrementa Punteggio
    document.getElementById("punteggio-text").innerHTML = punteggio;    // Stampa nell'Html
}

function removeOnClick (valore) {

    if (valore == -1 ) {
        // Rimuovo onclick da tutto
        for (i=1; i<=max; i++) {
            document.getElementById("single-cell-"+i).style = "cursor:default;"; 
            document.getElementById("single-cell-"+i).onclick = null; 
        }
    }
    else {
        document.getElementById("single-cell-"+valore).style = "cursor:default;"; 
        document.getElementById("single-cell-"+valore).onclick = null; 
    }
}

function isInArray(valore , array) {
    // Questa funzione controlla se un dato numero è presente in un array (true) o meno (false)
    for (var i = 0; i < array.length; i++) {
        if ( valore == array[i] )
            return true;
    }
    return false;
}