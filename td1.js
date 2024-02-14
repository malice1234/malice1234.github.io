function afficheVille() 
        {
            // 1. Récupération de la valeur courante du select avec son id
            let nomVilleChoisie = document.getElementById("SelectVille").value;
            // 2. Récupération de la liste de toutes les div correspondant à une div de météo
            // grâce à la classe « ville »
            let villes = document.getElementsByClassName("meteoVille");
            
            let villesArray = Array.from(villes);
            
            // 3. Parcours de la liste des div météo. On cache celles non sélectionnées.
            villesArray.forEach(function(ville) {
                // l’attribut id de l’élément est comparée à la ville choisie
                if (ville.id === nomVilleChoisie) {
                    // garder l'élément visible -> ELEMENT.style.display= "";
                    ville.style.display = "block";
                } else {
                    // cacher l'élément -> ELEMENT.style.display= "none";
                    ville.style.display = "none";
                }
            });
        }

