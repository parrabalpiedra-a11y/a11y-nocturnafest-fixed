# Nocturna Fest, versión accesible

[![Accesibilidad](https://github.com/parrabalpiedra-a11y/a11y-nocturnafest-fixed/actions/workflows/accesibilidad.yml/badge.svg)](https://github.com/parrabalpiedra-a11y/a11y-nocturnafest-fixed/actions/workflows/accesibilidad.yml)

La misma web del festival que en [a11y-nocturnafest](https://github.com/parrabalpiedra-a11y/a11y-nocturnafest), pero sin los fallos de accesibilidad. Sirve para comparar las dos en la charla «Programar para personas, no para pantallas».

Nocturna Fest es un festival inventado: el nombre, los grupos y las ilustraciones son ficticios.

**Ver en línea:** https://parrabalpiedra-a11y.github.io/a11y-nocturnafest-fixed/

## Cómo usarla

La web es HTML, CSS y JavaScript sin dependencias ni compilación. Puedes abrir `index.html` directamente o servirla en local:

```bash
npm install
npm start          # http://localhost:8080
```

### Tests de accesibilidad

```bash
npx playwright install chromium   # solo la primera vez
npm test
```

Los tests usan [Playwright](https://playwright.dev/) y [axe-core](https://github.com/dequelabs/axe-core) y se ejecutan en escritorio y en móvil. Comprueban que:

- la página y el pop-up de preventa no tienen errores de WCAG 2.2 AA que axe pueda detectar,
- no hay errores de JavaScript al cargar,
- el `viewport` no bloquea el zoom,
- el pop-up se cierra con `Escape`.

Se ejecutan solos en cada push y pull request con GitHub Actions. Ojo: axe solo detecta una parte de los problemas. El foco, el orden de lectura o cómo suena con un lector de pantalla hay que probarlos a mano.

## Qué cambia respecto a la versión rota

| Arreglo | Criterio WCAG |
|---|---|
| `lang="es"`, título descriptivo, estructura con `header`, `nav`, `main` y `footer`, y enlace para saltar al contenido | 3.1.1, 2.4.2, 1.3.1, 2.4.1 |
| Contraste suficiente en todo el texto | 1.4.3 |
| Foco visible al navegar con el teclado | 2.4.7 |
| Botones y enlaces reales, con nombre accesible en los iconos (carrito, menú, favoritos, redes) | 4.1.2, 2.1.1 |
| Imágenes con `alt` cuando aportan información y `alt=""` cuando son decorativas | 1.1.1 |
| Formulario con etiquetas visibles, `type="email"`, `type="tel"` y `autocomplete`, errores escritos en texto, un resumen de errores que recibe el foco y una confirmación que se anuncia | 3.3.2, 3.3.1, 1.3.5, 4.1.3 |
| Fecha de nacimiento agrupada en un `fieldset` con su `legend` | 1.3.1 |
| La disponibilidad de las entradas se indica con texto, no solo con color, y los gastos se ven sin pasar el ratón | 1.4.1, 1.4.13 |
| La cinta de artistas se puede pausar y se detiene sola con `prefers-reduced-motion`; la frase de la portada ya no cambia sola | 2.2.2 |
| El temporizador de compra avisa antes de acabar, se puede ampliar y nunca borra lo escrito | 2.2.1 |
| El pop-up es un `<dialog>` nativo: se cierra con `Escape` o con un botón visible, y valida el correo antes de cerrarse | 2.1.2, 2.5.8 |
| Las cookies tienen «Rechazar» y «Aceptar» con el mismo peso y no tapan el contenido | 2.4.11 |
| Preguntas frecuentes con `<details>` y `<summary>` | 4.1.2 |
| En el móvil se puede hacer zoom y girar la pantalla, el cartel es una lista vertical sin carrusel, los botones miden al menos 44 × 44 px y el menú tiene `aria-expanded` y un botón «Cerrar menú» visible | 1.4.4, 1.3.4, 2.5.1, 2.5.8 |

Sobre el tamaño de los botones: WCAG 2.2 exige un mínimo de 24 × 24 px (2.5.8, nivel AA). Aquí se usan 44 × 44 px, que es el nivel AAA (2.5.5) y lo que recomienda Apple, porque es lo que ocupa con comodidad la yema de un dedo.

## Estructura

```
index.html                Página única
css/styles.css            Estilos (escritorio, tablet y móvil)
js/main.js                Comportamiento (pop-up, menú, temporizador, formulario)
img/                      Ilustraciones SVG
favicon.svg
tests/                    Tests de accesibilidad con Playwright y axe-core
.github/workflows/        Integración continua
```

## Licencia

El código es [MIT](LICENSE) © Paula Arrabal Piedra.
