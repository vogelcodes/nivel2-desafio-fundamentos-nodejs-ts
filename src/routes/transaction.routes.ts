import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    const res = { transactions, balance };
    return response.json(res);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;
  const balance = transactionsRepository.getBalance();
  try {
    if (type === 'outcome' && balance.total < value) {
      return response.status(400).json({ error: 'Saldo Insuficiente' });
    }
    const res = transactionsRepository.create(title, value, type);
    return response.json(res);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
