import * as dayjs from 'dayjs';

export const formatDate = (timestamp: number) =>
   dayjs.unix(timestamp / 1000).format('DD MMM YYYY [at] HH:mm');
