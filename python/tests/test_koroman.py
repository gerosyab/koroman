import unittest
from koroman import romanize

class TestKoroman(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(romanize("한글"), "hangeul")
        self.assertEqual(romanize("로마자"), "romaja")
        self.assertEqual(romanize("안녕하세요"), "annyeonghaseyo")
        self.assertEqual(romanize("테스트"), "teseuteu")

    def test_casing(self):
        self.assertEqual(romanize("한글", casing_option="lowercase"), "hangeul")
        self.assertEqual(romanize("한글", casing_option="uppercase"), "HANGEUL")
        self.assertEqual(romanize("한글 로마자 안녕하세요", casing_option="capitalize-word"), "Hangeul Romaja Annyeonghaseyo")
        self.assertEqual(romanize("한글 로마자 안녕하세요", casing_option="capitalize-line"), "Hangeul romaja annyeonghaseyo")

    def test_pronunciation_rules(self):
        self.assertEqual(romanize("해돋이"), "haedoji")
        self.assertEqual(romanize("해돋이", use_pronunciation_rules=False), "haedodi")
        self.assertEqual(romanize("문래역"), "mullaeyeok")
        self.assertEqual(romanize("문래역", use_pronunciation_rules=False), "munraeyeok")
        self.assertEqual(romanize("선릉역"), "seolleungyeok")
        self.assertEqual(romanize("선릉역", use_pronunciation_rules=False), "seonreungyeok")
        self.assertEqual(romanize("역량"), "yeongnyang")
        self.assertEqual(romanize("역량", use_pronunciation_rules=True), "yeongnyang")

    def test_multiline_and_spacing(self):
        self.assertEqual(
            romanize("여기는 선릉역 입니다.\n해돋이와 문래역 그리고 역량 개발."),
            "yeogineun seolleungyeok imnida.\nhaedojiwa mullaeyeok geurigo yeongnyang gaebal."
        )
        self.assertEqual(
            romanize("여기는 선릉역 입니다.\r\n해돋이와 문래역 그리고 역량 개발."),
            "yeogineun seolleungyeok imnida.\r\nhaedojiwa mullaeyeok geurigo yeongnyang gaebal."
        )
        self.assertEqual(
            romanize("여기는 선릉역 입니다.\n\r해돋이와 문래역 그리고 역량 개발."),
            "yeogineun seolleungyeok imnida.\n\rhaedojiwa mullaeyeok geurigo yeongnyang gaebal."
        )

if __name__ == '__main__':
    print(romanize("여기는 선릉역 입니다.\n\r해돋이와 문래역 그리고 역량 개발."))
    print(romanize("해돋이"))
    unittest.main()

