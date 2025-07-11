프로젝트 구성 참고 문서
이 문서는 Claude Code 등 AI 에이전트가 프로젝트를 자동 구성할 때 참고할 수 있도록, 전체 시스템 구조와 각 요소의 역할, 개발 및 배포 전략을 한눈에 볼 수 있게 정리한 가이드입니다.

1. 프로젝트 개요
목표:
최소 비용·최대 효율로 운영되는 정적 블로그/포트폴리오 사이트 구축
(Jamstack 기반, Headless CMS, 서버리스, 클라우드 스토리지 활용)

주요 기술 스택:

Frontend: Next.js (SSG/ISR, TypeScript)

CMS: Strapi (로컬/임시 서버, Headless)

Database: Supabase (PostgreSQL, Auth, Storage, Edge Function)

Storage: Cloudinary (이미지/미디어 CDN)

서버리스 함수: Next.js API Route, Supabase Edge Function

배포: Vercel (정적/서버리스 지원)

2. 시스템 아키텍처
text
[Strapi(로컬)] --(빌드 시 API)--> [Next.js] --(정적 빌드)--> [Vercel]
     |                                         |
     +--(이미지 업로드)--> [Cloudinary]         |
                                               |
[사용자] <------(동적 데이터)------ [Supabase DB/Edge Function]
3. 구성 요소별 역할
구성 요소	역할/특징
Next.js	정적 사이트(SSG/ISR) 생성, Vercel 배포, 서버리스 함수/API Route
Strapi	로컬/임시 Headless CMS, 콘텐츠 관리, 빌드 시점에만 사용
Supabase	PostgreSQL DB, 인증, 실시간 데이터, Edge Function(서버리스 API)
Cloudinary	이미지/미디어 파일 저장 및 CDN, 자동 최적화
Vercel	정적/서버리스 배포, 글로벌 CDN, 자동 빌드/배포
4. 개발 및 운영 워크플로우
콘텐츠 작성/수정

Strapi(로컬)에서 글/이미지 등 콘텐츠 관리

이미지 업로드 시 Cloudinary에 저장

정적 사이트 빌드

Next.js에서 Strapi API로 콘텐츠 fetch

SSG/ISR로 정적 파일 생성

배포

Vercel에 정적 파일 + 서버리스 함수 배포

Cloudinary의 이미지/미디어는 CDN으로 서비스

동적 데이터/실시간 기능

Supabase DB/Edge Function, Next.js API Route로 댓글, 좋아요 등 처리

필요시 ISR revalidate로 페이지 실시간 갱신

5. 서버리스 함수(Edge Function) 활용 예시
게시글/댓글/좋아요 등 CRUD

인증/회원 관리 (로그인, 회원가입, 비밀번호 재설정 등)

외부 API 연동(결제, 메일 발송 등)

웹훅/자동화 트리거 (DB 변경 시 ISR revalidate 등)

민감 데이터/관리자 기능(보안 처리)

6. 정적 배포 vs 서버리스 배포 비교
항목	Vercel SSG/ISR	GitHub Pages(정적 배포)
정적 파일 배포	O	O
서버리스 함수(API Route)	O (지원)	X (미지원)
ISR/SSR 지원	O (서버리스 함수로 처리)	X (불가, 오직 정적 페이지만)
동적 데이터 처리	O (서버리스 함수, Edge)	X (정적 데이터만)

7. 프로젝트 폴더 구조 예시
text
/apps
  /blog   # Next.js(SSG/ISR, TypeScript)
  /cms        # Strapi(로컬/임시 Headless CMS)
/packages
  /types      # 공통 타입 정의
  /utils      # 공통 유틸 함수
/scripts      # 배포/빌드 자동화 스크립트

8. 참고 링크
Strapi 공식: https://docs.strapi.io/

Next.js 공식: https://nextjs.org/docs

Supabase 공식: https://supabase.com/docs

Cloudinary 공식: https://cloudinary.com/documentation

Vercel 공식: https://vercel.com/docs

이 문서를 Claude Code 등 AI 에이전트에게 전달하면,
프로젝트의 전체 구조와 각 요소의 역할, 개발 및 배포 전략을 빠르게 이해하고
실제 코드/구성 자동화에 참고할 수 있습니다.