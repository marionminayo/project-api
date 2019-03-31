import { Injectable } from '@angular/core';
import { FilesService } from './files.service';


@Injectable({
  providedIn: 'root'
})
export class PdfService {
  pdf : any;
  pathFile: any
  constructor(private fileService: FilesService) { }

  getPDF(): String{
    
    return `assets/${this.pdf}`;
  }

  setFile(pathFile){
    console.log(pathFile)
    this.pdf = pathFile["path"]
    return this.pathFile
   
  }
}
