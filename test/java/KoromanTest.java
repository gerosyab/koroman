// test/java/KoromanTest.java
package app.daissue.koroman;

import org.junit.Test;
import static org.junit.Assert.*;

public class KoromanTest {

    @Test
    public void testBasic() {
        assertEquals("hangeul", Koroman.romanize("한글"));
        assertEquals("romaja", Koroman.romanize("로마자"));
        assertEquals("annyeonghaseyo", Koroman.romanize("안녕하세요"));
        assertEquals("teseuteu", Koroman.romanize("테스트"));
    }

    @Test
    public void testCasing() {
        String result = Koroman.romanize("한글");
        assertEquals("hangeul", Koroman.romanize("한글", true, "lowercase"));
        assertEquals("HANGEUL", Koroman.romanize("한글", true, "uppercase"));
        assertEquals("Hangeul Romaja Annyeonghaseyo", Koroman.romanize("한글 로마자 안녕하세요", true, "capitalize-word"));
        assertEquals("Hangeul romaja annyeonghaseyo", Koroman.romanize("한글 로마자 안녕하세요", true, "capitalize-line"));
    }

    @Test
    public void testPronunciationRules() {
        assertEquals("haedoji", Koroman.romanize("해돋이", true));
        assertEquals("haedodi", Koroman.romanize("해돋이", false));
        assertEquals("mullaeyeok", Koroman.romanize("문래역", true));
        assertEquals("munraeyeok", Koroman.romanize("문래역", false));
        assertEquals("seollleungyeok", Koroman.romanize("선릉역", true));
        assertEquals("seonreungyeok", Koroman.romanize("선릉역", false));
        assertEquals("yeongnyang", Koroman.romanize("역량", true));
        assertEquals("yeokryang", Koroman.romanize("역량", true));
    }

    @Test
    public void testMultilineAndSpacing() {
        assertEquals("yeogineun seolleungyeok imnida.\nhaedojiwa mullaeyeok geurigo yeongnyang gaebal.", Koroman.romanize("여기는 선릉역 입니다.\n해돋이와 문래역 그리고 역량 개발."));
        assertEquals("yeogineun seolleungyeok imnida.\r\nhaedojiwa mullaeyeok geurigo yeongnyang gaebal.", Koroman.romanize("여기는 선릉역 입니다.\r\n해돋이와 문래역 그리고 역량 개발."));
        assertEquals("yeogineun seolleungyeok imnida.\n\rhaedojiwa mullaeyeok geurigo yeongnyang gaebal.", Koroman.romanize("여기는 선릉역 입니다.\n\r해돋이와 문래역 그리고 역량 개발."));
    }

} 