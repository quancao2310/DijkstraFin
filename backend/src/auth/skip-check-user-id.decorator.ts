import { SetMetadata } from '@nestjs/common';

export const SKIP_CHECK_USER_ID_KEY = 'skipCheckUserId';

export const SkipCheckUserId = () => SetMetadata(SKIP_CHECK_USER_ID_KEY, true);
