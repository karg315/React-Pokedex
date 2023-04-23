# React-Pokedex
### Lista de Pokemones
### Descripción por cada pokemon
### A cada pokemon se le puede marcar como favorito en cualquier vista (* falta en la de detalles de pokemon)

## Kevin Rodriguez

#### Comentarios extras: Luego de conocer de añadir lo de firebase se me salió de las manos no repetir el código, intenté mucho pero fallaba una o dos cosas, como los props y demás, y no es sobre los helpers*, sino sacar por ejemplo la tarjeta de cada pokemon en un conponente funcional aparte**, ^^y una última cosa que se me olvidó añadir, los botones de agregar a favorito y capturado en la vista de detalles de cada pokemon.^^ (Corregido en al versión 6.1 9:33pm***)

#### *Y sobre los helpers en especial, me vi con poco tiempo si era implementar los otros detalles en este caso, favorito y capturado a cada pokemon en cada vista, lo que hizo que me centrara en eso y no en hacer modular los helpers y la tarjeta de cada pokemon

#### **Sobre la tarjeta de pokemon era dificil hacerlo modular, los datos necesarios para renderizarla son distintos en cada vista, en las listas y detalle recorre una lista según el nombre de pokemon, pero en la lista en general toca traer los datos extras como la imagen y tipos del pokemon sobre el fetch de la lista de pokemones, algo que complicó la modularización, y por tanto reducir el código.
