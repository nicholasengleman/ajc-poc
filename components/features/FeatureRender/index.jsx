import PkgLeadAuto from "../PkgLeadAuto";
import DontMiss from "../DontMiss";

const FeatureRender = ({ data }) => {
  if (Array.isArray(data)) {
    return data?.map((feature, i) => {
      switch (feature.__typename) {
        case "PkgleadautoRecord":
          return <PkgLeadAuto key={i} customFields={feature} />;
        case "DontmissRecord":
          return <DontMiss key={i} customFields={feature} />;
        default:
          return null;
      }
    });
  }
};

export default FeatureRender;
