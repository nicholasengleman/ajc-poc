export const isNotEmpty = (zone, sections) =>
  Boolean(sections[zone?.key]?.children.length);

const removeUnusedZone = (sections, zonesCollection) =>
  zonesCollection.filter((zone) => isNotEmpty(zone?.content, sections));

export default removeUnusedZone;
