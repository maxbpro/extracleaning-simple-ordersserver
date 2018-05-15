import {JsonObject, JsonProperty} from "json2typescript";
import {Property} from '../property.model';

@JsonObject
export class CoverGroup {

  @JsonProperty("slider", Boolean, true)
  slider: boolean = undefined;

  @JsonProperty("type", Property, true)
  type: Property = undefined;

  @JsonProperty("height", Property, true)
  height: Property = undefined;

  @JsonProperty("width", Property, true)
  width: Property = undefined;

  @JsonProperty("params", Property, true)
  params: Property = undefined;

  @JsonProperty("material", Property, true)
  material: Property = undefined;

  @JsonProperty("number", Property, true)
  number: Property = undefined;






}
