import { IIvyScriptInitialConfig } from '@mof-ivy/ivy-nest-strategies-common-module';

export interface IScriptConfig extends IIvyScriptInitialConfig {
  /**
   * The take profit percentage
   * it must be a positive number
   *
   * If NULL is disabled
   */
  takeProfitPercentage: number;

  /**
   * In which mode to open the operations
   */
  normalOpenMode: 'Market' | 'Limit';

  /**
   * In which mode to close the take profit order
   */
  takeProfitCloseMode: 'Market' | 'Limit';

  /**
   * In which mode to close the stop loss order
   *
   * The stop loss order is issued if:
   * - operation is long and current heikinashi price has gone below
   * current heikinashi open price
   *
   * - operation is short and current heikinashi price has gone above
   * current heikinashi open price
   */
  stopLossCloseMode: 'Market' | 'Limit';
}
