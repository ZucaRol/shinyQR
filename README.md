# shinyQR - Un widget para escaneo de códigos QR en Shiny

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**shinyQR** es un widget de `htmlwidgets` que permite integrar un lector de códigos QR en aplicaciones Shiny. Utiliza la librería `html5-qrcode` para capturar códigos QR en tiempo real desde la cámara del dispositivo. Este widget es útil para aplicaciones que requieren la captura rápida y eficiente de códigos QR directamente en la interfaz de usuario de Shiny.

## Instalación

Puedes instalar `shinyQR` desde GitHub  usando `devtools`:

```r
# Si aún no tienes devtools instalado
# install.packages("devtools")

devtools::install_github("zuca_rol/shinyQR")
```

## Uso

Para utilizar `shinyQR` en tu aplicación Shiny, sigue estos pasos:

1.  **Incluye el widget en la UI:** Utiliza la función `QrInput()` dentro de tu definición de `ui`.

2.  **Accede al valor escaneado en el servidor:** El valor del código QR escaneado estará disponible en `input$elementId_value`, donde `elementId` es el ID que asignaste al widget `QrInput()`.

### Función `QrInput()`

```r
QrInput(
  elementId,
  scanTimeout = 15000,
  qrboxSize = 250,
  readerWidth = "250px",
  readerHeight = "250px",
  startText = "Iniciar Escaneo",
  stopText = "Detener Escaneo",
  noResultText = "No se detecto un QR en el tiempo limite."
)
```

#### Argumentos

* `elementId`: `character`. ID del elemento en Shiny. Este ID será usado para acceder al valor escaneado en el servidor (e.g., `input$mi_lector_qr_value`).
* `scanTimeout`: `numeric`. Tiempo en milisegundos antes de detener el escaneo si no se detecta un QR (por defecto: `15000` milisegundos, o 15 segundos).
* `qrboxSize`: `numeric`. Tamaño del área de escaneo (el cuadro donde se debe enfocar el QR) en píxeles (por defecto: `250`).
* `readerWidth`: `character`. Ancho del contenedor del lector de QR (por defecto: `"250px"`). Puedes usar otras unidades CSS como `"100%"`.
* `readerHeight`: `character`. Alto del contenedor del lector de QR (por defecto: `"250px"`). Puedes usar otras unidades CSS.
* `startText`: `character`. Texto del botón para iniciar el escaneo (por defecto: `"Iniciar Escaneo"`).
* `stopText`: `character`. Texto del botón para detener el escaneo (por defecto: `"Detener Escaneo"`).
* `noResultText`: `character`. Mensaje que se muestra si no se detecta un QR dentro del `scanTimeout` (por defecto: `"No se detecto un QR en el tiempo limite."`).

#### Valor

Un widget HTML que actúa como input en Shiny. El valor escaneado estará disponible en `input$elementId_value`.

### Ejemplo

```r
if (interactive()) {
  library(shiny)
  library(shinyQR)

  ui <- fluidPage(
    titlePanel("Ejemplo de Lector de QR"),
    QrInput("lector_qr", scanTimeout = 10000, qrboxSize = 300, startText = "Escanear"),
    verbatimTextOutput("resultado")
  )

  server <- function(input, output) {
    output$resultado <- renderText({
      if (is.null(input$lector_qr_value)) {
        "Escanea un código QR para ver el resultado."
      } else {
        input$lector_qr_value
      }
    })
  }

  shinyApp(ui, server)
}
```

En este ejemplo, se crea un widget `QrInput` con el `elementId` "lector\_qr". El escaneo se detendrá después de 10 segundos si no se detecta un QR, el área de escaneo tendrá un tamaño de 300 píxeles y el botón dirá "Escanear". El valor del código QR escaneado se mostrará en el `verbatimTextOutput` con el ID "resultado" accediendo a `input$lector_qr_value`.

## Dependencias

`shinyQR` depende de la librería de JavaScript [`html5-qrcode`](https://github.com/mebaysan/html5-qrcode) para la funcionalidad de escaneo. Esta librería se incluye automáticamente con el widget.

## Licencia

Este paquete está bajo la licencia MIT. Consulta el archivo `LICENSE` para obtener más detalles.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, siéntete libre de abrir issues o enviar pull requests al repositorio.
