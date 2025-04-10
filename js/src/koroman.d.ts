declare module 'koroman' {
  export type CasingOption = 'lowercase' | 'uppercase' | 'capitalize-word' | 'capitalize-line';

  export interface RomanizeOptions {
    usePronunciationRules?: boolean;
    casingOption?: CasingOption;
  }

  export function romanize(str: string, options?: RomanizeOptions): string;
} 