import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class OwnerService {
    url: string = "http://localhost:8080";

    constructor(
        private http: HttpClient,
        private route: Router
    ) {
    }

    getName(): any {
        return localStorage.getItem("name");
    }

    ownerLogout(): void {
        localStorage.clear();
        this.route.navigate(['/']).then(success => {
            if (success) {
                console.log('Navigation successful!');
            } else {
                console.log('Navigation failed!');
            }
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    }

// Create Accounting Entry
    createAccounting(body: any): Observable<any> {
        return this.http.post(this.url + '/api/accounting', body);
    }

    getAccountingById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/accounting/" + id);
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

    updateAccounting(accountingData: any, id: number) {
        return this.http.put(`${this.url}/api/accounting/${id}`, accountingData);
    }


    getAllRestaurants(): Observable<any> {
        return this.http.get(this.url + "/api/users/restaurants");
    }

    getRestaurantById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/users/user/" + id);
    }

    updateRestaurant(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/users/user/" + id, body);
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

    getChef(): Observable<any> {
        return this.http.get(this.url + "/api/users");
    }

    deleteChef(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/users/user/" + id);
    }

    getChefById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/users/user/" + id);
    }

    updateChef(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/users/user/" + id, body);
    }

    deleteDeliveryPartner(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/users/user/" + id);
    }

    getDeliveryPartnerById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/users/user/" + id);
    }

    updateDeliveryPartner(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/users/user/" + id, body);
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


    getRestaurants(): Observable<any> {
        return this.http.get(this.url + "/api/users/role/restaurant");
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

    deleteSupplier(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/users/user/" + id);
    }

    getSupplierById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/users/user/" + id);
    }

    updateSupplier(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/users/user/" + id, body);
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

    deleteWaiter(id: any): Observable<any> {
        return this.http.delete(this.url + "/api/users/user/" + id);
    }

    getWaiterById(id: any): Observable<any> {
        return this.http.get(this.url + "/api/users/user/" + id);
    }

    updateWaiter(body: any, id: any): Observable<any> {
        return this.http.put(this.url + "/api/users/user/" + id, body);
    }

    // Get All Users
    getUsers(): Observable<any> {
        return this.http.get(`${this.url}/api/users`);
    }

    // Get User by ID
    getUserById(id: number): Observable<any> {
        return this.http.get(`${this.url}/api/users/${id}`);
    }

    // Register a new User
    saveUser(user: any): Observable<any> {
        return this.http.post(`${this.url}/api/users/register`, user);
    }

    // Login User
    loginUser(user: any): Observable<any> {
        return this.http.post(`${this.url}/api/users/login`, user);
    }

    // Update User
    updateUser(id: number, user: any): Observable<any> {
        return this.http.put(`${this.url}/api/users/${id}`, user);
    }

    // Delete User
    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.url}/api/users/${id}`);
    }

    getWaiters(): Observable<any> {
        return this.http.get(this.url + "/api/users/waiters");
    }

    getDeliveryPartners(): Observable<any> {
        return this.http.get(this.url + "/api/users/delivery-partners");
    }

    getChefs(): Observable<any> {
        return this.http.get(this.url + "/api/users/chefs");
    }

    getSuppliers(): Observable<any> {
        return this.http.get(this.url + "/api/users/suppliers");
    }

    getOwners(): Observable<any> {
        return this.http.get(this.url + "/api/users/owners");
    }

    // Forgot Password
    forgotPassword(user: any): Observable<any> {
        return this.http.post(`${this.url}/api/users/forgotpassword`, user);
    }

    // Change User Password
    changeUserPassword(uid: number, newpassword: string): Observable<any> {
        return this.http.post(`${this.url}/api/users/${uid}/${newpassword}`, {});
    }

    // Verify User Details
    verifyUserDetails(user: any): Observable<any> {
        return this.http.post(`${this.url}/api/users/verifydetails`, user);
    }
}