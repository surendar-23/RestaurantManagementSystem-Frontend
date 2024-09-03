import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {ChefService} from '../../services/chef.service';
import {Feedback} from '../../model/feedback';
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-view-feedbacks',
    standalone: true,
    templateUrl: './view-feedbacks.component.html',
    imports: [
        NgForOf,
        NgIf
    ],
    styleUrls: ['./view-feedbacks.component.css']
})
export class ViewFeedbacksComponent implements OnInit {
    feedbacks: Feedback[] = [];

    constructor(private chefService: ChefService) {
    }

    ngOnInit(): void {
        this.getFeedbacks();
    }

    getFeedbacks(): void {
        this.chefService.getFeedbacks().pipe(take(1)).subscribe(
            (res: any) => {
                if (res && Array.isArray(res)) {
                    this.feedbacks = res;
                } else {
                    console.error("Unexpected response format:", res);
                }
            },
            (err) => {
                console.error("Error fetching feedbacks:", err);
            }
        );
    }
}
