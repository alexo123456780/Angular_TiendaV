import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { CarouselModule } from 'primeng/carousel';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ButtonModule,InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    PaginatorModule,
    CardModule,
    FileUploadModule,
    MessageModule,
    CarouselModule,
    AvatarModule,
    AvatarGroupModule,
    ProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tienda_Virtual';
}
