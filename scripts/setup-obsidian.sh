#!/bin/bash

set -e

echo "🧠 Setting up Obsidian Knowledge Base..."

VAULT_PATH="docs/knowledge-base"
OBSIDIAN_PATH="$VAULT_PATH/.obsidian"

# Create vault directory structure
echo "📁 Creating vault directory structure..."
mkdir -p "$VAULT_PATH"/{00-inbox,01-projects,02-areas,03-resources,04-archive,templates,assets}
mkdir -p "$OBSIDIAN_PATH"/{plugins,themes,snippets}

# Copy plugin configurations
echo "🔧 Setting up plugin configurations..."

# Daily Notes plugin config
cat > "$OBSIDIAN_PATH/daily-notes.json" << 'EOF'
{
  "folder": "00-inbox/daily",
  "template": "templates/daily-note",
  "format": "YYYY-MM-DD",
  "autorun": true
}
EOF

# Templates plugin config
cat > "$OBSIDIAN_PATH/templates.json" << 'EOF'
{
  "folder": "templates"
}
EOF

# Graph view config
cat > "$OBSIDIAN_PATH/graph.json" << 'EOF'
{
  "collapse-filter": true,
  "search": "",
  "showTags": false,
  "showAttachments": false,
  "hideUnresolved": false,
  "showOrphans": true,
  "collapse-color-groups": true,
  "colorGroups": [
    {
      "query": "tag:#project",
      "color": {
        "a": 1,
        "rgb": 14701138
      }
    },
    {
      "query": "tag:#learning",
      "color": {
        "a": 1,
        "rgb": 14725458
      }
    },
    {
      "query": "tag:#reference",
      "color": {
        "a": 1,
        "rgb": 11621088
      }
    }
  ],
  "collapse-display": true,
  "showArrow": false,
  "textFadeMultiplier": 0,
  "nodeSizeMultiplier": 1,
  "lineSizeMultiplier": 1,
  "collapse-forces": true,
  "centerStrength": 0.518713248970312,
  "repelStrength": 10,
  "linkStrength": 1,
  "linkDistance": 250,
  "scale": 1,
  "close": false
}
EOF

# Hotkeys config
cat > "$OBSIDIAN_PATH/hotkeys.json" << 'EOF'
{
  "switcher:open": [
    {
      "modifiers": [
        "Mod"
      ],
      "key": "p"
    }
  ],
  "command-palette:open": [
    {
      "modifiers": [
        "Mod",
        "Shift"
      ],
      "key": "p"
    }
  ],
  "daily-notes": [
    {
      "modifiers": [
        "Mod"
      ],
      "key": "d"
    }
  ],
  "templater-obsidian:create-new-note-from-template": [
    {
      "modifiers": [
        "Mod",
        "Shift"
      ],
      "key": "t"
    }
  ]
}
EOF

# Create template files
echo "📝 Creating template files..."

# Daily note template
cat > "$VAULT_PATH/templates/daily-note.md" << 'EOF'
# {{date:YYYY-MM-DD}}

## 📋 Today's Tasks
- [ ] 

## 💡 Ideas & Notes

## 📚 Learning

## 🔗 Links

---
Created: {{date:YYYY-MM-DD HH:mm}}
Tags: #daily
EOF

# Project template
cat > "$VAULT_PATH/templates/project-template.md" << 'EOF'
# {{title}}

## 📋 Overview
- **Goal**: 
- **Timeline**: 
- **Status**: 🟡 In Progress
- **Priority**: Medium

## 🎯 Objectives
- [ ] 
- [ ] 
- [ ] 

## 🛠️ Tech Stack

## 📝 Notes

## 🔗 Related
- 

## 📊 Progress

## 🤔 Reflections

---
Created: {{date:YYYY-MM-DD HH:mm}}
Tags: #project
EOF

# Learning note template
cat > "$VAULT_PATH/templates/learning-template.md" << 'EOF'
# {{title}}

