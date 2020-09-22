import { storiesOf, moduleMetadata } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FileInputComponent } from '../components/file-input.component';
import { fakeBackendProvider } from '../services/fake-backend';

storiesOf('File Input', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule
      ],
      declarations: [
        FileInputComponent
      ],
      providers: [
        fakeBackendProvider
      ]
    })
  )
  .add(
    'File Input Form',
    () => ({
      template: `<gvlachos-file-input class='fileInputForm'></gvlachos-file-input>`
    })
  );
