import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private cloudName = 'dfmpbfuzl';
  private cloudinaryUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`; 
  private presentName = 'frayvan-wep-site';

  constructor() {}

  // Subir una imagen a Cloudinary y devolver la URL
  async uploadImage(file: File): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.presentName);

      const response = await fetch(this.cloudinaryUrl, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.secure_url) {
        return result.secure_url; // URL segura de la imagen
      } else {
        throw new Error('Error en la subida de la imagen.');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      return null;
    }
  }

  // Generar una URL optimizada manualmente
  getOptimizedUrl(publicId: string): string {
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/f_auto,q_auto/${publicId}`;
  }

  // Generar una URL transformada manualmente
  getTransformedUrl(publicId: string, width: number, height: number): string {
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/c_crop,g_auto,w_${width},h_${height}/${publicId}`;
  }
}
