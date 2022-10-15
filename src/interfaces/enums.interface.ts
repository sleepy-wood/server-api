export enum AttachFileType {
  Temp = 'Temp', // temporary
  Static = 'Static', // public
  Secure = 'Secure', // private
}

export enum ContextType {
  Request = 'Request',
  WebSocket = 'WebSocket',
  Unknown = 'Unknown',
}

export enum UserType {
  None = 'None',
  Guest = 'Guest',
  Kakao = 'Kakao',
}

export enum UserStatus {
  UnAuthorized = 'UnAuthorized', // 미인증
  Authorized = 'Authorized', // 인증
  AuthRequired = 'AuthRequired', // 추가 인증 필요
}
