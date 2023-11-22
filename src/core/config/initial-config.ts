import { IScriptConfig } from './script-config.model';

export const InitialScriptConfig: IScriptConfig = {
  leverage: 1,
  minBuyBudget: 10,
  isPaperMode: false,
  exchangeMarket: 'bybit_linear',

  maxTotalOps: 0,
  maxConcurrentOps: 0,

  mainTfs: ['1m'],

  pumpTFs: [],
  pumpingSymbolsPerTF: 0,
  pumpStrongestPresenceDisabled: false,

  dumpTFs: [],
  dumpingSymbolsPerTF: 0,
  dumpStrongestPresenceDisabled: false,
};
