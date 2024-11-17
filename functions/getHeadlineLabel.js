export default function getHeadlineLabel(headlineBasic, label) {
  //  const { type } = fusionContext;
  const composerLabel = label?.tease_label?.text?.trim() || "";

  const featuresToExclude = ["Revenue"];
  const isExcludedFeature = false;
  //   const isExcludedFeature = featuresToExclude.some((substring) =>
  //     type.includes(substring)
  //   );

  // Matches strings that begin with A-Za-z0-9, contain A-Za-z0-9, space, dash, ampersand, or apostrophe,
  // and end in a pipe followed by a space. The pipe and space are not returned in the match.
  const labelRegex = /^[A-Za-z0-9][A-Za-z0-9\s&\-’']*(?=\| )/;
  const labelMatch = headlineBasic?.match(labelRegex);

  if (
    !isExcludedFeature &&
    (labelMatch?.[0]?.length <= 20 || composerLabel?.length <= 20)
  ) {
    let headlineWithoutLabel = headlineBasic;
    let headlineLabel = null;

    if (labelMatch?.[0]?.length <= 20) {
      // Finds headline
      const headlineMatch = headlineBasic?.match(/\| /);
      const headline = headlineBasic.substring(headlineMatch.index + 2).trim();
      headlineWithoutLabel = headline;
      headlineLabel = labelMatch[0].toUpperCase();
    } else if (composerLabel?.length <= 20) {
      headlineLabel = composerLabel.toUpperCase();
    }

    return {
      headlineWithoutLabel,
      headlineLabel,
    };
  }

  return {
    headlineWithoutLabel: headlineBasic,
    headlineLabel: null,
  };
}
