import Container from "@/components/container";
import Button from "@/components/ui/button";

const Hero = ({}) => {
  return (
    <Container className="">
      <div className=" text-neutral-900 pt-50 pb-24">
        <div
          className="
          relative flex justify-center items-center flex-col gap-y-6 py-12"
        >
          <div className="absolute w-full h-px bg-linear-to-r from-transparent via-neutral-600/20 dark:via-neutral-200/20 to-transparent top-0"></div>
          <div className="absolute w-full h-px bg-linear-to-r from-transparent via-neutral-600/20 dark:via-neutral-200/20 to-transparent bottom-0"></div>
          <p className="bg-neutral-300 rounded-full px-4 py-px text-sm font-semibold">
            Your Only invoice app
          </p>
          <h1 className="text-3xl md:text-6xl text-center max-sm:mt-6 max-w-4xl font-bold text-neutral-900 dark:text-neutral-200">
            Generate Invoices Instantly <br /> No Sign-Up, No Hassle.
          </h1>
          <h4 className="max-w-lg font-semibold text-sm md:text-lg max-sm:mt-3 text-center px-2 text-neutral-900 tracking-tight leading-tight dark:text-neutral-500">
            We empower developers and technical teams to create, simulate, and
            manage AI-driven workflows visually
          </h4>
          <div>
            <Button
              href="/invoice"
              className="bg-neutral-950 dark:bg-neutral-300 dark:text-neutral-900 text-neutral-400 hover:text-neutral-200 transition-colors duration-300 ease-in-out"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
