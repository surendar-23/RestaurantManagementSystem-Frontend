import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OwnerService {
    url: string = "http://localhost:8080";

    constructor(
        private http: HttpClient,
    ) {
    }

// Create Accounting Entry
    createAccounting(body: any): Observable<any> {
        return this.http.post(this.url + '/api/accounting', body);
    }

    // Get All Accounting Entries
    getAccounting(): Observable<any> {
        return this.http.get<any>(this.url + '/api/accounting');
    }

    // Delete Accounting Entry by ID
    deleteAccounting(id: number): Observable<any> {
        return this.http.delete(this.url + '/api/accounting/' + id);
    }

    // Update Accounting Entry by ID
    updateAccounting(body: any, id: number): Observable<any> {
        return this.http.put(this.url + '/api/accounting/' + id, body);
    }

    createAddress(body: any): Observable<any> {
        return this.http.post(this.url + "/api/address", body);
    }

    getAllAddress(): Observable<any> {
        return this.http.get(this.url + "/api/address");
    }

    deleteAddress(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/address/" + id);
    }

    getAddressById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/address/" + id);
    }

    updateAddress(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/address/" + id, body);
    }

    createRestaurant(body: any): Observable<any> {
        return this.http.post(this.url + "/api/restaurants", body);
    }

    getAllRestaurants(): Observable<any> {
        return this.http.get(this.url + "/api/restaurants");
    }

    deleteRestaurant(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/restaurants/" + id);
    }

    getRestaurantById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/restaurants/" + id);
    }

    updateRestaurant(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/restaurants/" + id, body);
    }

    createBill(body: any): Observable<any> {
        return this.http.post(this.url + "/api/bill", body);
    }

    getBill(): Observable<any> {
        return this.http.get(this.url + "/api/bill");
    }

    deleteBill(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/bill/" + id);
    }

    getBillById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/bill/" + id);
    }

    updateBill(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/bill/" + id, body);
    }

    getOrderDetails(): Observable<any> {
        return this.http.get(this.url + "/api/orderDetails");
    }

    getOrderDetailsById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/orderDetails/" + id);
    }

    getPayment(): Observable<any> {
        return this.http.get(this.url + "/api/payments");
    }

    deletePayment(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/payments/" + id);
    }

    getPaymentById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/payments/" + id);
    }

    updatePayment(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/payments/" + id, body);
    }

    createCategory(body: any): Observable<any> {
        return this.http.post(this.url + "/api/category", body);
    }

    getCategory(): Observable<any> {
        return this.http.get(this.url + "/api/category");
    }

    deleteCategory(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/category/" + id);
    }

    getCategoryById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/category/" + id);
    }

    updateCategory(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/category/" + id, body);
    }

    getFeedbacks(): Observable<any> {
        return this.http.get(this.url + "/api/feedback");
    }

    getFeedbackById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/feedback/" + id);
    }

    createChef(body: any): Observable<any> {
        return this.http.post(this.url + "/api/chef", body);
    }

    getChef(): Observable<any> {
        return this.http.get(this.url + "/api/chef");
    }

    deleteChef(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/chef/" + id);
    }

    getChefById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/chef/" + id);
    }

    updateChef(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/chef/" + id, body);
    }

    createDeliveryPartner(body: any): Observable<any> {
        return this.http.post(this.url + "/api/delivery-partners", body);
    }

    getDeliveryPartners(): Observable<any> {
        return this.http.get(this.url + "/api/delivery-partners");
    }

    deleteDeliveryPartner(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/delivery-partners/" + id);
    }

    getDeliveryPartnerById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/delivery-partners/" + id);
    }

    updateDeliveryPartner(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/delivery-partners/" + id, body);
    }

    createInventoryItem(body: any): Observable<any> {
        return this.http.post(this.url + "/api/inventoryItem", body);
    }

    getInventoryItem(): Observable<any> {
        return this.http.get(this.url + "/api/inventoryItem");
    }

    deleteInventoryItem(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/inventoryItem/" + id);
    }

    getInventoryItemById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/inventoryItem/" + id);
    }

    updateInventoryItem(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/inventoryItem/" + id, body);
    }

    createMenuItem(body: any): Observable<any> {
        return this.http.post(this.url + "/api/menuItem", body);
    }

    getMenuItem(): Observable<any> {
        return this.http.get(this.url + "/api/menuItem");
    }

    deleteMenuItem(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/menuItem/" + id);
    }

    getMenuItemById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/menuItem/" + id);
    }

    updateMenuItem(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/menuItem/" + id, body);
    }

    getOrders(): Observable<any> {
        return this.http.get(this.url + "/api/orders");
    }

    deleteOrder(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/orders/" + id);
    }

    getOrderById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/orders/" + id);
    }

    createSupplier(body: any): Observable<any> {
        return this.http.post(this.url + "/api/supplier", body);
    }

    getSuppliers(): Observable<any> {
        return this.http.get(this.url + "/api/supplier");
    }

    deleteSupplier(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/supplier/" + id);
    }

    getSupplierById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/supplier/" + id);
    }

    updateSupplier(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/supplier/" + id, body);
    }

    createTable(body: any): Observable<any> {
        return this.http.post(this.url + "/api/table", body);
    }

    getTables(): Observable<any> {
        return this.http.get(this.url + "/api/table");
    }

    deleteTable(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/table/" + id);
    }

    getTableById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/table/" + id);
    }

    updateTable(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/table/" + id, body);
    }

    createWaiter(body: any): Observable<any> {
        return this.http.post(this.url + "/api/waiter", body);
    }

    getWaiters(): Observable<any> {
        return this.http.get(this.url + "/api/waiter");
    }

    deleteWaiter(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/waiter/" + id);
    }

    getWaiterById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/waiter/" + id);
    }

    updateWaiter(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/waiter/" + id, body);
    }
}
