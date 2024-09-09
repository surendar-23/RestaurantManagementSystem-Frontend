import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {
    url: string = 'http://localhost:8080';

    constructor(
        private http: HttpClient,
        private route: Router
    ) {
    }

    forgotPassword(body: any): Observable<any> {
        return this.http.post(this.url + "/api/users/forgot-password", body);
    }

    changePassword(uid: any, password: any): Observable<any> {
        return this.http.post(this.url + "/api/users/" + uid + "/" + password, {});
    }

    getUserRole(): any {
        return localStorage.getItem("role");
    }

    userSignIn(body: any): Observable<any> {
        return this.http.post(`${this.url}/api/users/login`, body);
    }


    storeUserRole(role: string): void {
        localStorage.setItem("role", role);
    }

    storeUserAuthorization(token: string): void {
        localStorage.setItem("token", token);
    }

    getUserAuthorization(): any {
        return localStorage.getItem("token");
    }

    getUserName(): any {
        return localStorage.getItem("userName");
    }

    storeUserName(name: string): void {
        localStorage.setItem("userName", name);
    }

    signUp(body: any): Observable<any> {
        return this.http.post(this.url + "/api/users/register", body);
    }

    userLogout(): void {
        localStorage.clear();
        this.route.navigate(['/']).then(success => {
            if (success) {
                console.log('Navigation is successful!');
            } else {
                console.log('Navigation has failed!');
            }
        })
            .catch(err => {
                console.error('Navigation error:', err);
            });
    }

    // Owner login
    ownerSignIn(body: any): Observable<any> {
        return this.http.post(this.url + "/api/owner/login", body);
    }

    storeOwnerAuthorization(token: string): void {
        localStorage.setItem("owner", token);
    }

    getOwnerAuthorization(): any {
        return localStorage.getItem("owner");
    }

    storeOwnerUserName(name: string): void {
        localStorage.setItem("ownerName", name);
    }

    getOwnerName(): any {
        return localStorage.getItem("ownerName");
    }

    ownerLogout(): void {
        localStorage.clear();
        this.route.navigate(['/']).then(success => {
            if (success) {
                console.log('Navigation is successful!');
            } else {
                console.log('Navigation has failed!');
            }
        })
            .catch(err => {
                console.error('Navigation error:', err);
            });
    }

    isOwnerLoginPresent(): void {
        if (this.getOwnerAuthorization() === null) {
            this.route.navigate(['/owner-login']).then(success => {
                if (success) {
                    console.log('Navigation is successful!');
                } else {
                    console.log('Navigation has failed!');
                }
            })
                .catch(err => {
                    console.error('Navigation error:', err);
                });
        }
    }

    isCustomerLoginPresent(): void {
        if (this.getUserAuthorization() === null) {
            this.route.navigate(['/customer-login']).then(success => {
                if (success) {
                    console.log('Navigation is successful!');
                } else {
                    console.log('Navigation has failed!');
                }
            })
                .catch(err => {
                    console.error('Navigation error:', err);
                });
        }
    }

    isSupplierLoginPresent(): void {
        if (this.getUserAuthorization() === null) {
            this.route.navigate(['/supplier-login']).then(success => {
                if (success) {
                    console.log('Navigation is successful!');
                } else {
                    console.log('Navigation has failed!');
                }
            })
                .catch(err => {
                    console.error('Navigation error:', err);
                });
        }
    }

    isWaiterLoginPresent(): void {
        if (this.getUserAuthorization() === null) {
            this.route.navigate(['/waiter-login']).then(success => {
                if (success) {
                    console.log('Navigation is successful!');
                } else {
                    console.log('Navigation has failed!');
                }
            })
                .catch(err => {
                    console.error('Navigation error:', err);
                });
        }
    }

    isDeliveryPartnerLoginPresent(): void {
        if (this.getUserAuthorization() === null) {
            this.route.navigate(['/delivery-partner-login']).then(success => {
                if (success) {
                    console.log('Navigation is successful!');
                } else {
                    console.log('Navigation has failed!');
                }
            })
                .catch(err => {
                    console.error('Navigation error:', err);
                });
        }
    }

    isChefLoginPresent(): void {
        if (this.getUserAuthorization() === null) {
            this.route.navigate(['/chef-login']).then(success => {
                if (success) {
                    console.log('Navigation is successful!');
                } else {
                    console.log('Navigation has failed!');
                }
            })
                .catch(err => {
                    console.error('Navigation error:', err);
                });
        }
    }

    isRestaurantLoginPresent(): void {
        if (this.getUserAuthorization() === null) {
            this.route.navigate(['/restaurant-login']).then(success => {
                if (success) {
                    console.log('Navigation is successful!');
                } else {
                    console.log('Navigation has failed!');
                }
            })
                .catch(err => {
                    console.error('Navigation error:', err);
                });
        }
    }


}
