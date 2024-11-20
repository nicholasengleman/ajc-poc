import { useFusionContext } from 'fusion:context';

export default () => {
  const fusionContext = useFusionContext();
  const { id: featureId, renderables } = fusionContext;

  if (renderables) {
    const parentChain = renderables?.find((renderable) => {
      if (renderable.collection === 'chains') {
        if (renderable.props.id === featureId) {
          return true;
        }
        if (
          renderable.children?.some((child) => child.props.id === featureId)
        ) {
          return true;
        }
      }
      return null;
    });
    if (parentChain) {
      return parentChain.type;
    }
  }
  return null;
};
