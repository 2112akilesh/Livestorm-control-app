import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { finalize } from 'rxjs/operators';

import { AlertController } from '@ionic/angular';

//impoet service
import { PostImageService } from 'src/app/core/services/postImage/post-image.service';


const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
  base64: string;
}
@Component({
  selector: 'app-file-sender',
  templateUrl: './file-sender.component.html',
  styleUrls: ['./file-sender.component.scss'],
})
export class FileSenderComponent implements OnInit {
  images: LocalFile[] = [];

  constructor(
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private postImageService: PostImageService,
    private alertController: AlertController,
  ) { }

  async ngOnInit() {
    this.loadFiles();
  }

  async loadFiles() {
    this.images = [];

    const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();

    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    }).then(result => {
      this.loadFileData(result.files);
    },
      async (err) => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: IMAGE_DIR,
          directory: Directory.Data,
        });
      }
    ).then(_ => {
      loading.dismiss();
    });
  }

  // Get the actual base64 data of an image
  // base on the name of the file
  async loadFileData(fileNames: string[]) {
    for (const f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;

      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });

      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
        base64: readFile.data
      });
    }
  }


  // Little helper
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt // Camera, Photos or Prompt!
    });

    if (image) {
      this.saveImage(image);
    }
  }

  // Create a new file from a capture image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data
    });

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
  }



  // Convert the base64 to blob data
  // and create  formData with it
  async startUpload(file: LocalFile) {
    const formData = new FormData();


    const obj =
    {
      base64: file.base64,
      extension: '.jpeg',
      filename: file.name
    };


    //console.log(formData);

    this.uploadData(obj);
  }

  // Upload the formData to our API
  async uploadData(formData) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
    });
    await loading.present();

    this.postImageService.getImagesUrl(formData)
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(
        (res) => {
          this.postImageService.postImage(res.data.url);

          //-------------------------------------------Handle error need to be added on plugin --------------------------------
          // .subscribe(
          //   (data: any) => {
          //     console.log(data);
          //     loading.dismiss();
          //     this.presentToast('Image uploaded!');
          //   },
          //   error => {
          //     console.log(error);
          //     loading.dismiss();
          //     this.presentToast('Error while uploading file!');
          //   }
          // );
        },
      );

    // Use your own API!
    // const url = 'https://plugins.livestorm.co/api/v1/medias';

    // this.http.post(url, formData)
    //   .pipe(
    //     finalize(() => {
    //       loading.dismiss();
    //     })
    //   )
    //   .subscribe(res => {
    //     if (res) {
    //       this.presentToast('File upload complete.');
    //     } else {
    //       this.presentToast('File upload failed.');
    //     }
    //   });

  }



  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
    });
    this.loadFiles();
    this.presentToast('File removed.');
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }


}

