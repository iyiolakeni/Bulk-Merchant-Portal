import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {

constructor() {

super({

  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

  ignoreExpiration: false,

  secretOrKey: 'sdijsodnoefuidnjoewdji3989q0oqwjdsoohcdewjd0e90cihcdsdciofiu',

});

}

async validate(payload: any) {

return { userId: payload.sub, username: payload.username };

}

}