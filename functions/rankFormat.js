const rankFormat = (divRank) => {
  switch (divRank) {
    case 1:
      return `${divRank}st`;
    case 2:
      return `${divRank}nd`;
    case 3:
      return `${divRank}rd`;
    case 'N/A':
      return 'N/A';
    default:
      return `${divRank}th`;
  }
};

export default rankFormat;
