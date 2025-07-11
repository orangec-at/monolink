# MonoLink - Jamstack 블로그 시스템

최소 비용·최대 효율로 운영되는 정적 블로그/포트폴리오 사이트 구축 프로젝트입니다.
Jamstack 기반으로 Headless CMS, 서버리스, 클라우드 스토리지를 활용합니다.

## 🏗️ 시스템 아키텍처

```
[Strapi(로컬)] --(빌드 시 API)--> [Next.js] --(정적 빌드)--> [Vercel]
     |                                         |
     +--(이미지 업로드)--> [Cloudinary]         |
                                               |
[사용자] <------(동적 데이터)------ [Supabase DB/Edge Function]
```

## 🛠️ 기술 스택

- **Frontend**: Next.js (SSG/ISR, TypeScript)
- **CMS**: Strapi (로컬/임시 서버, Headless)
- **Database**: Supabase (PostgreSQL, Auth, Storage, Edge Function)
- **Storage**: Cloudinary (이미지/미디어 CDN)
- **서버리스 함수**: Next.js API Route, Supabase Edge Function
- **배포**: Vercel (정적/서버리스 지원)

## 📁 프로젝트 구조

```
/apps
  /blog       # Next.js 블로그 앱 (SSG/ISR, TypeScript)
  /cms        # Strapi CMS (로컬/임시 Headless CMS)
/docs
  /knowledge-base  # Obsidian vault (지식관리)
/packages
  /types      # 공통 타입 정의
  /utils      # 공통 유틸 함수
/scripts      # 배포/빌드 자동화 스크립트
```

## 🚀 빠른 시작

### 1. 환경 설정

```bash
# 의존성 설치
pnpm install

# 환경변수 설정
cp apps/blog/.env.local.example apps/blog/.env.local
cp apps/cms/.env.example apps/cms/.env
```

### 2. Strapi CMS 시작

```bash
# CMS 개발 서버 실행
pnpm --filter @monolink/cms develop

# 브라우저에서 http://localhost:1337/admin 접속
# 관리자 계정 생성 후 콘텐츠 관리
```

### 3. 블로그 앱 실행

```bash
# 블로그 개발 서버 실행
pnpm --filter @monolink/blog dev

# 브라우저에서 http://localhost:3000 접속
```

### 4. 제텔카스텐 지식관리 시스템 설정

```bash
# Git submodule 초기화 (처음 클론 시)
git submodule update --init --recursive

# Obsidian 앱에서 vault 열기
# docs/knowledge-base 폴더를 vault로 선택
```

**Note**: 지식관리 시스템은 별도의 private 리포지토리로 관리됩니다.

## 🔧 빌드 및 배포

### 정적 사이트 빌드 (SSG)

```bash
# 완전 정적 사이트 생성 (GitHub Pages 등에 적합)
pnpm --filter @monolink/blog build:static

# 또는 전체 빌드
./scripts/build.sh
```

### ISR 빌드 (Incremental Static Regeneration)

```bash
# ISR + 서버리스 함수 (Vercel 등에 적합)
pnpm --filter @monolink/blog build:isr
```

### 자동 배포

```bash
# Vercel에 자동 배포
./scripts/deploy.sh
```

## ⚙️ 구성 요소별 역할

| 구성 요소 | 역할/특징 |
|-----------|-----------|
| **Next.js** | 정적 사이트(SSG/ISR) 생성, Vercel 배포, 서버리스 함수/API Route |
| **Strapi** | 로컬/임시 Headless CMS, 콘텐츠 관리, 빌드 시점에만 사용 |
| **Supabase** | PostgreSQL DB, 인증, 실시간 데이터, Edge Function(서버리스 API) |
| **Cloudinary** | 이미지/미디어 파일 저장 및 CDN, 자동 최적화 |
| **Vercel** | 정적/서버리스 배포, 글로벌 CDN, 자동 빌드/배포 |

## 🔄 개발 워크플로우

### 1. 콘텐츠 작성/수정
- Strapi(로컬)에서 글/이미지 등 콘텐츠 관리
- 이미지 업로드 시 Cloudinary에 저장

### 2. 정적 사이트 빌드
- Next.js에서 Strapi API로 콘텐츠 fetch
- SSG/ISR로 정적 파일 생성

### 3. 배포
- Vercel에 정적 파일 + 서버리스 함수 배포
- Cloudinary의 이미지/미디어는 CDN으로 서비스

### 4. 동적 데이터/실시간 기능
- Supabase DB/Edge Function, Next.js API Route로 댓글, 좋아요 등 처리
- 필요시 ISR revalidate로 페이지 실시간 갱신

## 🌟 구현된 기능

