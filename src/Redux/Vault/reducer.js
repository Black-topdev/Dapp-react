import {CANCEL_LOADING} from '../Swap/constans'
import {
  CLEAR_VALUES,
  GET_CONVERTED_USDC_CCPT_VALUES_SUCCESS,
  GET_DEPOSITED_BALANCE_SUCCESS,
  GET_VAULT_BALANCE_SUCCESS,
  SHARES_TOTAL,
  VAULT_DEPOSIT_FAIL,
  VAULT_DEPOSIT_REQUEST,
  VAULT_DEPOSIT_SUCCESS,
} from './constants'

const initialState = {
  vaultLoading: false,
  vaultError: false,
  vaultHash: '',
  vaultType: '',
  usdc_ccpt_Balance: 0,
  depositedLpBalance: 0,
  withdrawLpBalance: 0,
  vaultLpBalance: 0,
  vaultRewards: 0,
  apy: 0,
  totalLp: 0,
  totalSup: 0,
  reserves: {},
  userShares: 0,
  dailyRewards: {},
  totalShares: 0,
  LpTokenPrice: 0,
  treasuryUSDC: 0,
  treasuryCAPL: 0,
  treasuryUSDC_CAPL: 0,
  apr: 0,
}
export const vaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_LOADING:
      return {
        ...state,
        vaultLoading: false,
      }
    case SHARES_TOTAL:
      return {
        ...state,
        apy: action.payload.trans,
        totalLp: action.payload.totalLp,
        totalShares: action.payload.totalShares,
        LpTokenPrice: action.payload.LpTokenPrice,
        apr: action.payload.apr,
      }
    case GET_DEPOSITED_BALANCE_SUCCESS:
      return {
        ...state,
        depositedLpBalance: action.payload.depositedLpBalance,
        withdrawLpBalance: action.payload.withdrawLpBalance,
        vaultRewards: action.payload.vaultRewards,
        totalSup: action.payload.totalSup,
        reserves: action.payload.reserves,
        dailyRewards: action.payload.dailyRewards,
        treasuryUSDC: action.payload.treasuryUSDC,
        treasuryCAPL: action.payload.treasuryCAPL,
        treasuryUSDC_CAPL: action.payload.treasuryUSDC_CAPL,
      }
    case GET_CONVERTED_USDC_CCPT_VALUES_SUCCESS:
      return {
        ...state,
        usdc_ccpt_Balance: action.payload,
      }
    case VAULT_DEPOSIT_REQUEST:
      return {
        ...state,
        vaultError: false,
        vaultLoading: true,
        vaultType: action.payload,
      }
    case VAULT_DEPOSIT_SUCCESS:
      return {
        ...state,
        vaultLoading: false,
        vaultError: false,
        vaultHash: action.payload,
      }
    case VAULT_DEPOSIT_FAIL:
      return {
        ...state,
        vaultLoading: false,
        vaultError: action.payload,
      }
    case CLEAR_VALUES:
      return {
        ...state,
        vaultLoading: false,
        vaultError: false,
        vaultHash: '',
        vaultType: '',
      }

    // case VAULT_TRANSFORM_REQUEST:
    //   return {
    //     ...state,
    //     vaultTransformError: false,
    //     vaultTransformLoading: true,
    //     vaultTransformType: action.payload,
    //   }
    // case VAULT_TRANSFORM_SUCCESS:
    //   clearValue()
    //   return {
    //     ...state,
    //     vaultTransformLoading: false,
    //     vaultTransformError: false,
    //     vaultTransformHash: action.payload,
    //     vaultHash: action.payload,
    //   }
    // case VAULT_TRANSFORM_FAIL:
    //   return {
    //     ...state,
    //     vaultTransformLoading: false,
    //     vaultTransformError: action.payload,
    //   }
    default:
      return state
  }
}
