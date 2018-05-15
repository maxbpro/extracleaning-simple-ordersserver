import {JsonObject, JsonProperty} from "json2typescript";
import {environment} from '../../environments/environment';
import {ChairGroup} from './group/chairgroup.model';
import {ArmchairGroup} from './group/armchairgroup.model';
import {MattressGroup} from './group/mattressgroup.model';
import {CouchGroup} from './group/couchgroup.model';
import {CoverGroup} from './group/covergroup.model';

@JsonObject
export class Order {

  @JsonProperty("id", String, true)
  id: string = undefined;

  @JsonProperty("phone", String)
  phone: string = undefined;

  @JsonProperty("address", String, true)
  address: string = undefined;

  @JsonProperty("date", String, true)
  date: string = undefined;

  @JsonProperty("chairGroup", ChairGroup, true)
  chairGroup: ChairGroup = undefined;

  @JsonProperty("armchairGroup", ArmchairGroup, true)
  armchairGroup: ArmchairGroup = undefined;

  @JsonProperty("mattressGroup", MattressGroup, true)
  mattressGroup: MattressGroup = undefined;

  @JsonProperty("couchGroup", CouchGroup, true)
  couchGroup: CouchGroup = undefined;

  @JsonProperty("coverGroup", CoverGroup, true)
  coverGroup: CoverGroup = undefined;



}
