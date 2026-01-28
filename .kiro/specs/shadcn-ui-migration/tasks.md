# Implementation Plan

- [x] 1. Install required shadcn components
  - Run `npx shadcn@latest add checkbox` to add Checkbox component
  - Run `npx shadcn@latest add select` to add Select component
  - Run `npx shadcn@latest add alert-dialog` to add AlertDialog component
  - Run `npx shadcn@latest add skeleton` to add Skeleton component
  - _Requirements: 2.1, 3.1, 5.1, 6.1_

- [-] 2. Refactor seller detail page forms to use react-hook-form with shadcn
  - [x] 2.1 Refactor Payments form to use Form components
    - Replace useState variables (amount, paymentDate, reference, proofOfPayment) with useForm
    - Wrap form in shadcn Form component with FormField, FormItem, FormLabel, FormControl, FormMessage
    - Add Zod validation schema for payment fields
    - _Requirements: 8.1, 1.1, 1.2_
  - [ ] 2.2 Refactor Proposals form to use Form components
    - Replace useState variables (proposalFileName, proposalFileUrl, proposalShareable) with useForm
    - Replace native checkbox with shadcn Checkbox component
    - Wrap form in shadcn Form component
    - Add Zod validation schema for proposal fields
    - _Requirements: 8.2, 2.1, 2.2, 1.1_
  - [ ] 2.3 Refactor Lifecycle form to use Form components
    - Replace useState variables (marketplace, stage) with useForm
    - Wrap form in shadcn Form component
    - Add Zod validation schema for lifecycle fields
    - _Requirements: 8.3, 1.1_
  - [ ] 2.4 Refactor Internal Notes form to use Form components
    - Replace useState variables (noteContent, noteAttachment) with useForm
    - Wrap form in shadcn Form component
    - Add Zod validation schema for note fields
    - _Requirements: 8.4, 1.1_
  - [ ]\* 2.5 Write property test for form validation error display
    - **Property 1: Form validation displays error messages**
    - **Validates: Requirements 1.2**
  - [ ]\* 2.6 Write property test for checkbox state updates
    - **Property 2: Checkbox toggle updates form state**
    - **Validates: Requirements 2.2**

- [ ] 3. Fix seller edit form to use react-hook-form properly
  - [ ] 3.1 Replace editForm useState with sellerForm useForm integration
    - The edit form currently uses raw useState (editForm) instead of the defined sellerForm
    - Wire up the existing sellerForm to the edit mode UI
    - Ensure FormField components are used consistently
    - _Requirements: 1.1, 1.2_

- [ ] 4. Replace browser confirm() with AlertDialog
  - [ ] 4.1 Create reusable ConfirmDialog component
    - Build a wrapper around shadcn AlertDialog for delete confirmations
    - Accept props for title, description, onConfirm callback
    - _Requirements: 6.1, 6.2, 6.3_
  - [ ] 4.2 Replace confirm() in document delete with AlertDialog
    - Update handleDeleteDocument to use the new ConfirmDialog
    - Manage dialog open state with useState
    - _Requirements: 6.1, 6.2, 6.3_
  - [ ]\* 4.3 Write integration tests for AlertDialog confirmation flow
    - Test confirm path executes delete
    - Test cancel path does not execute delete
    - _Requirements: 6.2, 6.3_

- [ ] 5. Add loading skeletons
  - [ ] 5.1 Add Skeleton to seller detail page loading state
    - Replace "Loading..." text with Skeleton components
    - Create skeleton layout matching the actual content structure
    - _Requirements: 5.1, 5.2_
  - [ ] 5.2 Add Skeleton to audit logs page loading state
    - Replace "Loading..." text with Skeleton components
    - _Requirements: 5.1, 5.2_

- [ ] 6. Add toast notifications for user feedback
  - [ ] 6.1 Add success/error toasts to seller operations
    - Add toast on successful seller create/update
    - Add toast on API errors
    - _Requirements: 7.1_
  - [ ] 6.2 Add success/error toasts to document operations
    - Add toast on document upload/edit/delete success
    - Add toast on API errors
    - _Requirements: 7.1_
  - [ ] 6.3 Add success/error toasts to payment and other operations
    - Add toast on payment record success
    - Add toast on proposal, lifecycle, and note operations
    - _Requirements: 7.1, 7.2_

- [ ] 7. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Fix Label imports and usage
  - [ ] 8.1 Audit and fix Label imports across all pages
    - Ensure Label is imported from "@/components/ui/label" where used
    - Remove any undefined Label usages
    - _Requirements: 4.1, 4.2_

- [ ] 9. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
