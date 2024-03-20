let article = [
    {
        "id" : 1,
        "name" : "Pizza Salami",
        "extra Info" : "mit echter Pferde Salami",
        "img" : "./img/pizza-group.jpg",
        "price" : 8.50,
        "variante" : [1,2,3,4,5],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Säuerungsmittel"],
        "groups" : [1,9],
        "isActive" : true
    },
    {
        "id" : 2,
        "name" : "Pizza Prosciutto",
        "extra Info" : "mit Schinken",
        "img" : "./img/pizza-group.jpg",
        "price" : 8.50,
        "variante" : [1,2,3,4,5],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Nitritpökelsalz","Farbstoff"],
        "groups" : [1,9]
    },
    {
        "id" : 3,
        "name" : "Pizza Margarita",
        "extra Info" : "Pizza ohne Belag",
        "img" : "./img/pizza-group.jpg",
        "price" : 8.50,
        "variante" : [1,2,3,4,5],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : [],
        "groups" : [1,9]
    },
    {
        "id" : 4,
        "name" : "Pizza Tonno",
        "extra Info" : "Pizza mit Thunfisch und Zwiebeln",
        "img" : "./img/pizza-group.jpg",
        "price" : 8.50,
        "variante" : [1,2,3,4,5],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : [],
        "groups" : [1]
    }
    ,
    {
        "id" : 5,
        "name" : "Pizza Mista",
        "extra Info" : "mit Salami, Schinken, Champignons und Peperoni",
        "img" : "./img/pizza-group.jpg",
        "price" : 8.50,
        "variante" : [1,2,3,4,5],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Nitritpökelsalz","Farbstoff"],
        "groups" : [1]
    }
    ,
    {
        "id" : 6,
        "name" : "Garten Salat",
        "extra Info" : "Salat-Mix mit Cocktailtomaten, Paprika und Mais",
        "img" : "./img/salat-group.jpg",
        "price" : 6.50,
        "variante" : [6,7],
        "allergene" : ["Enthält Milch/-Erzeugnisse (laktosehaltig)"],
        "substance" : [],
        "groups" : [2]
    }
    ,
    {
        "id" : 7,
        "name" : "Caesars Salat",
        "extra Info" : "Salat-Mix mit roten Zwiebeln, Cocktailtomaten, Chickenburger, Grana Padano und Knoblauch",
        "img" : "./img/salat-group.jpg",
        "price" : 9.50,
        "variante" : [6,7],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Ei/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : [],
        "groups" : [2,9]
    }
    ,
    {
        "id" : 8,
        "name" : "Salat Kunterbunt",
        "extra Info" : "Gartensalat mit roten Zwiebeln, Hirtenkäse, Peperoni und Oliven",
        "img" : "./img/salat-group.jpg",
        "price" : 9.50,
        "variante" : [6,7],
        "allergene" : ["Enthält Milch/-Erzeugnisse (laktosehaltig)"],
        "substance" : ["Geschwärzt"],
        "groups" : [2]
    },
    {
        "id" : 9,
        "name" : "Hähnchen im Glück",
        "extra Info" : "Gartensalat mit roten Zwiebeln, Mozzarellakugeln, Hähnchen und Steakpfeffer",
        "img" : "./img/salat-group.jpg",
        "price" : 9.50,
        "variante" : [6,7],
        "allergene" : ["Enthält Sojabohnen/-Erzeugnisse", "Enthält Milch/-Erzeugnisse (laktosehaltig)"],
        "substance" : [],
        "groups" : [2]
    },
    {
        "id" : 10,
        "name" : "Salat Ocean Frisch",
        "extra Info" : "Gartensalat mit roten Zwiebeln, Peperoni, Oliven und Thunfisch",
        "img" : "./img/salat-group.jpg",
        "price" : 10.50,
        "variante" : [6,7],
        "allergene" : ["Enthält Fisch/-Erzeugnisse", "Enthält Sojabohnen/-Erzeugnisse"],
        "substance" : ["Geschwärzt"],
        "groups" : [2,9]
    },
    {
        "id" : 11,
        "name" : "Brotecken",
        "extra Info" : "",
        "img" : "./img/pizzabrötchen-group.jpg",
        "price" : 3.90,
        "variante" : [4],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Ei/-Erzeugnisse"],
        "substance" : [],
        "groups" : [3]
    },
    {
        "id" : 12,
        "name" : "Pizzabrötchen Salami",
        "extra Info" : "",
        "img" : "./img/pizzabrötchen-group.jpg",
        "price" : 4.90,
        "variante" : [4],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Ei/-Erzeugnisse"],
        "substance" : ["Mit Farbstoff", "Mit Konservierungsstoffen", "Mit Nitritpökelsalz", "Mit Antioxidationsmittel"],
        "groups" : [3,9]
    },
    {
        "id" : 13,
        "name" : "Pizzabrötchen Sucuk",
        "extra Info" : "mit Knoblauchwurst",
        "img" : "./img/pizzabrötchen-group.jpg",
        "price" : 4.90,
        "variante" : [4],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["enthält Stabilisatoren", "Mit Phosphat", "Mit Antioxidationsmittel", "Mit Konservierungsstoffen"],
        "groups" : [3]
    },
    {
        "id" : 14,
        "name" : "Pizzabrötchen Kräuter",
        "extra Info" : "",
        "img" : "./img/pizzabrötchen-group.jpg",
        "price" : 4.90,
        "variante" : [4],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : [],
        "groups" : [3]
    },
    {
        "id" : 15,
        "name" : "Pizzabrötchen Knoblauch",
        "extra Info" : "",
        "img" : "./img/pizzabrötchen-group.jpg",
        "price" : 4.90,
        "variante" : [4],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Ei/-Erzeugnisse"],
        "substance" : ["Mit Farbstoff", "Mit Konservierungsstoffen", "Mit Geschmacksverstärker"],
        "groups" : [3]
    },
    {
        "id" : 16,
        "name" : "Rigatoni",
        "extra Info" : "",
        "img" : "./img/pasta.jpg",
        "price" : 8.90,
        "variante" : [8,2,4],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Ei/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : ["Sulfite"],
        "groups" : [4]
    },
    {
        "id" : 17,
        "name" : "Spaghetti",
        "extra Info" : "",
        "img" : "./img/pasta.jpg",
        "price" : 8.90,
        "variante" : [8,2,4],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Ei/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : ["Sulfite"],
        "groups" : [4]
    },
    {
        "id" : 18,
        "name" : "Rigatoni El Pollo",
        "extra Info" : "mit hausgemachter Sahne-Sauce, Broccoli, Champignons, Hähnchen und Steakpfeffer",
        "img" : "./img/pasta.jpg",
        "price" : 8.90,
        "variante" : [2,4],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Ei/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : ["Sulfite"],
        "groups" : [4]
    },
    {
        "id" : 19,
        "name" : "Rigatoni Grillparty",
        "extra Info" : "mit hausgemachter Sahne-Sauce, Champignons, Spinat, Steakstreifen und Steakpfeffer",
        "img" : "./img/pasta.jpg",
        "price" : 12.50,
        "variante" : [2,4],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Ei/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : ["Sulfite"],
        "groups" : [4]
    },
    {
        "id" : 20,
        "name" : "Pasta Carbonara",
        "extra Info" : "mit hausgemachter Käse-Sahne-Sauce und Hinterschinken",
        "img" : "./img/pasta.jpg",
        "price" : 8.90,
        "variante" : [2,4],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Ei/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : ["Sulfite"],
        "groups" : [4,9]
    },
    {
        "id" : 21,
        "name" : "Chicken Mantel Wrap",
        "extra Info" : "mit Kräuterremoulade und Chicken Chicks",
        "img" : "./img/wraps.jpg",
        "price" : 8.90,
        "variante" : [2,4],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Ei/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : ["Sulfite"],
        "groups" : [5,9]
    },
    {
        "id" : 22,
        "name" : "BNP Wrap",
        "extra Info" : "mit Eisbergsalat, Röstzwiebeln, Hirtenkäse, Tomaten, Remoulade und Chicken Chicks",
        "img" : "./img/wraps.jpg",
        "price" : 8.90,
        "variante" : [2,4],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Ei/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : ["Sulfite"],
        "groups" : [5]
    },
    {
        "id" : 23,
        "name" : "Farmer Wrap",
        "extra Info" : "mit Eisbergsalat, Croutons, Zwiebeln, Tomaten, Remoulade und Parmesan",
        "img" : "./img/wraps.jpg",
        "price" : 8.90,
        "variante" : [2,4],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Ei/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : ["Sulfite"],
        "groups" : [5]
    },
    {
        "id" : 24,
        "name" : "Chicken Wings",
        "extra Info" : "",
        "img" : "./img/fingerfood-group.jpg",
        "price" : 5.90,
        "variante" : [4],
        "allergene" : ["Weizen", "Sojabohnen/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : ["Antioxidationsmittel"],
        "groups" : [6]
    },
    {
        "id" : 25,
        "name" : "Chicken Nuggets",
        "extra Info" : "",
        "img" : "./img/fingerfood-group.jpg",
        "price" : 5.90,
        "variante" : [4],
        "allergene" : ["Weizen", "Sojabohnen/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : ["Antioxidationsmittel"],
        "groups" : [6]
    },
    {
        "id" : 26,
        "name" : "BNP-Ecken",
        "extra Info" : "",
        "img" : "./img/fingerfood-group.jpg",
        "price" : 4.90,
        "variante" : [4],
        "allergene" : ["Weizen", "Sojabohnen/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : ["Antioxidationsmittel"],
        "groups" : [6,9]
    },
    {
        "id" : 27,
        "name" : "Chicken Chicks",
        "extra Info" : "",
        "img" : "./img/fingerfood-group.jpg",
        "price" : 5.50,
        "variante" : [4],
        "allergene" : ["Weizen", "Sojabohnen/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : ["Antioxidationsmittel"],
        "groups" : [6]
    },
    {
        "id" : 28,
        "name" : "Onion Rings",
        "extra Info" : "",
        "img" : "./img/fingerfood-group.jpg",
        "price" : 3.90,
        "variante" : [4],
        "allergene" : ["Weizen", "Sojabohnen/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse", "Enthält Sellerie/-Erzeugnisse"],
        "substance" : ["Antioxidationsmittel"],
        "groups" : [6]
    },
    {
        "id" : 29,
        "name" : "Aioli",
        "extra Info" : "",
        "img" : "./img/dips-group.jpg",
        "price" : 0.99,
        "variante" : [],
        "allergene" : ["Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : [],
        "groups" : [7]
    },
    {
        "id" : 30,
        "name" : "Asia",
        "extra Info" : "",
        "img" : "./img/dips-group.jpg",
        "price" : 0.99,
        "variante" : [],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Säuerungsmittel"],
        "groups" : [7]
    },
    {
        "id" : 31,
        "name" : "BBQ",
        "extra Info" : "",
        "img" : "./img/dips-group.jpg",
        "price" : 0.99,
        "variante" : [],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Säuerungsmittel"],
        "groups" : [7,9]
    },
    {
        "id" : 32,
        "name" : "Chilli-Cheese",
        "extra Info" : "",
        "img" : "./img/dips-group.jpg",
        "price" : 0.99,
        "variante" : [],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Säuerungsmittel"],
        "groups" : [7]
    },
    {
        "id" : 33,
        "name" : "Creme Fraiche",
        "extra Info" : "",
        "img" : "./img/dips-group.jpg",
        "price" : 0.99,
        "variante" : [],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Säuerungsmittel"],
        "groups" : [7]
    },
    {
        "id" : 34,
        "name" : "Curry",
        "extra Info" : "",
        "img" : "./img/dips-group.jpg",
        "price" : 0.99,
        "variante" : [],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Säuerungsmittel"],
        "groups" : [7]
    },
    {
        "id" : 35,
        "name" : "Honig-Senf",
        "extra Info" : "",
        "img" : "./img/dips-group.jpg",
        "price" : 0.99,
        "variante" : [],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Säuerungsmittel"],
        "groups" : [7]
    },
    {
        "id" : 36,
        "name" : "Ketchup",
        "extra Info" : "",
        "img" : "./img/dips-group.jpg",
        "price" : 0.99,
        "variante" : [],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Säuerungsmittel"],
        "groups" : [7]
    },
    {
        "id" : 37,
        "name" : "Knoblauch",
        "extra Info" : "",
        "img" : "./img/dips-group.jpg",
        "price" : 0.99,
        "variante" : [],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Säuerungsmittel"],
        "groups" : [7]
    },
    {
        "id" : 38,
        "name" : "Mayo",
        "extra Info" : "",
        "img" : "./img/dips-group.jpg",
        "price" : 0.99,
        "variante" : [],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Säuerungsmittel"],
        "groups" : [7]
    },
    {
        "id" : 39,
        "name" : "Sauce Hollandaise",
        "extra Info" : "",
        "img" : "./img/dips-group.jpg",
        "price" : 0.99,
        "variante" : [],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Säuerungsmittel"],
        "groups" : [7]
    },
    {
        "id" : 40,
        "name" : "Sour Cream",
        "extra Info" : "",
        "img" : "./img/dips-group.jpg",
        "price" : 0.99,
        "variante" : [],
        "allergene" : ["Weizen", "Enthält Milch/-Erzeugnisse (laktosehaltig)", "Enthält Senf/-Erzeugnisse", "Enthält glutenhaltige/s Getreide/-Erzeugnisse"],
        "substance" : ["Konservierungsstoffen", "Antioxidationsmittel", "Säuerungsmittel"],
        "groups" : [7,9]
    },
    {
        "id" : 41,
        "name" : "Fanta Orange 0,33l",
        "extra Info" : "Trinke Fanta. Lebe bunter. Spritzig erfrischend begleitet die originale Fanta Orange jede Lebenssituation und macht jetzt noch mehr Spaß.",
        "img" : "./img/afg-group.jpg",
        "price" : 2.90,
        "variante" : [],
        "allergene" : [],
        "substance" : ["Farbstoff", "Antioxidationsmittel", "Säuerungsmittel", "enthält Stabilisatoren"],
        "groups" : [8]
    },
    {
        "id" : 42,
        "name" : "Sprite 0,33l",
        "extra Info" : "Bist du bereit für Sprite? Die einzigartige Formel aus grünen Limetten und sonnengelben Zitronen erfrischt dich maximal.",
        "img" : "./img/afg-group.jpg",
        "price" : 2.90,
        "variante" : [],
        "allergene" : [],
        "substance" : [, "Säuerungsmittel"],
        "groups" : [8,9]
    }

];