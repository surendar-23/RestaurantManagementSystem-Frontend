import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class DeliveryPartnerService {
    url: string = "http://localhost:8080";

    constructor(
        private route: Router,
        private http: HttpClient,
    ) {
    }

    getName(): any {
        return localStorage.getItem("name");
    }

    deliveryPartnerLogout(): void {
        localStorage.clear();
        this.route.navigate(['']).then(success => {
            if (success) {
                console.log('Navigation successful!');
            } else {
                console.log('Navigation failed!');
            }
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    }

    getOrders(): Observable<any> {
        return this.http.get(this.url + "/api/orders");
    }

    getOrderById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/orders/" + id);
    }

    updateOrder(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/orders/" + id, body);
    }

    getAllOrderDetails(): Observable<any> {
        return this.http.get(this.url + "/api/orderDetails");
    }

    getOrderDetailsById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/orderDetails/" + id);
    }

    createDelivery(body: any): Observable<any> {
        return this.http.post(this.url + "/api/deliveries", body);
    }

    getAllDeliveries(): Observable<any> {
        return this.http.get(this.url + "/api/deliveries");
    }

    getDeliveryById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/deliveries/" + id);
    }

    updateDelivery(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/deliveries/" + id, body);
    }

    updateDeliveryStatus(status: string, deliveryId: number): Observable<any> {
        return this.http.put(`${this.url}/api/deliveries/${deliveryId}`, {status});
    }
}
