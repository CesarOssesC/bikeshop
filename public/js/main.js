//calculo subtotal formulario compras
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('tbody tr').forEach(row => {
        const cantidadInput = row.querySelector('.cantidad')
        const precio = parseFloat(row.querySelector('.precio').dataset.precio)
        const subtotal = row.querySelector('.subtotal')

        function actualizarSubtotal() {
            const cantidad = parseInt(cantidadInput.value) || 1
            subtotal.textContent = `$${(precio * cantidad).toFixed(2)}`
        }

        cantidadInput.addEventListener('input', actualizarSubtotal)
        actualizarSubtotal()
    });
})