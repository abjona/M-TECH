import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,  private bluetoothSerial: BluetoothSerial,private toastCtrl: ToastController
    ) {

  }

  play(){
    if(this.bluetoothSerial.isEnabled()){
      this.bluetoothSerial.write("1");

    }else{
      let toast = this.toastCtrl.create();
      toast.setMessage('Erro ao iniciar!');
    }
  }

  stop(){
    if(this.bluetoothSerial.isEnabled()){
      this.bluetoothSerial.write('stop');    

    }else{
      let toast = this.toastCtrl.create();
      toast.setMessage('Erro ao pausar!');
    }
  }

}
