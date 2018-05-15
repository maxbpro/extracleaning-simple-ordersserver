
import {JsonObject, JsonProperty} from "json2typescript";
import {ApiSubError} from "./api-sub-error.model";
import {DateConverter} from '../../shared/converters/date.converter';

@JsonObject
export class ApiError {

  @JsonProperty("status", String)
  status: String = undefined;

  @JsonProperty("type", String, true)
  type?: string = "danger";

  @JsonProperty("message", String, true)
  message?: string = undefined;

  @JsonProperty("debugMessage", String, true)
  debugMessage?: string = undefined;

  @JsonProperty("timestamp", DateConverter)
  timestamp: Date = undefined;

  @JsonProperty("subErrors", [ApiSubError], true)
  subErrors: ApiSubError[] = [];


}
