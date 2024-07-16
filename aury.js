let currentIndex = 0;

function showNextSlide() {
  const slides = document.querySelectorAll('.carousel-item');
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add('active');
  document.querySelector('.carousel-inner').style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(showNextSlide, 3000); // Cambia cada 3 segundos


// Carrito integrado.
document.addEventListener("DOMContentLoaded", () => {
  const carrito = [];
  const carritoFlotante = document.getElementById("carrito-flotante");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  const eliminarProductoBtn = document.getElementById("eliminar-producto");
  const cerrarCarritoBtn = document.getElementById("cerrar-carrito");
  const pagarCarritoBtn = document.getElementById("pagar-carrito");
  const formaPagoModal = document.getElementById("forma-pago-modal");
  const confirmarPagoBtn = document.getElementById("confirmar-pago");
  const mensajeCompraModal = document.getElementById("mensaje-compra");
  const cerrarMensajeBtn = document.getElementById("cerrar-mensaje");

  document.querySelectorAll(".agregarAlCarrito").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const product = e.target.getAttribute("data-product");
      const price = parseFloat(e.target.getAttribute("data-price"));
      carrito.push({ product, price });
      actualizarCarrito();
    });
  });

  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.product} - $${item.price.toFixed(2)}`;
      li.setAttribute("data-index", index);
      listaCarrito.appendChild(li);
      total += item.price;
    });
    totalCarrito.textContent = total.toFixed(2);
    carritoFlotante.classList.remove("oculto");
  }

  eliminarProductoBtn.addEventListener("click", () => {
    const items = listaCarrito.querySelectorAll("li");
    if (items.length > 0) {
      const lastItem = items[items.length - 1];
      const index = lastItem.getAttribute("data-index");
      carrito.splice(index, 1);
      actualizarCarrito();
    }
  });

  cerrarCarritoBtn.addEventListener("click", () => {
    carritoFlotante.classList.add("oculto");
  });

  pagarCarritoBtn.addEventListener("click", () => {
    formaPagoModal.classList.remove("oculto");
  });

  confirmarPagoBtn.addEventListener("click", () => {
    // Aquí se debería procesar el pago y enviar los datos al servidor
    formaPagoModal.classList.add("oculto");
    carrito.length = 0;
    actualizarCarrito();
    mensajeCompraModal.classList.remove("oculto");
  });

  cerrarMensajeBtn.addEventListener("click", () => {
    mensajeCompraModal.classList.add("oculto");
  });
});


// Chat bot
document.addEventListener("DOMContentLoaded", function() {
  displayMessage("Hola, soy Aury. ¿En qué puedo ayudarte?", "bot");
});

function toggleChat() {
  const chatContainer = document.getElementById("chat-container");
  chatContainer.style.display = chatContainer.style.display === "none" || chatContainer.style.display === "" ? "flex" : "none";
}

function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() !== "") {
      displayMessage(userInput, "user");
      document.getElementById("user-input").value = "";

      // Simulate bot response
      setTimeout(() => {
          botResponse(userInput);
      }, 1000);
  }
}

function displayMessage(message, sender) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function botResponse(userInput) {
  let botMessage = "Lo siento, no entiendo lo que dices.";

  if (userInput.toLowerCase().includes("hola")) {
      botMessage = "¡Hola! ¿Cómo te llamas?";
  } else if (userInput.toLowerCase().includes("cómo te llamas")) {
      botMessage = "Soy Aury. ¿Y tú?";
  } else if (userInput.toLowerCase().includes("adiós")) {
      botMessage = "Adiós, que tengas un buen día.";
  }

  displayMessage(botMessage, "bot");
}
