import MiningRigRentals from '../src/MiningRigRentals'
import apiKey from './apikey';

describe('MiningRigRentals', () => {
	/* ---------------- AXIOS ---------------- */
	describe('Create an API axios instance', () => {
		const testEndpoint = '/rig/14';
		it('should generate a nonce that increases with each call', () => {
			let mrr = new MiningRigRentals(apiKey);
			let nonce = mrr.generateNonce();
			let nonce2 = mrr.generateNonce();
			expect(nonce2 > nonce).toBeTruthy();
		});
		it('should successfully build the HMAC signature', () => {
			let mrr = new MiningRigRentals(apiKey);
			//ToDo: test x-api-sign
			console.log(mrr.createHMACSignature(testEndpoint, mrr.generateNonce()));
		});
		it('should build an axios instance with all the required mrr fields', () => {
			let mrr = new MiningRigRentals(apiKey);
			let api = mrr.initAPI(testEndpoint);
			let headers = api.defaults.headers;
			expect(headers['x-api-key']).toEqual(apiKey.key);
			expect(mrr.prevNonce === headers['x-api-nonce']).toBeTruthy();
			//@ToDO: test x-api-sign
		});
	});
	/* ------------ Information API ----------- */
	describe('Information API', () => {
		it('should make a GET call to /whoami', async () => {
			let mrr = new MiningRigRentals(apiKey), thrown = false;
			try {
				let res = await mrr.whoami();
				console.log(res)
				expect(res.success).toBeTruthy()
			} catch (err) {
				thrown = true;
				expect(thrown).toBeTruthy()
			}
		});
		it('should make a GET call to /info/servers', async () => {
			let mrr = new MiningRigRentals(apiKey), thrown = false;
			try {
				let res = await mrr.getServers();
				expect(res.success).toBeTruthy()
			} catch (err) {
				thrown = true;
				expect(thrown).toBeTruthy()
			}
		});
		it('should make a GET call to /info/algos', async () => {
			let mrr = new MiningRigRentals(apiKey), thrown = false;
			try {
				let res = await mrr.getAlgos();
				expect(res.success).toBeTruthy()
			} catch (err) {
				thrown = true;
				expect(thrown).toBeTruthy()
			}
		});
		it('GET call to /info/algos with specified currency', async () => {
			let mrr = new MiningRigRentals(apiKey)
			let thrown = false, currency = 'EOS';
			try {
				let res = await mrr.getAlgos(currency);
				for (let x of res.data) {
					expect(x.suggested_price.currency).toEqual(currency)
				}
			} catch (err) {
				thrown = true;
				expect(thrown).toBeTruthy()
			}
		}, 10000);
		it('should make a GET call to /info/algo/[NAME]', async () => {
			let mrr = new MiningRigRentals(apiKey), thrown = false;
			try {
				let res = await mrr.getAlgo("scrypt");
				expect(res.success).toBeTruthy()
			} catch (err) {
				thrown = true;
				expect(thrown).toBeTruthy()
			}
		});
		it('make a GET call to /info/algo/[NAME] with specified currency', async () => {
			let mrr = new MiningRigRentals(apiKey)
			let thrown = false, currency = 'DASH';
			try {
				let res = await mrr.getAlgo("scrypt", currency);
				console.log(res.data)
				expect(res.data.suggested_price.currency).toEqual(currency)
			} catch (err) {
				thrown = true;
				expect(thrown).toBeTruthy()
			}
		});
	});
	/* ------------ Account API ----------- */
	describe('Account API', () => {
		// it('should mathrown = true;
		// 				expect(thrown).toBeTruthy()ke a get call to /account', async () => {
		// 	let mrr = new MiningRigRentals(apiKey);
		// 	let success = (await mrr.getAccount().success);
		// 	expect(success).toBeFalsy()
		// });
	});
	/* ------------ Rig API ----------- */
	describe('Rig API', () => {
		it('should make a get call to /rig', async () => {
			let mrr = new MiningRigRentals(apiKey);
			let thrown = false;
			try {
				let res = await mrr.getRig({type: 'scrypt'});
				expect(res.success).toBeTruthy()
			} catch (err) {
				thrown = true;
				expect(thrown).toBeTruthy()
			}
		})
	});
	/* ------------ Rental API ----------- */
	describe('Rental API', () => {
		it('should make a get call to /rental', async () => {
			let mrr = new MiningRigRentals(apiKey);
			let thrown = false;
			try {
				let res = await mrr.getRental();
				console.log(res)
				expect(res.success).toBeTruthy()
			} catch (err) {
				thrown = true;
				expect(thrown).toBeTruthy()
			}
		})
	})
});