import {
  LandingPageBanner,
  LandingPageFeatureCard,
  LandingPageFooter,
  LandingPageHeader,
} from '@api-assistant/landing-page-fe';
import styles from './landing-page.module.scss';
import {
  MdOutlineManageAccounts,
  MdOutlineCloudUpload,
  MdOutlineDataObject,
  MdOutlineFavorite,
} from 'react-icons/md';
import { useContext } from 'react';
import { ProfileContext } from '@api-assistant/accounts-fe';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'apps/react-frontend/src/store/app.state';
import { logoutAccount } from '../../../accounts/store/effects';

/* eslint-disable-next-line */
export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps) {

  const userProfile = useContext(ProfileContext);

  const isLoggedIn = userProfile !== null;

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutAccount())
  }

  return (
    <div className={styles['landing-page']}>
      <LandingPageHeader handleLogout={handleLogout} isUserLoggedIn={isLoggedIn} />
      <LandingPageBanner />
      <h1 style={{ textAlign: 'center', padding: '2rem' }}>Features</h1>
      <div className={styles['landing-page__feature_cards']}>
        <LandingPageFeatureCard
          icon={<MdOutlineDataObject fontSize={'50px'} />}
          title="CRUD Declaratively"
          description="Build MongoDB queries in Frontend and API Assistant executes for you"
        />
        <LandingPageFeatureCard
          icon={<MdOutlineManageAccounts fontSize={'50px'} />}
          title="Welcome users at ease"
          description="Integrate Username and Password authentication in minutes"
        />
        <LandingPageFeatureCard
          icon={<MdOutlineCloudUpload fontSize={'50px'} />}
          title="Scalable object store"
          description="Upload your user files without worrying about infrastructure"
        />
        <LandingPageFeatureCard
          icon={<MdOutlineFavorite fontSize={'50px'} />}
          title="Ultra smooth UI"
          description="Manage your application's backend with simple and smooth UI"
        />
      </div>
      <div className={styles['landing-page__footer']}>
        <LandingPageFooter isUserLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}

export default LandingPage;
