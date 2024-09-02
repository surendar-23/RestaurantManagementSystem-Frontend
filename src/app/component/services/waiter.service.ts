import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class WaiterService {
    url: string = "http://localhost:8080";

    constructor(
        private http: HttpClient,
        private route: Router
    ) {
    }

    getName(): any {
        return localStorage.getItem("name");
    }

    waiterLogout(): void {
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

    // Order

    createOrder(order: any): Observable<any> {
        return this.http.post(`${this.url}/api/orders`, order);
    }

    getAllOrders(): Observable<any> {
        return this.http.get(this.url + "/api/orders");
    }

    getOrderById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/orders/" + id);
    }

    updateOrder(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/orders/" + id, body);
    }

    // Order Details
    getAllOrderDetails(): Observable<any> {
        return this.http.get(this.url + "/api/orderDetails");
    }

    getOrderDetailsById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/orderDetails/" + id);
    }

    // Table
    createTable(body: any): Observable<any> {
        return this.http.post(this.url + "/api/table", body);
    }

    getTables(): Observable<any> {
        return this.http.get(this.url + "/api/table");
    }

    getTableById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/table/" + id);
    }

    updateTable(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/table/" + id, body);
    }
}
