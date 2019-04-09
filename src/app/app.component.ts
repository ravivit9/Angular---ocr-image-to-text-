import {Component} from '@angular/core';
import {Tesseract} from 'tesseract.ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ocr';
  file = null;
  sonuc: any;
  progres: any = '';
  tesseractSonuc: any;
  sonucVarMi = false ;

  constructor() {
    this.sonucVarMi = false;
  }

  fileUpload(file) {
    console.log(file.target.files[0]);
    this.file = file.target.files[0];
  }

  calistir() {
    this.sonucVarMi = false;
    this.sonuc = ' ';
    this.progres = 0;
    Tesseract
      .recognize(this.file)
      .progress(pro => {
        if (pro.status === 'recognizing text') {
          this.progres = (pro.progress * 100);
        }
      })
      .then((res: any) => {
        this.sonuc = res.html;
        this.tesseractSonuc = res;
        console.log(res);
      })
      .catch(console.error);
  }

  sonucDondur(degisken: number) {
    switch (degisken) {
      case 1 :
        this.sonucVarMi = false;
        this.sonuc = this.tesseractSonuc.text;
        break;
      case 2:
        this.sonucVarMi = true;
        this.sonuc = this.tesseractSonuc.words;
        break;
      case 3:
        this.sonucVarMi = true;
        this.sonuc = this.tesseractSonuc.paragraphs;
        break;
      case 4:
        this.sonucVarMi = true;
        this.sonuc = this.tesseractSonuc.symbols;
        break;
      case 5:
        this.sonucVarMi = true;
        this.sonuc = this.tesseractSonuc.lines;
        break;
    }
  }
}
