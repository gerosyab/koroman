var koroman = (function (exports) {
  'use strict';

  const DICTIONARY = {
    "강원특별자치도 춘천시": "Chuncheon-si",
    "강원특별자치도 원주시": "Wonju-si",
    "강원특별자치도 강릉시": "Gangneung-si",
    "강원특별자치도 동해시": "Donghae-si",
    "강원특별자치도 삼척시": "Samcheok-si",
    "강원특별자치도 태백시": "Taebaek-si",
    "강원특별자치도 정선군": "Jeongseon-gun",
    "강원특별자치도 속초시": "Sokcho-si",
    "강원특별자치도 고성군": "Goseong-gun",
    "강원특별자치도 양양군": "Yangyang-gun",
    "강원특별자치도 인제군": "Inje-gun",
    "강원특별자치도 홍천군": "Hongcheon-gun",
    "강원특별자치도 횡성군": "Hoengseong-gun",
    "강원특별자치도 영월군": "Yeongwol-gun",
    "강원특별자치도 평창군": "Pyeongchang-gun",
    "강원특별자치도 화천군": "Hwacheon-gun",
    "강원특별자치도 양구군": "Yanggu-gun",
    "강원특별자치도 철원군": "Cheorwon-gun",
    "서울특별시 동대문구": "Dongdaemun-gu",
    "서울특별시 서대문구": "Seodaemun-gu",
    "서울특별시 영등포구": "Yeongdeungpo-gu",
    "부산광역시 부산진구": "Busanjin-gu",
    "부산광역시 해운대구": "Haeundae-gu",
    "인천광역시 미추홀구": "Michuhol-gu",
    "서울특별시 종로구": "Jongno-gu",
    "서울특별시 용산구": "Yongsan-gu",
    "서울특별시 성동구": "Seongdong-gu",
    "서울특별시 광진구": "Gwangjin-gu",
    "서울특별시 중랑구": "Jungnang-gu",
    "서울특별시 성북구": "Seongbuk-gu",
    "서울특별시 강북구": "Gangbuk-gu",
    "서울특별시 도봉구": "Dobong-gu",
    "서울특별시 노원구": "Nowon-gu",
    "서울특별시 은평구": "Eunpyeong-gu",
    "서울특별시 마포구": "Mapo-gu",
    "서울특별시 양천구": "Yangcheon-gu",
    "서울특별시 강서구": "Gangseo-gu",
    "서울특별시 구로구": "Guro-gu",
    "서울특별시 금천구": "Geumcheon-gu",
    "서울특별시 동작구": "Dongjak-gu",
    "서울특별시 관악구": "Gwanak-gu",
    "서울특별시 서초구": "Seocho-gu",
    "서울특별시 강남구": "Gangnam-gu",
    "서울특별시 송파구": "Songpa-gu",
    "서울특별시 강동구": "Gangdong-gu",
    "부산광역시 영도구": "Yeongdo-gu",
    "부산광역시 동래구": "Dongnae-gu",
    "부산광역시 기장군": "Gijang-gun",
    "부산광역시 사하구": "Saha-gu",
    "부산광역시 금정구": "Geumjeong-gu",
    "부산광역시 강서구": "Gangseo-gu",
    "부산광역시 연제구": "Yeonje-gu",
    "부산광역시 수영구": "Suyeong-gu",
    "부산광역시 사상구": "Sasang-gu",
    "대구광역시 수성구": "Suseong-gu",
    "대구광역시 달서구": "Dalseo-gu",
    "대구광역시 달성군": "Dalseong-gun",
    "인천광역시 연수구": "Yeonsu-gu",
    "인천광역시 남동구": "Namdong-gu",
    "인천광역시 부평구": "Bupyeong-gu",
    "인천광역시 계양구": "Gyeyang-gu",
    "인천광역시 강화군": "Ganghwa-gun",
    "인천광역시 옹진군": "Ongjin-gun",
    "광주광역시 광산구": "Gwangsan-gu",
    "대전광역시 유성구": "Yuseong-gu",
    "대전광역시 대덕구": "Daedeok-gu",
    "울산광역시 울주군": "Ulju-gun",
    "서울특별시 중구": "Jung-gu",
    "서울시 동대문구": "Dongdaemun-gu",
    "서울시 서대문구": "Seodaemun-gu",
    "서울시 영등포구": "Yeongdeungpo-gu",
    "부산광역시 중구": "Jung-gu",
    "부산광역시 서구": "Seo-gu",
    "부산광역시 동구": "Dong-gu",
    "부산시 부산진구": "Busanjin-gu",
    "부산광역시 남구": "Nam-gu",
    "부산광역시 북구": "Buk-gu",
    "부산시 해운대구": "Haeundae-gu",
    "대구광역시 중구": "Jung-gu",
    "대구광역시 동구": "Dong-gu",
    "대구광역시 서구": "Seo-gu",
    "대구광역시 남구": "Nam-gu",
    "대구광역시 북구": "Buk-gu",
    "인천광역시 중구": "Jung-gu",
    "인천광역시 동구": "Dong-gu",
    "인천시 미추홀구": "Michuhol-gu",
    "인천광역시 서구": "Seo-gu",
    "광주광역시 동구": "Dong-gu",
    "광주광역시 서구": "Seo-gu",
    "광주광역시 남구": "Nam-gu",
    "광주광역시 북구": "Buk-gu",
    "대전광역시 동구": "Dong-gu",
    "대전광역시 중구": "Jung-gu",
    "대전광역시 서구": "Seo-gu",
    "울산광역시 중구": "Jung-gu",
    "울산광역시 남구": "Nam-gu",
    "울산광역시 동구": "Dong-gu",
    "울산광역시 북구": "Buk-gu",
    "경기도 의정부시": "Uijeongbu-si",
    "경기도 동두천시": "Dongducheon-si",
    "경기도 남양주시": "Namyangju-si",
    "충청북도 청주시": "Cheongju-si",
    "충청북도 충주시": "Chungju-si",
    "충청북도 제천시": "Jecheon-si",
    "충청북도 단양군": "Danyang-gun",
    "충청북도 영동군": "Yeongdong-gun",
    "충청북도 보은군": "Boeun-gun",
    "충청북도 옥천군": "Okcheon-gun",
    "충청북도 음성군": "Eumseong-gun",
    "충청북도 진천군": "Jincheon-gun",
    "충청북도 괴산군": "Goesan-gun",
    "충청북도 증평군": "Jeungpyeong-gun",
    "충청남도 공주시": "Gongju-si",
    "충청남도 보령시": "Boryeong-si",
    "충청남도 아산시": "Asan-si",
    "충청남도 서산시": "Seosan-si",
    "충청남도 태안군": "Taean-gun",
    "충청남도 금산군": "Geumsan-gun",
    "충청남도 논산시": "Nonsan-si",
    "충청남도 계룡시": "Gyeryong-si",
    "충청남도 부여군": "Buyeo-gun",
    "충청남도 서천군": "Seocheon-gun",
    "충청남도 홍성군": "Hongseong-gun",
    "충청남도 청양군": "Cheongyang-gun",
    "충청남도 예산군": "Yesan-gun",
    "충청남도 당진시": "Dangjin-si",
    "충청남도 천안시": "Cheonan-si",
    "전라북도 전주시": "Jeonju-si",
    "전라북도 군산시": "Gunsan-si",
    "전라북도 익산시": "Iksan-si",
    "전라북도 정읍시": "Jeongeup-si",
    "전라북도 남원시": "Namwon-si",
    "전라북도 김제시": "Gimje-si",
    "전라북도 완주군": "Wanju_gun",
    "전라북도 진안군": "Jinan-gun",
    "전라북도 무주군": "Muju-gun",
    "전라북도 장수군": "Jangsu-gun",
    "전라북도 임실군": "Imsil-gun",
    "전라북도 순창군": "Sunchang-gun",
    "전라북도 고창군": "Gochang-gun",
    "전라북도 부안군": "Buan-gun",
    "전라남도 목포시": "Mokpo-si",
    "전라남도 여수시": "Yeosu-si",
    "전라남도 순천시": "Suncheon-si",
    "전라남도 나주시": "Naju-si",
    "전라남도 광양시": "Gwangyang-si",
    "전라남도 담양군": "Damyang-gun",
    "전라남도 장성군": "Jangseong-gun",
    "전라남도 곡성군": "Gokseong-gun",
    "전라남도 구례군": "Gurye-gun",
    "전라남도 고흥군": "Goheung-gun",
    "전라남도 보성군": "Boseong-gun",
    "전라남도 화순군": "Hwasun-gun",
    "전라남도 장흥군": "Jangheung-gun",
    "전라남도 강진군": "Gangjin-gun",
    "전라남도 완도군": "Wando-gun",
    "전라남도 해남군": "Haenam-gun",
    "전라남도 진도군": "Jindo-gun",
    "전라남도 영암군": "Yeongam-gun",
    "전라남도 무안군": "Muan-gun",
    "전라남도 영광군": "Yeonggwang-gun",
    "전라남도 함평군": "Hampyeong-gun",
    "전라남도 신안군": "Sinan-gun",
    "경상북도 포항시": "Pohang-si",
    "경상북도 울릉군": "Ulleung-gun",
    "경상북도 경주시": "Gyeongju-si",
    "경상북도 김천시": "Gimcheon-si",
    "경상북도 안동시": "Andong-si",
    "경상북도 구미시": "Gumi-si",
    "경상북도 영주시": "Yeongju-si",
    "경상북도 영천시": "Yeongcheon-si",
    "경상북도 상주시": "Sangju-si",
    "경상북도 문경시": "Mungyeong-si",
    "경상북도 예천군": "Yecheon-gun",
    "경상북도 경산시": "Gyeongsan-si",
    "경상북도 청도군": "Cheongdo-gun",
    "경상북도 고령군": "Goryeong-gun",
    "경상북도 성주군": "Seongju-gun",
    "경상북도 칠곡군": "Chilgok-gun",
    "경상북도 군위군": "Gunwi-gun",
    "경상북도 의성군": "Uiseong-gun",
    "경상북도 청송군": "Cheongsong-gun",
    "경상북도 영양군": "Yeongyang-gun",
    "경상북도 영덕군": "Yeongdeok-gun",
    "경상북도 봉화군": "Bonghwa-gun",
    "경상북도 울진군": "Uljin-gun",
    "경상남도 진주시": "Jinju-si",
    "경상남도 통영시": "Tongyeong-si",
    "경상남도 고성군": "Goseong-gun",
    "경상남도 사천시": "Sacheon-si",
    "경상남도 김해시": "Gimhae-si",
    "경상남도 밀양시": "Miryang-si",
    "경상남도 거제시": "Geoje-si",
    "경상남도 의령군": "Uiryeong-gun",
    "경상남도 함안군": "Haman-gun",
    "경상남도 창녕군": "Changnyeong-gun",
    "경상남도 양산시": "Yangsan-si",
    "경상남도 하동군": "Hadong-gun",
    "경상남도 남해군": "Namhae-gun",
    "경상남도 함양군": "Hamyang-gun",
    "경상남도 산청군": "Sancheong-gun",
    "경상남도 거창군": "Geochang-gun",
    "경상남도 합천군": "Hapcheon-gun",
    "경상남도 창원시": "Changwon-si",
    "세종특별자치시": "Sejong-si",
    "강원특별자치도": "Gangwon-do",
    "제주특별자치도": "Jeju-do",
    "서울시 종로구": "Jongno-gu",
    "서울시 용산구": "Yongsan-gu",
    "서울시 성동구": "Seongdong-gu",
    "서울시 광진구": "Gwangjin-gu",
    "서울 동대문구": "Dongdaemun-gu",
    "서울시 중랑구": "Jungnang-gu",
    "서울시 성북구": "Seongbuk-gu",
    "서울시 강북구": "Gangbuk-gu",
    "서울시 도봉구": "Dobong-gu",
    "서울시 노원구": "Nowon-gu",
    "서울시 은평구": "Eunpyeong-gu",
    "서울 서대문구": "Seodaemun-gu",
    "서울시 마포구": "Mapo-gu",
    "서울시 양천구": "Yangcheon-gu",
    "서울시 강서구": "Gangseo-gu",
    "서울시 구로구": "Guro-gu",
    "서울시 금천구": "Geumcheon-gu",
    "서울 영등포구": "Yeongdeungpo-gu",
    "서울시 동작구": "Dongjak-gu",
    "서울시 관악구": "Gwanak-gu",
    "서울시 서초구": "Seocho-gu",
    "서울시 강남구": "Gangnam-gu",
    "서울시 송파구": "Songpa-gu",
    "서울시 강동구": "Gangdong-gu",
    "부산시 영도구": "Yeongdo-gu",
    "부산 부산진구": "Busanjin-gu",
    "부산시 동래구": "Dongnae-gu",
    "부산 해운대구": "Haeundae-gu",
    "부산시 기장군": "Gijang-gun",
    "부산시 사하구": "Saha-gu",
    "부산시 금정구": "Geumjeong-gu",
    "부산시 강서구": "Gangseo-gu",
    "부산시 연제구": "Yeonje-gu",
    "부산시 수영구": "Suyeong-gu",
    "부산시 사상구": "Sasang-gu",
    "대구시 수성구": "Suseong-gu",
    "대구시 달서구": "Dalseo-gu",
    "대구시 달성군": "Dalseong-gun",
    "인천 미추홀구": "Michuhol-gu",
    "인천시 연수구": "Yeonsu-gu",
    "인천시 남동구": "Namdong-gu",
    "인천시 부평구": "Bupyeong-gu",
    "인천시 계양구": "Gyeyang-gu",
    "인천시 강화군": "Ganghwa-gun",
    "인천시 옹진군": "Ongjin-gun",
    "광주시 광산구": "Gwangsan-gu",
    "대전시 유성구": "Yuseong-gu",
    "대전시 대덕구": "Daedeok-gu",
    "울산시 울주군": "Ulju-gun",
    "경기도 수원시": "Suwon-si",
    "경기도 성남시": "Seongnam-si",
    "경기 의정부시": "Uijeongbu-si",
    "경기도 안양시": "Anyang-si",
    "경기도 광명시": "Gwangmyeong-si",
    "경기도 평택시": "Pyeongtaek-si",
    "경기도 양주시": "Yangju-si",
    "경기 동두천시": "Dongducheon-si",
    "경기도 안산시": "Ansan-si",
    "경기도 고양시": "Goyang-si",
    "경기도 과천시": "Gwacheon-si",
    "경기도 의왕시": "Uiwang-si",
    "경기도 구리시": "Guri-si",
    "경기 남양주시": "Namyangju-si",
    "경기도 오산시": "Osan-si",
    "경기도 화성시": "Hwaseong-si",
    "경기도 시흥시": "Siheung-si",
    "경기도 군포시": "Gunpo-si",
    "경기도 하남시": "Hanam-si",
    "경기도 파주시": "Paju-si",
    "경기도 여주시": "Yeoju-si",
    "경기도 이천시": "Icheon-si",
    "경기도 용인시": "Yongin-si",
    "경기도 안성시": "Anseong-si",
    "경기도 김포시": "Gimpo-si",
    "경기도 광주시": "Gwangju-si",
    "경기도 포천시": "Pocheon-si",
    "경기도 연천군": "Yeoncheon-gun",
    "경기도 양평군": "Yangpyeong-gun",
    "경기도 가평군": "Gapyeong-gun",
    "경기도 부천시": "Bucheon-si",
    "강원도 춘천시": "Chuncheon-si",
    "강원도 원주시": "Wonju-si",
    "강원도 강릉시": "Gangneung-si",
    "강원도 동해시": "Donghae-si",
    "강원도 삼척시": "Samcheok-si",
    "강원도 태백시": "Taebaek-si",
    "강원도 정선군": "Jeongseon-gun",
    "강원도 속초시": "Sokcho-si",
    "강원도 고성군": "Goseong-gun",
    "강원도 양양군": "Yangyang-gun",
    "강원도 인제군": "Inje-gun",
    "강원도 홍천군": "Hongcheon-gun",
    "강원도 횡성군": "Hoengseong-gun",
    "강원도 영월군": "Yeongwol-gun",
    "강원도 평창군": "Pyeongchang-gun",
    "강원도 화천군": "Hwacheon-gun",
    "강원도 양구군": "Yanggu-gun",
    "강원도 철원군": "Cheorwon-gun",
    "서울 종로구": "Jongno-gu",
    "서울시 중구": "Jung-gu",
    "서울 용산구": "Yongsan-gu",
    "서울 성동구": "Seongdong-gu",
    "서울 광진구": "Gwangjin-gu",
    "서울 중랑구": "Jungnang-gu",
    "서울 성북구": "Seongbuk-gu",
    "서울 강북구": "Gangbuk-gu",
    "서울 도봉구": "Dobong-gu",
    "서울 노원구": "Nowon-gu",
    "서울 은평구": "Eunpyeong-gu",
    "서울 마포구": "Mapo-gu",
    "서울 양천구": "Yangcheon-gu",
    "서울 강서구": "Gangseo-gu",
    "서울 구로구": "Guro-gu",
    "서울 금천구": "Geumcheon-gu",
    "서울 동작구": "Dongjak-gu",
    "서울 관악구": "Gwanak-gu",
    "서울 서초구": "Seocho-gu",
    "서울 강남구": "Gangnam-gu",
    "서울 송파구": "Songpa-gu",
    "서울 강동구": "Gangdong-gu",
    "부산시 중구": "Jung-gu",
    "부산시 서구": "Seo-gu",
    "부산시 동구": "Dong-gu",
    "부산 영도구": "Yeongdo-gu",
    "부산 동래구": "Dongnae-gu",
    "부산시 남구": "Nam-gu",
    "부산시 북구": "Buk-gu",
    "부산 기장군": "Gijang-gun",
    "부산 사하구": "Saha-gu",
    "부산 금정구": "Geumjeong-gu",
    "부산 강서구": "Gangseo-gu",
    "부산 연제구": "Yeonje-gu",
    "부산 수영구": "Suyeong-gu",
    "부산 사상구": "Sasang-gu",
    "대구시 중구": "Jung-gu",
    "대구시 동구": "Dong-gu",
    "대구시 서구": "Seo-gu",
    "대구시 남구": "Nam-gu",
    "대구시 북구": "Buk-gu",
    "대구 수성구": "Suseong-gu",
    "대구 달서구": "Dalseo-gu",
    "대구 달성군": "Dalseong-gun",
    "인천시 중구": "Jung-gu",
    "인천시 동구": "Dong-gu",
    "인천 연수구": "Yeonsu-gu",
    "인천 남동구": "Namdong-gu",
    "인천 부평구": "Bupyeong-gu",
    "인천 계양구": "Gyeyang-gu",
    "인천시 서구": "Seo-gu",
    "인천 강화군": "Ganghwa-gun",
    "인천 옹진군": "Ongjin-gun",
    "광주시 동구": "Dong-gu",
    "광주시 서구": "Seo-gu",
    "광주시 남구": "Nam-gu",
    "광주시 북구": "Buk-gu",
    "광주 광산구": "Gwangsan-gu",
    "대전시 동구": "Dong-gu",
    "대전시 중구": "Jung-gu",
    "대전시 서구": "Seo-gu",
    "대전 유성구": "Yuseong-gu",
    "대전 대덕구": "Daedeok-gu",
    "울산시 중구": "Jung-gu",
    "울산시 남구": "Nam-gu",
    "울산시 동구": "Dong-gu",
    "울산시 북구": "Buk-gu",
    "울산 울주군": "Ulju-gun",
    "경기 수원시": "Suwon-si",
    "경기 성남시": "Seongnam-si",
    "경기 안양시": "Anyang-si",
    "경기 광명시": "Gwangmyeong-si",
    "경기 평택시": "Pyeongtaek-si",
    "경기 양주시": "Yangju-si",
    "경기 안산시": "Ansan-si",
    "경기 고양시": "Goyang-si",
    "경기 과천시": "Gwacheon-si",
    "경기 의왕시": "Uiwang-si",
    "경기 구리시": "Guri-si",
    "경기 오산시": "Osan-si",
    "경기 화성시": "Hwaseong-si",
    "경기 시흥시": "Siheung-si",
    "경기 군포시": "Gunpo-si",
    "경기 하남시": "Hanam-si",
    "경기 파주시": "Paju-si",
    "경기 여주시": "Yeoju-si",
    "경기 이천시": "Icheon-si",
    "경기 용인시": "Yongin-si",
    "경기 안성시": "Anseong-si",
    "경기 김포시": "Gimpo-si",
    "경기 광주시": "Gwangju-si",
    "경기 포천시": "Pocheon-si",
    "경기 연천군": "Yeoncheon-gun",
    "경기 양평군": "Yangpyeong-gun",
    "경기 가평군": "Gapyeong-gun",
    "경기 부천시": "Bucheon-si",
    "강원 춘천시": "Chuncheon-si",
    "강원 원주시": "Wonju-si",
    "강원 강릉시": "Gangneung-si",
    "강원 동해시": "Donghae-si",
    "강원 삼척시": "Samcheok-si",
    "강원 태백시": "Taebaek-si",
    "강원 정선군": "Jeongseon-gun",
    "강원 속초시": "Sokcho-si",
    "강원 고성군": "Goseong-gun",
    "강원 양양군": "Yangyang-gun",
    "강원 인제군": "Inje-gun",
    "강원 홍천군": "Hongcheon-gun",
    "강원 횡성군": "Hoengseong-gun",
    "강원 영월군": "Yeongwol-gun",
    "강원 평창군": "Pyeongchang-gun",
    "강원 화천군": "Hwacheon-gun",
    "강원 양구군": "Yanggu-gun",
    "강원 철원군": "Cheorwon-gun",
    "충북 청주시": "Cheongju-si",
    "충북 충주시": "Chungju-si",
    "충북 제천시": "Jecheon-si",
    "충북 단양군": "Danyang-gun",
    "충북 영동군": "Yeongdong-gun",
    "충북 보은군": "Boeun-gun",
    "충북 옥천군": "Okcheon-gun",
    "충북 음성군": "Eumseong-gun",
    "충북 진천군": "Jincheon-gun",
    "충북 괴산군": "Goesan-gun",
    "충북 증평군": "Jeungpyeong-gun",
    "충남 공주시": "Gongju-si",
    "충남 보령시": "Boryeong-si",
    "충남 아산시": "Asan-si",
    "충남 서산시": "Seosan-si",
    "충남 태안군": "Taean-gun",
    "충남 금산군": "Geumsan-gun",
    "충남 논산시": "Nonsan-si",
    "충남 계룡시": "Gyeryong-si",
    "충남 부여군": "Buyeo-gun",
    "충남 서천군": "Seocheon-gun",
    "충남 홍성군": "Hongseong-gun",
    "충남 청양군": "Cheongyang-gun",
    "충남 예산군": "Yesan-gun",
    "충남 당진시": "Dangjin-si",
    "충남 천안시": "Cheonan-si",
    "전북 전주시": "Jeonju-si",
    "전북 군산시": "Gunsan-si",
    "전북 익산시": "Iksan-si",
    "전북 정읍시": "Jeongeup-si",
    "전북 남원시": "Namwon-si",
    "전북 김제시": "Gimje-si",
    "전북 완주군": "Wanju_gun",
    "전북 진안군": "Jinan-gun",
    "전북 무주군": "Muju-gun",
    "전북 장수군": "Jangsu-gun",
    "전북 임실군": "Imsil-gun",
    "전북 순창군": "Sunchang-gun",
    "전북 고창군": "Gochang-gun",
    "전북 부안군": "Buan-gun",
    "전남 목포시": "Mokpo-si",
    "전남 여수시": "Yeosu-si",
    "전남 순천시": "Suncheon-si",
    "전남 나주시": "Naju-si",
    "전남 광양시": "Gwangyang-si",
    "전남 담양군": "Damyang-gun",
    "전남 장성군": "Jangseong-gun",
    "전남 곡성군": "Gokseong-gun",
    "전남 구례군": "Gurye-gun",
    "전남 고흥군": "Goheung-gun",
    "전남 보성군": "Boseong-gun",
    "전남 화순군": "Hwasun-gun",
    "전남 장흥군": "Jangheung-gun",
    "전남 강진군": "Gangjin-gun",
    "전남 완도군": "Wando-gun",
    "전남 해남군": "Haenam-gun",
    "전남 진도군": "Jindo-gun",
    "전남 영암군": "Yeongam-gun",
    "전남 무안군": "Muan-gun",
    "전남 영광군": "Yeonggwang-gun",
    "전남 함평군": "Hampyeong-gun",
    "전남 신안군": "Sinan-gun",
    "경북 포항시": "Pohang-si",
    "경북 울릉군": "Ulleung-gun",
    "경북 경주시": "Gyeongju-si",
    "경북 김천시": "Gimcheon-si",
    "경북 안동시": "Andong-si",
    "경북 구미시": "Gumi-si",
    "경북 영주시": "Yeongju-si",
    "경북 영천시": "Yeongcheon-si",
    "경북 상주시": "Sangju-si",
    "경북 문경시": "Mungyeong-si",
    "경북 예천군": "Yecheon-gun",
    "경북 경산시": "Gyeongsan-si",
    "경북 청도군": "Cheongdo-gun",
    "경북 고령군": "Goryeong-gun",
    "경북 성주군": "Seongju-gun",
    "경북 칠곡군": "Chilgok-gun",
    "경북 군위군": "Gunwi-gun",
    "경북 의성군": "Uiseong-gun",
    "경북 청송군": "Cheongsong-gun",
    "경북 영양군": "Yeongyang-gun",
    "경북 영덕군": "Yeongdeok-gun",
    "경북 봉화군": "Bonghwa-gun",
    "경북 울진군": "Uljin-gun",
    "경남 진주시": "Jinju-si",
    "경남 통영시": "Tongyeong-si",
    "경남 고성군": "Goseong-gun",
    "경남 사천시": "Sacheon-si",
    "경남 김해시": "Gimhae-si",
    "경남 밀양시": "Miryang-si",
    "경남 거제시": "Geoje-si",
    "경남 의령군": "Uiryeong-gun",
    "경남 함안군": "Haman-gun",
    "경남 창녕군": "Changnyeong-gun",
    "경남 양산시": "Yangsan-si",
    "경남 하동군": "Hadong-gun",
    "경남 남해군": "Namhae-gun",
    "경남 함양군": "Hamyang-gun",
    "경남 산청군": "Sancheong-gun",
    "경남 거창군": "Geochang-gun",
    "경남 합천군": "Hapcheon-gun",
    "경남 창원시": "Changwon-si",
    "서울특별시": "Seoul",
    "부산광역시": "Busan",
    "대구광역시": "Daegu",
    "인천광역시": "Incheon",
    "광주광역시": "Gwangju",
    "대전광역시": "Daejeon",
    "울산광역시": "Ulsan",
    "서울 중구": "Jung-gu",
    "부산 중구": "Jung-gu",
    "부산 서구": "Seo-gu",
    "부산 동구": "Dong-gu",
    "부산 남구": "Nam-gu",
    "부산 북구": "Buk-gu",
    "대구 중구": "Jung-gu",
    "대구 동구": "Dong-gu",
    "대구 서구": "Seo-gu",
    "대구 남구": "Nam-gu",
    "대구 북구": "Buk-gu",
    "인천 중구": "Jung-gu",
    "인천 동구": "Dong-gu",
    "인천 서구": "Seo-gu",
    "광주 동구": "Dong-gu",
    "광주 서구": "Seo-gu",
    "광주 남구": "Nam-gu",
    "광주 북구": "Buk-gu",
    "대전 동구": "Dong-gu",
    "대전 중구": "Jung-gu",
    "대전 서구": "Seo-gu",
    "울산 중구": "Jung-gu",
    "울산 남구": "Nam-gu",
    "울산 동구": "Dong-gu",
    "울산 북구": "Buk-gu",
    "충청북도": "Chungcheongbuk-do",
    "충청남도": "Chungcheongnam-do",
    "전라북도": "Jeonbuk-do",
    "전라남도": "Jeollanam-do",
    "경상북도": "Gyeongsangbuk-do",
    "경상남도": "Gyeongsangnam-do",
    "동대문구": "Dongdaemun-gu",
    "서대문구": "Seodaemun-gu",
    "영등포구": "Yeongdeungpo-gu",
    "부산진구": "Busanjin-gu",
    "해운대구": "Haeundae-gu",
    "미추홀구": "Michuhol-gu",
    "의정부시": "Uijeongbu-si",
    "동두천시": "Dongducheon-si",
    "남양주시": "Namyangju-si",
    "서울시": "Seoul",
    "부산시": "Busan",
    "대구시": "Daegu",
    "인천시": "Incheon",
    "광주시": "Gwangju",
    "대전시": "Daejeon",
    "울산시": "Ulsan",
    "세종시": "Sejong-si",
    "경기도": "Gyeonggi-do",
    "강원도": "Gangwon-do",
    "제주도": "Jeju-do",
    "종로구": "Jongno-gu",
    "용산구": "Yongsan-gu",
    "성동구": "Seongdong-gu",
    "광진구": "Gwangjin-gu",
    "중랑구": "Jungnang-gu",
    "성북구": "Seongbuk-gu",
    "강북구": "Gangbuk-gu",
    "도봉구": "Dobong-gu",
    "노원구": "Nowon-gu",
    "은평구": "Eunpyeong-gu",
    "마포구": "Mapo-gu",
    "양천구": "Yangcheon-gu",
    "강서구": "Gangseo-gu",
    "구로구": "Guro-gu",
    "금천구": "Geumcheon-gu",
    "동작구": "Dongjak-gu",
    "관악구": "Gwanak-gu",
    "서초구": "Seocho-gu",
    "강남구": "Gangnam-gu",
    "송파구": "Songpa-gu",
    "강동구": "Gangdong-gu",
    "영도구": "Yeongdo-gu",
    "동래구": "Dongnae-gu",
    "기장군": "Gijang-gun",
    "사하구": "Saha-gu",
    "금정구": "Geumjeong-gu",
    "연제구": "Yeonje-gu",
    "수영구": "Suyeong-gu",
    "사상구": "Sasang-gu",
    "수성구": "Suseong-gu",
    "달서구": "Dalseo-gu",
    "달성군": "Dalseong-gun",
    "연수구": "Yeonsu-gu",
    "남동구": "Namdong-gu",
    "부평구": "Bupyeong-gu",
    "계양구": "Gyeyang-gu",
    "강화군": "Ganghwa-gun",
    "옹진군": "Ongjin-gun",
    "광산구": "Gwangsan-gu",
    "유성구": "Yuseong-gu",
    "대덕구": "Daedeok-gu",
    "울주군": "Ulju-gun",
    "수원시": "Suwon-si",
    "성남시": "Seongnam-si",
    "안양시": "Anyang-si",
    "광명시": "Gwangmyeong-si",
    "평택시": "Pyeongtaek-si",
    "양주시": "Yangju-si",
    "안산시": "Ansan-si",
    "고양시": "Goyang-si",
    "과천시": "Gwacheon-si",
    "의왕시": "Uiwang-si",
    "구리시": "Guri-si",
    "오산시": "Osan-si",
    "화성시": "Hwaseong-si",
    "시흥시": "Siheung-si",
    "군포시": "Gunpo-si",
    "하남시": "Hanam-si",
    "파주시": "Paju-si",
    "여주시": "Yeoju-si",
    "이천시": "Icheon-si",
    "용인시": "Yongin-si",
    "안성시": "Anseong-si",
    "김포시": "Gimpo-si",
    "포천시": "Pocheon-si",
    "연천군": "Yeoncheon-gun",
    "양평군": "Yangpyeong-gun",
    "가평군": "Gapyeong-gun",
    "부천시": "Bucheon-si",
    "춘천시": "Chuncheon-si",
    "원주시": "Wonju-si",
    "강릉시": "Gangneung-si",
    "동해시": "Donghae-si",
    "삼척시": "Samcheok-si",
    "태백시": "Taebaek-si",
    "정선군": "Jeongseon-gun",
    "속초시": "Sokcho-si",
    "고성군": "Goseong-gun",
    "양양군": "Yangyang-gun",
    "인제군": "Inje-gun",
    "홍천군": "Hongcheon-gun",
    "횡성군": "Hoengseong-gun",
    "영월군": "Yeongwol-gun",
    "평창군": "Pyeongchang-gun",
    "화천군": "Hwacheon-gun",
    "양구군": "Yanggu-gun",
    "철원군": "Cheorwon-gun",
    "청주시": "Cheongju-si",
    "충주시": "Chungju-si",
    "제천시": "Jecheon-si",
    "단양군": "Danyang-gun",
    "영동군": "Yeongdong-gun",
    "보은군": "Boeun-gun",
    "옥천군": "Okcheon-gun",
    "음성군": "Eumseong-gun",
    "진천군": "Jincheon-gun",
    "괴산군": "Goesan-gun",
    "증평군": "Jeungpyeong-gun",
    "공주시": "Gongju-si",
    "보령시": "Boryeong-si",
    "아산시": "Asan-si",
    "서산시": "Seosan-si",
    "태안군": "Taean-gun",
    "금산군": "Geumsan-gun",
    "논산시": "Nonsan-si",
    "계룡시": "Gyeryong-si",
    "부여군": "Buyeo-gun",
    "서천군": "Seocheon-gun",
    "홍성군": "Hongseong-gun",
    "청양군": "Cheongyang-gun",
    "예산군": "Yesan-gun",
    "당진시": "Dangjin-si",
    "천안시": "Cheonan-si",
    "전주시": "Jeonju-si",
    "군산시": "Gunsan-si",
    "익산시": "Iksan-si",
    "정읍시": "Jeongeup-si",
    "남원시": "Namwon-si",
    "김제시": "Gimje-si",
    "완주군": "Wanju_gun",
    "진안군": "Jinan-gun",
    "무주군": "Muju-gun",
    "장수군": "Jangsu-gun",
    "임실군": "Imsil-gun",
    "순창군": "Sunchang-gun",
    "고창군": "Gochang-gun",
    "부안군": "Buan-gun",
    "목포시": "Mokpo-si",
    "여수시": "Yeosu-si",
    "순천시": "Suncheon-si",
    "나주시": "Naju-si",
    "광양시": "Gwangyang-si",
    "담양군": "Damyang-gun",
    "장성군": "Jangseong-gun",
    "곡성군": "Gokseong-gun",
    "구례군": "Gurye-gun",
    "고흥군": "Goheung-gun",
    "보성군": "Boseong-gun",
    "화순군": "Hwasun-gun",
    "장흥군": "Jangheung-gun",
    "강진군": "Gangjin-gun",
    "완도군": "Wando-gun",
    "해남군": "Haenam-gun",
    "진도군": "Jindo-gun",
    "영암군": "Yeongam-gun",
    "무안군": "Muan-gun",
    "영광군": "Yeonggwang-gun",
    "함평군": "Hampyeong-gun",
    "신안군": "Sinan-gun",
    "포항시": "Pohang-si",
    "울릉군": "Ulleung-gun",
    "경주시": "Gyeongju-si",
    "김천시": "Gimcheon-si",
    "안동시": "Andong-si",
    "구미시": "Gumi-si",
    "영주시": "Yeongju-si",
    "영천시": "Yeongcheon-si",
    "상주시": "Sangju-si",
    "문경시": "Mungyeong-si",
    "예천군": "Yecheon-gun",
    "경산시": "Gyeongsan-si",
    "청도군": "Cheongdo-gun",
    "고령군": "Goryeong-gun",
    "성주군": "Seongju-gun",
    "칠곡군": "Chilgok-gun",
    "군위군": "Gunwi-gun",
    "의성군": "Uiseong-gun",
    "청송군": "Cheongsong-gun",
    "영양군": "Yeongyang-gun",
    "영덕군": "Yeongdeok-gun",
    "봉화군": "Bonghwa-gun",
    "울진군": "Uljin-gun",
    "진주시": "Jinju-si",
    "통영시": "Tongyeong-si",
    "사천시": "Sacheon-si",
    "김해시": "Gimhae-si",
    "밀양시": "Miryang-si",
    "거제시": "Geoje-si",
    "의령군": "Uiryeong-gun",
    "함안군": "Haman-gun",
    "창녕군": "Changnyeong-gun",
    "양산시": "Yangsan-si",
    "하동군": "Hadong-gun",
    "남해군": "Namhae-gun",
    "함양군": "Hamyang-gun",
    "산청군": "Sancheong-gun",
    "거창군": "Geochang-gun",
    "합천군": "Hapcheon-gun",
    "창원시": "Changwon-si",
    "서울": "Seoul",
    "부산": "Busan",
    "대구": "Daegu",
    "인천": "Incheon",
    "광주": "Gwangju",
    "대전": "Daejeon",
    "울산": "Ulsan",
    "세종": "Sejong-si",
    "경기": "Gyeonggi-do",
    "강원": "Gangwon-do",
    "충북": "Chungcheongbuk-do",
    "충남": "Chungcheongnam-do",
    "전북": "Jeonbuk-do",
    "전남": "Jeollanam-do",
    "경북": "Gyeongsangbuk-do",
    "경남": "Gyeongsangnam-do",
    "제주": "Jeju-do",
    "중구": "Jung-gu",
    "서구": "Seo-gu",
    "동구": "Dong-gu",
    "남구": "Nam-gu",
    "북구": "Buk-gu"
  };

  // @name: koroman.core.js
  // @project: Koroman
  // @author: Donghe Youn (Daissue)
  // @date: 2025-04-02
  // @description: This module provides core functionality for romanizing Korean Hangul text.
  //               It includes functions to decompose Hangul syllables into their constituent jamo (initial, medial, final),
  //               apply Korean pronunciation rules, and convert them into Latin (Romanized) script.
  //               This module is used by both CommonJS and ESModule entry points and is not intended to be used directly.
  // @license: MIT License
  // @version: 1.0.0
  // @dependencies: None
  // @usage: Import this from koroman.mjs or koroman.cjs to access the romanize() function.

  // 자모 분해 및 조합 + 로마자 변환 (초성/중성/종성 실제 유니코드 문자 사용 버전)

  // 초성: 19자 (U+1100~U+1112)
  const CHO = [
      "ᄀ", "ᄁ", "ᄂ", "ᄃ", "ᄄ", "ᄅ", "ᄆ", "ᄇ", "ᄈ", "ᄉ",
      "ᄊ", "ᄋ", "ᄌ", "ᄍ", "ᄎ", "ᄏ", "ᄐ", "ᄑ", "ᄒ"
    ];
    
    // 중성: 21자 (U+1161~U+1175)
    const JUNG = [
      "ᅡ", "ᅢ", "ᅣ", "ᅤ", "ᅥ", "ᅦ", "ᅧ", "ᅨ", "ᅩ", "ᅪ", "ᅫ",
      "ᅬ", "ᅭ", "ᅮ", "ᅯ", "ᅰ", "ᅱ", "ᅲ", "ᅳ", "ᅴ", "ᅵ"
    ];
    
    // 종성: 28자 (첫 번째는 없음, 나머지 U+11A8~U+11C2)
    const JONG = [
      "", "ᆨ", "ᆩ", "ᆪ", "ᆫ", "ᆬ", "ᆭ", "ᆮ", "ᆯ", "ᆰ", "ᆱ", "ᆲ",
      "ᆳ", "ᆴ", "ᆵ", "ᆶ", "ᆷ", "ᆸ", "ᆹ", "ᆺ", "ᆻ", "ᆼ", "ᆽ", "ᆾ",
      "ᆿ", "ᇀ", "ᇁ", "ᇂ"
    ];

    const ZWSP = '\u200A'; // Hair Space (조합 방지용)
  //   const ZWSP = '\u200B'; // zero-width space (조합 방지용)
    
    function formatRoman(str, casingOption = "lowercase") {
      switch (casingOption) {
        case "uppercase": return str.toUpperCase();
        case "capitalize-line": return str.split('\n').map(line => line.length > 0 ? line.charAt(0).toUpperCase() + line.slice(1) : '').join('\n');
        case "capitalize-word": return str.split('\n').map(line => line.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join('\n');
        default: return str.toLowerCase();
      }
    }
    
    function splitHangulToJamos(str) {
      const result = [];
      let jamoString = '';
      let plainJamoString = '';
      for (let char of str) {
        const code = char.charCodeAt(0);
        if (code < 0xAC00 || code > 0xD7A3) {
          result.push({ char, type: 'non-hangul' });
          jamoString += char;
          plainJamoString += char;
          continue;
        }
        const syllableIndex = code - 0xAC00;
        const cho = Math.floor(syllableIndex / (21 * 28));
        const jung = Math.floor((syllableIndex % (21 * 28)) / 28);
        const jong = syllableIndex % 28;
        const jamo = { 초성: CHO[cho], 중성: JUNG[jung], 종성: JONG[jong] || null };
        result.push(jamo);
        jamoString += jamo.초성 + jamo.중성 + (jamo.종성 || '');
        plainJamoString += jamo.초성 + ZWSP + jamo.중성;
        if (jamo.종성) plainJamoString += ZWSP + jamo.종성;
      }
      return { jamoArray: result, jamoString, plainJamoString };
    }
    
    function composeJamos(jamoArray) {
      let result = '';
      for (let jamo of jamoArray) {
        if (jamo.type === 'non-hangul') {
          result += jamo.char;
          continue;
        }
        const choIndex = CHO.indexOf(jamo.초성);
        const jungIndex = JUNG.indexOf(jamo.중성);
        const jongIndex = jamo.종성 ? JONG.indexOf(jamo.종성) : 0;
        if (choIndex < 0 || jungIndex < 0 || jongIndex < 0) {
          result += '?';
          continue;
        }
        const code = 0xAC00 + (choIndex * 21 + jungIndex) * 28 + jongIndex;
        result += String.fromCharCode(code);
      }
      return result;
    }
    
    function applyPronunciationRules(jamoStr) {
      const replaceArr = [

          // ==============================
          // 1. 무효화 처리
          // ==============================
        
          { p: /\u11a7/g, r: "" }, // 'ᆧ'(U+11A7) → 제거 (사용되지 않는 종성)
        
          // ==============================
          // 2. 비음화 (ㄴ, ㅁ, ㅇ)
          // ==============================
        
          { p: /[\u11b8\u11c1\u11b9\u11b2\u11b5](?=[\u1102\u1106])/g, r: "ᆷ" }, 
          // 종성 'ᆸ(ㅂ)' 'ᇁ(ㅍ)' 'ᆹ(ㅂㅅ)' 'ᆲ(ㄹㅂ)' 'ᆵ(ㄹㅍ)' + 다음 초성 'ᄂ(ㄴ)' or 'ᄆ(ㅁ)' → 'ᆷ'
        
          { p: /[\u11ae\u11c0\u11bd\u11be\u11ba\u11bb\u11c2](?=[\u1102\u1106])/g, r: "ᆫ" },
          // 종성 'ᆮ(ㄷ)' 'ᇀ(ㅌ)' 'ᆽ(ㅈ)' 'ᆾ(ㅊ)' 'ᆺ(ㅅ)' 'ᆻ(ㅆ)' 'ᇂ(ㅎ)' + 다음 초성 'ᄂ(ㄴ)' or 'ᄆ(ㅁ)' → 'ᆫ'
        
          { p: /[\u11a8\u11a9\u11bf\u11aa\u11b0](?=[\u1102\u1106])/g, r: "ᆼ" },
          // 종성 'ᆨ(ㄱ)' 'ᆩ(ㄲ)' 'ᆿ(ㅋ)' 'ᆪ(ㄱㅅ)' 'ᆰ(ㄹㄱ)' + 다음 초성 'ᄂ'/'ᄆ' → 'ᆼ'
        
          // ==============================
          // 3. 연음/연철
          // ==============================
        
          { p: /\u11a8\u110b(?=[\u1163\u1164\u1167\u1168\u116d\u1172])/g, r: "ᆼᄂ" },
          // 'ᆨ' + 'ᄋ' + 중성 'ㅑㅒㅕㅖㅛㅠ' → 'ᆼᄂ' (연음화)
        
          { p: /\u11af\u110b(?=[\u1163\u1164\u1167\u1168\u116d\u1172])/g, r: "ᆯᄅ" }, 
          // 'ᆯ' + 'ᄋ' + 중성 위와 같음 → 'ᆯᄅ'
        
          { p: /[\u11a8\u11bc]\u1105/g, r: "ᆼᄂ" }, 
          // 'ᆨ(ㄱ)', 'ᆼ(ㅇ)' + 'ᄅ(ㄹ)' → 'ᆼᄂ'
        
          { p: /\u11ab\u1105(?=\u1169)/g, r: "ᆫᄂ" }, 
          // 'ᆫ(ㄴ)' + 'ᄅ' + 중성 'ㅗ' → 'ᆫᄂ'
        
          { p: /\u11af\u1102|\u11ab\u1105/g, r: "ᆯᄅ" }, 
          // 'ᆯ(ㄹ)' + 'ᄂ(ㄴ)', 'ᆫ(ㄴ)' + 'ᄅ(ㄹ)' → 'ᆯᄅ'
        
          { p: /[\u11b7\u11b8]\u1105/g, r: "ᆷᄂ" }, 
          // 'ᆷ(ㅁ)', 'ᆸ(ㅂ)' + 'ᄅ' → 'ᆷᄂ'
        
          { p: /\u11b0\u1105/g, r: "ᆨᄅ" }, 
          // 'ᆰ(ㄹㄱ)' + 'ᄅ' → 'ᆨᄅ'
        
          // ==============================
          // 4. 격음화 / 자음군 분해
          // ==============================
        
          { p: /\u11a8\u110f/g, r: "ᆨ-ᄏ" }, // 'ᆨ' + 'ᄏ' → 'ᆨ-ᄏ'
          { p: /\u11b8\u1111/g, r: "ᆸ-ᄑ" }, // 'ᆸ' + 'ᄑ' → 'ᆸ-ᄑ'
          { p: /\u11ae\u1110/g, r: "ᆮ-ᄐ" }, // 'ᆮ' + 'ᄐ' → 'ᆮ-ᄐ'
        
          // ==============================
          // 5. 복합 종성 분해
          // ==============================
        
          { p: /\u11aa/g, r: "ᆨᆺ" }, // 'ᆪ(ㄱㅅ)' → 'ᆨᆺ'
          { p: /\u11ac/g, r: "ᆫᆽ" }, // 'ᆬ(ㄴㅈ)' → 'ᆫᆽ'
          { p: /\u11ad/g, r: "ᆫᇂ" }, // 'ᆭ(ㄴㅎ)' → 'ᆫᇂ'
          { p: /\u11b0/g, r: "ᆯᆨ" }, // 'ᆰ(ㄹㄱ)' → 'ᆯᆨ'
          { p: /\u11b1/g, r: "ᆯᆷ" }, // 'ᆱ(ㄹㅁ)' → 'ᆯᆷ'
          { p: /\u11b2/g, r: "ᆯᆸ" }, // 'ᆲ(ㄹㅂ)' → 'ᆯᆸ'
          { p: /\u11b3/g, r: "ᆯᆺ" }, // 'ᆳ(ㄹㅅ)' → 'ᆯᆺ'
          { p: /\u11b4/g, r: "ᆯᇀ" }, // 'ᆴ(ㄹㅌ)' → 'ᆯᇀ'
          { p: /\u11b5/g, r: "ᆯᇁ" }, // 'ᆵ(ㄹㅍ)' → 'ᆯᇁ'
          { p: /\u11b6/g, r: "ᆯᇂ" }, // 'ᆶ(ㄹㅎ)' → 'ᆯᇂ'
          { p: /\u11b9/g, r: "ᆸᆺ" }, // 'ᆹ(ㅂㅅ)' → 'ᆸᆺ'
        
          // ==============================
          // 6. 경음화/축약 등 특수 규칙
          // ==============================
        
          { p: /\u11ae\u110b\u1175/g, r: "지" }, // 'ᆮ' + 'ᄋ' + 'ᅵ' → '지'
          { p: /\u11c0\u110b\u1175/g, r: "치" }, // 'ᇀ' + 'ᄋ' + 'ᅵ' → '치'

        
          // ==============================
          // 7. 받침 탈락 또는 이음자 제거
          // ==============================
        
          { p: /\u11a8\u110b/g, r: "ᄀ" }, // 'ᆨ' + 'ᄋ' → 'ᄀ'
          { p: /\u11a9\u110b/g, r: "ᄁ" }, // 'ᆩ' + 'ᄋ' → 'ᄁ'
          { p: /\u11ae\u110b/g, r: "ᄃ" }, // 'ᆮ' + 'ᄋ' → 'ᄃ'
          { p: /\u11af\u110b/g, r: "ᄅ" }, // 'ᆯ' + 'ᄋ' → 'ᄅ'
          { p: /\u11b8\u110b/g, r: "ᄇ" }, // 'ᆸ' + 'ᄋ' → 'ᄇ'
          { p: /\u11ba\u110b/g, r: "ᄉ" }, // 'ᆺ' + 'ᄋ' → 'ᄉ'
          { p: /\u11bb\u110b/g, r: "ᄊ" }, // 'ᆻ' + 'ᄋ' → 'ᄊ'
          { p: /\u11bd\u110b/g, r: "ᄌ" }, // 'ᆽ' + 'ᄋ' → 'ᄌ'
          { p: /\u11be\u110b/g, r: "ᄎ" }, // 'ᆾ' + 'ᄋ' → 'ᄎ'
          { p: /\u11c2\u110b/g, r: "" },  // 'ᇂ' + 'ᄋ' → 제거
        
          // ==============================
          // 8. 격음화 (종성 + ㅎ/히읗)
          // ==============================
        
          { p: /\u11c2\u1100|\u11a8\u1112/g, r: "ᄏ" }, // 'ᇂ'+'ᄀ' 또는 'ᆨ'+'ᄒ' → 'ᄏ'
          { p: /\u11c2\u1103|\u11ae\u1112/g, r: "ᄐ" }, // 'ᇂ'+'ᄃ' 또는 'ᆮ'+'ᄒ' → 'ᄐ'
          { p: /\u11c2\u110c|\u11bd\u1112/g, r: "ᄎ" }, // 'ᇂ'+'ᄌ' 또는 'ᆽ'+'ᄒ' → 'ᄎ'
          { p: /\u11c2\u1107/g, r: "ᄇ" },               // 'ᇂ'+'ᄇ' → 'ᄇ'
          { p: /\u11b8\u1112/g, r: "ᄑ" },               // 'ᆸ'+'ᄒ' → 'ᄑ'
        
          // ==============================
          // 9. 특수 처리 및 최종 정리
          // ==============================
        
          { p: /\u11af\u1105/g, r: "ll" }, // 'ᆯ' + 'ᄅ' → ll
          { p: /\u11c2(?!\s|$)/g, r: "" }, // 'ᇂ' (종성) 단독 → 제거
          { p: /([\u11a8-\u11c2])([\u11a8-\u11c2])/g, r: "$1" } // 이중 종성 제거
        ];
        
      for (const { p, r } of replaceArr) {
        jamoStr = jamoStr.replace(p, r);
      }
      return jamoStr;
    }
    
    function applyRomanMapping(jamoStr) {
      const map = {
        'ᄀ': 'g', 'ᄁ': 'kk', 'ᄂ': 'n', 'ᄃ': 'd', 'ᄄ': 'tt',
        'ᄅ': 'r', 'ᄆ': 'm', 'ᄇ': 'b', 'ᄈ': 'pp', 'ᄉ': 's', 'ᄊ': 'ss',
        'ᄋ': '', 'ᄌ': 'j', 'ᄍ': 'jj', 'ᄎ': 'ch', 'ᄏ': 'k',
        'ᄐ': 't', 'ᄑ': 'p', 'ᄒ': 'h',
    
        'ᅡ': 'a', 'ᅢ': 'ae', 'ᅣ': 'ya', 'ᅤ': 'yae', 'ᅥ': 'eo', 'ᅦ': 'e',
        'ᅧ': 'yeo', 'ᅨ': 'ye', 'ᅩ': 'o', 'ᅪ': 'wa', 'ᅫ': 'wae',
        'ᅬ': 'oe', 'ᅭ': 'yo', 'ᅮ': 'u', 'ᅯ': 'wo', 'ᅰ': 'we',
        'ᅱ': 'wi', 'ᅲ': 'yu', 'ᅳ': 'eu', 'ᅴ': 'ui', 'ᅵ': 'i',
    
        'ᆨ': 'k', 'ᆩ': 'k', 'ᆪ': 'k', 'ᆫ': 'n', 'ᆬ': 'n', 'ᆭ': 'n', 'ᆮ': 'd',
        'ᆯ': 'l', 'ᆰ': 'k', 'ᆱ': 'm', 'ᆲ': 'p', 'ᆳ': 't', 'ᆴ': 't', 'ᆵ': 'p', 'ᆶ': 'h',
        'ᆷ': 'm', 'ᆸ': 'p', 'ᆹ': 'p', 'ᆺ': 't', 'ᆻ': 't', 'ᆼ': 'ng',
        'ᆽ': 't', 'ᆾ': 't', 'ᆿ': 'k', 'ᇀ': 't', 'ᇁ': 'p', 'ᇂ': 'h'
      };
      return [...jamoStr].map(ch => map[ch] ?? ch).join('');
    }
    
    function romanize(str, { usePronunciationRules = true, casingOption = "lowercase", useDictionary = false } = {}) {
      if (!str) return '';

      let processedStr = str;
      let protections = [];

      if (useDictionary) {
        // dictionary keys are already sorted by length descending in the data file
        for (const [ko, en] of Object.entries(DICTIONARY)) {
          if (processedStr.includes(ko)) {
            // Careful: replace all occurrences but avoid partial matches within already protected strings
            // Use a regex with escaping
            const escapedKo = ko.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp(escapedKo, 'g');
            processedStr = processedStr.replace(regex, (match) => {
              const idx = protections.length;
              const capitalized = en.charAt(0).toUpperCase() + en.slice(1);
              protections.push(capitalized);
              return `__KRM_${idx}__`;
            });
          }
        }
      }

      // Split by placeholders
      const parts = processedStr.split(/(__KRM_\d+__)/);
      const romanizedParts = parts.map(part => {
        const match = part.match(/__KRM_(\d+)__/);
        if (match) {
          return protections[parseInt(match[1])];
        } else {
          const { jamoString } = splitHangulToJamos(part);
          const replaced = usePronunciationRules ? applyPronunciationRules(jamoString) : jamoString;
          const romanized = applyRomanMapping(replaced);
          return formatRoman(romanized, casingOption);
        }
      });

      let finalResult = romanizedParts.join('');
      
      if (casingOption === "uppercase") {
        finalResult = finalResult.toUpperCase();
      }
      
      return finalResult;
    }

  exports.applyPronunciationRules = applyPronunciationRules;
  exports.applyRomanMapping = applyRomanMapping;
  exports.composeJamos = composeJamos;
  exports.formatRoman = formatRoman;
  exports.romanize = romanize;
  exports.splitHangulToJamos = splitHangulToJamos;

  return exports;

})({});
