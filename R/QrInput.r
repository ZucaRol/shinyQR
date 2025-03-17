#' QrInput - Un widget para escaneo de codigos QR en Shiny
#'
#' @description Este widget permite integrar un lector de codigos QR en aplicaciones Shiny.
#' Utiliza la libreria `html5-qrcode` para capturar codigos QR en tiempo real desde la camara del dispositivo.
#' El widget es util para aplicaciones que requieren la captura rapida y eficiente de codigos QR.
#'
#' @param elementId ID del elemento en Shiny. Este ID sera usado para acceder al valor escaneado en el servidor.
#' @param scanTimeout Tiempo en milisegundos antes de detener el escaneo (por defecto: 15000).
#' @param qrboxSize Tamano del area de escaneo en pixeles (por defecto: 250).
#' @param readerWidth Ancho del contenedor del lector (por defecto: "250px").
#' @param readerHeight Alto del contenedor del lector (por defecto: "250px").
#' @param startText Texto del boton para iniciar el escaneo (por defecto: "Iniciar Escaneo").
#' @param stopText Texto del boton para detener el escaneo (por defecto: "Detener Escaneo").
#' @param noResultText Mensaje cuando no se detecta un QR (por defecto: "No se detecto un QR en el tiempo limite.").
#'
#' @return Un widget HTML que actua como input en Shiny. El valor escaneado estara disponible en `input$elementId_value`.
#' @export
#'
#' @examples
#' if (interactive()) {
#'   library(shiny)
#'   library(shinyQR)
#'
#'   ui <- fluidPage(
#'     QrInput("lector_qr", scanTimeout = 10000, qrboxSize = 300, startText = "Escanear"),
#'     verbatimTextOutput("resultado")
#'   )
#'
#'   server <- function(input, output) {
#'     output$resultado <- renderText({
#'       if (is.null(input$lector_qr_value)) {
#'         "Escanea un codigo QR para ver el resultado."
#'       } else {
#'         input$lector_qr_value
#'       }
#'     })
#'   }
#'
#'   shinyApp(ui, server)
#' }
QrInput <- function(elementId, scanTimeout = 15000, qrboxSize = 250, 
                    readerWidth = "250px", readerHeight = "250px",
                    startText = "Iniciar Escaneo", stopText = "Detener Escaneo", 
                    noResultText = "No se detecto un QR en el tiempo limite.") {
  params <- list(
    scanTimeout = scanTimeout,
    qrboxSize = qrboxSize,
    readerWidth = readerWidth,
    readerHeight = readerHeight,
    startText = startText,
    stopText = stopText,
    noResultText = noResultText
  )
  
  htmlwidgets::createWidget(
    name = "QrInput",
    x = params,
    width = NULL,
    height = NULL,
    package = "shinyQR",
    elementId = elementId
  )
}