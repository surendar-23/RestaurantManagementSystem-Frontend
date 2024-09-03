import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ChefService {
    url: string = "http://localhost:8080";

    constructor(
        private http: HttpClient,
        private route: Router
    ) {
    }

    chefLogout(): void {
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

    getName(): any {
        return localStorage.getItem("name");
    }

    getMenuItem(): Observable<any> {
        return this.http.get(this.url + "/api/menuItem");
    }

    getMenuItemById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/menuItem/" + id);
    }

    updateMenuItem(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/menuItem/" + id, body);
    }

    getInventoryItem(): Observable<any> {
        return this.http.get(this.url + "/api/inventoryItem");
    }

    getInventoryItemById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/inventoryItem/" + id);
    }

    updateInventoryItem(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/inventoryItem/" + id, body);
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

    getOrderDetails(): Observable<any> {
        return this.http.get(this.url + "/api/orderDetails");
    }

    getOrderDetailsById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/orderDetails/" + id);
    }

    getFeedbacks(): Observable<any> {
        return this.http.get(this.url + "/api/feedback");
    }

    getFeedbackById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/feedback/" + id);
    }
}
