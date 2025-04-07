
import { ProductSuggestion } from "@/types/shopping";

export const productDatabase: ProductSuggestion[] = [
  // Latte e derivati
  {
    id: "milk-1",
    name: "Latte intero",
    category: "Latte",
    imageUrl: "https://placehold.co/100x100?text=Latte+Intero",
    description: "Latte fresco intero"
  },
  {
    id: "milk-2",
    name: "Latte parzialmente scremato",
    category: "Latte",
    imageUrl: "https://placehold.co/100x100?text=Latte+PS",
    description: "Latte fresco parzialmente scremato"
  },
  {
    id: "milk-3",
    name: "Latte di mandorla",
    category: "Latte",
    imageUrl: "https://placehold.co/100x100?text=Latte+Mandorla",
    description: "Bevanda vegetale di mandorla"
  },
  {
    id: "milk-4",
    name: "Latte di soia",
    category: "Latte",
    imageUrl: "https://placehold.co/100x100?text=Latte+Soia",
    description: "Bevanda vegetale di soia"
  },
  // Formaggi
  {
    id: "cheese-1",
    name: "Parmigiano Reggiano",
    category: "Latticini",
    imageUrl: "https://placehold.co/100x100?text=Parmigiano",
    description: "Parmigiano Reggiano DOP stagionato 24 mesi"
  },
  {
    id: "cheese-2",
    name: "Mozzarella",
    category: "Latticini",
    imageUrl: "https://placehold.co/100x100?text=Mozzarella",
    description: "Mozzarella fresca di latte vaccino"
  },
  {
    id: "cheese-3",
    name: "Gorgonzola",
    category: "Latticini",
    imageUrl: "https://placehold.co/100x100?text=Gorgonzola",
    description: "Gorgonzola DOP piccante"
  },
  {
    id: "cheese-4",
    name: "Ricotta",
    category: "Latticini",
    imageUrl: "https://placehold.co/100x100?text=Ricotta",
    description: "Ricotta fresca di mucca"
  },
  // Carne
  {
    id: "meat-1",
    name: "Petto di pollo",
    category: "Carne",
    imageUrl: "https://placehold.co/100x100?text=Pollo",
    description: "Petto di pollo fresco"
  },
  {
    id: "meat-2",
    name: "Fettine di manzo",
    category: "Carne",
    imageUrl: "https://placehold.co/100x100?text=Manzo",
    description: "Fettine di manzo"
  },
  {
    id: "meat-4",
    name: "Macinato misto",
    category: "Carne",
    imageUrl: "https://placehold.co/100x100?text=Macinato",
    description: "Carne macinata mista suino e bovino"
  },
  {
    id: "meat-5",
    name: "Costine di maiale",
    category: "Carne",
    imageUrl: "https://placehold.co/100x100?text=Costine",
    description: "Costine di maiale fresche"
  },
  {
    id: "meat-6",
    name: "Petto di tacchino",
    category: "Carne",
    imageUrl: "https://placehold.co/100x100?text=Tacchino",
    description: "Petto di tacchino a fette"
  },
  // Pasta
  {
    id: "pasta-1",
    name: "Spaghetti",
    category: "Pasta",
    imageUrl: "https://placehold.co/100x100?text=Spaghetti",
    description: "Spaghetti di grano duro"
  },
  {
    id: "pasta-2",
    name: "Penne rigate",
    category: "Pasta",
    imageUrl: "https://placehold.co/100x100?text=Penne",
    description: "Penne rigate di grano duro"
  },
  {
    id: "pasta-3",
    name: "Fusilli",
    category: "Pasta",
    imageUrl: "https://placehold.co/100x100?text=Fusilli",
    description: "Fusilli di grano duro"
  },
  {
    id: "pasta-4",
    name: "Farfalle",
    category: "Pasta",
    imageUrl: "https://placehold.co/100x100?text=Farfalle",
    description: "Farfalle di grano duro"
  },
  {
    id: "pasta-5",
    name: "Linguine",
    category: "Pasta",
    imageUrl: "https://placehold.co/100x100?text=Linguine",
    description: "Linguine di grano duro"
  },
  // Uova
  {
    id: "eggs-1",
    name: "Uova fresche",
    category: "Uova",
    imageUrl: "https://placehold.co/100x100?text=Uova",
    description: "Uova fresche - confezione da 6"
  },
  {
    id: "eggs-2",
    name: "Uova biologiche",
    category: "Uova",
    imageUrl: "https://placehold.co/100x100?text=Uova+Bio",
    description: "Uova biologiche - confezione da 6"
  },
  {
    id: "eggs-3",
    name: "Uova allevamento a terra",
    category: "Uova",
    imageUrl: "https://placehold.co/100x100?text=Uova+Terra",
    description: "Uova da galline allevate a terra - confezione da 10"
  },
  // Salumi
  {
    id: "ham-1",
    name: "Prosciutto cotto",
    category: "Salumi",
    imageUrl: "https://placehold.co/100x100?text=Prosciutto+Cotto",
    description: "Prosciutto cotto alta qualità"
  },
  {
    id: "ham-2",
    name: "Prosciutto crudo",
    category: "Salumi",
    imageUrl: "https://placehold.co/100x100?text=Prosciutto+Crudo",
    description: "Prosciutto crudo di Parma DOP"
  },
  {
    id: "ham-3",
    name: "Mortadella",
    category: "Salumi",
    imageUrl: "https://placehold.co/100x100?text=Mortadella",
    description: "Mortadella Bologna IGP"
  },
  {
    id: "ham-4",
    name: "Salame Milano",
    category: "Salumi",
    imageUrl: "https://placehold.co/100x100?text=Salame",
    description: "Salame Milano stagionato"
  },
  {
    id: "ham-5",
    name: "Bresaola",
    category: "Salumi",
    imageUrl: "https://placehold.co/100x100?text=Bresaola",
    description: "Bresaola della Valtellina IGP"
  },
  // Frutta
  {
    id: "fruit-1",
    name: "Mele Golden",
    category: "Frutta",
    imageUrl: "https://placehold.co/100x100?text=Mele",
    description: "Mele Golden fresche"
  },
  {
    id: "fruit-2",
    name: "Banane",
    category: "Frutta",
    imageUrl: "https://placehold.co/100x100?text=Banane",
    description: "Banane Chiquita"
  },
  {
    id: "fruit-3",
    name: "Arance",
    category: "Frutta",
    imageUrl: "https://placehold.co/100x100?text=Arance",
    description: "Arance Tarocco"
  },
  {
    id: "fruit-4",
    name: "Pere",
    category: "Frutta",
    imageUrl: "https://placehold.co/100x100?text=Pere",
    description: "Pere Williams"
  },
  {
    id: "fruit-5",
    name: "Kiwi",
    category: "Frutta",
    imageUrl: "https://placehold.co/100x100?text=Kiwi",
    description: "Kiwi verdi italiani"
  },
  {
    id: "fruit-6",
    name: "Fragole",
    category: "Frutta",
    imageUrl: "https://placehold.co/100x100?text=Fragole",
    description: "Fragole fresche"
  },
  {
    id: "fruit-7",
    name: "Uva",
    category: "Frutta",
    imageUrl: "https://placehold.co/100x100?text=Uva",
    description: "Uva bianca senza semi"
  },
  {
    id: "fruit-8",
    name: "Ananas",
    category: "Frutta",
    imageUrl: "https://placehold.co/100x100?text=Ananas",
    description: "Ananas fresco"
  },
  {
    id: "fruit-9",
    name: "Pesche",
    category: "Frutta",
    imageUrl: "https://placehold.co/100x100?text=Pesche",
    description: "Pesche gialle"
  },
  {
    id: "fruit-10",
    name: "Melone",
    category: "Frutta",
    imageUrl: "https://placehold.co/100x100?text=Melone",
    description: "Melone retato"
  },
  // Verdura
  {
    id: "veg-1",
    name: "Insalata",
    category: "Verdura",
    imageUrl: "https://placehold.co/100x100?text=Insalata",
    description: "Insalata iceberg"
  },
  {
    id: "veg-2",
    name: "Pomodori",
    category: "Verdura",
    imageUrl: "https://placehold.co/100x100?text=Pomodori",
    description: "Pomodori ciliegino"
  },
  {
    id: "veg-3",
    name: "Carote",
    category: "Verdura",
    imageUrl: "https://placehold.co/100x100?text=Carote",
    description: "Carote fresche"
  },
  {
    id: "veg-4",
    name: "Zucchine",
    category: "Verdura",
    imageUrl: "https://placehold.co/100x100?text=Zucchine",
    description: "Zucchine verdi"
  },
  {
    id: "veg-5",
    name: "Patate",
    category: "Verdura",
    imageUrl: "https://placehold.co/100x100?text=Patate",
    description: "Patate novelle"
  },
  {
    id: "veg-6",
    name: "Melanzane",
    category: "Verdura",
    imageUrl: "https://placehold.co/100x100?text=Melanzane",
    description: "Melanzane tonde"
  },
  {
    id: "veg-7",
    name: "Peperoni",
    category: "Verdura",
    imageUrl: "https://placehold.co/100x100?text=Peperoni",
    description: "Peperoni misti"
  },
  {
    id: "veg-8",
    name: "Cipolla",
    category: "Verdura",
    imageUrl: "https://placehold.co/100x100?text=Cipolla",
    description: "Cipolla bianca"
  },
  {
    id: "veg-9",
    name: "Aglio",
    category: "Verdura",
    imageUrl: "https://placehold.co/100x100?text=Aglio",
    description: "Aglio bianco"
  },
  {
    id: "veg-10",
    name: "Funghi",
    category: "Verdura",
    imageUrl: "https://placehold.co/100x100?text=Funghi",
    description: "Funghi champignon"
  },
  // Latticini
  {
    id: "dairy-1",
    name: "Yogurt greco",
    category: "Latticini",
    imageUrl: "https://placehold.co/100x100?text=Yogurt",
    description: "Yogurt greco naturale"
  },
  {
    id: "dairy-2",
    name: "Burro",
    category: "Latticini",
    imageUrl: "https://placehold.co/100x100?text=Burro",
    description: "Burro italiano"
  },
  {
    id: "dairy-3",
    name: "Panna da cucina",
    category: "Latticini",
    imageUrl: "https://placehold.co/100x100?text=Panna",
    description: "Panna fresca da cucina"
  },
  {
    id: "dairy-4",
    name: "Mascarpone",
    category: "Latticini",
    imageUrl: "https://placehold.co/100x100?text=Mascarpone",
    description: "Mascarpone fresco"
  },
  {
    id: "dairy-5",
    name: "Yogurt alla frutta",
    category: "Latticini",
    imageUrl: "https://placehold.co/100x100?text=Yogurt+Frutta",
    description: "Yogurt alla fragola"
  },
  {
    id: "dairy-6",
    name: "Stracchino",
    category: "Latticini",
    imageUrl: "https://placehold.co/100x100?text=Stracchino",
    description: "Stracchino cremoso"
  },
  // Pesce
  {
    id: "fish-1",
    name: "Salmone fresco",
    category: "Pesce",
    imageUrl: "https://placehold.co/100x100?text=Salmone",
    description: "Filetto di salmone fresco"
  },
  {
    id: "fish-2",
    name: "Tonno in scatola",
    category: "Pesce",
    imageUrl: "https://placehold.co/100x100?text=Tonno",
    description: "Tonno all'olio d'oliva"
  },
  {
    id: "fish-3",
    name: "Orata",
    category: "Pesce",
    imageUrl: "https://placehold.co/100x100?text=Orata",
    description: "Orata fresca"
  },
  {
    id: "fish-4",
    name: "Gamberetti",
    category: "Pesce",
    imageUrl: "https://placehold.co/100x100?text=Gamberetti",
    description: "Gamberetti sgusciati"
  },
  {
    id: "fish-5",
    name: "Calamari",
    category: "Pesce",
    imageUrl: "https://placehold.co/100x100?text=Calamari",
    description: "Calamari freschi"
  },
  {
    id: "fish-6",
    name: "Merluzzo",
    category: "Pesce",
    imageUrl: "https://placehold.co/100x100?text=Merluzzo",
    description: "Filetti di merluzzo"
  },
  // Panetteria
  {
    id: "bakery-1",
    name: "Pane integrale",
    category: "Panetteria",
    imageUrl: "https://placehold.co/100x100?text=Pane",
    description: "Pane integrale fresco"
  },
  {
    id: "bakery-2",
    name: "Focaccia",
    category: "Panetteria",
    imageUrl: "https://placehold.co/100x100?text=Focaccia",
    description: "Focaccia genovese"
  },
  {
    id: "bakery-3",
    name: "Baguette",
    category: "Panetteria",
    imageUrl: "https://placehold.co/100x100?text=Baguette",
    description: "Baguette classica"
  },
  {
    id: "bakery-4",
    name: "Panini",
    category: "Panetteria",
    imageUrl: "https://placehold.co/100x100?text=Panini",
    description: "Panini morbidi"
  },
  {
    id: "bakery-5",
    name: "Croissant",
    category: "Panetteria",
    imageUrl: "https://placehold.co/100x100?text=Croissant",
    description: "Croissant vuoti"
  },
  {
    id: "bakery-6",
    name: "Piadina",
    category: "Panetteria",
    imageUrl: "https://placehold.co/100x100?text=Piadina",
    description: "Piadina romagnola"
  },
  // Prodotti casa
  {
    id: "home-1",
    name: "Detersivo piatti",
    category: "Casa",
    imageUrl: "https://placehold.co/100x100?text=Detersivo",
    description: "Detersivo per piatti concentrato"
  },
  {
    id: "home-2",
    name: "Sapone mani",
    category: "Casa",
    imageUrl: "https://placehold.co/100x100?text=Sapone",
    description: "Sapone liquido per mani"
  },
  {
    id: "home-3",
    name: "Carta igienica",
    category: "Casa",
    imageUrl: "https://placehold.co/100x100?text=Carta+Igienica",
    description: "Carta igienica 4 veli"
  },
  {
    id: "home-4",
    name: "Tovaglioli",
    category: "Casa",
    imageUrl: "https://placehold.co/100x100?text=Tovaglioli",
    description: "Tovaglioli di carta"
  },
  {
    id: "home-5",
    name: "Detergente pavimenti",
    category: "Casa",
    imageUrl: "https://placehold.co/100x100?text=Pavimenti",
    description: "Detergente per pavimenti"
  },
  {
    id: "home-6",
    name: "Ammorbidente",
    category: "Casa",
    imageUrl: "https://placehold.co/100x100?text=Ammorbidente",
    description: "Ammorbidente per bucato"
  },
  {
    id: "home-7",
    name: "Sgrassatore",
    category: "Casa",
    imageUrl: "https://placehold.co/100x100?text=Sgrassatore",
    description: "Sgrassatore universale"
  },
  {
    id: "home-8",
    name: "Sacchetti spazzatura",
    category: "Casa",
    imageUrl: "https://placehold.co/100x100?text=Sacchetti",
    description: "Sacchetti per spazzatura"
  },
  // Bevande
  {
    id: "drink-1",
    name: "Acqua naturale",
    category: "Bevande",
    imageUrl: "https://placehold.co/100x100?text=Acqua",
    description: "Acqua minerale naturale"
  },
  {
    id: "drink-2",
    name: "Acqua frizzante",
    category: "Bevande",
    imageUrl: "https://placehold.co/100x100?text=Acqua+Frizzante",
    description: "Acqua minerale frizzante"
  },
  {
    id: "drink-3",
    name: "Coca Cola",
    category: "Bevande",
    imageUrl: "https://placehold.co/100x100?text=Coca+Cola",
    description: "Coca Cola classica"
  },
  {
    id: "drink-4",
    name: "Succo d'arancia",
    category: "Bevande",
    imageUrl: "https://placehold.co/100x100?text=Succo",
    description: "Succo d'arancia 100%"
  },
  {
    id: "drink-5",
    name: "Tè freddo",
    category: "Bevande",
    imageUrl: "https://placehold.co/100x100?text=Tè+Freddo",
    description: "Tè freddo al limone"
  },
  {
    id: "drink-6",
    name: "Vino rosso",
    category: "Bevande",
    imageUrl: "https://placehold.co/100x100?text=Vino",
    description: "Vino rosso Chianti"
  },
  {
    id: "drink-7",
    name: "Birra",
    category: "Bevande",
    imageUrl: "https://placehold.co/100x100?text=Birra",
    description: "Birra chiara"
  },
  // Surgelati
  {
    id: "frozen-1",
    name: "Spinaci surgelati",
    category: "Surgelati",
    imageUrl: "https://placehold.co/100x100?text=Spinaci",
    description: "Spinaci in foglia surgelati"
  },
  {
    id: "frozen-2",
    name: "Bastoncini di pesce",
    category: "Surgelati",
    imageUrl: "https://placehold.co/100x100?text=Bastoncini",
    description: "Bastoncini di merluzzo impanati"
  },
  {
    id: "frozen-3",
    name: "Pizza surgelata",
    category: "Surgelati",
    imageUrl: "https://placehold.co/100x100?text=Pizza",
    description: "Pizza margherita surgelata"
  },
  {
    id: "frozen-4",
    name: "Verdure miste",
    category: "Surgelati",
    imageUrl: "https://placehold.co/100x100?text=Verdure+Miste",
    description: "Mix di verdure surgelate"
  },
  // Colazione
  {
    id: "breakfast-1",
    name: "Cereali",
    category: "Colazione",
    imageUrl: "https://placehold.co/100x100?text=Cereali",
    description: "Cereali integrali"
  },
  {
    id: "breakfast-2",
    name: "Marmellata",
    category: "Colazione",
    imageUrl: "https://placehold.co/100x100?text=Marmellata",
    description: "Marmellata di fragole"
  },
  {
    id: "breakfast-3",
    name: "Nutella",
    category: "Colazione",
    imageUrl: "https://placehold.co/100x100?text=Nutella",
    description: "Crema spalmabile alla nocciola"
  },
  {
    id: "breakfast-4",
    name: "Fette biscottate",
    category: "Colazione",
    imageUrl: "https://placehold.co/100x100?text=Fette+Biscottate",
    description: "Fette biscottate integrali"
  },
  {
    id: "breakfast-5",
    name: "Biscotti",
    category: "Colazione",
    imageUrl: "https://placehold.co/100x100?text=Biscotti",
    description: "Biscotti frollini"
  }
];
