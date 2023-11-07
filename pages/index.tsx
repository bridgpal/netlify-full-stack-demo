import Link from "next/link";
const KontentDelivery = require('@kontent-ai/delivery-sdk');


const IS_DEV = process.env.NODE_ENV === 'development';

export default function Home({ posts }: { posts: any }) {
  return (
    <>
      <main className="container mx-auto px-8">
        <div className="py-20">
          <h1 className="font-bold text-3xl text-center">
            <img src="/logo.svg" alt="Netlify - Fullstack Demo" className="w-40 inline-block" />
          </h1>
        </div>

        <div className="bg-slate-100 p-12 rounded-xl">
          <h2 className="text-2xl mb-12">
            <img src="/kontent.svg" alt="Contentful" className="w-36"/>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {posts?.map((post: any) => (
              <div key={post.system.id} className="bg-white rounded-xl"  data-sb-object-id={`${post.system.id}`}>
                <img className="rounded-xl rounded-b-none w-full"/>
                <div className="p-8">
                  <h2 className="font-bold text-xl mb-8" data-sb-field-path="name">Title: {`${post.system.name}`}</h2>
                  <Link href="/" className="border border-slate-400 hover:bg-slate-200 transition-all rounded px-4 py-2">View Post</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}


export const getStaticProps = async () => {
  try {
    var deliveryClient = KontentDelivery.createDeliveryClient({
      environmentId: 'cbdb567e-0cfc-0012-9089-88d49d69f949'
    });
  
    const response = await deliveryClient.items().type('blog').toPromise()
    const posts = response.data.items || [];

    console.log("kontent", posts);
    return { props: { posts } };

  } catch(err) {
      console.error(err);
      return { props: { posts: [] }}
  }
}