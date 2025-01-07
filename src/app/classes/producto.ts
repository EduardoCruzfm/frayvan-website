export class Producto {
    constructor(
        public id: string, 
        public nombre: string, 
        public tipo: string, 
        public talles: { talle: number; cantidad: number }[], // Disponibilidad (key: talle, value: cantidad)
        public colores: string, 
        public fotos: string[], 
    ) {}
}
