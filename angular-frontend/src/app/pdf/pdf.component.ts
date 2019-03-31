import { Component, OnInit } from '@angular/core';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  pdfSrc: String = '';
  constructor(private pdfService: PdfService) { }

  ngOnInit() {
    
    this.pdfSrc = this.pdfService.getPDF()
    console.log(this.pdfSrc)
  }
  onFileSelected(){
    let img: any = document.querySelector("#file");
    if(typeof (FileReader)!=="undefined"){
      let reader = new FileReader();
      reader.onload = (e:any)=>{
        this.pdfSrc = e.target.result;
        console.log(this.pdfSrc)
      }
      reader.readAsArrayBuffer(img.files[0])
    }
  }

}
