# Todo App Implementation Plan

## Project Overview

A minimal single-page todo application built with React 19, Vite, Shadcn UI, and Tailwind v4. Features a simple form to add todos with titles only.

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS v4
- **State Management**: React useState (local state)
- **Form Handling**: React Hook Form + Zod validation
- **Testing**: Vitest + React Testing Library + Happy DOM

## Page Implementation

### Single Page: Todo App (`src/pages/TodoPage.tsx`)

**Components Required:**

- `TodoForm` - Form component with input field and submit button
- `TodoList` - List container for displaying todos
- `TodoItem` - Individual todo item component

**Features:**

- Add new todo with title validation
- Display list of todos
- Mark todos as complete/incomplete
- Delete todos
- Local state persistence

**API Endpoints:** None (local state only)

## Component Structure

### Core Components

#### 1. TodoForm (`src/components/TodoForm.tsx`)

- Uses shadcn `Input` and `Button` components
- React Hook Form for form handling
- Zod schema validation (required title, max 100 chars)
- Emits `onAddTodo` event with todo data

#### 2. TodoList (`src/components/TodoList.tsx`)

- Renders array of todos using `TodoItem`
- Handles empty state display
- Props: `todos`, `onToggle`, `onDelete`

#### 3. TodoItem (`src/components/TodoItem.tsx`)

- Uses shadcn `Checkbox` and `Button` components
- Displays todo title with completion status
- Toggle completion and delete actions
- Props: `todo`, `onToggle`, `onDelete`

### Utility Components

- Use existing shadcn components: `Card`, `Button`, `Input`, `Checkbox`

## Types & Interfaces

### `src/types/todo.ts`

```typescript
export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
}

export interface TodoFormData {
    title: string;
}
```

## Utilities & Hooks

### `src/hooks/useTodos.ts`

Custom hook for todo state management:

- Add, toggle, delete todo functions
- Local storage persistence
- Todo state management

### `src/lib/todoUtils.ts`

Utility functions:

- Generate unique todo IDs
- Todo validation helpers
- Local storage operations

### `src/schemas/todoSchema.ts`

Zod validation schemas:

- Todo form validation schema
- Todo object validation

## File Structure

```
src/
├── components/
│   ├── TodoForm.tsx
│   ├── TodoList.tsx
│   ├── TodoItem.tsx
│   └── ui/ (existing shadcn components)
├── hooks/
│   └── useTodos.ts
├── types/
│   └── todo.ts
├── lib/
│   └── todoUtils.ts
├── schemas/
│   └── todoSchema.ts
├── pages/
│   └── TodoPage.tsx
└── App.tsx (main entry point)
```

## Testing Strategy

### Testing Framework Setup

- **Unit Tests**: Vitest + React Testing Library
- **Environment**: Happy DOM (already configured)
- **Coverage**: V8 provider with 80%+ target
- **Mocking**: Vitest mocks for localStorage

### Test File Organization

```
src/
├── components/
│   ├── __tests__/
│   │   ├── TodoForm.test.tsx
│   │   ├── TodoList.test.tsx
│   │   └── TodoItem.test.tsx
├── hooks/
│   └── __tests__/
│       └── useTodos.test.ts
├── lib/
│   └── __tests__/
│       └── todoUtils.test.ts
├── test/
│   ├── setup.ts (existing)
│   ├── test-utils.tsx
│   └── mocks/
│       └── localStorage.ts
```

### Key Test Cases

#### TodoForm Component Tests

- Renders form with input and submit button
- Validates required title field
- Validates maximum character limit (100)
- Calls onAddTodo with correct data on submit
- Clears form after successful submission
- Shows validation errors for invalid input

#### TodoList Component Tests

- Renders list of todos correctly
- Shows empty state when no todos
- Passes correct props to TodoItem components
- Handles toggle and delete actions

#### TodoItem Component Tests

- Displays todo title and completion status
- Toggles completion on checkbox click
- Calls delete function on delete button click
- Shows completed state styling
- Handles keyboard interactions

#### useTodos Hook Tests

- Initializes with empty todos array
- Adds new todo with correct structure
- Toggles todo completion status
- Deletes todo by ID
- Persists todos to localStorage
- Loads todos from localStorage on mount

#### TodoUtils Tests

- Generates unique IDs for todos
- Validates todo objects
- Handles localStorage operations safely
- Formats dates correctly

### Test Utilities (`src/test/test-utils.tsx`)

```typescript
// Custom render function with providers
// Mock localStorage helpers
// Common test data factories
// Assertion helpers for todo operations
```

### Mock Strategy (`src/test/mocks/localStorage.ts`)

- Mock localStorage for testing persistence
- Clear storage between tests
- Simulate storage errors

### Testing Patterns

#### Component Testing Pattern

```typescript
// Render component with required props
// Assert initial state
// Simulate user interactions
// Assert state changes and side effects
```

#### Hook Testing Pattern

```typescript
// Use renderHook from @testing-library/react
// Test initial state
// Test actions and state updates
// Test side effects (localStorage)
```

#### Form Testing Pattern

```typescript
// Test form validation
// Test successful submissions
// Test error handling
// Test form reset behavior
```

### Coverage Goals

- **Components**: 90%+ line coverage
- **Hooks**: 95%+ line coverage
- **Utils**: 100% line coverage
- **Overall**: 85%+ line coverage

### Test Commands

- `npm test` - Run tests in watch mode
- `npm run test:ci` - Run tests once
- `npm run test:coverage` - Generate coverage report
- `npm run test:ui` - Launch Vitest UI

## Implementation Phases

### Phase 1: Setup & Types

1. Create todo types and schemas
2. Set up basic component structure
3. Configure test utilities and mocks

### Phase 2: Core Components

1. Implement TodoForm with validation
2. Create TodoItem component
3. Build TodoList component
4. Write comprehensive tests for each

### Phase 3: State Management

1. Develop useTodos custom hook
2. Implement localStorage persistence
3. Create utility functions
4. Add hook and utility tests

### Phase 4: Integration & Polish

1. Integrate all components in TodoPage
2. Add styling and responsive design
3. Write integration tests
4. Performance optimization and accessibility

### Phase 5: Final Testing

1. Complete test coverage
2. End-to-end testing scenarios
3. Cross-browser compatibility
4. Performance testing
