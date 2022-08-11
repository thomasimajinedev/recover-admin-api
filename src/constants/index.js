export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  BILLING: 'billing',
  READONLY: 'readonly',
  MODERATOR: 'moderator',
};

export const BACKOFFICE_INVITATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  EXPIRED: 'expired',
};

export const USER_STATUS = {
  ACTIVE: 'active',
  REPORTED: 'reported',
  SUSPENDED: 'suspended',
  BLOCKED: 'blocked',
};

export const USER_GENDER = {
  FEMALE: 'Female',
  MALE: 'Male',
  NON_BINARY: 'Non-binary',
};

export const PROVIDERS = {
  EMAIL: 'email',
  GOOGLE: 'google',
  APPLE: 'apple',
};

export const UNLOCKMETHODS = {
  PASSCODE: 'passcode',
  BIOMETRIC: 'biometric',
  DEFAULT: '',
};

export const POST_STATUS = {
  ACTIVE: 'active',
  REPORTED: 'reported',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
};

export const POST_SHARING_TYPE = {
  PUBLIC: 'public',
  ALLFRIENDS: 'allfriends',
  TOGROUP: 'togroup',
  SOMEFRIENDS: 'somefriends',
};

export const GROUP_STATUS = {
  ACTIVE: 'active',
  REPORTED: 'reported',
  SUSPENDED: 'suspended',
  BLOCKED: 'blocked',
};

export const GROUP_SUBSCRIPTION_TYPE = {
  FREE: 'free',
  PAID: 'paid',
};

export const GROUP_INVITATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

export const GROUP_PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILURE: 'failure',
};

export const GROUP_TYPE = {
  PUBLIC: 'public',
  PRIVATE: 'private',
};

export const FRIEND_STATUS = {
  PENDING: 'pending',
  REJECTED: 'rejected',
  ACCEPTED: 'accepted',
};

export const MEMBER_STATUS = {
  ACTIVE: 'active',
  BLOCKED: 'blocked',
  REPORTED: 'reported',
  SUSPENDED: 'suspended',
};

export const NOTIFICATION_TYPE = {
  REQUEST: 'request',
  CHAT: 'chat',
  INTERACTION: 'interaction',
  REPORT: 'report',
  LIVESTREAM: 'livestream',
  ANONYM: 'anonym',
};

export const NOTIFICATION_TYPE_ID = {
  FRIEND_REQUEST: 'friend_request',
  FRIEND_REQUEST_ACCEPTED: 'friend_request_accepted',
  JOIN_GROUP: 'join_group',
  POST_COMMENTED: 'post_commented',
  POST_LIKED: 'post_commented',
  COMMENT_LIKED: 'comment_liked',
  COMMENT_REPLIED: 'comment_replied',
  GROUP_BLOCKED: 'group_blocked',
  GROUP_INVITATION: 'group_invitation',
  GROUP_INVITATION_ACCEPTED: 'group_invitation_accepted',
  GROUP_USER_REMOVED: 'group_user_removed',
  GROUP_POST_REPORTED: 'group_post_reported',
  LIVESTREAM_STARTED: 'livestream_started',
  GROUP_WARN: 'group_warn',
  USER_WARN: 'user_warn',
};

export const NOTIFICATION_LABEL = {
  LIKE: 'liked your post',
  COMMENT: 'commented:',
  ADD_FRIEND: 'sent you a friend request.',
  ANSWER_FRIEND_REQUEST: 'accepted your friend request.',
  INVITE_TO_GROUP: 'you were invited to join this group.',
  VIEW_REPORTED_POST: 'Has reported the post made from',
};

export const ELEMENTS_PER_PAGE = 2;

export const LIVE_SHARE_OPTIONS = {
  PUBLIC: 'public',
  FRIENDS: 'friends',
  GROUP: 'group',
  INDIVIDUAL: 'individual',
};

export const LIVE_STATUS = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
};

export const LIST_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'Octuber',
  'November',
  'December',
];

export const ODD_MONTHS = ['January', 'March', 'May', 'July', 'August', 'Octuber', 'December'];

export const MONTHS_MAPPING = {
  January: { value: '01' },
  February: { value: '02' },
  March: { value: '03' },
  April: { value: '04' },
  May: { value: '05' },
  June: { value: '06' },
  July: { value: '07' },
  August: { value: '08' },
  September: { value: '09' },
  Octuber: { value: '10' },
  November: { value: '11' },
  December: { value: '12' },
};

export const PredefinedGroupRules = [
  {
    title: 'Be kind and friendy',
    description:
      'The members can disscuss any topic in the group, as long they are nice with each other',
    predefined: true,
  },
  {
    title: 'Don’t bully or use offensive language',
    description:
      'Bullying and demeaning comments about race, religion, culture, sexual orientation, gender or identity are not allowed.',
    predefined: true,
  },
  {
    title: 'Do not post promotions or spam',
    description: 'Self-promotion, spam, and inappropriate links are not allowed in this group.',
    predefined: true,
  },
  {
    title: 'Respect the privacy of others',
    description:
      'what is shared in the group should not leave it, to maintain trust between members.',
    predefined: true,
  },
];

export const SENDGRID_EMAIL_TEMPLATE_ID = {
  MEMBER_INVITATION: 'd-6933b79b507a4db6b3dde18f1981b0f4',
  RESET_PASSWORD_REQUEST: 'd-11902ad2b9b84bf181b73f42eaa617d3',
  RECOVERY_EMAIL_CONFIRMATION: 'd-18292099f1eb457e8ab5d124613056f7',
  ACCOUNT_LOCKED: 'd-bdf760f338a2464a81378f3de3458557',
  GROUP_PYMENT_SUCCEDED: 'd-9162828311dd4f7388bff50aecaa1704',
  GROUP_PYMENT_FAILED: 'd-08faf7557f3a48cf917828d8afa5f737',
  NEW_MEMBER_SUBSCRIBED: 'd-8b7760545072463fb580522b70a5b761',
  MEMBER_BLOCKED: 'd-bf32fc0ca9f44ab09cc00dba21cdc2d6',
  MEMBER_SUSPENDED: 'd-85ec32d6650c4c239ca2a0afd309ceab',
  GROUP_BLOCKED: 'd-2447612d9a1444989e39e87ab4c68c5d',
  WARNS: 'd-eee35a32a36c4412977352cd0b306fdb',  
};
