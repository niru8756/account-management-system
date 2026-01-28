# Design Document: shadcn/ui Migration

## Overview

This design document outlines the approach for migrating the Seller Management System UI to consistently use shadcn/ui components. The migration focuses on standardizing form handling patterns, replacing native HTML elements with shadcn equivalents, and improving user feedback mechanisms.

The current codebase has shadcn/ui already configured but uses it inconsistently. Some forms use the proper `Form` component with react-hook-form integration, while others use raw `useState` with native HTML elements. This migration will unify these patterns.

## Architecture

The migration follows a component-by-component approach within the existing Next.js App Router architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Page Components                       │
│  (app/sellers/[id]/page.tsx, app/login/page.tsx, etc.)  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  shadcn/ui Components                    │
│  Form, Input, Button, Checkbox, Select, AlertDialog,    │
│  Skeleton, Toast/Sonner, Label, Card, Table, Badge      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Radix UI Primitives + Tailwind              │
└─────────────────────────────────────────────────────────┘
```

### Form Architecture Pattern

All forms will follow this consistent pattern:

```typescript
// 1. Define Zod schema
const formSchema = z.object({
  field: z.string().min(1, "Required"),
});

// 2. Initialize react-hook-form with zodResolver
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { field: "" },
});

// 3. Use shadcn Form components
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="field"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Label</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

## Components and Interfaces

### New shadcn Components to Install

| Component   | Purpose                          | Installation                         |
| ----------- | -------------------------------- | ------------------------------------ |
| Checkbox    | Replace native checkbox inputs   | `npx shadcn@latest add checkbox`     |
| Select      | Dropdown selections (future use) | `npx shadcn@latest add select`       |
| AlertDialog | Confirmation dialogs             | `npx shadcn@latest add alert-dialog` |
| Skeleton    | Loading states                   | `npx shadcn@latest add skeleton`     |

### Existing Components (Already Installed)

- Button, Card, Input, Textarea, Label, Badge, Table, Form, Alert, Sonner

### Component Migration Map

| Current Implementation     | Target Implementation |
| -------------------------- | --------------------- |
| `<input type="checkbox">`  | `<Checkbox />`        |
| `confirm("Are you sure?")` | `<AlertDialog />`     |
| `<div>Loading...</div>`    | `<Skeleton />`        |
| `useState` + `<form>`      | `useForm` + `<Form>`  |

## Data Models

No changes to data models. This migration is purely UI-focused.

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

Based on the prework analysis, the following testable properties have been identified:

### Property 1: Form validation displays error messages

_For any_ form with validation rules and _for any_ invalid input that violates those rules, submitting the form SHALL display an error message in the DOM corresponding to the violated rule.
**Validates: Requirements 1.2**

### Property 2: Checkbox toggle updates form state

_For any_ checkbox within a form, toggling the checkbox SHALL update the corresponding form field value to reflect the new checked state.
**Validates: Requirements 2.2**

### Property 3: Select option updates form state

_For any_ select input within a form, choosing an option SHALL update the corresponding form field value to match the selected option's value.
**Validates: Requirements 3.2**

Note: Many requirements (1.1, 1.3, 2.1, 3.1, 4.1, 4.2, 8.1-8.4) relate to code structure and component usage rather than runtime behavior. These are verified through code review and static analysis rather than property-based testing.

The loading state (5.1, 5.2), dialog behavior (6.1-6.3), and toast notifications (7.1-7.2) are better suited for example-based integration tests rather than property-based tests due to their specific UI interaction patterns.

## Error Handling

### Form Validation Errors

- All validation errors are handled by react-hook-form and displayed via `FormMessage` component
- Errors are cleared when the user corrects the input
- Form submission is prevented until all validation passes

### API Errors

- Failed API calls will trigger toast notifications with error messages
- The UI will remain in a usable state after errors

### Dialog Cancellation

- Canceling an AlertDialog will not perform any action
- The dialog will close and return focus to the triggering element

## Testing Strategy

### Unit Tests

Unit tests will verify:

- Individual component rendering
- Form validation logic
- State management within forms

### Property-Based Tests

Using a property-based testing library (e.g., fast-check), the following properties will be tested:

1. **Form validation property**: For any invalid input matching a validation rule, the corresponding error message must appear
2. **Checkbox state property**: For any sequence of checkbox toggles, the final form state must match the final checkbox state
3. **Select state property**: For any selected option, the form state must contain that option's value

Each property-based test will:

- Run a minimum of 100 iterations
- Be tagged with the format: `**Feature: shadcn-ui-migration, Property {number}: {property_text}**`
- Reference the specific correctness property from this design document

### Integration Tests

Integration tests will cover:

- AlertDialog confirmation flow (confirm and cancel paths)
- Toast notification appearance and auto-dismiss
- Loading skeleton to content transition
- Full form submission workflows

### Testing Framework

- Jest + React Testing Library for unit and integration tests
- fast-check for property-based testing
