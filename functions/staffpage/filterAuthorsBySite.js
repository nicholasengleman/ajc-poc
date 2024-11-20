import OHIO_SITES from './OHIO_SITES';

const filterAuthorsBySite = (staffData, arcSite) => {
  const staffMembers = staffData?.q_results;
  const ohioSiteID = OHIO_SITES()[arcSite];
  const filteredStaff = staffMembers.filter((author) => {
    if (
      author?.affiliations?.includes(ohioSiteID) ||
      (arcSite === 'ajc' && author?.custom_ajc_website?.toLowerCase() === 'ajc')
    ) {
      return true;
    }
    return false;
  });

  return filteredStaff;
};

export default filterAuthorsBySite;
