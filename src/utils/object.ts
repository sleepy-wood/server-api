type OValues = any[];
type OKeys = any[];

export const getObjectValues = (obj: Object): OValues => Object.entries(obj).map(([key, value]) => value);
export const getObjectKeys = (obj: Object): OKeys => Object.entries(obj).map(([key, value]) => key);
