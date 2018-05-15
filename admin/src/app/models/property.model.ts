import {JsonObject, JsonProperty} from "json2typescript";
import {environment} from '../../environments/environment';

@JsonObject
export class Property {

  @JsonProperty("value", String, true)
  value: string = undefined;


}
