import { Metadata } from "next";
import { ComparePage } from "@/components/pages/ComparePage";

// Car comparison data is relatively static - revalidate daily
export const revalidate = 86400;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Compare Cars | Nissan Vehicle Comparison",
  description: "Compare Nissan vehicles side by side. Compare Magnite vs Kicks vs X-Trail - specifications, features, prices and more at Channi Nissan.",
  keywords: ["compare Nissan cars", "Magnite vs Kicks", "car comparison", "Nissan specifications"],
  openGraph: {
    title: "Compare Nissan Cars | Channi Nissan",
    description: "Compare specifications, features and prices of Nissan vehicles side by side",
  },
};

export default function Compare() {
  return <ComparePage />;
}
