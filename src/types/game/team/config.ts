import {Migratable} from '@/types/migrate';


export type TeamSetupConfig = Migratable & {
  current: string,
};
