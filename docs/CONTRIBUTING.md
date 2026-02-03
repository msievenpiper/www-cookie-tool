# Contributing to Cookie Tool

Thank you for your interest in contributing to Cookie Tool! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Project Structure](#project-structure)
5. [Coding Standards](#coding-standards)
6. [Making Changes](#making-changes)
7. [Testing](#testing)
8. [Submitting Changes](#submitting-changes)
9. [Feature Requests](#feature-requests)
10. [Bug Reports](#bug-reports)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior

- Be respectful and considerate
- Provide constructive feedback
- Focus on what's best for the project
- Show empathy towards other contributors

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Unprofessional conduct

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** 18+ installed
- **npm** 9+ installed
- **Git** installed
- Basic knowledge of TypeScript, React, and Electron
- A code editor (VS Code recommended)

### First Steps

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/www-cookie-tool.git
   cd www-cookie-tool
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/www-cookie-tool.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Run the app**:
   ```bash
   npm run dev
   ```

## Development Setup

### Recommended VS Code Extensions

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript and JavaScript Language Features** - Enhanced TypeScript support
- **Tailwind CSS IntelliSense** - Tailwind class autocomplete

### Environment Setup

1. Create a development branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make sure the app runs correctly:
   ```bash
   npm run dev
   ```

3. Verify you can build:
   ```bash
   npm run build
   ```

## Project Structure

Understanding the project structure will help you contribute effectively:

```
www-cookie-tool/
├── electron/              # Electron main and preload scripts
│   ├── main.ts           # Main process
│   └── preload.ts        # Preload script (IPC bridge)
├── src/
│   ├── components/       # React UI components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions and constants
│   ├── App.tsx          # Root component
│   └── main.tsx         # React entry point
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── electron-builder.json # Build configuration
```

### Key Files

- **electron/main.ts**: Application window and IPC handlers
- **electron/preload.ts**: Secure IPC bridge with contextBridge
- **src/App.tsx**: Main application layout
- **src/utils/urlEncoder.ts**: Cookie URL generation logic
- **src/utils/constants.ts**: Brand and TLD definitions

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define explicit types for function parameters and returns
- Avoid `any` type - use `unknown` if type is truly unknown
- Use interfaces for object shapes
- Export types from `src/utils/types.ts`

**Example:**
```typescript
// Good
interface CookieProps {
  name: string;
  value: string;
  onRemove: () => void;
}

function CookieInput({ name, value, onRemove }: CookieProps): JSX.Element {
  // ...
}

// Bad
function CookieInput(props: any) {
  // ...
}
```

### React Components

- Use functional components with hooks
- One component per file
- Component names should match file names
- Use props destructuring
- Extract complex logic into custom hooks

**Example:**
```typescript
// BrandSelector.tsx
interface BrandSelectorProps {
  value: string;
  onChange: (brand: string) => void;
}

export function BrandSelector({ value, onChange }: BrandSelectorProps) {
  return (
    // JSX here
  );
}
```

### Styling

- Use TailwindCSS utility classes
- Keep Tailwind classes ordered: layout → spacing → colors → typography
- Extract repeated patterns into components
- Use consistent spacing (mb-2, mb-4, mb-6)

**Example:**
```typescript
// Good
<button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
  Click Me
</button>

// Bad - inline styles
<button style={{ padding: '8px 16px', backgroundColor: 'blue' }}>
  Click Me
</button>
```

### Naming Conventions

- **Components**: PascalCase (`BrandSelector`)
- **Functions**: camelCase (`generateUrl`)
- **Constants**: UPPER_SNAKE_CASE (`BRANDS`, `TLDS`)
- **Interfaces**: PascalCase (`CookieProps`)
- **Files**: Match the export name (`BrandSelector.tsx`)

### Code Organization

- Group related imports together
- Separate component imports from utility imports
- Order: React → third-party → local components → local utilities → types

**Example:**
```typescript
import { useState } from 'react';
import { BrandSelector } from './components/BrandSelector';
import { generateCookieUrl } from './utils/urlEncoder';
import { Cookie } from './utils/types';
```

### Comments

- Write self-documenting code when possible
- Add comments for complex logic or non-obvious decisions
- Use JSDoc for public functions

**Example:**
```typescript
/**
 * Generates a cookie-setting URL for the specified brand and TLD
 * @param brand - The brand identifier
 * @param tld - The top-level domain
 * @param cookies - Array of cookie name/value pairs
 * @param destination - Optional redirect URL (will be base64 encoded)
 * @returns Complete cookie-setting URL
 */
export function generateCookieUrl(
  brand: string,
  tld: string,
  cookies: Cookie[],
  destination?: string
): string {
  // Implementation
}
```

## Making Changes

### Branch Naming

Use descriptive branch names with prefixes:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation only
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

**Examples:**
```bash
feature/export-presets
fix/copy-button-not-working
docs/update-user-guide
refactor/url-encoding-logic
```

### Commit Messages

Write clear, descriptive commit messages:

**Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: add export presets functionality

Add ability to export presets as JSON files. Users can now backup
and share their preset configurations.

Closes #42
```

```
fix: copy to clipboard not working on Windows

Replace clipboard API with electron.clipboard for better cross-platform
support. Tested on Windows 10 and 11.

Fixes #38
```

### Making Code Changes

1. **Keep changes focused**: One feature or fix per pull request
2. **Follow existing patterns**: Match the code style of the file you're editing
3. **Update types**: Add or update TypeScript types as needed
4. **Test your changes**: Verify functionality in dev mode
5. **Update documentation**: Update README, USER_GUIDE, or ARCHITECTURE as needed

### Adding New Features

When adding a new feature:

1. **Check existing issues** to avoid duplicate work
2. **Open an issue** to discuss the feature before implementing
3. **Update documentation** to describe the new feature
4. **Add to README** if user-facing
5. **Consider backwards compatibility**

### Fixing Bugs

When fixing a bug:

1. **Reproduce the bug** in development mode
2. **Identify root cause** before making changes
3. **Write a test** if possible (when test infrastructure exists)
4. **Verify the fix** doesn't break other functionality
5. **Update documentation** if behavior changed

## Testing

### Manual Testing

Currently, the project relies on manual testing. Before submitting changes:

1. **Run the app**: `npm run dev`
2. **Test your changes** thoroughly
3. **Test existing functionality** to ensure no regressions
4. **Test on target platforms** (macOS and/or Windows if possible)

### Testing Checklist

- [ ] Brand selector works correctly
- [ ] TLD selector works correctly
- [ ] Cookie add/remove functions work
- [ ] URL generation produces correct format
- [ ] Copy to clipboard works
- [ ] Open in browser works
- [ ] Presets save and load correctly
- [ ] History saves and displays correctly
- [ ] Error messages display appropriately
- [ ] UI is responsive and looks correct

### Build Testing

Before submitting, verify the build works:

```bash
npm run build:mac   # On macOS
npm run build:win   # On Windows
```

## Submitting Changes

### Pull Request Process

1. **Update your branch** with latest upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Open a Pull Request** on GitHub

4. **Fill out the PR template** with:
   - Description of changes
   - Related issue numbers
   - Testing performed
   - Screenshots (if UI changes)

5. **Wait for review** and address feedback

### PR Guidelines

- **Keep PRs focused**: One feature or fix per PR
- **Write good descriptions**: Explain what and why
- **Reference issues**: Use "Fixes #123" or "Closes #123"
- **Update documentation**: Include doc changes in the PR
- **Respond to feedback**: Address review comments promptly

### PR Template

```markdown
## Description
Brief description of the changes

## Related Issue
Fixes #(issue number)

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing Performed
- [ ] Tested in development mode
- [ ] Tested in production build
- [ ] Tested on macOS
- [ ] Tested on Windows

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Tested thoroughly
```

## Feature Requests

### Suggesting Features

Have an idea for a new feature? Great! Here's how to suggest it:

1. **Check existing issues** to avoid duplicates
2. **Open a new issue** with the "feature request" label
3. **Describe the feature** clearly and concisely
4. **Explain the use case**: Why is this useful?
5. **Provide examples**: Mockups, workflows, or similar features

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Use Case
Why is this feature needed? What problem does it solve?

## Proposed Solution
How should this feature work?

## Alternatives Considered
What other approaches did you consider?

## Additional Context
Screenshots, mockups, or examples
```

## Bug Reports

### Reporting Bugs

Found a bug? Help us fix it by providing detailed information:

1. **Search existing issues** first
2. **Open a new issue** with the "bug" label
3. **Describe the bug** clearly
4. **Provide steps to reproduce**
5. **Include system information**
6. **Add screenshots** if applicable

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Open the app
2. Click on '...'
3. See error

## Expected Behavior
What should happen?

## Actual Behavior
What actually happens?

## System Information
- OS: [e.g., macOS 14.0, Windows 11]
- App Version: [e.g., 1.0.0]
- Node Version: [e.g., 18.0.0]

## Screenshots
Add screenshots if applicable

## Additional Context
Any other relevant information
```

## Development Tips

### Debugging Electron

- **Main process**: Use console.log in main.ts
- **Renderer process**: Use DevTools (Cmd/Ctrl+Shift+I)
- **IPC communication**: Log both sides of IPC calls

### Hot Reload

Vite provides hot module replacement:
- Renderer changes reload automatically
- Main process changes require app restart

### Testing IPC

When testing IPC functionality:
1. Log in preload script
2. Log in main process handler
3. Verify data flow in both directions

### Common Issues

**App won't start:**
- Delete `node_modules` and reinstall
- Check for TypeScript errors
- Verify electron and vite versions

**Build fails:**
- Check all imports are correct
- Verify tsconfig.json is valid
- Ensure all dependencies are installed

## Questions?

If you have questions about contributing:

1. Check existing documentation first
2. Search closed issues for similar questions
3. Open a new issue with the "question" label
4. Reach out to maintainers

## Thank You!

Your contributions make Cookie Tool better for everyone. We appreciate your time and effort!

---

**Happy Contributing!** 🎉
