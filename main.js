document.querySelector("form").addEventListener("submit", function (e) {
	e.preventDefault();
	let input = document.querySelector("#montant");
	let nb = input.value;
	input.value = ""; // Réinitialiser input lorsque le test a exécuté
	calculerRepartition(nb);
});

function calculerRepartition(montant) {
	const devise = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50];
	let resultat = [];

	let afficheRes = document.querySelector("#resultat");
	let afficheErreur = document.querySelector("#erreur");

	// Vérification de l'input.
	if (isNaN(montant) || montant === "" || montant == "null") {
		afficheErreur.textContent = "Oops.. Veuillez entrer un nombre";
		afficheErreur.style.visibility = "visible";
		afficheRes.style.visibility = "hidden";
	} else {
		afficheRes.innerHTML =
			"<b>Pour répartir la somme de " +
			montant +
			"€, il vous faut:</b> <br/> <br/>";
		afficheRes.style.visibility = "visible";
		afficheErreur.style.visibility = "hidden";
	}

	for (let i = devise.length - 1; i >= 0; i--) {
		if (montant >= devise[i] && montant != 0) {
			resultat[0] = Math.floor(montant / devise[i]); // Stock le résultat (entier) de la division
			resultat[1] = montant % devise[i].toFixed(1); // Stock le reste de la division

			// L'affichage de la répartition:
			let typeDevise = devise[i] >= 5 ? "billet" : "piéce";
			if (resultat[0] > 1) {
				typeDevise = typeDevise + "s"; // gère le pluriel
			}
			let span = document.createElement("span"); // Création d'un element span afin d'afficher le résultat
			afficheRes.appendChild(span);
			span.innerHTML =
				resultat[0] + " " + typeDevise + " de " + devise[i] + "€ <br/>";

			montant = resultat[1];
		}
	}
}
