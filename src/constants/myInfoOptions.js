const MY_INFO_OPTIONS = {
  gender: ['male', 'female'],
  occupation: [
    '개발',
    '경영-비즈니스',
    '마케팅-광고',
    '디자인',
    '영업',
    '고객서비스-리테일',
    '미디어',
    '인사',
    '게임 제작',
    '금융',
    '엔지니어링-설계',
    '물류-무역',
    '제조-생산',
    '의료-제작-바이오',
    '법률-법집행기관',
    '식-음료',
    '교육',
    '건설-시설',
    '공공-복지',
  ],
  birthYear: [...Array(40).keys()].map(x => String(x + 1970)),
};

export default MY_INFO_OPTIONS;
