import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    url: string = "http://localhost:8080";

    constructor(
        private http: HttpClient,
        private route: Router
    ) {
    }

    getName(): any {
        return localStorage.getItem("name");
    }

    customerLogout(): void {
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

    getMenuItem(): Observable<any> {
        return this.http.get(this.url + "/api/menuItem");
    }

    getMenuItemById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/menuItem/" + id);
    }

    createOrders(body: any): Observable<any> {
        return this.http.post(this.url + "/api/orders", body);
    }

    getOrders(): Observable<any> {
        return this.http.get(this.url + "/api/orders");
    }

    getOrderById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/orders/" + id);
    }

    getOrderDetails(): Observable<any> {
        return this.http.get(this.url + "/api/orderDetails");
    }

    getOrderDetailsById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/orderDetails/" + id);
    }

    createFeedback(body: any): Observable<any> {
        return this.http.post(this.url + "/api/feedback", body);
    }

    getFeedbacks(): Observable<any> {
        return this.http.get(this.url + "/api/feedback");
    }

    getFeedbackById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/feedback/" + id);
    }

    createPayment(body: any): Observable<any> {
        return this.http.post(this.url + "/api/payments", body);
    }

    getPayments(): Observable<any> {
        return this.http.get(this.url + "/api/payments");
    }

    getPaymentById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/payments/" + id);
    }
}