# Agentation + VSCode MCP Setup Guide

> **Agentation** is a visual feedback tool for AI agents. It lets you annotate your React UI, then syncs those annotations to your AI coding agent via MCP so it can automatically fix issues.
>
> 📄 Docs: https://www.agentation.com/install | MCP: https://www.agentation.com/mcp

---

## Requirements

- Node.js 18+
- React 18+
- VSCode 1.99+
- GitHub Copilot (free tier works)

---

## Step 1: Install Agentation in your React project

```bash
npm install agentation -D
```

---

## Step 2: Add the Agentation component to your app

Add the component at the root of your React app (e.g. `App.tsx` or `layout.tsx`). The `NODE_ENV` check ensures it only loads in development.

```tsx
import { Agentation } from "agentation";

function App() {
  return (
    <>
      <YourApp />
      {process.env.NODE_ENV === "development" && (
        <Agentation
          endpoint="http://localhost:4747"
          onSessionCreated={(sessionId) => {
            console.log("Session started:", sessionId);
          }}
        />
      )}
    </>
  );
}
```

> The `endpoint` prop connects the component to the local MCP server so annotations sync automatically to your agent. Without it, annotations stay local and must be copied manually.

---

## Step 3: Setup the MCP server

### Option A — Auto-configure (recommended)

This detects all installed agents (VSCode, Cursor, Windsurf, etc.) and writes the correct config:

```bash
npx add-mcp "npx -y agentation-mcp server"
```

### Option B — Manual config for VSCode

Create or open `.vscode/mcp.json` in your project root and add:

```json
{
  "servers": {
    "agentation": {
      "command": "npx",
      "args": ["-y", "agentation-mcp", "server"]
    }
  }
}
```

> ⚠️ VSCode uses the key `"servers"` — **not** `"mcpServers"` (which Cursor and Claude Desktop use). This is the most common setup mistake.

---

## Step 4: Verify the setup

```bash
npx agentation-mcp doctor
```

Then in VSCode:

1. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Run **MCP: List Servers**
3. Select `agentation` → click **Start**
4. Status should show as **running**

---

## Step 5: Start using it

### 1. Run your app in dev mode

```bash
npm run dev
```

### 2. Annotate your UI

- Open your app in the browser
- The **Agentation toolbar** appears in the corner
- Click any element on the page
- Type your feedback (e.g. *"Change this button to blue"*, *"Text is overflowing on mobile"*)

### 3. Let the agent fix it

- Open VSCode → Copilot Chat → switch to **Agent Mode**
- Type a prompt like:

```
Fix all pending annotations
```

- The agent reads your annotations via MCP tools (`agentation_get_all_pending`) and automatically applies fixes
- Resolved annotations disappear from the list

---

## How it works

```
Browser (your React app)
    ↕  click + comment
Agentation toolbar
    ↕  sync
MCP server (localhost:4747)
    ↕  MCP protocol
VSCode Copilot Agent Mode
    ↕  auto-fix
Your codebase
```

---

## Without `endpoint` (manual mode)

If you don't set an `endpoint`, annotations stay local in the browser. You can still use Agentation manually:

1. Annotate your UI as normal
2. Click the **Copy** button on the toolbar
3. Paste the generated markdown into any AI chat (Copilot, Claude, etc.)

---

## Useful commands

| Command | Description |
|---|---|
| `npx agentation-mcp doctor` | Check server health |
| `npx agentation-mcp server` | Start MCP server manually |
| `npx agentation-mcp init` | Interactive setup wizard for Claude Code |
| `MCP: List Servers` | View all MCP servers in VSCode |
| `MCP: Add Server` | Add a new MCP server via Command Palette |

---

## Links

- Agentation install guide: https://www.agentation.com/install
- Agentation MCP docs: https://www.agentation.com/mcp
- Agentation API reference: https://www.agentation.com/api
- VSCode MCP docs: https://code.visualstudio.com/docs/copilot/customization/mcp-servers
- VSCode MCP config reference: https://code.visualstudio.com/docs/copilot/reference/mcp-configuration
- add-mcp (auto-configure tool): https://github.com/neondatabase/add-mcp
