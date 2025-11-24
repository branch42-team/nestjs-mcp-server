export const Queue = {
  Email: 'email',
  Embedding: 'embedding',
} as const;

export const Job = {
  Email: {
    EmailVerification: 'email-verification',
    SignInMagicLink: 'signin-magic-link',
    ResetPassword: 'reset-password',
  },
  Embedding: {
    EmbedLesson: 'embed-lesson',
    EmbedCourse: 'embed-course',
    ReindexAll: 'reindex-all',
  },
} as const satisfies Record<keyof typeof Queue, Record<string, string>>;
