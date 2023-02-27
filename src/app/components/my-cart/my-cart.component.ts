import { Component, OnInit } from '@angular/core';
import { productsModel } from 'src/app/models/description.module';
import { NotificationServiceService } from 'src/app/service/notification-service.service';
import { WebbAppService } from 'src/app/service/webb-app.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {
  data: productsModel[] = [];
  constructor(
    private service: WebbAppService,
    private notification: NotificationServiceService
  ) {

  }
  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.data = await this.service.getMyCart('myCart');
  }

  async removeItem(id: number | undefined, item: productsModel, event: Event) {

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id == item.id) {
        const index = i

        await this.service.deleteMyCart(index, event);
        this.notification.notificationFailure("Your Product from cart has been removed")
        this.data = await this.service.getMyCart('myCart');
      }
    }

  }

}
