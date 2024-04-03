import React from "react";
import ContentLoader from "react-content-loader";

const SidebarProfileLoader = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={258}
      height={90}
      viewBox="0 0 258 90"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="316" y="16" rx="3" ry="3" width="88" height="6" />
      <circle cx="50" cy="47" r="40" />
      <rect x="102" y="28" rx="0" ry="0" width="190" height="9" />
      <rect x="100" y="62" rx="0" ry="0" width="214" height="9" />
    </ContentLoader>
  );
};

export default SidebarProfileLoader;
