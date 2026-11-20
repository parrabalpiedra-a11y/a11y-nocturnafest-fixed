# Nocturna Fest, versión accesible

La misma web del festival que en [a11y-nocturnafest](https://github.com/parrabalpiedra-a11y/a11y-nocturnafest), pero sin los fallos de accesibilidad. Sirve para comparar las dos en la charla "Programar para personas, no para pantallas".

Nocturna Fest es un festival inventado: el nombre, los grupos y las ilustraciones son ficticios.

## Qué cambia respecto a la versión rota

- `lang="es"`, título descriptivo y estructura con `header`, `nav`, `main` y `footer`, más un enlace para saltar al contenido.
- Contraste suficiente en todo el texto y foco visible al navegar con el teclado.
- Botones y enlaces reales, con nombre accesible en los iconos (carrito, menú, favoritos, redes).
- Imágenes con `alt` cuando aportan información y `alt=""` cuando son decorativas.
- Formulario con etiquetas visibles, `type="email"`, `type="tel"` y `autocomplete`, errores escritos en texto, un resumen de errores que recibe el foco y un mensaje de confirmación que se anuncia.
- Fecha de nacimiento agrupada en un `fieldset` con su `legend`.
- La disponibilidad de las entradas se indica con texto, no solo con color, y los gastos se ven sin pasar el ratón.
- La cinta de artistas se puede pausar y se detiene sola si el sistema pide reducir el movimiento. La frase de la portada ya no cambia sola.
- El temporizador de compra avisa antes de acabar, se puede ampliar y nunca borra lo escrito.
- El pop-up es un `<dialog>` nativo: se cierra con Escape o con un botón visible.
- Las cookies tienen "Rechazar" y "Aceptar" con el mismo peso y no tapan el contenido.
- Preguntas frecuentes con `<details>` y `<summary>`.
- En el móvil: se puede hacer zoom y girar la pantalla, el cartel es una lista vertical sin carrusel, los botones miden al menos 44 × 44 px y el menú tiene `aria-expanded` y un botón "Cerrar menú" visible.

Pasa [axe-core](https://github.com/dequelabs/axe-core) sin errores (WCAG 2.2 AA) en escritorio y en móvil.
