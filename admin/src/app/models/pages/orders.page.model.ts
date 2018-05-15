
import {JsonObject, JsonProperty} from "json2typescript";
import {Order} from '../order.model';

@JsonObject
export class OrdersPage {

  @JsonProperty("content", [Order])
  content: Order[] = undefined;

  @JsonProperty("number", Number)
  currentPage : number = undefined;

  @JsonProperty("totalPages", Number)
  totalPages : number = undefined;

  @JsonProperty("totalElements", Number)
  totalElements : number = undefined;

  @JsonProperty("last", Boolean)
  isLastPage : boolean = undefined;



}
