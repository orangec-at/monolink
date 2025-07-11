#!/bin/bash

set -e

echo "🧠 Setting up Zettelkasten Knowledge System..."

VAULT_PATH="docs/knowledge-base"
OBSIDIAN_PATH="$VAULT_PATH/.obsidian"

# Create vault directory structure (minimal for Zettelkasten)
echo "📁 Creating Zettelkasten directory structure..."
mkdir -p "$VAULT_PATH"/{notes,templates,assets}
mkdir -p "$OBSIDIAN_PATH"/{plugins,themes,snippets}

# Basic Obsidian configurations
echo "🔧 Setting up Obsidian configurations..."

# App settings - optimized for Zettelkasten
cat > "$OBSIDIAN_PATH/app.json" << 'EOF'
{
  "legacyEditor": false,
  "livePreview": true,
  "defaultViewMode": "preview",
  "useMarkdownLinks": true,
  "newLinkFormat": "relative",
  "attachmentFolderPath": "./assets",
  "newFileLocation": "folder",
  "promptDelete": false,
  "alwaysUpdateLinks": true,
  "showUnsupportedFiles": false,
  "showFrontmatter": true,
  "foldHeading": true,
  "foldIndent": true,
  "showLineNumber": false,
  "spellcheck": true,
  "strictLineBreaks": false,
  "tabSize": 2,
  "readableLineLength": true,
  "showInlineTitle": true,
  "useTab": false,
  "vimMode": false
}
EOF

# Core plugins for Zettelkasten
cat > "$OBSIDIAN_PATH/core-plugins.json" << 'EOF'
[
  "file-explorer",
  "global-search",
  "switcher",
  "graph",
  "backlink",
  "outgoing-link",
  "tag-pane",
  "page-preview",
  "templates",
  "note-composer",
  "command-palette",
  "random-note",
  "outline",
  "word-count"
]
EOF

# Appearance settings
cat > "$OBSIDIAN_PATH/appearance.json" << 'EOF'
{
  "accentColor": "",
  "theme": "obsidian",
  "cssTheme": "",
  "interfaceFontFamily": "",
  "textFontFamily": "",
  "monospaceFontFamily": "",
  "baseFontSize": 16,
  "translucency": false,
  "enabledCssSnippets": [],
  "showViewHeader": true,
  "nativeMenus": true
}
EOF

# Graph view optimized for Zettelkasten
cat > "$OBSIDIAN_PATH/graph.json" << 'EOF'
{
  "collapse-filter": false,
  "search": "",
  "showTags": true,
  "showAttachments": false,
  "hideUnresolved": false,
  "showOrphans": true,
  "collapse-color-groups": false,
  "colorGroups": [
    {
      "query": "tag:#concept",
      "color": {
        "a": 1,
        "rgb": 5419488
      }
    },
    {
      "query": "tag:#permanent",
      "color": {
        "a": 1,
        "rgb": 14701138
      }
    },
    {
      "query": "tag:#literature",
      "color": {
        "a": 1,
        "rgb": 11621088
      }
    },
    {
      "query": "tag:#fleeting",
      "color": {
        "a": 1,
        "rgb": 14725458
      }
    }
  ],
  "collapse-display": false,
  "showArrow": true,
  "textFadeMultiplier": 0,
  "nodeSizeMultiplier": 1,
  "lineSizeMultiplier": 1,
  "collapse-forces": false,
  "centerStrength": 0.5,
  "repelStrength": 8,
  "linkStrength": 1,
  "linkDistance": 250,
  "scale": 1,
  "close": false
}
EOF

# Hotkeys for Zettelkasten workflow
cat > "$OBSIDIAN_PATH/hotkeys.json" << 'EOF'
{
  "switcher:open": [
    {
      "modifiers": ["Mod"],
      "key": "o"
    }
  ],
  "command-palette:open": [
    {
      "modifiers": ["Mod", "Shift"],
      "key": "p"
    }
  ],
  "templater-obsidian:create-new-note-from-template": [
    {
      "modifiers": ["Mod"],
      "key": "n"
    }
  ],
  "random-note": [
    {
      "modifiers": ["Mod", "Shift"],
      "key": "r"
    }
  ],
  "global-search": [
    {
      "modifiers": ["Mod"],
      "key": "f"
    }
  ],
  "graph:open": [
    {
      "modifiers": ["Mod"],
      "key": "g"
    }
  ]
}
EOF

# Templates plugin config
cat > "$OBSIDIAN_PATH/templates.json" << 'EOF'
{
  "folder": "templates"
}
EOF

