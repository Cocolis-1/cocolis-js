import { Auth } from './auth';
import { applyMixins } from './utils';
import { Base } from './base';
import { Rides } from './rides';
import { Webhooks } from './webhooks';

class Cocolis extends Base {}
interface Cocolis extends Auth, Rides, Webhooks {}
applyMixins(Cocolis, [Auth, Rides, Webhooks]);

export = Cocolis;
