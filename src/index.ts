import { Auth } from './auth';
import { applyMixins } from './utils';
import { Base } from './base';
import { Rides } from './rides';

class Cocolis extends Base {}
interface Cocolis extends Auth, Rides {}
applyMixins(Cocolis, [Auth, Rides]);

export default Cocolis;
