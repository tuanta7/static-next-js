import Image from "next/image";

import { getUrl } from "@/lib/url";

interface ShowcasePageProps {
  textData: { message: string };
  imageUrl: string;
}

export async function getStaticProps() {
  try {
    const textResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/text`);
    const textData = await textResponse.json();
    const imageUrl = getUrl("/images/sample.png");

    return {
      props: {
        textData,
        imageUrl,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        textData: { message: "Failed to fetch data" },
        imageUrl: "",
      },
    };
  }
}

export default function ShowcasePage({ textData, imageUrl }: ShowcasePageProps) {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Static Rendered</h1>
      <section>
        <h2>Text</h2>
        <p>Message: {textData.message}</p>
      </section>
      <section>
        <h2>Image</h2>
        <Image
          src={imageUrl}
          alt="Sample"
          style={{
            maxWidth: "200px",
            height: "auto",
            border: "1px solid #ccc",
            padding: "1rem",
          }}
          width={400}
          height={400}
        />
      </section>
    </div>
  );
}
