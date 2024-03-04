//Données statiques : type = logement complet, chambre privée, chambre partagée
donnees = [
    { type: "Entire home/apt", count: 35185, price: 106 },
    { type: "Private room", count: 5827, price: 56 },
    { type: "Shared room", count: 464, price: 40 },
    { type: "Other type", count: 10, price: 200}
   ];
   
   var type_modalites = donnees.map(function(d) { return d.type; });

   var prices = donnees.map(function(d) { return d.price; });

   var price_min = d3.min(prices);

   var price_max = d3.max(prices);

   var qt2num = d3.scaleLinear()
    .domain([price_min, price_max])
    .range([0, 100]);
   var qt2col = d3.scaleLinear()
    .domain([price_min, price_max])
    .range(["lightgreen", "steelblue"]);

   var ql2num = d3.scaleBand()
    .domain(type_modalites)
    .range([0, 100]);

   var ql2col = d3.scaleOrdinal(d3["schemeSet1"])
    .domain(type_modalites);

   var tbody = d3.select("#tab").selectAll("tr")
    .data(donnees)
    .enter().append("tr")
    .html(function(d) { 
        var chaine = "<td>" + d.type + "</td>" +
        "<td>" + ql2num(d.type) + "</td>" +
        "<td style='background-color:" + ql2col(d.type) + "'></td><td></td>" +
        "<td>" + d.price + "</td>" +
        "<td>" + qt2num(d.price) + "</td>" +
        "<td style='background-color:" + qt2col(d.price) + "'></td>";
    return chaine;
    });