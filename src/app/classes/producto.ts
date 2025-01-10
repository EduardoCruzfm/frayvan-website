export class Producto {
    constructor(
        public id: string, 
        public titulo: string, 
        public tipo: string, 
        public talles: { numeroTalle: number; cantidad: number }[], // Disponibilidad (key: talle, value: cantidad)
        public colores: string, 
        public fotos: string[], 
        public descripcion: string 
    ) {}
}
