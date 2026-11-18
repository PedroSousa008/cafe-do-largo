/* ========================================
   Café Gomil — dados editáveis
   ========================================
   Alterar aqui o nome, os textos, a morada, o horário,
   os contactos, a ementa e os preços.

   Deixar um campo vazio quando o dado ainda não existir.
   Não preencher com informação fictícia.

   Forma da ementa, quando houver produtos reais:

   menu: [
     {
       category: "Cafés",
       items: [
         { name: "Expresso", price: "" }
       ]
     }
   ]

   Fotografias
   ------------
   images/logo.png        logótipo no cabeçalho
   images/sala.jpg        primeira foto, de margem a margem

   Para substituir a fotografia, colocar o ficheiro novo na pasta images/
   com o nome sala.jpg. O texto alternativo está no atributo alt, em index.html.
*/

window.CAFE = {
    name: "Café Gomil",
    tagline: "Matosinhos.",
    about: "Na Rua do Godinho, em Matosinhos.",

    address: {
        street: "Rua do Godinho, 483",
        postalCode: "4450-149",
        city: "Matosinhos",
        country: "Portugal"
    },

    hours: [
        { days: "segunda-feira", time: "07:30–23:30" },
        { days: "terça-feira", time: "07:30–23:30" },
        { days: "quarta-feira", time: "07:30–23:30" },
        { days: "quinta-feira", time: "07:30–23:30" },
        { days: "sexta-feira", time: "07:30–23:30" },
        { days: "sábado", time: "Encerrado" },
        { days: "domingo", time: "07:30–23:30" }
    ],
    phone: "",
    email: "cafegomil@hotmail.com",
    instagram: "",
    facebook: "https://www.facebook.com/profile.php?id=100054219442655&sk=photos",
    mapsUrl: "",

    /* Cada secção recebe os pratos em items.
       name é obrigatório.
       price e image são opcionais.
       Os ingredientes não são apresentados.
       image é o caminho da fotografia, por exemplo "images/ementa/francesinha.jpg". */
    menu: [
        { category: "Snacks", items: [
            {
                name: "Tosta Mista",
                price: "€",
                image: "images/ementa/tosta-mista.jpg?v=1"
            },
            {
                name: "Torrada",
                price: "€",
                image: "images/ementa/torrada.jpg?v=1"
            }
        ] },
        { category: "Entradas", items: [] },
        { category: "Pratos Principais", items: [
            {
                name: "Francesinha",
                price: "€",
                image: "images/ementa/francesinha.jpg?v=6"
            }
        ] },
        { category: "Sobremesa", items: [] },
        { category: "Bebidas", items: [
            {
                name: "Café",
                price: "€",
                image: "images/ementa/cafe.jpg?v=1"
            }
        ] }
    ]
};
