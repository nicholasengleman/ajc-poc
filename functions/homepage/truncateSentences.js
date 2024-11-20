export default function truncateSentences(text, options) {
  const { maxCharacters, isMobile } = options;

  if (!text) {
    return '';
  }

  let truncatedText = text;
  const sentenceCount = (truncatedText.match(/[.!?]+/g) || []).length;

  if (truncatedText.length > maxCharacters) {
    if (sentenceCount === 1) {
      // Only one sentence and it exceeds the maximum characters
      truncatedText = `${truncatedText.slice(0, maxCharacters)}...`;
    } else {
      // Truncate the text to the specified number of characters
      truncatedText = truncatedText.slice(0, maxCharacters);

      // Find the last sentence boundary before the truncation point
      const lastSentenceBoundary = truncatedText.lastIndexOf('.');

      // Check if the truncation point is within a sentence
      if (lastSentenceBoundary !== -1) {
        truncatedText = truncatedText.slice(0, lastSentenceBoundary + 1);
      }
    }
  }

  if (isMobile && truncatedText.length > maxCharacters) {
    // Truncate further if still exceeding the maximum characters on mobile
    truncatedText = `${truncatedText.slice(0, maxCharacters)}...`;
  }

  return truncatedText;
}
