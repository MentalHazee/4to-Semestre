JULIÁN SANTOS - COMISIÓN 4

1. ¿Por qué el estado de la lista de pokémon vive en App.tsx y no en PokemonList o PokemonCard?

Vive allí ya que App.tsx es el que necesita conocer y controlar los datos para distribuirlos.
Si el estado viviese en PokemonList no sabría que pokemon están cargados. Y si viviera en PokemonCard cada tarjeta tendría su propia lista independiente.


2. ¿Qué diferencia hay entre un componente presentacional y un componente contenedor? ¿A cuál categoría pertenece cada uno de los tres componentes?

Un componente contenedor es el que controla los datos. Hace fetches, maneja estados y contiene la lógica (Se preocupa por el POR QUÉ mostrar).
En cambio un componente presentacional no sabe nada de la API ni del estado global. Solo recibe las props y las convierte en JSX (Su función es el CÓMO mostrar).


3. Si no pusieras [name] como dependencia del useEffect en PokemonCard, ¿qué
problema concreto ocurriría?

Si el array estuviese vacío el efecto solo corre una vez cuando se monta el componente. Si la prop name cambiara, el componente seguiría mostrando los datos del pokemon original y nunca haría un nuevo fetch.


4. ¿Por qué se usan dos interfaces distintas (PokemonListItem y PokemonDetail) en lugar de modelar todo con una sola?

Porque PokemonListItem está diseñado para dar una vista rápida de muchos pokemon a la vez.
En cambio PokemonDetail da mucha más información por cada pokemon lo que podría darle problemas a TypeScript al contener demasiada información.


5. ¿Qué ventaja tiene que PokemonList no sepa nada de la API? ¿Cómo facilita eso el testing o la reutilización?

La ventaja es que podes testearlo pasándole datos falsos directamente sin necesidad de mockear fetch ni hacer llamadas reales a la API. Y otra ventaja es que, en el caso de que necesites mostrar una lista de favoritos guardados en el LocalStorage, podes reuasarlo sin cambiar una sola línea.


