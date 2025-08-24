### 👴🏻👵🏻 하나이음 서비스 Client Repository

- 디지털 하나로 금융서비스개발 6기 YOLDEN 팀 👊🏻

### 👩🏻‍💻 Commit Convention

- [유다시티 컨벤션](https://udacity.github.io/git-styleguide/)
- 관련 이슈가 있을 경우 커밋과 함께 작성합니다.
  - ex. `feat: 로그인 기능 구현 (#1)`

```
feat: 새로운 기능 구현
add: 기능구현까지는 아니지만 새로운 파일이 추가된 경우
del: 기존 코드를 삭제한 경우
fix: 버그, 오류 해결
docs: README나 WIKI 등의 문서 작업
style: 코드가 아닌 스타일 변경을 하는 경우
refactor: 리팩토링 작업
test: 테스트 코드 추가, 테스트 코드 리팩토링
chore: 코드 수정, 내부 파일 수정
```

### 🫧 Branch Convention

- `main`
  - 항상 배포 가능한 안정한 상태
  - 직접 커밋하지 않고, PR/merge를 통해서만 코드를 반영합니다.
- `dev`
  - main에 올리기 전, 통합 테스트용 브랜치입니다.
- `feat/<issue-number>-<feature description>`
  - 기능 개발용 브랜치입니다.
- `fix/<issue-number>-<bug description>`
  - 버그 수정용 브랜치입니다.
- `refactor/<issue-number>-<description>`
  - 리팩토링용 브랜치입니다.
- `docs/<issue-number>-<description>`
  - 문서 작업용 브랜치입니다.

### 🗂️ 폴더 구조 예시

```
src/
  app/             # 라우팅, 상태 관리, 전역 프로바이더
  assets/          # 정적 자산
  components/      # 범용 UI 컴포넌트
  features/        # 도메인별 기능 단위 (DDD처럼)
    auth/
      api/         # API 모듈
      components/
      hooks/
      store/       # Zustand/Recoil/Redux slice
    user/
      ...
  hooks/           # 공용 훅
  layouts/         # 레이아웃 컴포넌트
  lib/             # 유틸리티 함수, axios, formValidator 등
  pages/           # 라우트 단위 화면 컴포넌트
  styles/          # 글로벌 CSS, Tailwind @theme 확장
  types/           # 전역 타입 정의 (TS interface, type)
  App.tsx
  main.tsx
```
