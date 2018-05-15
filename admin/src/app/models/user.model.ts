import {JsonObject, JsonProperty} from "json2typescript";
import {environment} from '../../environments/environment';

@JsonObject
export class User {

  @JsonProperty("id", String, true)
  id: string = undefined;

  @JsonProperty("username", String)
  username: string = undefined;

  @JsonProperty("password", String, true)
  password: string = undefined;

  @JsonProperty("matchingPassword", String, true)
  matchingPassword: string = undefined;

  @JsonProperty("email", String)
  email: string = undefined;

  @JsonProperty("firstName", String, true)
  firstName: string = undefined;

  @JsonProperty("lastName", String, true)
  lastName: string = undefined;


}
