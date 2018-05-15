
import {JsonObject, JsonProperty} from "json2typescript";
import {User} from '../user.model';

@JsonObject
export class UsersPage {

  @JsonProperty("content", [User])
  content: User[] = undefined;

  @JsonProperty("number", Number)
  currentPage : number = undefined;

  @JsonProperty("totalPages", Number)
  totalPages : number = undefined;

  @JsonProperty("totalElements", Number)
  totalElements : number = undefined;

  @JsonProperty("last", Boolean)
  isLastPage : boolean = undefined;



}
