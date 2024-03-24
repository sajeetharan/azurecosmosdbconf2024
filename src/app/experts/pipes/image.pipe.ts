import { Pipe, PipeTransform } from "@angular/core";
import { expert } from "../interfaces/expert.interface";

@Pipe({
  name: "image",
})
export class ImagePipe implements PipeTransform {
  transform(expert: expert): string {
    if (expert.id == undefined && expert.photoUrl == " ") {
      return "assets/no-image.png";
    } else if (expert.photoUrl) {
      return expert.photoUrl;
    } else {
      return `assets/experts/${expert.id}.jpg`;
    }
  }
}
