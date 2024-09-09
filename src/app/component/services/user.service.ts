import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../model/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseURL = 'http://localhost:8080/api/users';

    constructor(private http: HttpClient) {
    }

    // Register a new user
    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.baseURL}/register`, user);
    }

    // Login a user
    login(user: { password: string; emailId: string }): Observable<User> {
        return this.http.post<User>(`${this.baseURL}/login`, user);
    }

    // Update a user by ID
    updateUser(userId: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.baseURL}/user/${userId}`, user);
    }

    // Get a list of all users
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseURL}`);
    }

    // Get user by ID
    getUserById(userId: number): Observable<User> {
        return this.http.get<User>(`${this.baseURL}/user/${userId}`);
    }

    // Delete user by ID
    deleteUser(userId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.baseURL}/user/${userId}`);
    }

    // Change password
    changePassword(userId: number, newPassword: string): Observable<User> {
        return this.http.post<User>(`${this.baseURL}/${userId}/${newPassword}`, {});
    }

    // Forgot password by email
    forgotPassword(user: User): Observable<User> {
        return this.http.post<User>(`${this.baseURL}/forgotpassword`, user);
    }
}
