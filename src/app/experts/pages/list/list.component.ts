import { Component, OnInit } from "@angular/core";
import { expertsService } from "../../services/experts.service";
import { expert } from "../../interfaces/expert.interface";
import { ActivatedRoute } from "@angular/router";
import { FADEINOUT } from "../../services/fade-in-fade-out.animation";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  animations: [FADEINOUT],
  styles: [],
})
export class ListComponent implements OnInit {
  experts: expert[] = [];

  constructor(private expertsService: expertsService) {}

  ngOnInit(): void {
    this.loadexperts();
  }
  logAnimation(_event: any) {
    console.log(_event);
  }
  loadexperts() {
    this.experts = [];
    this.expertsService.getexperts().subscribe((data: any) => {
      this.experts = data.data.experts.items;
      console.log("data loaded");
      console.log(data.data.experts.items.length);
    });
  }
}
