export class Cliente {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    perfil:string;
    
    constructor(id: string,nombre: string,apellido: string, dni: string,email: string, perfil:string) {
            
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.perfil = perfil;
    }
      
}
