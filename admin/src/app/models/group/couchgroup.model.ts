import {JsonObject, JsonProperty} from "json2typescript";
import {Property} from '../property.model';

@JsonObject
export class CouchGroup {

  @JsonProperty("slider", Boolean, true)
  slider: boolean = undefined;

  @JsonProperty("size", Property, true)
  size: Property = undefined;

  @JsonProperty("moves", Property, true)
  moves: Property = undefined;

  @JsonProperty("material", Property, true)
  material: Property = undefined;

  @JsonProperty("number", Property, true)
  number: Property = undefined;


}
