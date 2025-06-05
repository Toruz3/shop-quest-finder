
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Search, Plus, Edit2, Copy, Calendar, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const FavoritesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground transition-colors duration-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <header className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">I miei preferiti</h1>
          </div>
          <ThemeToggle />
        </div>
        
        {/* Search bar */}
        <div className="relative mt-4">
          <Input 
            placeholder="Cerca lista"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/20"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="liste" className="px-4 py-4">
        <TabsList className="grid w-full grid-cols-2 bg-muted p-1 rounded-lg">
          <TabsTrigger 
            value="liste"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground rounded-md"
          >
            Liste salvate
          </TabsTrigger>
          <TabsTrigger 
            value="prodotti"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground rounded-md"
          >
            Prodotti preferiti
          </TabsTrigger>
        </TabsList>

        <TabsContent value="liste" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">3 liste salvate</span>
              <Button className="bg-muted hover:bg-muted/80 text-foreground border-border">
                <Plus className="h-4 w-4 mr-2" />
                Nuova lista
              </Button>
            </div>

            {/* Shopping list cards */}
            <Card className="bg-card border-border hover:bg-muted/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Spesa settimanale</h3>
                    <p className="text-muted-foreground text-sm">12 prodotti • Usata 2 giorni fa</p>
                  </div>
                  <Edit2 className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                </div>
                
                {/* Category tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Latte', 'Pane', 'Frutta', 'Verdura', 'Pasta'].map((category) => (
                    <Badge 
                      key={category}
                      variant="secondary" 
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      {category}
                    </Badge>
                  ))}
                  <Badge className="bg-secondary text-secondary-foreground">+1</Badge>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
                    <Copy className="h-4 w-4 mr-2" />
                    Copia
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Pianifica
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Condividi
                  </Button>
                  <Button className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Usa
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:bg-muted/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Lista veloce</h3>
                    <p className="text-muted-foreground text-sm">5 prodotti • Usata 1 settimana fa</p>
                  </div>
                  <Edit2 className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Caffè', 'Zucchero', 'Biscotti'].map((category) => (
                    <Badge 
                      key={category}
                      variant="secondary" 
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      {category}
                    </Badge>
                  ))}
                  <Badge className="bg-secondary text-secondary-foreground">+2</Badge>
                </div>

                <div className="flex gap-3">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
                    <Copy className="h-4 w-4 mr-2" />
                    Copia
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Pianifica
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Condividi
                  </Button>
                  <Button className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Usa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="prodotti" className="mt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nessun prodotto preferito ancora</p>
            <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Star className="h-4 w-4 mr-2" />
              Aggiungi prodotto preferito
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default FavoritesPage;
