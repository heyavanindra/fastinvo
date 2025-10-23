import Container from "@/components/container";


const CtaSection = ({  }) => {
   const features = [
    {
      title: "Smart & Effortless",
      description:
        "Generate invoices in seconds with a clean, intuitive interface — no clutter, no confusion, just a smooth workflow designed to save you time.",
    },
    {
      title: "Fast & Reliable",
      description:
        "Experience instant previews, one-click PDF downloads, and lightning-fast performance. Every invoice you send looks sharp and professional.",
    },
    {
      title: "Private & Transparent",
      description:
        "Built with trust in mind — your data never leaves your control. 100% transparent, open-source, and privacy-first by design.",
    },
  ];

  return (
    <>
      <Container className="px-4">
        <div className="py-4 px-4 w-full relative border border-dashed">
          <div className="size-2 absolute -top-1 -left-1 rounded-full bg-neutral-500 dark:bg-neutral-200"></div>
          <div className="size-2 absolute -top-1 -right-1 rounded-full bg-neutral-500 dark:bg-neutral-200"></div>
          <div className="size-2 absolute -bottom-1 -left-1 rounded-full bg-neutral-500 dark:bg-neutral-200"></div>
          <div className="size-2 absolute -bottom-1 -right-1 rounded-full bg-neutral-500 dark:bg-neutral-200"></div>
          <div className="relative grid sm:grid-cols-3 grid-cols-1 max-sm:divide-y max-sm:gap-y-3">
            {features.map((feat,idx)=>(
              <div key={`${feat.title}+${idx}`} className="px-6 flex  flex-col gap-y-4 py-3">
                <div className="text-2xl font-semibold font-mono text-neutral-700 dark:text-neutral-200">{ feat.title }</div>
                <div className="text-md font-light font-mono tracking-wide leading-tight dark:text-neutral-400">{ feat.description }</div>
              </div>
            ))}
            
          </div>
        </div>
      </Container>
    </>
  );
};

export default CtaSection;