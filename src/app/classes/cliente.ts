export class Cliente {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    telefono:string;
    email: string;
    perfil:string;
    
    constructor(id: string,nombre: string,apellido: string, dni: string, telefono: string,email: string, perfil:string) {
            
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = telefono;
        this.telefono = dni;
        this.email = email;
        this.perfil = perfil;
    }
      
}