# Create Zettelkasten templates
echo "📝 Creating Zettelkasten templates..."

# Permanent note template
cat > "$VAULT_PATH/templates/permanent-note.md" << 'EOF'
# {{title}}

**Created**: {{date:YYYY-MM-DD HH:mm}}
**ID**: {{date:YYYYMMDDHHmm}}

## 핵심 아이디어

## 연결된 개념
- 

## 참고 문헌
- 

## 생각의 발전
- 

---
Tags: #permanent
Links: [[]]
EOF

# Literature note template  
cat > "$VAULT_PATH/templates/literature-note.md" << 'EOF'
# {{title}}

**Created**: {{date:YYYY-MM-DD HH:mm}}
**ID**: {{date:YYYYMMDDHHmm}}
**Source**: 

## 주요 내용

## 인용구
> 

## 내 생각

## 연결할 수 있는 아이디어
- 

---
Tags: #literature
Source: 
Links: [[]]
EOF

# Fleeting note template
cat > "$VAULT_PATH/templates/fleeting-note.md" << 'EOF'
# {{title}}

**Created**: {{date:YYYY-MM-DD HH:mm}}
**ID**: {{date:YYYYMMDDHHmm}}

## 생각/아이디어

## 나중에 발전시킬 점
- 

---
Tags: #fleeting
Links: [[]]
EOF

# Concept note template
cat > "$VAULT_PATH/templates/concept-note.md" << 'EOF'
# {{title}}

**Created**: {{date:YYYY-MM-DD HH:mm}}
**ID**: {{date:YYYYMMDDHHmm}}

## 정의

## 특징

## 예시

## 관련 개념
- 

## 응용

---
Tags: #concept
Links: [[]]
EOF

# Create initial structure and index
echo "📄 Creating initial Zettelkasten structure..."

# Main index note
cat > "$VAULT_PATH/000 - Index.md" << 'EOF'
# 🧠 제텔카스텐 지식 시스템

**Created**: {{date:YYYY-MM-DD HH:mm}}

## 🎯 제텔카스텐이란?

제텔카스텐(Zettelkasten)은 독일어로 "슬립박스"를 의미하며, 지식을 연결하여 창의적 사고를 촉진하는 노트 작성 방법입니다.

## 📝 노트 유형

### #permanent - 영구 노트
- 완전히 발전된 아이디어
- 나만의 언어로 작성
- 다른 노트들과 연결

### #literature - 문헌 노트  
- 읽은 자료의 요약
- 원문 인용과 출처 기록
- 개인적 해석 추가

### #fleeting - 임시 노트
- 빠른 아이디어 기록
- 나중에 발전시킬 생각들
- 정기적으로 정리 필요

### #concept - 개념 노트
- 특정 개념의 정의와 설명
- 예시와 응용 포함
- 다른 개념들과의 관계

## 🔗 지식 지도

### 웹 개발 관련
- [[Jamstack 아키텍처]]
- [[Next.js SSG vs ISR]]
- [[Headless CMS 개념]]

### 학습 방법론
- [[제텔카스텐 방법론]]
- [[연결적 사고]]
- [[창의적 글쓰기]]

## 🎲 랜덤 탐색
- 무작위 노트로 이동: `Cmd + Shift + R`
- 새로운 연결 발견하기

## 🔍 검색 전략
- 태그로 검색: `#permanent #concept`
- 키워드로 검색: `Cmd + F`
- 그래프로 탐색: `Cmd + G`

---
Tags: #index #zettelkasten
Last Updated: {{date:YYYY-MM-DD}}
EOF

# Create some example notes
cat > "$VAULT_PATH/notes/202501111200 - 제텔카스텐 방법론.md" << 'EOF'
# 제텔카스텐 방법론

**Created**: 2025-01-11 12:00
**ID**: 202501111200

## 핵심 아이디어

제텔카스텐은 단순한 노트 정리가 아니라 **지식 간의 연결**을 통해 새로운 아이디어를 창발하는 시스템이다.

## 연결된 개념
- [[202501111201 - 연결적 사고]]
- [[202501111202 - 창의적 글쓰기]]
- [[니클라스 루만]]

## 핵심 원칙
1. **원자성**: 하나의 노트는 하나의 아이디어만
2. **연결성**: 모든 노트는 다른 노트와 연결
3. **지속성**: 시간이 지나도 이해할 수 있게 작성

