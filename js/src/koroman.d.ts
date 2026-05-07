declare module 'koroman' {
  export type CasingOption =
    | 'lowercase' | 'lower' | 'l' | 'lc' | 0
    | 'uppercase' | 'upper' | 'u' | 'uc' | 1
    | 'capitalize-line' | 'cap-line' | 'cline' | 'cl' | 2
    | 'capitalize-word' | 'cap-word' | 'cword' | 'cw' | 3;

  export type NormalizedCasingOption = 'lowercase' | 'uppercase' | 'capitalize-line' | 'capitalize-word';

  export interface RomanizeOptions {
    usePronunciationRules?: boolean;
    casingOption?: CasingOption;
  }

  export function romanize(str: string, options?: RomanizeOptions): string;
  export function normalizeCasingOption(opt: CasingOption | string | number | null | undefined): NormalizedCasingOption;
}
