import dotenv from 'dotenv';
dotenv.config();
import moment from 'moment';
import {includes, remove} from 'lodash';
import {stringifyUrl} from 'query-string';
const x_rate_url = process.env.X_RATE_URL;
const bases: string[] = [ 'CAD', 'HKD', 'ISK', 'PHP', 'DKK', 'HUF', 'CZK', 'GBP', 'RON', 'SEK', 'IDR', 'INR', 'BRL', 'RUB', 'HRK', 'JPY', 'THB', 'CHF', 'EUR', 'MYR', 'BGN', 'TRY', 'CNY', 'NOK', 'NZD', 'ZAR', 'USD', 'MXN', 'SGD', 'AUD', 'ILS', 'KRW', 'PLN'];

async function getRate(options: any): Promise<any> {
  const {date, base, targets} = options;
  const mDate = moment(date);
  const url = `${x_rate_url}/${mDate.isValid() ? mDate.format('YYYY-MM-DD') : 'latest'}`;
  const query: any = {};
  if (base && includes(bases, base.toUpperCase())) {
    query.base = base;
  }
  if (targets && Array.isArray(targets)) {
    const symbols = remove(targets, n => includes(bases, n.toLowerCase()));
    query.symbols = symbols;
  }

  const rate: Response = await fetch(stringifyUrl({url, query}));
  return rate;
}

export default getRate;

module.exports = getRate;
