import { StatusCodes } from './httpStatus.enum';

export const ErrorCodes = <const>{
  COMMON_ERROR: {
    message: '처리 중 오류가 발생했어요.',
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  TRANSACTION_ERROR: {
    message: '트랜잭션 처리 중 오류가 발생했어요.',
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  UNDEFINED_ERROR: {
    message: '알 수 없는 오류가 발생했어요.',
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  INVALID_TOKEN: {
    message: '보안 토큰이 잘못됐어요.',
    status: StatusCodes.UNAUTHORIZED,
  },
  NOT_FOUND_TOKEN: {
    message: '보안 토큰을 찾을 수 없어요.',
    status: StatusCodes.NOT_FOUND,
  },
  EXPIRED_TOKEN: {
    message: '토큰이 만료됐어요. 다시 시도해주세요',
    status: StatusCodes.UNAUTHORIZED,
  },
  USER_VALIDATION: {
    message: '유저 인증에 실패했어요.',
    status: StatusCodes.NOT_FOUND,
  },
  NO_USER: {
    message: '사용자 정보가 없어요.',
    status: StatusCodes.BAD_REQUEST,
  },
  USER_NO_TYPE: {
    message: '유저 타입이 잘못됐어요(NoType).',
    status: StatusCodes.UNAUTHORIZED,
  },
  SUPERVISOR_VALIDATION: {
    message: '관리자 인증에 실패했어요.',
    status: StatusCodes.NOT_FOUND,
  },
  NOT_ROOT_SUPERVISOR: {
    message: '최상위 관리자가 아니에요.',
    status: StatusCodes.BAD_REQUEST,
  },
  NOT_FOUND_DATA: {
    message: '데이터를 가져오는 중 에러가 발생했어요.',
    status: StatusCodes.NOT_FOUND,
  },
  UNAUTHORIZED_USER: {
    message: '아직 검증이되지 않은 아이디에요.',
    status: StatusCodes.UNAUTHORIZED,
  },
  INVALID_INPUT: {
    message: '전달된 파라미터 중 잘못된 항목이있어요.',
    status: StatusCodes.BAD_REQUEST,
  },
  INVALID_USER: {
    message: '유효하지 않은 회원이에요.',
    status: StatusCodes.BAD_REQUEST,
  },
  INVALID_REQUEST: {
    message: '유효하지 않은 요청이에요.',
    status: StatusCodes.BAD_REQUEST,
  },
  INVALID_ACTION: {
    message: '유효하지 않은 액션이에요.',
    status: StatusCodes.BAD_REQUEST,
  },
  USER_FAIL: {
    message: '사용자 처리 중 오류가 발생했어요.',
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  VERIFY_TOKEN_FAIL: {
    message: 'SMS 인증 중 오류가 발생했어요.',
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  DELETE_FAIL: {
    message: '삭제에 실패했어요.',
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  UPLOADS_FILE_FAIL: {
    message: '파일 처리에 실패했어요.',
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  TREE_GROWTH_NOT_FOUND: {
    message: '나무 정보를 찾을 수 없어요.',
    status: StatusCodes.NOT_FOUND,
  },
  PRODUCT_NOT_FOUND: {
    message: '상품 정보를 찾을 수 없어요.',
    status: StatusCodes.NOT_FOUND,
  },
};
