import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initalIncome = 0;
    const incomeBalance = this.transactions.reduce(function (
      acumulador,
      valorAtual,
    ) {
      if (valorAtual.type === 'income') {
        return acumulador + valorAtual.value;
      }
      return acumulador;
    },
    initalIncome);
    const initalOutcome = 0;
    const outcomeBalance = this.transactions.reduce(function (
      acumulador,
      valorAtual,
    ) {
      if (valorAtual.type === 'outcome') {
        return acumulador + valorAtual.value;
      }
      return acumulador;
    },
    initalOutcome);
    const balance = {
      income: incomeBalance,
      outcome: outcomeBalance,
      total: incomeBalance - outcomeBalance,
    };
    return balance;
  }

  public create(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
