import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { FilesService } from '../services/files.service';

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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private fileService: FilesService) { 
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



  // onFileSubmit(){
  //   this.(processing) = true; // Disable submit button
  //   this.disableFormNewFileForm(); // Lock form

  //   const file = {
  //     title: this.form.get('title').value, // Title field
  //     body: this.form.get('body').value, // Body field
  //     createdBy: this.name // CreatedBy field
  //   }
  //   console.log(file)
  //   this.fileService.newFile(file).subscribe((data:any)=>{
  //     if(!data.success){
  //       console.log(data.message)
  //       this.messageClass= 'alert alert-danger';
  //       this.message = data.message;
  //       this.processing = false;
  //       this.enableFormNewFileForm()
  //     }else{
  //       this.messageClass = 'alert alert-success';
  //       this.message = data.message;
  //       setTimeout(()=>{
  //         this.newPost = false;
  //         this.processing = false;
  //         this.message = false;
  //         this.form.reset();
  //         this.enableFormNewFileForm();
  //       },2000)
  //     }
  //   })
  // }

  goBack(){
    window.location.reload();
  }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile: any)=>{
      this.name = profile.user.name;
      console.log(this.name)
    })
  }

}
