import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  stat: boolean;
  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    private bluetoothSerial: BluetoothSerial,
    private alertCtrl: AlertController,
    ) {
      this.blue();
  }

  

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
      this.blue();
    }, 2000);
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }

  //BLUETOOTH
  ativa() {
    let toast = this.toastCtrl.create({
      duration: 3000, position: 'bottom'
    })
    this.bluetoothSerial.enable().then(() => {
      toast.setMessage('Bluetooth Ligado!');
     
      this.gettingDevices = true;
    }).catch(() => {
      toast.setMessage('Erro ao ligar o Bluetooth');
    })
    toast.present();
  }

  config() {
    this.bluetoothSerial.showBluetoothSettings();
  }

  blue() {
    this.bluetoothSerial.isEnabled().then(() => {
      this.stat = true;
    }).catch(() => {
      this.stat = false;
    });
    this.pairedDevices = null;
    this.unpairedDevices = null;

    this.bluetoothSerial.discoverUnpaired().then((sucess) => {
      this.unpairedDevices = sucess;
      this.gettingDevices = false;
      sucess.forEach(element => {

      });
    }, (err) => {

    })
    this.bluetoothSerial.list().then((sucess) => {
      this.pairedDevices = sucess;
    }, (err) => {

    })
  }
  success = (data) => alert(data);
  fail = (error) => alert(error);

  selectDevice(address: any) {
    let alert = this.alertCtrl.create({
      title: 'Conectar',
      message: 'Deseja conectar com esse dispositivo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancer clicado');

          }
        },
        {
          text: 'Conectar',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);

          }
        }
      ]
    });
    alert.present();
  }

  disconect() {
    let alert = this.alertCtrl.create({
      title: 'Desconectar',
      message: 'Deseja desconectar',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');

          }
        },
        {
          text: 'Disconectar',
          role: 'disconectar',
          handler: () => {
            this.bluetoothSerial.disconnect().then(() => {
              
            });
          }
        }
      ]
    });
    alert.present();
  }

}
