import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="277" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="456" rx="0" ry="0" width="154" height="27" />
    <rect x="166" y="448" rx="20" ry="20" width="108" height="45" />
    <circle cx="133" cy="147" r="113" />
    <rect x="0" y="328" rx="10" ry="10" width="280" height="105" />
  </ContentLoader>
);

export default Skeleton;
