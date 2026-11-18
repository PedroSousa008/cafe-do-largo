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
   As imagens em images/ são provisórias. Não são deste café.
   Servem apenas para a composição, até existirem fotografias do espaço.
   Licença: Unsplash License.

   images/sala.jpg        abertura     https://unsplash.com/photos/a-room-with-a-lot-of-furniture-and-a-big-window-E-gWfNuyXBs
   images/pastelaria.jpg  o café       https://unsplash.com/photos/brown-and-white-cookies-on-white-tray-cjJkLgaswWg
   images/chavena.jpg     ambiente     https://unsplash.com/photos/white-ceramic-mug-on-brown-wooden-surface-NxkFLRNg8g0
   images/janela.jpg      ambiente     https://unsplash.com/photos/sunlight-streams-through-a-window-onto-a-cafe-table-6_Yye5kmEkM
   images/nata.jpg        ambiente     https://unsplash.com/photos/a-close-up-of-two-pastries-on-a-table-YM-SwHl0yW8

   Para as substituir, trocar o ficheiro e o texto alternativo em index.html.
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

    menu: []
};
