declare module 'koroman' {
  export type CasingOption = 'lowercase' | 'uppercase' | 'capitalize-words' | 'capitalize-lines';

  export interface RomanizeOptions {
    usePronunciationRules?: boolean;
    casingOption?: CasingOption;
  }

  export function romanize(str: string, options?: RomanizeOptions): string;
} 