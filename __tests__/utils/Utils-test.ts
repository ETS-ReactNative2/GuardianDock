import {parseDisplayName} from "../../src/utils/utils";

describe('#parseDisplayName(displayName)', () => {
    it('Must correctly parse the Bungie ID', () => {
        let [parsedName, parsedCode] = parseDisplayName("Test#0000")
        expect(parsedName).toBe('Test')
        expect(parsedCode).toBe('0000')
    });
    it('Must only parse the BungieName and BungieCode must be undefined', () => {
        let [parsedName, parsedCode] = parseDisplayName("Test")
        expect(parsedName).toBe('Test')
        expect(parsedCode).toBe(undefined)
    });
    it('Must only parse the BungieCode and BungieName must be undefined', () => {
        let [parsedName, parsedCode] = parseDisplayName("#0001")
        expect(parsedName).toBe('')
        expect(parsedCode).toBe('0001')
    })
})