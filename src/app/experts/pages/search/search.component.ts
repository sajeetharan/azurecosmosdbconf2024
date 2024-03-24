import { Component, OnInit } from "@angular/core";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { expert } from "../../interfaces/expert.interface";
import { expertsService } from "../../services/experts.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styles: [],
})
export class SearchComponent implements OnInit {
  term: string = "";
  experts: expert[] = [];
  selectedexpert!: expert | undefined;
  termChanged = new Subject<string>();

  constructor(private expertsService: expertsService) {
    this.termChanged.pipe(debounceTime(300)).subscribe((term) => {
      this.search(term);
    });
  }

  changed() {
    this.termChanged.next("test");
  }

  ngOnInit(): void {}

  search(term: string) {
    this.expertsService
      .getSuggestions(this.term.trim())
      .subscribe(({ data }) => {
        const experts: expert[] = data.experts.items;
        this.experts = experts;
      });
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedexpert = undefined;
      return;
    }

    const expert: expert = event.option.value;
    this.term = expert.name;
  }
}
