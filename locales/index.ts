import en from '@locales/en';

type DeepReadonly<T> = T extends object
   ? {
        readonly [K in keyof T]: DeepReadonly<T[K]>;
     }
   : Readonly<T>;

export type Locales = DeepReadonly<typeof en>;
