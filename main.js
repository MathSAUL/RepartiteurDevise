document.querySelector("form").addEventListener("submit", function (e) {
	let input = document.querySelector("#montant");
	let nb = input.value; // Récupére la valeur de montant dans input
	input.value = ""; // Réinitialiser input lorsque le test a exécuté
	calculerRepartition(nb); // Appelle la fonction
	console.log(nb);

	e.preventDefault();
});

function calculerRepartition(montant) {
	const devise = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50]; // On stock toutes les devises dans un tableau.
	let resultat = []; // Initialise resultat de type tableau

	let afficheRes = document.querySelector("#resultat");
	let afficheErreur = document.querySelector("#erreur");

	// Vérifie si montant est bien un nombre ou pas
	if (isNaN(montant) || montant === "") {
		// si le montant n'est pas un nombre ou il est vide, le calcule ne marchera pas puis il affiche un message suivant
		afficheErreur.textContent = "Oops.. Veuillez entrer un nombre";
		afficheErreur.style.visibility = "visible";
		afficheRes.style.visibility = "hidden";

		// console.log("Veuillez entre un nombre")
	} else {
		// si c'est ok, il affiche le message suivant puis il rentre dans le calcule
		afficheRes.innerHTML =
			"Pour répartir la somme de " + montant + "€, il vous faut: <br/>";
		afficheRes.style.visibility = "visible";
		afficheErreur.style.visibility = "hidden";

		//console.log("Pour répartir la somme de " + montant + "€, il vous faut:");
	}
	for (let i = devise.length - 1; i >= 0; i--) {
		if (Number(montant) >= devise[i] && montant != 0) {
			resultat[0] = Math.floor(montant / devise[i]); // Stock le résultat (entier) de la division
			resultat[1] = Number((montant % devise[i]).toFixed(1)); // Stock le reste de la division

			// L'affichage de la répartition:
			let typeDevise = devise[i] >= 5 ? "billet" : "piéce";
			if (resultat[0] > 1) {
				typeDevise = typeDevise + "s"; // gère le pluriel
			}
			let span = document.createElement("span"); // Création d'un element span afin d'afficher le résultat
			afficheRes.appendChild(span); // Mets l'element span dans la balise div
			span.innerHTML =
				resultat[0] + " " + typeDevise + " de " + devise[i] + "€ <br/>"; // L'affichage du résultat

			console.log(resultat[0] + " " + typeDevise + " de " + devise[i] + "€"); //concaténation
			montant = resultat[1];
		}
	}
}
