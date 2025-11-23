import Container from "@/components/container";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import FooterBranding from "./footer-logo";
const Footer = ({}) => {
  const marqueeItems = [
    {
      src: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=800",
      name: "Anjali Verma",
      title: "Freelance Designer",
      review:
        "Smart & effortless! I can generate invoices in seconds. The interface is super clean — no clutter, no confusion.",
    },
    {
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800",
      name: "Rahul Sharma",
      title: "Startup Founder",
      review:
        "Fast & reliable performance! Instant previews and one-click PDF downloads make every invoice look sharp and professional.",
    },
    {
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800",
      name: "Sophia Patel",
      title: "Business Consultant",
      review:
        "Finally, an invoice app that respects privacy. It's transparent and open-source — my data stays with me.",
    },
    {
      src: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=800",
      name: "Jordan Smith",
      title: "IT Freelancer",
      review:
        "Built with modern tech — I love the smooth UI and performance. It feels like a premium app!",
    },
    {
      src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800",
      name: "Emily Carter",
      title: "Web Developer",
      review:
        "The design is beautiful and clean. Tailwind-based UI makes it easy to use even on mobile!",
    },
    {
      src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
      name: "Michael Lee",
      title: "Customer Support Lead",
      review:
        "The 24/7 support team is responsive and helpful. Feel like I’m using a tool built by people who care.",
    },
    {
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
      name: "Dr. Olivia Brown",
      title: "Legal & Finance Advisor",
      review:
        "Data privacy and transparency matter to me — and this app truly delivers. A trustworthy solution.",
    },
  ];

  return (
    <Container className={"px-4"}>
      <div className="w-full pt-32">
        <div className="sm:py-8 py-2 sm:px-4">
          <h1 className="text-4xl max-sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-400">
            What user say about us -
          </h1>
        </div>

        <Marquee className="mask-r-from-90% mask-l-from-90%">
          {marqueeItems.map((items, idx) => (
            <MarqueeCard
              key={`${items.src}` + idx}
              src={items.src}
              text={items.review}
              name={items.name}
            ></MarqueeCard>
          ))}
        </Marquee>
        <div className="sm:mt-32 mt-6">
          <FooterBranding></FooterBranding>
        </div>
      </div>
    </Container>
  );
};

const MarqueeCard = ({
  src,
  text,
  name,
}: {
  src: string;
  text: string;
  name: string;
}) => {
  return (
    <div className="flex flex-col w-fit mx-6">
      <Image
        className="size-24 rounded-full object-cover"
        src={src}
        alt=""
        width={300}
        height={300}
      ></Image>
      <h2 className={"text-md font-semibold mt-2"}>{name}</h2>
      <p className={"w-[200px] text-sm mt-2"}>{text}</p>
    </div>
  );
};

export default Footer;
