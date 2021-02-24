import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    // TODO
    const income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => {
        return acc + curr.value;
      }, 0);

    const outcome = this.transactions
      .filter(t => t.type === 'outcome')
      .reduce((acc, curr) => {
        return acc + curr.value;
      }, 0);

    const total = income - outcome;

    return { total, income, outcome };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
