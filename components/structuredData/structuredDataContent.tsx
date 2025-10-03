import Head from "next/head";

interface DataProps {
  data: {
    [key: string]: any;
  };
}
const StructuredData: React.FC<DataProps> = ({ data }) => {
  return (
    <Head>
      <script
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
};
export default StructuredData;
