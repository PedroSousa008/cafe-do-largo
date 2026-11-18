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
         { name: "Expresso", description: "", price: "" }
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

    /* Cada secção lista os pratos. name é o título, description os ingredientes, price o preço. */
    menu: [
        { category: "Snacks", items: [] },
        { category: "Entradas", items: [] },
        { category: "Pratos Principais", items: [] },
        { category: "Sobremesa", items: [] },
        { category: "Bebidas", items: [] }
    ]
};
