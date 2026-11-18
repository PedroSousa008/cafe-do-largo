/* ========================================
   Café do Largo — dados editáveis
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
    name: "Café do Largo",
    tagline: "Um lugar para ficar.",
    about: "Há sítios onde a pausa se torna um hábito. Um café acabado de tirar, uma mesa junto à luz e uma conversa que não tem hora para acabar.",

    address: {
        street: "",
        postalCode: "",
        city: "",
        country: ""
    },

    hours: [],
    phone: "",
    email: "",
    instagram: "",
    mapsUrl: "",

    menu: []
};