### 정적 콘텐츠 (Strapi → Next.js)
- ✅ 블로그 아티클 목록 및 상세 페이지
- ✅ 카테고리별 분류
- ✅ 작성자 정보
- ✅ 검색 기능
- ✅ SEO 최적화

### 동적 기능 (Supabase)
- ✅ 댓글 시스템
- ✅ 좋아요/추천 기능
- ✅ 조회수 카운터
- ✅ 실시간 데이터 업데이트

### 이미지 최적화 (Cloudinary)
- ✅ 자동 이미지 최적화
- ✅ 반응형 이미지 제공
- ✅ CDN을 통한 빠른 로딩

### ISR (Incremental Static Regeneration)
- ✅ 60초 간격 자동 재생성
- ✅ 웹훅을 통한 수동 재생성
- ✅ 정적 + 동적의 하이브리드 구조

## 🔐 환경변수 설정

### 필수 환경변수 (apps/blog/.env.local)

```bash
# Strapi API URLs
STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Cloudinary (이미지 CDN)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Supabase (동적 데이터)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# ISR 재생성 시크릿
REVALIDATE_SECRET=your-secret-key

# 빌드 설정
STATIC_EXPORT=true  # 정적 빌드 시에만 설정
```

## 📊 서버리스 함수 활용

### Next.js API Routes
- `/api/revalidate` - ISR 재생성 웹훅

### Supabase Edge Functions (예정)
- 게시글/댓글/좋아요 등 CRUD
- 인증/회원 관리
- 외부 API 연동
- 웹훅/자동화 트리거

## 🚀 배포 옵션

### 1. Vercel (추천 - ISR 지원)
```bash
./scripts/deploy.sh
```

### 2. GitHub Pages (정적 사이트만)
```bash
pnpm --filter @monolink/blog build:static
# out/ 폴더를 GitHub Pages에 배포
```

### 3. Netlify (정적 + 서버리스)
```bash
pnpm --filter @monolink/blog build:static
# out/ 폴더를 Netlify에 배포
```

## 🔧 개발 명령어

```bash
# 전체 개발 서버 실행
./scripts/dev.sh

# CMS만 실행
pnpm --filter @monolink/cms develop

# 블로그만 실행  
pnpm --filter @monolink/blog dev

# 타입 체크
pnpm --filter @monolink/blog lint

# 전체 빌드
./scripts/build.sh

# 제텔카스텐 vault 설정
./scripts/setup-zettelkasten.sh
```

## 🧠 제텔카스텐 지식관리 시스템

### 특징
- **제텔카스텐 방법론** 기반 네트워크형 지식 구조
- **원자적 노트** - 하나의 노트는 하나의 아이디어만
- **연결적 사고** - 모든 노트는 다른 노트와 연결
- **창발적 학습** - 연결을 통한 새로운 아이디어 생성
- **자동화된 설정** 스크립트 제공

### 폴더 구조
```
docs/knowledge-base/ (Git Submodule - Private Repository)
├── notes/              # 📝 모든 제텔 노트 (ID 기반)
├── templates/          # 📋 노트 템플릿
├── assets/             # 🖼️ 첨부 파일
└── 000 - Index.md      # 🗂️ 메인 인덱스
```

### 노트 유형 (태그로 분류)
- **#permanent** - 영구 노트: 완전히 발전된 아이디어
- **#literature** - 문헌 노트: 읽은 자료의 요약과 해석
- **#fleeting** - 임시 노트: 빠른 아이디어 기록
- **#concept** - 개념 노트: 특정 개념의 정의와 설명

### 추천 플러그인
- **Templater**: 고급 템플릿 기능
- **Dataview**: 동적 노트 쿼리
- **Random Note**: 무작위 노트 탐색
- **Graph Analysis**: 네트워크 분석
- **Zettlr**: 제텔카스텐 도구

### 제텔카스텐 원칙
1. **원자성** → 하나의 노트, 하나의 아이디어
2. **연결성** → 모든 노트는 다른 노트와 연결
3. **자기언어** → 나만의 언어로 재작성
4. **네트워크 사고** → 계층이 아닌 네트워크로 사고
5. **지속적 발전** → 노트를 계속 발전시키기

### 지식관리 워크플로우
```bash
# 노트 작성 후 커밋
cd docs/knowledge-base
git add .
git commit -m "add: 새로운 제텔 노트"
git push

# 다른 환경에서 최신 노트 가져오기
cd docs/knowledge-base
git pull
```

## 📚 참고 링크

- [Strapi 공식 문서](https://docs.strapi.io/)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Supabase 공식 문서](https://supabase.com/docs)
- [Cloudinary 공식 문서](https://cloudinary.com/documentation)
- [Vercel 공식 문서](https://vercel.com/docs)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.