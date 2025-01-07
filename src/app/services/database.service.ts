import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  async agregarUsuario(user: any, coleccion: string) {
    try {
      // Crear una referencia al documento, usando el uid del usuario como ID del documento
      const userDocRef = this.firestore.collection(coleccion).doc(user.id); 

      // Guardar el documento en Firestore
      await userDocRef.set({ ...user });

      console.log('Usuario agregado exitosamente con ID:', user.id);
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  }

  async agregarProducto(producto: any, coleccion: string) {
    try {
      // Generar un nuevo ID único para el producto usando createId()
      const productoId = this.firestore.createId();
  
      // Asignar el ID generado al producto
      producto.id = productoId;
  
      // Crear una referencia al documento usando el ID generado
      const turnoDocRef = this.firestore.collection(coleccion).doc(productoId);
  
      // Guardar el documento en Firestore
      await turnoDocRef.set({ ...producto });
  
      console.log('Producto agregado exitosamente con ID:', productoId);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  }

  async agregarLog(log: any, coleccion: string) {
    try {
      const logId = this.firestore.createId();
      log.id = logId;
  
      // Crear una referencia al documento usando el ID generado
      const logDocRef = this.firestore.collection(coleccion).doc(logId);
  
      // Guardar el documento en Firestore
      await logDocRef.set({ ...log });
  
      console.log('Log agregado exitosamente con ID:', logId);
    } catch (error) {
      console.error('Error al agregar el log:', error);
    }
  }
  
  traerColeccion(nombreColeccion: string){
    const collection = this.firestore.collection(nombreColeccion);
    const observable = collection.valueChanges();
    return observable;
  }

  modificarUsuario(usuario: any, coleccion: string){
    const collectionUsuarios = this.firestore.collection(coleccion);
    const documento = collectionUsuarios.doc(usuario.id);
    documento.update({... usuario});
  }

  eliminar(usuario: any){
    const collectionUsuarios = this.firestore.collection("usuarios");
    const documento = collectionUsuarios.doc(usuario.id);
    documento.delete();
  }

  async obtenerUsuarioPorId(uid: string, coleccion: string): Promise<any> {
    try {
      const collectionUsuarios = this.firestore.collection(coleccion, ref => ref.where('id', '==', uid));
      // Ejecuta la consulta
      const querySnapshot = await collectionUsuarios.get().toPromise(); 
      
      if (querySnapshot && !querySnapshot.empty) {
        // Obtengo el primer documento que coincide
        const docSnap = querySnapshot.docs[0]; 
  
        // Obtengo los datos del documento 
        const data: any = docSnap.data();
  
        console.log('Usuario encontrado:', data['nombre']);
        return data; 
      } else {
        console.log('No se encontró el usuario con el UID proporcionado.');
        return null;
      }
    } catch (error) {
      console.error('Error obteniendo el usuario:', error);
      return null;
    }
  }
  
}
