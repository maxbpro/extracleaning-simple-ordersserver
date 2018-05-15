
import {Any, JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class ApiSubError{

  @JsonProperty("object", String, true)
  object: string = undefined;

  @JsonProperty("field", String, true)
  field?: string = undefined;

  @JsonProperty("message", String, true)
  message?: string = undefined;

  @JsonProperty("rejectedValue", Any, true)
  rejectedValue?: any = undefined;

}
