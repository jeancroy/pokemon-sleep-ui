import {redirect} from '@/components/i18n/exports';


const redirectToNewPath = () => {
  redirect('/production');
};

export default redirectToNewPath;
