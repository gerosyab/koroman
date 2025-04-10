package app.daissue.koroman;

import java.util.regex.Pattern;
import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class KoromanTest {
    @Test
    public void testBasic() {

        Pattern testPattern = Pattern.compile("ᆮ이");
        System.out.println("Match? " + testPattern.matcher("굳이").find()); // 테스트

        System.out.println("\n=== Basic Tests ===");
        testAndPrint("한글", "hangeul");
        testAndPrint("굳이", "guji");
        testAndPrint("문래", "mullae");
        testAndPrint("해돋이", "haedoji");
        testAndPrint("로마자", "romaja");
        testAndPrint("안녕하세요", "annyeonghaseyo");
        testAndPrint("테스트", "teseuteu");
    }

    @Test
    public void testPronunciationRules() {
        System.out.println("\n=== Pronunciation Rules Tests ===");
        System.out.println("With pronunciation rules (default):");
        testAndPrint("굳이", "guji", true);
        testAndPrint("해돋이", "haedoji", true);

        System.out.println("\nWithout pronunciation rules:");
        testAndPrint("굳이", "gudi", false);
        testAndPrint("해돋이", "haedodi", false);
    }

    @Test
    public void testCasing() {
        System.out.println("\n=== Casing Tests ===");
        testAndPrint("한글", "HANGEUL", Koroman.CasingOption.UPPERCASE);
        testAndPrint("한글\n한글 한글 한글", "Hangeul\nHangeul hangeul hangeul", Koroman.CasingOption.CAPITALIZE_LINES);
        testAndPrint("한글 한글 한글 한글", "Hangeul Hangeul Hangeul Hangeul", Koroman.CasingOption.CAPITALIZE_WORDS);
    }

    @Test
    public void testMultiline() {
        System.out.println("\n=== Multiline Tests ===");
        testAndPrint("한글\n한글", "hangeul\nhangeul");
        testAndPrint("한글\n\n한글", "hangeul\n\nhangeul");
        testAndPrint("한글\n\n\n한글", "hangeul\n\n\nhangeul");
    }

    @Test
    public void testSpacing() {
        System.out.println("\n=== Spacing Tests ===");
        testAndPrint("한글 한글", "hangeul hangeul");
        testAndPrint("한글  한글", "hangeul  hangeul");
        testAndPrint("한글   한글", "hangeul   hangeul");
    }

    private void testAndPrint(String input, String expected) {
        String result = Koroman.romanize(input);
        System.out.printf("Input: '%s' -> Expected: '%s', Got: '%s'%n", input, expected, result);
        assertEquals(expected, result);
    }

    private void testAndPrint(String input, String expected, boolean usePronunciationRules) {
        String result = Koroman.romanize(input, usePronunciationRules);
        System.out.printf("Input: '%s' -> Expected: '%s', Got: '%s'%n", input, expected, result);
        assertEquals(expected, result);
    }

    private void testAndPrint(String input, String expected, Koroman.CasingOption casingOption) {
        String result = Koroman.romanize(input, casingOption);
        System.out.printf("Input: '%s' -> Expected: '%s', Got: '%s'%n", input, expected, result);
        assertEquals(expected, result);
    }
} 