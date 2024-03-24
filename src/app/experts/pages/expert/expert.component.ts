import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";

import { expert } from "../../interfaces/expert.interface";
import { expertsService } from "../../services/experts.service";

@Component({
  selector: "app-expert",
  templateUrl: "./expert.component.html",
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class expertComponent implements OnInit {
  expert!: expert;

  constructor(
    private activatedRoute: ActivatedRoute,
    private expertsService: expertsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.expertsService.getexpertById(id)))
      .subscribe((data: any) => {
        this.expert = data.data.expert_by_pk;
        console.log(this.expert);
      });
  }

  comeBack() {
    this.router.navigate(["experts/list"]);
  }
}
