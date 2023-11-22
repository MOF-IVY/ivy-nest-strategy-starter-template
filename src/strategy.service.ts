import { Injectable } from '@nestjs/common';
import { BehaviorSubject, combineLatest, filter, switchMap, tap } from 'rxjs';

import {
  IvySDKService,
  IvyScriptConfigService,
  IvyStrongestPresenceService,
  IvyOperationsManagerService,
} from '@mof-ivy/ivy-nest-strategies-common-module';

import { IIKEvent } from '@mof-ivy/ivy-node-sdk';
import { IStandardWsError } from '@mof-ivy/ivy-node-sdk/dist/core/services/base/ws.service';

import { ScriptLogKeys } from './core/constants/log-keys.const';
import { IScriptConfig } from './core/config/script-config.model';

@Injectable()
export class StrategyService {
  private isRestarting$ = new BehaviorSubject(false);

  private readonly logger: (
    message: object | string,
    logKey: string,
    persist?: boolean,
  ) => Promise<boolean | IStandardWsError>;

  constructor(
    private readonly SP: IvyStrongestPresenceService,
    private readonly sdk: IvySDKService<IScriptConfig>,
    private readonly config: IvyScriptConfigService<IScriptConfig>,
    private readonly operationsManager: IvyOperationsManagerService,
  ) {
    this.logger = this.sdk.instance.log.bind(this.sdk.instance);
  }

  run() {
    this.setupStreamsOrBlock();
  }

  private get isRestarting() {
    return this.isRestarting$.getValue();
  }

  private async onIKEvent(event: IIKEvent) {
    if (this.isRestarting) return;
  }

  private setupStreamsOrBlock() {
    combineLatest([
      this.sdk.subscribeReady(),
      this.config.subscribeReady(),
      this.SP.subscribeReady(),
    ])
      .pipe(
        filter(([sdk, config, SP]) => !!sdk && !!config && !!SP),
        switchMap(() => this.sdk.instance.enableIKStream()),
        filter((error) => {
          if (!!error) {
            this.logger(
              'Cannot enable IK stream',
              ScriptLogKeys.scriptFatal,
              true,
            );
            return false;
          }
          return true;
        }),
        tap(() =>
          this.sdk.instance
            .subscribeRestartCommands()
            .pipe(tap(() => this.handleRestartCommand()))
            .subscribe(),
        ),
        tap(() => {
          this.sdk.instance
            .subscribeIKStream()
            .pipe(tap((event) => this.onIKEvent(event)))
            .subscribe();
        }),
        tap(() => this.logger('Script ready', ScriptLogKeys.scriptInfo)),
      )
      .subscribe();
  }

  private handleRestartCommand() {
    this.isRestarting$.next(true);
    this.logger('Will restart in 10s...', ScriptLogKeys.scriptInfo);
    setTimeout(() => {
      // Will be restarted by the docker restart policy
      process.exit(0);
    }, 1000 * 10);
  }
}
