# Planning Poker 🃏

A modern Planning Poker tool for agile teams, built with Nuxt 4, TypeScript and Tailwind CSS.

## ✨ Features

- **Real-time Estimation**: Estimate user stories together with your team
- **Fibonacci Scale**: Standard poker values (0, 1, 2, 3, 5, 8, 13, 21, 40, 100, ?, ☕)
- **Statistics**: Average, median and vote distribution
- **Consensus Detection**: Automatic detection when everyone votes the same
- **Observer Mode**: Participate without voting
- **Responsive Design**: Optimized for desktop and mobile
- **🆕 Jira & GitHub Integration**: Import stories and sync story points back

## 🔗 Jira & GitHub Integration

### Features

- **Import Stories**: Import issues from Jira Cloud or GitHub (Issues & Projects)
- **Auto-Sync Story Points**: Automatically write story points back when moving to next story
- **OAuth Authentication**: Secure OAuth 2.0 flow for both platforms
- **Local Storage**: All credentials and mappings stored locally in host's browser

### Setup

1. **Environment Variables**: Set up OAuth credentials in `.env`:

```bash
# Jira Cloud OAuth 2.0 (3LO)
JIRA_CLIENT_ID=your-jira-client-id
JIRA_CLIENT_SECRET=your-jira-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

2. **Jira Setup**: Create an OAuth 2.0 app in [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/)
   - Callback URL: `https://your-domain/api/oauth/jira/callback`
   - Scopes: `read:jira-work`, `write:jira-work`, `read:jira-user`, `offline_access`

3. **GitHub Setup**: Create an OAuth App in [GitHub Settings](https://github.com/settings/developers)
   - Callback URL: `https://your-domain/api/oauth/github/callback`
   - Scopes: `repo`, `read:org`, `read:project`, `project`

### Usage

1. Click the **gear icon** (⚙️) in the Story Queue to configure integrations
2. Enter your Jira Cloud URL and Story Points Field ID (e.g., `customfield_10016`)
3. Connect via OAuth
4. Click the **cloud icon** (☁️) to import stories
5. Story points are automatically synced when clicking "Next Story"

## 🛠️ Technology Stack

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager**: [Bun](https://bun.sh/)
- **Icons**: [@nuxt/icon](https://icones.js.org/)
- **Fonts**: [@nuxt/fonts](https://fonts.nuxtjs.org/)

## 📁 Project Structure

```text
planning-poker/
├── app/
│   ├── assets/css/        # Global styles
│   ├── components/        # Vue components
│   ├── composables/       # Reusable logic
│   ├── pages/             # Routes/pages
│   ├── types/             # TypeScript types
│   └── utils/             # Utility classes
├── public/                # Static assets
├── nuxt.config.ts         # Nuxt configuration
├── tailwind.config.ts     # Tailwind configuration
└── package.json
```

## 🚀 Quick Start

### Installation

```bash
bun install
```

### Development

```bash
# Start development server (http://localhost:3000)
bun run dev
```

### Production

```bash
# Build for production
bun run build

# Test production build
bun run preview
```

## 📖 Architecture

The project follows DRY and OOP principles:

- **Composables**: Reusable logic in `composables/`
- **Utility Classes**: `Participant` and `Session` classes
- **Types**: Central TypeScript definitions in `types/`

## 📄 License

MIT License