## 🎯 Learning Goal

## 📚 Core Concepts

## 💻 Code Examples
\`\`\`

\`\`\`

## 🔄 Practice Exercises

## 🔗 Resources
- 

## 💡 Key Takeaways

## ➡️ Next Steps

---
Created: {{date:YYYY-MM-DD HH:mm}}
Tags: #learning
EOF

# Reference template
cat > "$VAULT_PATH/templates/reference-template.md" << 'EOF'
# {{title}}

## 📋 Summary

## 🔧 Usage
\`\`\`

\`\`\`

## 📝 Examples

## 🔗 Official Docs

## 💡 Tips & Tricks

---
Created: {{date:YYYY-MM-DD HH:mm}}
Tags: #reference
EOF

# Create initial project notes
echo "📄 Creating initial project notes..."

cat > "$VAULT_PATH/01-projects/MonoLink 블로그 시스템.md" << 'EOF'
# MonoLink 블로그 시스템

## 📋 Overview
- **Goal**: Jamstack 기반 블로그 시스템 구축
- **Timeline**: 2024년 
- **Status**: 🟢 Complete
- **Priority**: High

## 🎯 Objectives
- [x] Strapi CMS 설정
- [x] Next.js SSG 구현
- [x] Cloudinary 이미지 연동
- [x] Supabase 동적 데이터 처리
- [x] ISR 설정
- [x] Vercel 배포

## 🛠️ Tech Stack
- Frontend: Next.js (TypeScript)
- CMS: Strapi
- Database: Supabase
- CDN: Cloudinary
- Deployment: Vercel

## 📝 Architecture
```
[Strapi] → [Next.js SSG/ISR] → [Vercel]
    ↓              ↓
[Cloudinary]  [Supabase]
```

## 🔗 Related
- [[Jamstack 개념 정리]]
- [[Next.js SSG vs ISR]]
- [[Strapi 설정 가이드]]

---
Created: {{date:YYYY-MM-DD HH:mm}}
Tags: #project #complete #jamstack
EOF

# Create workspace layout
cat > "$OBSIDIAN_PATH/workspace.json" << 'EOF'
{
  "main": {
    "id": "main",
    "type": "split",
    "children": [
      {
        "id": "explorer",
        "type": "leaf",
        "state": {
          "type": "file-explorer",
          "state": {}
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
        "id": "file-explorer",
        "type": "tabs",
        "children": [
          {
            "id": "file-explorer-tab",
            "type": "leaf",
            "state": {
              "type": "file-explorer",
              "state": {}
            }
          },
          {
            "id": "search-tab", 
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
        "id": "outline-backlink",
        "type": "tabs",
        "children": [
          {
            "id": "outline-tab",
            "type": "leaf",
            "state": {
              "type": "outline",
              "state": {}
            }
          },
          {
            "id": "backlink-tab",
            "type": "leaf", 
            "state": {
              "type": "backlink",
              "state": {
                "file": "README.md",
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
            "id": "tag-tab",
            "type": "leaf",
            "state": {
              "type": "tag",
              "state": {
                "sortOrder": "frequency",
                "useHierarchy": true
              }
            }
          }
        ]
      }
    ],
    "direction": "horizontal",
    "width": 300
  },
  "active": "explorer",
  "lastOpenFiles": [
    "README.md"
  ]
}
EOF

echo "✅ Obsidian vault setup complete!"
echo ""
echo "📖 Next steps:"
echo "1. Open Obsidian app"
echo "2. Click 'Open folder as vault'"
echo "3. Select: $(pwd)/$VAULT_PATH"
echo "4. Install recommended plugins from Community Plugins"
echo ""
echo "🔌 Recommended plugins to install:"
echo "- Calendar"
echo "- Dataview" 
echo "- Templater"
echo "- Kanban"
echo "- Excalidraw"
echo "- Advanced Tables"
echo ""
echo "🎯 Vault location: $(pwd)/$VAULT_PATH"