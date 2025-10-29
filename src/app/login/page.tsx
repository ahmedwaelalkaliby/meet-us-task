import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const gradientBlobs = [
    {
      top: "top-0",
      left: "left-[155px]",
      width: "w-[807px]",
      height: "h-[807px]",
      bg: "bg-[#9e77f6]",
      rounded: "rounded-[403.5px]",
      blur: "blur-[400px]",
      opacity: "opacity-60",
    },
    {
      top: "top-[1018px]",
      left: "left-0",
      width: "w-[813px]",
      height: "h-[813px]",
      bg: "bg-[#b0d2e5]",
      rounded: "rounded-[406.5px]",
      blur: "blur-[400px]",
      opacity: "opacity-60",
    },
    {
      top: "top-[1039px]",
      left: "left-[1200px]",
      width: "w-[667px]",
      height: "h-[667px]",
      bg: "bg-[#9e77f6]",
      rounded: "rounded-[333.5px]",
      blur: "blur-[200px]",
      opacity: "",
    },
    {
      top: "top-[125px]",
      left: "left-[755px]",
      width: "w-[667px]",
      height: "h-[667px]",
      bg: "bg-[#e477f6]",
      rounded: "rounded-[333.5px]",
      blur: "blur-[200px]",
      opacity: "",
    },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 z-0">
        {gradientBlobs.map((blob, index) => (
          <div
            key={`blob-${index}`}
            className={`absolute ${blob.width} ${blob.height} ${blob.top} ${blob.left} ${blob.bg} ${blob.rounded} ${blob.blur} ${blob.opacity}`}
          />
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Left column: Login Form */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-center justify-center backdrop-blur-sm p-6">
          {/* Mobile-only logo (small version) */}
          <div className="flex flex-col items-center mb-6 lg:hidden">
            <div className="relative w-[180px] h-[70px] mb-3">
              <Image
                src="/images/meetus-logo.png"
                alt="Meetus logo small"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="relative w-[150px] h-[30px]">
              <Image
                src="/images/meetus-name.png"
                alt="Meetus name small"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <LoginForm />
        </div>

        {/* Right column: Images */}
        <div className="hidden lg:block lg:col-span-7 relative z-10 backdrop-blur-sm rounded-lg">
          <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Main logo image */}
            <div className="relative w-[754px] h-[300px] mb-8">
              <Image
                src="/images/meetus-logo.png"
                alt="Main visual"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Meetus logo */}
            <div className="relative w-[413px] h-[75px]">
              <Image
                src="/images/meetus-name.png"
                alt="MeetusVR logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
