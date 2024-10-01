const renderProducts = (data) => {
    const containerProducts = document.getElementById("containerProducts");
    containerProducts.innerHTML = ""; // Limpiar el contenedor de productos antes de renderizar nuevos productos
};

document.getElementById("btnEnviar").addEventListener("click", () => {
    addProduct(); // Llamar a la función para agregar el producto
    cleanForm(); // Limpiar el formulario después de agregar el producto
});

function cleanForm() {
    const form = document.getElementById("formAddProduct");
    form.reset(); // Reiniciar el formulario
}

document.getElementById('sortPrice').addEventListener('change', function () {
    const sortOrder = this.value; // Obtener el orden de clasificación seleccionado
    const currentUrl = new URL(window.location.href);
    const page = currentUrl.searchParams.get('page') || 1; // Obtener la página actual
    currentUrl.searchParams.set('sort', sortOrder); // Establecer el nuevo parámetro de orden
    currentUrl.searchParams.set('page', page); // Mantener la misma página
    window.location.href = currentUrl.toString(); // Redirigir a la URL actualizada
});

window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const sortParam = urlParams.get('sort');
    if (sortParam) {
        document.getElementById('sortPrice').value = sortParam; // Establecer el valor de orden de clasificación al cargar la página
    }
});
