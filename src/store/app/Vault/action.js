import { createScopedActionTypes } from 'store/utils'

export const actionTypes = createScopedActionTypes('app.Vault', [
  'VAULT',
  'MNEMONIC',
])

export const generateVault = password => async (dispatch, getStore) => {
  // dispatch({
  //   type: actionTypes.MNEMONIC,
  //   payload: { value: mnemonic },
  // })
}

export const reviveVault = () => async (dispatch, getStore) => {
  // return new Promise(resolve =>
  //   storage.get(['vault'], ({ vault }) => {
  //     dispatch({
  //       type: actionTypes.VAULT,
  //       payload: { value: vault },
  //     })
  //     resolve()
  //   })
  // )
}

export const importVault = vault => (dispatch, getStore) => {
  // TODO
}
