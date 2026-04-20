class Producto:
    def __init__(self, id, nombre, precio, stock):
        self.id = id
        self.nombre = nombre
        self.precio = precio
        self.stock = stock

    def mostrar_info(self):
        print(f"Producto: {self.nombre} - Precio: {self.precio} - Stock: {self.stock}")

productos = [
    Producto(1, "Laptop", 1500000.00, 4),
    Producto(2, "RAM", 85000.00, 10),
    Producto(3, "Memoria", 150000.00, 3),
    Producto(4, "Mouse", 45000.00, 9),
    Producto(5, "Teclado", 70000.00, 12),
]

def mostrar_productos(productos):
    for producto in productos:
        producto.mostrar_info()

    