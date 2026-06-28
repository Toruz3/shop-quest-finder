export const ShoppingHeader = () => {
  return (
    <header className="pt-2 pb-1">
      <h1 className="text-4xl font-serif tracking-tight text-foreground leading-none">
        La tua <em className="italic text-primary">spesa</em>
      </h1>
      <p className="text-sm text-muted-foreground mt-2">
        Aggiungi prodotti e trova il supermercato più conveniente.
      </p>
    </header>
  );
};
