import {useSession} from 'next-auth/react';


export type SessionStatus = ReturnType<typeof useSession>['status'];
