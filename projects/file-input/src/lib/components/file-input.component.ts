import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileInputService } from '../services/file-input.service';

@Component({
  selector: 'gvlachos-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./fileInput.component.scss']
})
export class FileInputComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  selectedFile: File = null;
  progress = 0;
  message = '';

  constructor(private fileInputService: FileInputService) { }

  ngOnInit(): void {}

  chooseFile(event): void {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length) {
      this.selectedFile = selectedFiles[0];
    }
  }

  clear = (): void => {
    // this.selectedFile = null;
    this.progress = 0;
  }

  selectFile = (): void => {
    const chooseFileElement: HTMLElement = this.fileInput.nativeElement as HTMLElement;
    this.progress = 0;
    chooseFileElement.click();
  }

  upload = (): void => {
    this.progress = 1;

    this.fileInputService.upload(this.selectedFile).subscribe(
      event => {
        this.progress = 100;
        // if (event.type === HttpEventType.UploadProgress) {
        //   this.progress = Math.round(100 * event.loaded / event.total);
        // } else if (event instanceof HttpResponse) {
        //   this.message = event.body.message;
        //   this.fileInfos = this.fileInputService.getFiles();
        // }
        this.selectedFile = null;
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.selectedFile = null;
      });
  }
}
