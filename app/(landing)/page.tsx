import { getServerSession } from 'next-auth';
import { authOptions } from '../../utils/auth';
import { Banners } from './components/banners';
import { CategorySection } from './components/category-section';
import { OffersSection } from './components/offers-section';
import { FeaturesSection } from './components/features-section';
import { BlogSlider } from './components/blog-slider';
import { getLandingBanners } from 'actions/banner.action';
import { getLandingCategories } from 'actions/category.action';
//import { getCategories } from "actions/category.action";
export const dynamic = 'force-dynamic';

export default async function Page() {
  // const session = await getServerSession(authOptions);
  const banners = await getLandingBanners();
  const categories = await getLandingCategories();
  return (
    <>
      <Banners banners={banners} />
      <CategorySection categories={categories} />
      <OffersSection />
      <FeaturesSection />
      {/* <RecentlySection /> */}
      {/* <ProductsSlider /> */}
      <BlogSlider />

      {/* <h1 className="bg-gray-200 text-center font-sans text-xl font-medium p-5">HIGHLIGHTS</h1>
      <Cards />
      <h1 className="bg-gray-100 text-center font-sans text-xl font-medium p-5">ENTDECKEN SIE KAUFMANN</h1>
      <Slide />
      <article className="bg-gray-100 font-sans p-5" dangerouslySetInnerHTML={{ __html: html }} />
      <h1 className=" bg-gray-100 text-red-500 text-center font-sans text-xl font-medium p-5">TAGES DEAL</h1>
      <Aktion />
      <Deal /> */}
    </>
  );
}
