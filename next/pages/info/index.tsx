import Image from "next/image";

interface InfoPageProps {
  textData: { message: string };
  imageUrl: string;
}

export default function InfoPage({ textData, imageUrl }: InfoPageProps) {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Info Page - Static Rendered</h1>

      <section>
        <h2>Text Data from Express</h2>
        <p>
          <strong>Message:</strong> {textData.message}
        </p>
      </section>

      <section>
        <h2>Image from Express</h2>
        <Image
          src={imageUrl}
          alt="Sample from Express server"
          style={{ maxWidth: "200px", border: "1px solid #ccc", padding: "1rem" }}
          width={400}
          height={400}
        />
      </section>

      <section style={{ marginTop: "2rem", color: "#666", fontSize: "0.9rem" }}>
        <p>This page was statically generated at build time.</p>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const API_BASE = "http://localhost:3001";

  try {
    // Fetch text data from Express /text endpoint
    const textResponse = await fetch(`${API_BASE}/text`);
    const textData = await textResponse.json();

    // Use local image path (downloaded by download-assets.js script)
    // Only work with npm run build
    const imageUrl = "/images/sample.png";

    return {
      props: {
        textData,
        imageUrl,
      },
    };
  } catch (error) {
    console.error("Error fetching data from Express:", error);
    return {
      props: {
        textData: { message: "Failed to fetch data" },
        imageUrl: "",
      },
    };
  }
}
