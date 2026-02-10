import { LookbookSlider } from "@/components/ui/lookbook-slider"
import { UGCGallery } from "@/components/ui/ugc-gallery"
import { InstagramFeed } from "@/components/ui/instagram-feed"

interface LookbookPageProps {
  countryCode: string
}

export default function LookbookPage({ countryCode }: LookbookPageProps) {
  const lookbookSlides = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200",
      title: "Smart City Living",
      products: [
        {
          id: "prod_1",
          title: "Urban Sensor Hub",
          handle: "urban-sensor-hub",
          price: "$299",
          position: { x: 25, y: 40 }
        },
        {
          id: "prod_2",
          title: "Smart LED Controller",
          handle: "smart-led-controller",
          price: "$149",
          position: { x: 65, y: 60 }
        }
      ]
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200",
      title: "Night City Tech",
      products: [
        {
          id: "prod_3",
          title: "Security Camera Pro",
          handle: "security-camera-pro",
          price: "$399",
          position: { x: 45, y: 35 }
        },
        {
          id: "prod_4",
          title: "Motion Sensor Kit",
          handle: "motion-sensor-kit",
          price: "$79",
          position: { x: 75, y: 70 }
        }
      ]
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
      title: "Office Solutions",
      products: [
        {
          id: "prod_5",
          title: "Climate Monitor",
          handle: "climate-monitor",
          price: "$199",
          position: { x: 30, y: 50 }
        }
      ]
    }
  ]

  const ugcItems = [
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      username: "smartcityfan",
      caption: "My new CityOS setup is amazing!",
      likes: 234,
      comments: 12,
      products: [
        { id: "prod_1", name: "Urban Sensor Hub", handle: "urban-sensor-hub", price: 299, currencyCode: "usd" }
      ]
    },
    {
      id: "2",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600",
      username: "techenhusiast",
      likes: 189,
      comments: 8
    },
    {
      id: "3",
      imageUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600",
      username: "iotlover",
      likes: 312,
      comments: 15
    },
    {
      id: "4",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
      username: "futuretech",
      likes: 445,
      comments: 22
    }
  ]

  const instagramPosts = [
    { id: "1", imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400", likes: 1234, comments: 56 },
    { id: "2", imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400", likes: 987, comments: 43 },
    { id: "3", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400", likes: 765, comments: 32 },
    { id: "4", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", likes: 543, comments: 21 },
    { id: "5", imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400", likes: 876, comments: 38 },
    { id: "6", imageUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400", likes: 654, comments: 29 },
    { id: "7", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400", likes: 1098, comments: 67 },
    { id: "8", imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400", likes: 432, comments: 18 }
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Lookbook</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how CityOS products transform spaces and inspire smart living
          </p>
        </div>

        {/* Lookbook Slider */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Looks</h2>
          <LookbookSlider slides={lookbookSlides} />
        </section>

        {/* UGC Gallery */}
        <section className="mb-16">
          <UGCGallery
            items={ugcItems}
            title="Customer Installations"
            columns={4}
          />
        </section>

        {/* Instagram Feed */}
        <section>
          <InstagramFeed
            posts={instagramPosts}
            username="cityos_official"
            columns={4}
          />
        </section>
      </div>
    </div>
  )
}
