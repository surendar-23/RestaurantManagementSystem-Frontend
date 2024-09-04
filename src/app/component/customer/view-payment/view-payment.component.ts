import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {Payment} from "../../model/payment";
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-view-payment',
    templateUrl: './view-payment.component.html',
    standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        DatePipe,
        CurrencyPipe
    ],
    styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit {
    payments: Payment[] = [];
    searchTerm: string = '';

    constructor(private customerService: CustomerService) {
    }

    ngOnInit(): void {
        this.loadPayments();
    }

    loadPayments(): void {
        this.customerService.getPayments().subscribe(
            (data: Payment[]) => {
                this.payments = data;
            },
            error => {
                console.error('Error fetching payments:', error);
            }
        );
    }

    filterPayments(): Payment[] {
        if (!this.searchTerm) {
            return this.payments;
        }
        return this.payments.filter(payment =>
            payment.id?.toString().includes(this.searchTerm) ||
            payment.order?.id?.toString().includes(this.searchTerm) ||
            payment.paymentDate?.toString().includes(this.searchTerm) ||
            payment.amount?.toString().includes(this.searchTerm)
        );
    }
}
