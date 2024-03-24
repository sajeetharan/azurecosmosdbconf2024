import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { expert } from "../../interfaces/expert.interface";
import { expertsService } from "../../services/experts.service";
import { ConfirmComponent } from "../../components/confirm/confirm.component";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styles: [
    `
      mat-icon {
        margin-right: 5px;
        margin-bottom: 5px;
      }
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AddComponent implements OnInit {
  types = [
    {
      id: "Medieval",
      desc: "Medieval",
    },
    {
      id: "Civil",
      desc: "Civil",
    },
  ];

  expert: expert = {
    name: " ", 
    job : "",
    company: "",
    bio:"",
    country: " ",
    shortBio: "",
    wickets: "",
    photoUrl: " ",
  };

  constructor(
    private expertsService: expertsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes("edit")) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.expertsService.getexpertById(id)))
      .subscribe((data: any) => {
        this.expert = data.data.expert_by_pk;
        console.log(this.expert);
      });
  }

  save() {
    if (this.expert.name.trim().length === 0) {
      return;
    }

    if (this.expert.id) {
      this.expertsService.updateexpert(this.expert).subscribe((resp) => {
        this.expert = resp;
        this.showSnackbar("The expert was updated");
      });
    } else {
      this.expertsService.addexpert(this.expert).subscribe(({ data }: any) => {
        this.router.navigate(["/experts/list"]);
        this.showSnackbar("The expert was created");
      });
    }
  }

  delete() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: "250px",
      data: this.expert,
    });

    dialog.afterClosed().subscribe((resp) => {
      if (resp) {
        if (this.expert.id) {
          this.expertsService.deleteexpert(this.expert).subscribe((resp) => {
            this.router.navigate(["/experts/list"]);
            this.showSnackbar("The expert was deleted");
          });
        }
      }
    });
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 2500,
    });
  }
}
