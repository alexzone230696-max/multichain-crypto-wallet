import { createWallet, getBalance, generateMnemonic } from 'multichain-crypto-wallet';

export default async function handler(req, res) {
    if (req.method === 'GET' && req.query.action === 'mnemonic') {
        const mnemonic = generateMnemonic();
        res.status(200).json({ mnemonic });
    } 
    else if (req.method === 'POST' && req.body.action === 'wallet') {
        const { mnemonic, network } = req.body;
        const wallet = await createWallet(mnemonic, network);
        res.status(200).json(wallet);
    } 
    else if (req.method === 'GET' && req.query.action === 'balance') {
        const { network, address } = req.query;
        const balance = await getBalance(network, address);
        res.status(200).json({ balance });
    } 
    else {
        res.status(400).json({ error: 'Invalid request' });
    }
}