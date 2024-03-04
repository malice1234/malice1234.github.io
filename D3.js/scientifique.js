d3.select("head").append("title").html("d3js fonctionne !");


var choix_taille = d3.select("#top").append("form").attr("class", "choix").append("fieldset");

choix_taille.append("legend").html("Choisir une taille");

choix_taille
    .selectAll("input")
    .data([3, 5, 10, 20])
    .enter()
    .append("label")
    .text(function(d) {return d;})
    .insert("input")
    .attr("type", "radio")
    .attr("name", "taille")
    .attr("value", function(d) {return d;})
    .property("checked", function(d) {return d == 5;})
    .on("change", function() { console.log(this.value) }) ;


var choix_annee = d3.select("#top").append("form").attr("class", "choix").append("fieldset");

choix_annee.append("legend").html("Choisir une année");

choix_annee.append("select").attr("name", "annee").attr("id", "choix_annee");


d3.select("#top").append("table")
    .append("thead")
    .append("tr")
    .selectAll("th")
    .data(["Pays", "Rang", "Documents", "Citations", "Regions"])
    .enter()
    .append("th")
    .html(function(d) {return d;});
d3.select("#top").select("table")
    .append("tbody")
    .attr("id", "table_top");


var generateCell = function(d) {
    return "<td class='" + (isNaN(parseInt(d)) ? "texte" : "nombre") + "'>" + d + "</td>";
} ;

var generateRow = function(d) {
    return generateCell(d.Country) + generateCell(d.Rank) + generateCell(d.Documents) + generateCell(d.Citations) + generateCell(d.Region)
} ;

d3.csv(
    "https://francoisgarnier.github.io/scimagojr.csv",
    function (d) {
    return {
    Year: parseInt(d.Year),
    Rank: parseInt(d.Rank),
    Country: d.Country,
    Documents: parseInt(d.Documents),
    Citations: parseInt(d.Citations),
    Region: d.Region,
    Hindex: parseInt(d["H index"])
    }
    })
    .then(function(data) {

    // Mise à jour du choix des années
    d3.select("#choix_annee").selectAll("option")
        .data(Array.from(new Set(data.map(function(d) {return d.Year;}))))
        .enter()
        .append("option")
        .attr("value", function(d) {return d;})
        .html(function(d) {return d;});

    // Changement d'année 
    
    choix_annee.on("change", function() {
        data_annee = d3.filter(data, function(d) { return d.Year == d3.select("#choix_annee").node().value});
        d3.select("#table_top").html("")
        .selectAll("tr")
        .data(data_annee)
        .enter()
        .append("tr")
        .style("display", function(d, i) { 
            return (i+1) > parseInt(d3.select('input[name="taille"]:checked').node().value) ? "none" : "table-row";
        })
        .html(function(d) { return generateRow(d); });
    });

    // Remplissage du tableau
    var data_annee = d3.filter(data, function(d) {return d.Year == 
        d3.select("#choix_annee").node().value;});
        d3.select("#table_top").selectAll("tr")
            .data(data_annee)
            .enter()
            .append("tr")
            .style("display", function(d, i) {
                return (i+1) > parseInt(d3.select('input[name="taille"]:checked').node().value) ? "none" : "table-row";
            })
            .html(function(d) { return generateRow(d); }) ;
    }) ;
    
    
    // Changement de taille
    choix_taille.on("change", function() { 
        d3.select("#table_top").selectAll("tr")
        .style("display", function(d, i) { 
            return (i+1) > 
            parseInt(d3.select('input[name="taille"]:checked').node().value) ? "none" : "table-row";
        })
    }) ;


    
     