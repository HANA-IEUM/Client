module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 사용할 타입 제한
    "type-enum": [
      2,
      "always",
      [
        "feat", // 새로운 기능 구현
        "add", // 새로운 파일 추가
        "del", // 기존 코드/파일 삭제
        "fix", // 버그, 오류 해결
        "docs", // 문서 작업 (README, WIKI 등)
        "style", // 코드 포맷팅, 세미콜론 누락 등 스타일 수정
        "refactor", // 리팩토링
        "test", // 테스트 코드 추가/수정
        "chore", // 빌드/도구 관련 잡다한 변경
      ],
    ],

    // header(타입 + 제목) 길이 제한 (72자 권장)
    "header-max-length": [2, "always", 72],

    "scope-empty": [0],
    "scope-case": [0],

    "subject-case": [0],
  },
};
