import { BLOCKCHAIN_ENDPOINT } from 'config'
import BandProtocolClient from 'bandprotocol'

const client = new BandProtocolClient(BLOCKCHAIN_ENDPOINT)

export default client
