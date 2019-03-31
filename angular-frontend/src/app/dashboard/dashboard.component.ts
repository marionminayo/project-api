import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { FilesService } from '../services/files.service';
import { Router } from '@angular/router';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  messageClass;
  message;
  newPost = false;
  loadingFiles = false;
  form;
  processing= false;
  name;
  title: any;
  filePosts;
  path : any;

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private fileService: FilesService,
    private router:Router,
    private pdfService : PdfService )
    { 
    this.createNewFileForm();
  }

  createNewFileForm(){
    this.form = this.formBuilder.group({
      title : [''],
      body : [''],
      postedBy: ['']

    })
  }

  enableFormNewFileForm(){
    this.form.get('title').enable();
    this.form.get('body').enable();
  }

  disableFormNewFileForm(){
    this.form.get('title').disable();
    this.form.get('body').disable();
  }

  newFileForm(){
    this.newPost = true;
  }

  refreshFiles(){
    this.loadingFiles = true;
    //get all files
    setTimeout(() => {
      this.loadingFiles = false;
      
    }, 4000);

  }

  onFileSubmit(){
    const lala = {title : this.title}
    const formData = new FormData();
    formData.append('title', lala["title"]);
    formData.append('body', this.form.get('body').value);
    formData.append('postedBy', this.name);
    console.log(JSON.stringify(formData))
    this.fileService.newFile(formData).subscribe(
      
      (res)=> console.log(res),
      (err)=> console.log(err)
    )

  }
  
  onFileChange(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      console.log(file)
      this.form.get('body').setValue(file);
    }
  }

  getAllFiles(){
    this.fileService.getAllFiles().subscribe((data: any) =>{
      this.filePosts = data.files
      
      // this.filePosts.forEach(({ body, title }) => console.log(`${body} donuts cost $${title} each`));
      
    })
  }


  goBack(){
    window.location.reload();
  }
  onClick(){
    const pathFile = { path: this.path}
    this.router.navigate(['pdf'])
    
    this.pdfService.setFile(pathFile)
    
  }
  

  ngOnInit() {
    this.authService.getProfile().subscribe((profile: any)=>{
      this.name = profile.user.name;
      console.log(this.name)
    })
    this.getAllFiles()
  }

}
