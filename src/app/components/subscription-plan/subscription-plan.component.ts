import { Component, OnInit } from '@angular/core';
import { SubscriptionPlanService } from '../../api/subscription-plans.services';
import { AlertController, ActionSheetController, ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.scss'],
})
export class SubscriptionPlanComponent implements OnInit {

  subscriptionPlans: any;
  errors: any;
  oder = {"adressWorkorder":{}};

  constructor(
    private subscriptionPlanService: SubscriptionPlanService,
    private modalCtrl: ModalController,) { }

  ngOnInit() {

    this.subscriptionPlanService.list().then((subscriptionPlans)=>{
      this.subscriptionPlans = subscriptionPlans;
      console.log(subscriptionPlans);
    },(error)=>{this.errors=error; console.log(error);})
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
