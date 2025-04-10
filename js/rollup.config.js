export default {
    input: 'src/koroman.mjs',
    output: {
      file: 'dist/koroman.browser.js',
      format: 'iife',
      name: 'koroman', // 전역 변수로 window.koroman 생성
    },
  };