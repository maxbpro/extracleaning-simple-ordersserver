import {JsonObject, JsonProperty} from "json2typescript";
import {Property} from '../property.model';

@JsonObject
export class MattressGroup {

  @JsonProperty("slider", Boolean, true)
  slider: boolean = undefined;

  @JsonProperty("size", Property, true)
  size: Property = undefined;

  @JsonProperty("sides", Property, true)
  sides: Property = undefined;

  @JsonProperty("number", Property, true)
  number: Property = undefined;

}
