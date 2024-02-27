import { ACTIVATION_STATUS, BANNER_POSITION, CURRENCY_TYPE } from '../prisma/generated/client'

export const CLIENT_IP = process.env.NODE_ENV == 'production' ? 'https://admin.bazargram.app' : 'http://localhost:3000';
export const API_IP = process.env.NODE_ENV == 'production' ? 'https://api.bazargram.app' : 'http://localhost:3000/api';
export const ADMIN_URL = `${CLIENT_IP}`;
export const API_URL = process.env.NEXTAUTH_URL;
// export const API_URL = `${API_IP}`;
export const CDN_URI = `https://kaufmann-image.s3.eu-central-1.amazonaws.com`;
export const UPLOAD_URL = '/api/upload';

export const MAX_FILE_SIZE = 2_000_000;
export const PAGE_SIZE = 5;

export const REFRESH_TOKEN_EXPIRE_TIME = 30 * 24 * 60 * 60 * 1000; // 30 day
export const SESSION_EXPIRE_TIME = 15 * 60 * 1000; // 15min
export const SESSION_RECHECK_TIME = 1 * 60 * 1000; // check 1 min before expires

export const getRandom = () => {
  return Math.random();
};

export const REQUIRED_MESSAGE = 'Required';
export const UNAUTORIZED_MESSAGE = 'UnAutorized';
export const SEARCH_MESSAGE = 'Type For Search';
export const NOTFOUND_MESSAGE = 'List is Empty';
export const DELETE_MSG = 'آیتم مورد نظر حذف شد';
export const COMMENT_SENT = 'نظر شما ارسال شد و پس از تایید نمایش داده میشود';

export const activation_status_details = {
  [ACTIVATION_STATUS.ACCEPTED]: { id: ACTIVATION_STATUS.ACCEPTED, faName: 'Accepted', color: 'success' },
  [ACTIVATION_STATUS.PENDING]: { id: ACTIVATION_STATUS.PENDING, faName: 'Is Pending', color: 'info' },
  [ACTIVATION_STATUS.REJECTED]: { id: ACTIVATION_STATUS.REJECTED, faName: 'Rejected', color: 'failure' },
  [ACTIVATION_STATUS.SUSPENDED]: { id: ACTIVATION_STATUS.SUSPENDED, faName: 'Suspended', color: 'gray' },
};

export const banner_position_details = {
  [BANNER_POSITION.BOTTOM_LEFT]: { id: BANNER_POSITION.BOTTOM_LEFT, faName: 'Bottom Left' },
  [BANNER_POSITION.BOTTOM_RIGHT]: { id: BANNER_POSITION.BOTTOM_RIGHT, faName: 'Bottom Right' },
  [BANNER_POSITION.SLIDER]: { id: BANNER_POSITION.SLIDER, faName: 'Slider' },
  [BANNER_POSITION.TOP_LEFT]: { id: BANNER_POSITION.TOP_LEFT, faName: 'Top Left' },
  [BANNER_POSITION.TOP_RIGHT]: { id: BANNER_POSITION.TOP_RIGHT, faName: 'Top Right' },
};
export const boolean_details = {
  [1]: { faName: 'Yes', color: 'success' },
  [0]: { faName: 'No', color: 'failure' },
};

export const currency_type_details = {
  [CURRENCY_TYPE.EUR]: { id: CURRENCY_TYPE.EUR, faName: 'EUR' },
  [CURRENCY_TYPE.IRR]: { id: CURRENCY_TYPE.IRR, faName: 'تومان' },
  [CURRENCY_TYPE.USD]: { id: CURRENCY_TYPE.USD, faName: '$' },
  [CURRENCY_TYPE.TRY]: { id: CURRENCY_TYPE.TRY, faName: 'TL' },
};

export const deleteMSG = 'آیتم مورد نظر حذف شد';

// export const accounting_action_details = {
//   [Accounting_Action.In]: { id: Accounting_Action.In, faName: "واریز" },
//   [Accounting_Action.Out]: { id: Accounting_Action.Out, faName: "برداشت" },
// };
