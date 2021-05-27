import Head from "next/head";
import Navbar from "./navbar";

interface Props {
  children?: React.ReactNode;
  description?: string;
  title?: string;
}

export default function Layout({ children, title, description }: Props) {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Tennis Finder` : "Tennis Finder"}</title>
        {description && <meta content={description} name="description" />}
      </Head>
      <div className="flex flex-col max-w-screen-md min-h-screen px-5 mx-auto overflow-x-hidden md:px-10">
        <Navbar />
        <div className="flex flex-col flex-grow">{children}</div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
