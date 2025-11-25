import { SetMetadata } from '@nestjs/common';

/**
 * Decorator key for skipping enrollment checks
 */
export const SKIP_ENROLLMENT_CHECK_KEY = 'skipEnrollmentCheck';

/**
 * SkipEnrollmentCheck Decorator
 *
 * Use this decorator on controller methods or classes to bypass the EnrollmentGuard.
 * This is useful for:
 * - Course browsing/listing endpoints (users should see available courses)
 * - Admin endpoints (admins need to access all content)
 * - Public course previews
 * - Enrollment endpoints themselves
 *
 * @example
 * ```typescript
 * @SkipEnrollmentCheck()
 * @Get()
 * async getActiveCourses() {
 *   return this.coursesService.getActiveCourses();
 * }
 * ```
 */
export const SkipEnrollmentCheck = () =>
  SetMetadata(SKIP_ENROLLMENT_CHECK_KEY, true);
