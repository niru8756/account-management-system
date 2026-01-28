# Requirements Document

## Introduction

This document specifies the requirements for migrating the Seller Management System UI to consistently use shadcn/ui components throughout all pages. The current implementation has inconsistent patterns where some forms use shadcn Form components while others use raw state management with native HTML elements. This migration will standardize the UI layer to use shadcn components wherever possible, improving maintainability, accessibility, and visual consistency.

## Glossary

- **shadcn/ui**: A collection of reusable React components built with Radix UI and Tailwind CSS
- **Seller Management System**: The internal Next.js application for managing seller accounts
- **Form Component**: The shadcn Form wrapper that integrates with react-hook-form for validation
- **Native HTML Element**: Standard HTML elements like `<input>`, `<select>`, `<checkbox>` without component abstraction

## Requirements

### Requirement 1

**User Story:** As a developer, I want all form inputs to use shadcn Form components, so that I have consistent validation patterns and styling across the application.

#### Acceptance Criteria

1. WHEN a form is rendered THEN the Seller Management System SHALL use the shadcn Form, FormField, FormItem, FormLabel, FormControl, and FormMessage components for all form inputs
2. WHEN form validation errors occur THEN the Seller Management System SHALL display error messages using the FormMessage component
3. WHEN a form field receives focus THEN the Seller Management System SHALL apply consistent focus styling via shadcn Input component

### Requirement 2

**User Story:** As a developer, I want all checkbox inputs to use the shadcn Checkbox component, so that checkboxes have consistent styling and accessibility features.

#### Acceptance Criteria

1. WHEN a checkbox input is needed THEN the Seller Management System SHALL use the shadcn Checkbox component instead of native `<input type="checkbox">`
2. WHEN a checkbox is toggled THEN the Seller Management System SHALL update form state through react-hook-form integration

### Requirement 3

**User Story:** As a developer, I want all select/dropdown inputs to use shadcn Select component, so that dropdowns have consistent styling and behavior.

#### Acceptance Criteria

1. WHEN a dropdown selection is needed THEN the Seller Management System SHALL use the shadcn Select, SelectTrigger, SelectContent, SelectItem components
2. WHEN a select option is chosen THEN the Seller Management System SHALL update form state appropriately

### Requirement 4

**User Story:** As a developer, I want the Label component to be properly imported from shadcn/ui, so that labels render correctly and have consistent styling.

#### Acceptance Criteria

1. WHEN a form label is displayed THEN the Seller Management System SHALL import Label from "@/components/ui/label"
2. WHEN Label is used outside of Form context THEN the Seller Management System SHALL use the standalone shadcn Label component

### Requirement 5

**User Story:** As a developer, I want loading states to use shadcn Skeleton component, so that loading indicators are visually consistent.

#### Acceptance Criteria

1. WHEN data is loading THEN the Seller Management System SHALL display shadcn Skeleton components instead of plain text loading indicators
2. WHEN the loading state ends THEN the Seller Management System SHALL replace skeletons with actual content

### Requirement 6

**User Story:** As a developer, I want confirmation dialogs to use shadcn AlertDialog component, so that destructive actions have consistent confirmation UX.

#### Acceptance Criteria

1. WHEN a destructive action requires confirmation THEN the Seller Management System SHALL display a shadcn AlertDialog instead of browser `confirm()`
2. WHEN the user confirms the action THEN the Seller Management System SHALL proceed with the destructive operation
3. WHEN the user cancels THEN the Seller Management System SHALL close the dialog without performing the action

### Requirement 7

**User Story:** As a developer, I want toast notifications to use shadcn Sonner/Toast component, so that user feedback is displayed consistently.

#### Acceptance Criteria

1. WHEN an operation succeeds or fails THEN the Seller Management System SHALL display feedback using the shadcn toast system
2. WHEN a toast is displayed THEN the Seller Management System SHALL auto-dismiss after an appropriate duration

### Requirement 8

**User Story:** As a developer, I want the seller detail page forms to be refactored to use react-hook-form with shadcn Form components, so that all forms follow the same pattern.

#### Acceptance Criteria

1. WHEN the Payments form is rendered THEN the Seller Management System SHALL use react-hook-form with shadcn Form components instead of useState
2. WHEN the Proposals form is rendered THEN the Seller Management System SHALL use react-hook-form with shadcn Form components instead of useState
3. WHEN the Lifecycle form is rendered THEN the Seller Management System SHALL use react-hook-form with shadcn Form components instead of useState
4. WHEN the Internal Notes form is rendered THEN the Seller Management System SHALL use react-hook-form with shadcn Form components instead of useState
