import Collection from "@/components/Collection";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { mongooseConnect } from "@/lib/mongoose";
// import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";


export default function Home({featuredproduct, newProducts, collectionProduct}) {
  return (
    <>
    <Hero product={featuredproduct} />
    <hr class="my-4 h-px border-0 bg-gray-300" />
    <Products products={newProducts}/>
    <hr class="my-4 h-px border-0 bg-gray-300" />
    <Collection product={collectionProduct}/>
    
    </>
  );
}

export const getServerSideProps  = async () => {
  await mongooseConnect();
  const featureId = '65b92a3942e1737dbbf6f81e';
  const collectionId = '65ba35037c7e21801527358b'
  
  const featuredproduct = await Product.findById(featureId);
  const collectionProduct = await Product.findById(collectionId);
  const newProducts = await Product.find({}, null, {sort: {'_id': 1}, limit: 5});

  return {
     props: {
        // recuperer un objet en fonction de id
        featuredproduct: JSON.parse(JSON.stringify(featuredproduct)),
        newProducts: JSON.parse(JSON.stringify(newProducts)),
        collectionProduct: JSON.parse(JSON.stringify(collectionProduct)),
     }
  }
}

