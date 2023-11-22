import { IScriptConfig } from './script-config.model';

export const InitialScriptConfig: IScriptConfig = {
  leverage: 1,
  minBuyBudget: 2,
  isPaperMode: true,
  exchangeMarket: 'bybit_linear',

  maxTotalOps: 0,
  maxConcurrentOps: 10,

  takeProfitPercentage: null,

  normalOpenMode: 'Market',
  stopLossCloseMode: 'Market',
  takeProfitCloseMode: 'Market',

  mainTfs: ['30m'],

  pumpTFs: ['1d'],
  pumpingSymbolsPerTF: 3,
  pumpStrongestPresenceDisabled: false,

  dumpTFs: ['1d'],
  dumpingSymbolsPerTF: 3,
  dumpStrongestPresenceDisabled: false,
};
