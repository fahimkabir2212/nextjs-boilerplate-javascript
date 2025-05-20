import TestPrivateFetch from '@/components/delete_test/TestPrivateFetch';
import TestServerFetch from '@/components/delete_test/TestServerFetch';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('homePage');
  return (
    <div className="flex gap-2">
      <TestServerFetch />
      <hr />
      <TestPrivateFetch />
      <h1>{t('title')}</h1>
    </div>
  );
}
