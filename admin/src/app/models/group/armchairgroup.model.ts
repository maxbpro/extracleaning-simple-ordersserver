import {JsonObject, JsonProperty} from "json2typescript";
import {Property} from '../property.model';

@JsonObject
export class ArmchairGroup {

  @JsonProperty("slider", Boolean, true)
  slider: boolean = undefined;

  @JsonProperty("material", Property, true)
  material: Property = undefined;

  @JsonProperty("number", Property, true)
  number: Property = undefined;

}
