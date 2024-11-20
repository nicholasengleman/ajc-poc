import React, { useMemo } from 'react';

const checkTrailingSlash = (link) => (link.endsWith('/') ? link : `${link}/`);

const useFormattedLinks = (secondaryNavSections, siteDomainURL) =>
  useMemo(() => {
    const secondaryNavLinks = secondaryNavSections?.children;
    const links = secondaryNavLinks?.filter(
      (section) => !section._id.includes('label'),
    );

    return links?.map((section, i) => {
      const { _id: id, navigation, site } = section || {};
      const { site_url: siteURL } = site || {};
      const { nav_title: title } = navigation || {};
      const destination = id.includes('/configsection') ? siteURL : id;

      if (!destination) return null;

      return (
        <li key={i}>
          <a
            href={
              destination?.startsWith('/')
                ? `${siteDomainURL}${checkTrailingSlash(destination)}`
                : checkTrailingSlash(destination)
            }
            rel='noopener noreferrer'
          >
            {title}
          </a>
        </li>
      );
    });
  }, [secondaryNavSections, siteDomainURL]);

export default useFormattedLinks;
