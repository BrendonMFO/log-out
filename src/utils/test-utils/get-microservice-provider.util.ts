import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

export const getMicroserviceProvider = () => {
  return ClientsModule.register([
    {
      name: 'USER_PACKAGE',
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: join(__dirname, '../modules/user/user.proto'),
      },
    },
  ]);
};
