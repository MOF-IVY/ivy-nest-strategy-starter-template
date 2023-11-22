import { Module } from '@nestjs/common';
import { IvyNestStrategiesCommonModule } from '@mof-ivy/ivy-nest-strategies-common-module';

import { StrategyService } from './strategy.service';
import { InitialScriptConfig } from './core/config/initial-config';

@Module({
  imports: [
    IvyNestStrategiesCommonModule.register({
      scriptInitialScriptConfig: InitialScriptConfig,
      //   SDKConfig: {
      //     gatewayRestApiAddress: 'http://localhost:3005/api/v1/',
      //     instanceTraderRestApiAddress: 'http://localhost:3002/',
      //     instanceTraderWsApiAddress: 'http://localhost:3002/trader',
      //     gatewayWsApiAddress: 'ws://localhost:3005',
      //     instanceSSMWsApiAddress: 'ws://localhost:3001/ssm',
      //     instanceHistoryLoaderWsApiAddress: 'ws://localhost:3000/history-loader',
      //     instanceLoggingCenterWsApiAddress: 'ws://localhost:3003/logging-center',
      //     instanceControlCenterWsApiAddress: 'ws://localhost:3006/control-center',
      //     instanceControlCenterRestApiAddress:
      //       'http://localhost:3006/control-center',
      //   },
    }),
  ],
  providers: [StrategyService],
})
export class StrategyModule {}
