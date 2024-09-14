import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OwnerService} from "../../services/owner.service";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-update-chef-details',
    templateUrl: './update-chef.component.html',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
    styleUrls: ['./update-chef.component.css']
})
export class UpdateChefComponent implements OnInit {
    idForm: FormGroup;
    chefForm: FormGroup;
    loading = false;
    errorMessage: string | null = null;
    successMessage: string | null = null;
    chefId: number | null = null;

    constructor(
        private userService: OwnerService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.idForm = this.fb.group({
            chefId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
        });

        this.chefForm = this.fb.group({
            name: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            address: ['', [Validators.required]],
            district: ['', [Validators.required]],
            state: ['', [Validators.required]],
            zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
            emailId: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    ngOnInit(): void {
    }

    onIdSubmit(): void {
        if (this.idForm.invalid) {
            return;
        }

        this.chefId = +this.idForm.value.chefId;
        this.loadChef();
    }

    loadChef(): void {
        if (this.chefId === null) {
            this.errorMessage = 'Invalid chef ID.';
            return;
        }

        this.loading = true;
        this.userService.getUserById(this.chefId).subscribe({
            next: (data) => {
                this.chefForm.patchValue({
                    name: `${data.firstName} ${data.lastName}`,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    district: data.district,
                    state: data.state,
                    zipCode: data.zipCode,
                    emailId: data.emailId,
                    password: data.password
                });
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Error loading chef details.';
                this.loading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.chefForm.invalid) {
            return;
        }

        if (this.chefId === null) {
            this.errorMessage = 'Chef ID is not set.';
            return;
        }

        this.loading = true;
        const formValue = this.chefForm.value;
        const updatedChef = {
            ...formValue,
            userId: this.chefId,
            firstName: formValue.name.split(' ')[0],
            lastName: formValue.name.split(' ')[1]
        };

        this.userService.updateUser(this.chefId, updatedChef).subscribe({
            next: () => {
                this.loading = false;
                alert('Updated Chef details successfully'); // Show alert
                setTimeout(() => this.router.navigate(['/restaurant/manage-chefs']), 2000);
            },
            error: (err) => {
                this.errorMessage = 'Error updating chef details.';
                this.loading = false;
            }
        });
    }
}