## 생각의 발전
- 정보 수집 → 문헌 노트 작성
- 개인적 해석 → 영구 노트 작성  
- 노트 간 연결 → 새로운 아이디어 창발

---
Tags: #permanent #methodology #zettelkasten
Links: [[000 - Index]]
EOF

cat > "$VAULT_PATH/notes/202501111201 - 연결적 사고.md" << 'EOF'
# 연결적 사고

**Created**: 2025-01-11 12:01
**ID**: 202501111201

## 핵심 아이디어

서로 다른 영역의 지식을 연결하여 새로운 통찰을 얻는 사고 방식.

## 특징
- 비선형적 사고
- 패턴 인식
- 창의적 조합

## 연결된 개념
- [[202501111200 - 제텔카스텐 방법론]]
- [[202501111203 - 네트워크 효과]]

## 응용
- 제품 개발에서 다양한 기술 조합
- 문제 해결 시 다각도 접근
- 학습 시 개념 간 연결

---
Tags: #permanent #thinking #creativity
Links: [[202501111200 - 제텔카스텐 방법론]]
EOF

# Workspace layout for Zettelkasten
cat > "$OBSIDIAN_PATH/workspace.json" << 'EOF'
{
  "main": {
    "id": "main",
    "type": "split",
    "children": [
      {
        "id": "main-editor",
        "type": "leaf",
        "state": {
          "type": "markdown",
          "state": {
            "file": "000 - Index.md",
            "mode": "source"
          }
        }
      }
    ],
    "direction": "vertical"
  },
  "left": {
    "id": "left-sidebar",
    "type": "split",
    "children": [
      {
        "id": "file-search-tabs",
        "type": "tabs",
        "children": [
          {
            "id": "file-explorer",
            "type": "leaf",
            "state": {
              "type": "file-explorer",
              "state": {}
            }
          },
          {
            "id": "search",
            "type": "leaf",
            "state": {
              "type": "search",
              "state": {
                "query": "",
                "matchingCase": false,
                "explainSearch": false,
                "collapseAll": false,
                "extraContext": false,
                "sortOrder": "alphabetical"
              }
            }
          }
        ]
      }
    ],
    "direction": "horizontal",
    "width": 300
  },
  "right": {
    "id": "right-sidebar", 
    "type": "split",
    "children": [
      {
        "id": "right-tabs",
        "type": "tabs",
        "children": [
          {
            "id": "backlinks",
            "type": "leaf",
            "state": {
              "type": "backlink",
              "state": {
                "file": "000 - Index.md",
                "collapseAll": false,
                "extraContext": false,
                "sortOrder": "alphabetical",
                "showSearch": false,
                "searchQuery": "",
                "backlinkCollapsed": false,
                "unlinkedCollapsed": true
              }
            }
          },
          {
            "id": "outgoing-links",
            "type": "leaf",
            "state": {
              "type": "outgoing-link",
              "state": {
                "file": "000 - Index.md",
                "linksCollapsed": false,
                "unlinkedCollapsed": true
              }
            }
          },
          {
            "id": "tags",
            "type": "leaf",
            "state": {
              "type": "tag",
              "state": {
                "sortOrder": "frequency",
                "useHierarchy": true
              }
            }
          },
          {
            "id": "graph",
            "type": "leaf",
            "state": {
              "type": "graph",
              "state": {}
            }
          }
        ]
      }
    ],
    "direction": "horizontal",
    "width": 300
  },
  "active": "main-editor",
  "lastOpenFiles": [
    "000 - Index.md",
    "notes/202501111200 - 제텔카스텐 방법론.md",
    "notes/202501111201 - 연결적 사고.md"
  ]
}
EOF

echo "✅ Zettelkasten setup complete!"
echo ""
echo "📖 Next steps:"
echo "1. Open Obsidian app"
echo "2. Click 'Open folder as vault'"
echo "3. Select: $(pwd)/$VAULT_PATH"
echo "4. Start with '000 - Index' note"
echo ""
echo "🔌 Recommended plugins for Zettelkasten:"
echo "- Templater (advanced templates)"
echo "- Dataview (dynamic note queries)"
echo "- Random Note (serendipitous discovery)"
echo "- Graph Analysis (network insights)"
echo "- Zettlr (Zettelkasten helpers)"
echo ""
echo "🧠 Zettelkasten principles:"
echo "- One idea per note"
echo "- Link everything"
echo "- Use your own words"
echo "- Think in networks, not hierarchies"
echo ""
echo "🎯 Vault location: $(pwd)/$VAULT_PATH"