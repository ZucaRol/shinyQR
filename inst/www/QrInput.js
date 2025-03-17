HTMLWidgets.widget({
  name: "QrInput",
  type: "output",

  factory: function (element, width, height) {
    const qrContainer = element;

    // Obtener parámetros desde R y convertirlos a JSON
    let params = element.getAttribute('data-params');
    params = params ? JSON.parse(params) : {};

    // Configuración del widget basada en parámetros de R
    const scanTimeout = params.scanTimeout || 15000;  // Tiempo máximo de escaneo
    const qrboxSize = params.qrboxSize || 250;        // Tamaño del área de escaneo
    const readerWidth = params.readerWidth || "250px";
    const readerHeight = params.readerHeight || "250px";
    const startText = params.startText || "Iniciar Escaneo";
    const stopText = params.stopText || "Detener Escaneo";
    const noResultText = params.noResultText || "No se detectó un QR en el tiempo límite.";

    // Crear botón para iniciar/detener escaneo
    const toggleButton = document.createElement("button");
    toggleButton.textContent = startText;
    toggleButton.className = "btn btn-primary shiny-bound-input action-button";
    qrContainer.appendChild(toggleButton);

    // Crear contenedor para el lector de QR
    const qrReader = document.createElement("div");
    qrReader.id = element.id + "-qr-reader";  // Asegurar IDs únicos
    qrReader.style.width = readerWidth;
    qrReader.style.height = readerHeight;
    qrContainer.appendChild(qrReader);

    let html5QrCode = new Html5Qrcode(qrReader.id); // Instancia única del lector
    let timeoutId = null;
    let scanning = false;

    // Función para alternar el escaneo
    const toggleScan = () => {
      if (!scanning) {
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
          Shiny.setInputValue(element.id + "_value", decodedText);
          html5QrCode.stop();
          clearTimeout(timeoutId);
          scanning = false;
          toggleButton.textContent = startText;
        };

        // Configuración del lector QR
        const config = { fps: 10, qrbox: { width: qrboxSize, height: qrboxSize } };

        html5QrCode
          .start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
          .catch(err => console.error("Error iniciando QR Scanner:", err));

        // Detener escaneo después de cierto tiempo
        timeoutId = setTimeout(() => {
          if (scanning) {
            html5QrCode.stop();
            Shiny.setInputValue(element.id + "_value", noResultText);
            scanning = false;
            toggleButton.textContent = startText;
          }
        }, scanTimeout);

        scanning = true;
        toggleButton.textContent = stopText;
      } else {
        html5QrCode.stop();
        clearTimeout(timeoutId);
        scanning = false;
        toggleButton.textContent = startText;
      }
    };

    toggleButton.addEventListener("click", toggleScan);

    return {
      renderValue: function (x) {
        if (x) {
          element.setAttribute('data-params', JSON.stringify(x));
        }
      },
      resize: function (width, height) {}
    };
  }
});
