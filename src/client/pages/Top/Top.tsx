import type { FC } from 'react';
import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';
import { ProductList } from '../../components/feature/ProductList';
import { useFeatures } from '../../hooks/useFeatures';
import { useRecommendation } from '../../hooks/useRecommendation';

import * as styles from './Top.styles';

const LazyProductHeroImage = lazy(() =>
  import('../../components/product/ProductHeroImage').then(({ ProductHeroImage }) => ({
    default: ProductHeroImage,
  })),
);

export const Top: FC = () => {
  const { recommendation } = useRecommendation();
  const { features } = useFeatures();

  if (recommendation === undefined || features === undefined) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>買えるオーガニック</title>
      </Helmet>
      <Layout>
        <div>
          <Suspense fallback="loading">
            <LazyProductHeroImage product={recommendation.product} title="今週のオススメ" />
          </Suspense>

          <div className={styles.featureList()}>
            {features.map((featureSection) => {
              return (
                <div key={featureSection.id} className={styles.feature()}>
                  <h2 className={styles.featureHeading()}>{featureSection.title}</h2>
                  <ProductList featureSection={featureSection} />
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};
