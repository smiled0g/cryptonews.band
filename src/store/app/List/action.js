import { createScopedActionTypes } from 'store/utils'
import client from 'store/utils/bandprotocol'
import { CONTRACT_INFO } from 'config'
import { BigNumber } from 'bignumber.js'
import Base64 from 'base-64'

export const actionTypes = createScopedActionTypes('app.List', ['UPDATE_ITEM'])

export const fetchAllItems = () => async (dispatch, getState) => {
  const tcr = client.blockchain
    .contract('Registry')
    .call(CONTRACT_INFO.registry_address)

  const voting = client.blockchain
    .contract('Voting')
    .call(CONTRACT_INFO.voting_address)

  const activeListLength = (await tcr
    .method('active_list_length')
    .call()).toNumber()

  for (let i = activeListLength - 1; i >= 0; i--) {
    const itemId = await tcr.method('active_list_id_at').call(i)
    await dispatch(fetchItem(itemId.toString(), activeListLength - i))
  }
}

export const fetchItem = (itemId, freshness) => async (dispatch, getState) => {
  const tcr = client.blockchain
    .contract('Registry')
    .call(CONTRACT_INFO.registry_address)

  const voting = client.blockchain
    .contract('Voting')
    .call(CONTRACT_INFO.voting_address)

  try {
    const item = { id: itemId, freshness }

    item.content = JSON.parse(
      decodeURIComponent(
        escape(Base64.decode(await tcr.method('get_content').call(itemId)))
      )
    )
    item.app_expire = (await tcr
      .method('get_app_expire')
      .call(itemId)).toNumber()
    item.owner = await tcr.method('get_list_owner').call(itemId)
    item.need_update = await tcr.method('need_update').call(itemId)
    item.is_proposal = await tcr.method('is_proposal').call(itemId)
    item.deposit = (await tcr.method('get_deposit').call(itemId))
      .dividedBy(new BigNumber(10).pow(18))
      .toNumber()
    item.voting_id = await tcr.method('get_voting_id').call()
    item.active_challenge = (await tcr
      .method('get_active_challenge')
      .call(itemId)).toNumber()

    if (item.active_challenge) {
      const pollId = (await tcr.method('get_poll_id').call(itemId)).toNumber()
      // Fetch active challenge
      item.active_challenge = { poll_id: pollId }

      item.active_challenge.period = (await voting
        .method('get_period')
        .call(pollId)).toNumber()
      item.active_challenge.commit_end_time = (await voting
        .method('get_commit_end_time')
        .call(itemId)).toNumber()
      item.active_challenge.reveal_end_time = (await voting
        .method('get_reveal_end_time')
        .call(itemId)).toNumber()
      item.active_challenge.result = await voting
        .method('get_period')
        .call(pollId)
      item.active_challenge.vote_against = (await voting
        .method('get_vote_against')
        .call(pollId)).toNumber()
      item.active_challenge.vote_for = (await voting
        .method('get_vote_for')
        .call(pollId)).toNumber()
    } else {
      item.active_challenge = null
    }

    console.log(item)
    // Update item
    dispatch({
      type: actionTypes.UPDATE_ITEM,
      payload: { id: itemId.toString(), item },
    })
  } catch (e) {
    /* Moving on */
    console.log('Error:', e)
  }
}
