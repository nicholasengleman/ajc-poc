import {
  safeHtml,
  htmlDecode,
} from '../../_helper_components/global/utils/stringUtils';
import truncateHeadline from './homepage/truncateHeadline';

const getDefaultTeaserText = ({
  storyText,
  description,
  contentElements,
  headlines,
  isDisplayRelatedHeadline,
  type,
  truncate,
}) => {
  let previewText = '';
  if (headlines?.web) {
    previewText = headlines.web;
  } else if (isDisplayRelatedHeadline && headlines) {
    previewText = headlines;
  } else if (description && (type === 'video' || type === 'gallery')) {
    previewText = description?.basic;
  } else if (contentElements && !headlines?.web && storyText) {
    const previewData = storyText;
    const { _id: primaryContentId } = previewData || {};
    let { content: primaryContentText } = previewData || {};
    const secondaryContentText =
      contentElements?.find(
        (content) =>
          content?.type === 'text' && content?._id !== primaryContentId,
      )?.content || null;

    if (primaryContentText.length < 90 && secondaryContentText) {
      primaryContentText = `${primaryContentText} ${secondaryContentText}`;
    }
    const textContent = safeHtml(primaryContentText, { whiteList: {} });
    previewText = htmlDecode(textContent);
  }

  return truncate ? truncateHeadline(previewText, false, 120) : previewText;
};

export default getDefaultTeaserText;
